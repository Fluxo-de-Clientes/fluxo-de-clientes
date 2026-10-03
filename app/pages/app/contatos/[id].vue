<script setup lang="ts">
import type { Database } from '~/types/database.types'

definePageMeta({ middleware: 'global-auth' })

type Contact = Database['public']['Tables']['contacts']['Row']
type Activity = Database['public']['Tables']['contact_activity']['Row']

const route = useRoute()
const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()
const { current, loading: organizationsLoading, loadError: organizationError, refresh: refreshOrganizations } = useCurrentOrganization()
const { stages, members, refresh: refreshOptions } = useContactOptions()
const contact = ref<Contact | null>(null)
const activities = ref<Activity[]>([])
const name = ref('')
const email = ref('')
const phone = ref('')
const source = ref('')
const stageId = ref('')
const assignedTo = ref('')
const nextAction = ref('')
const nextActionAt = ref('')
const pending = ref(false)
const loading = ref(true)
const errorMessage = ref('')

const canEdit = computed(() => {
  const role = current.value?.role
  return role === 'admin' || role === 'manager' || (role === 'agent' && contact.value?.assigned_to === user.value?.sub)
})

function asLocalDateTime(value: string | null) {
  if (!value) return ''
  const date = new Date(value)
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
  return local.toISOString().slice(0, 16)
}

async function loadContact() {
  if (!current.value) return
  loading.value = true
  errorMessage.value = ''
  try {
    await refreshOptions(current.value.id)
    const contactId = typeof route.params.id === 'string' ? route.params.id : ''
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('id', contactId)
      .eq('organization_id', current.value.id)
      .maybeSingle()
    if (error) throw error
    if (!data) {
      contact.value = null
      return
    }
    contact.value = data
    name.value = data.full_name
    email.value = data.email ?? ''
    phone.value = data.phone ?? ''
    source.value = data.source ?? ''
    stageId.value = data.stage_id ?? ''
    assignedTo.value = data.assigned_to ?? ''
    nextAction.value = data.next_action ?? ''
    nextActionAt.value = asLocalDateTime(data.next_action_at)

    const { data: history, error: historyError } = await supabase
      .from('contact_activity')
      .select('*')
      .eq('contact_id', data.id)
      .order('created_at', { ascending: false })
    if (historyError) throw historyError
    activities.value = history
  } catch (error) {
    console.error('Contact could not be loaded', error)
    errorMessage.value = 'Não foi possível carregar este contato. Verifique sua conexão e tente novamente.'
  } finally {
    loading.value = false
  }
}

async function initialize() {
  await refreshOrganizations()
  if (organizationError.value) return
  if (!current.value) {
    await navigateTo('/app/configuracao')
    return
  }
  await loadContact()
}

async function save() {
  if (!contact.value || !canEdit.value) return
  errorMessage.value = ''
  pending.value = true
  try {
    const { data, error } = await supabase
      .from('contacts')
      .update({
        full_name: name.value.trim(),
        email: email.value.trim().toLowerCase() || null,
        phone: phone.value.trim() || null,
        source: source.value.trim() || null,
        stage_id: stageId.value || null,
        assigned_to: assignedTo.value || null,
        next_action: nextAction.value.trim() || null,
        next_action_at: nextActionAt.value ? new Date(nextActionAt.value).toISOString() : null
      })
      .eq('id', contact.value.id)
      .select('id')
      .maybeSingle()
    if (error) throw error
    if (!data) {
      errorMessage.value = 'Você não tem permissão para alterar este contato.'
      return
    }
    await loadContact()
  } catch (error) {
    console.error('Contact update failed', error)
    errorMessage.value = 'Não foi possível salvar as alterações. Seus dados foram mantidos; tente novamente.'
  } finally {
    pending.value = false
  }
}

onMounted(initialize)
watch(() => current.value?.id, (id, previousId) => {
  if (import.meta.client && id && previousId && id !== previousId) loadContact()
})
watch(() => route.params.id, () => {
  if (import.meta.client && current.value) loadContact()
})
</script>

<template>
  <section class="mx-auto w-full max-w-4xl flex-1 space-y-6 p-5 sm:p-8">
    <div>
      <NuxtLink to="/app/contatos" class="text-sm text-primary hover:underline">← Voltar aos contatos</NuxtLink>
      <h1 class="mt-3 text-2xl font-semibold text-highlighted">{{ contact?.full_name || 'Contato' }}</h1>
      <p class="mt-1 text-sm text-muted">Dados, etapa, responsável e histórico de atividades.</p>
    </div>

    <UAlert v-if="organizationError || errorMessage" color="error" variant="subtle" :description="organizationError || errorMessage || ''">
      <template #actions>
        <UButton size="xs" color="neutral" variant="outline" @click="initialize">Tentar novamente</UButton>
      </template>
    </UAlert>
    <div v-if="loading || organizationsLoading" class="space-y-4" aria-live="polite">
      <USkeleton class="h-72 w-full" />
    </div>
    <div v-else-if="!contact" class="rounded-xl border border-default p-6 text-center">
      <h2 class="font-semibold text-highlighted">Contato indisponível</h2>
      <p class="mt-2 text-sm text-muted">O registro não existe ou sua conta não tem permissão para acessá-lo.</p>
    </div>
    <template v-else>
      <form class="space-y-4 rounded-xl border border-default p-5 sm:p-6" @submit.prevent="save">
        <div class="grid gap-4 sm:grid-cols-2">
          <UFormField label="Nome" name="name" required>
            <UInput v-model="name" class="w-full" maxlength="160" required :disabled="!canEdit" />
          </UFormField>
          <UFormField label="E-mail" name="email">
            <UInput v-model="email" class="w-full" type="email" maxlength="254" :disabled="!canEdit" />
          </UFormField>
          <UFormField label="Telefone" name="phone">
            <UInput v-model="phone" class="w-full" type="tel" maxlength="32" :disabled="!canEdit" />
          </UFormField>
          <UFormField label="Origem" name="source">
            <UInput v-model="source" class="w-full" maxlength="120" :disabled="!canEdit" />
          </UFormField>
          <UFormField label="Etapa" name="stage">
            <select v-model="stageId" class="w-full rounded-md border border-default bg-default px-3 py-2 text-sm text-highlighted" :disabled="!canEdit">
              <option value="">Sem etapa</option>
              <option v-for="stage in stages" :key="stage.id" :value="stage.id">{{ stage.name }}</option>
            </select>
          </UFormField>
          <UFormField label="Responsável" name="assignee">
            <select v-model="assignedTo" class="w-full rounded-md border border-default bg-default px-3 py-2 text-sm text-highlighted" :disabled="!canEdit || current?.role === 'agent'">
              <option value="">Sem responsável</option>
              <option v-for="member in members" :key="member.user_id" :value="member.user_id">{{ member.display_name }}</option>
            </select>
          </UFormField>
          <UFormField label="Próxima ação" name="nextAction">
            <UInput v-model="nextAction" class="w-full" maxlength="500" :disabled="!canEdit" />
          </UFormField>
          <UFormField label="Data da próxima ação" name="nextActionAt">
            <UInput v-model="nextActionAt" class="w-full" type="datetime-local" :disabled="!canEdit" />
          </UFormField>
        </div>
        <UButton v-if="canEdit" type="submit" :loading="pending" :disabled="pending || name.trim().length < 2">Salvar alterações</UButton>
      </form>

      <section aria-labelledby="history-heading" class="space-y-3">
        <h2 id="history-heading" class="text-lg font-semibold text-highlighted">Histórico</h2>
        <ol v-if="activities.length" class="space-y-3">
          <li v-for="activity in activities" :key="activity.id" class="rounded-lg border border-default p-4">
            <p class="text-sm font-medium text-highlighted">{{ activity.summary }}</p>
            <time class="mt-1 block text-xs text-muted" :datetime="activity.created_at">
              {{ new Date(activity.created_at).toLocaleString('pt-BR') }}
            </time>
          </li>
        </ol>
        <p v-else class="text-sm text-muted">Ainda não há atividades registradas.</p>
      </section>
    </template>
  </section>
</template>
