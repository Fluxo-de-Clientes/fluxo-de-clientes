<script setup lang="ts">
import type { Database } from '~/types/database.types'

definePageMeta({ middleware: 'global-auth' })
useSeoMeta({ title: 'Novo contato · Fluxo de Clientes' })

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()
const { current, loadError: organizationError, refresh: refreshOrganizations } = useCurrentOrganization()
const { stages, members, refresh: refreshOptions } = useContactOptions()
const name = ref('')
const email = ref('')
const phone = ref('')
const source = ref('')
const stageId = ref('')
const assignedTo = ref('')
const nextAction = ref('')
const nextActionAt = ref('')
const pending = ref(false)
const errorMessage = ref('')

const canCreate = computed(() => ['admin', 'manager', 'agent'].includes(current.value?.role ?? ''))

onMounted(async () => {
  await refreshOrganizations()
  if (organizationError.value) return
  if (!current.value) {
    await navigateTo('/app/configuracao')
    return
  }
  if (!canCreate.value) {
    await navigateTo('/app/contatos')
    return
  }
  try {
    await refreshOptions(current.value.id)
    stageId.value = stages.value[0]?.id ?? ''
  } catch (error) {
    console.error('Contact options could not be loaded', error)
    errorMessage.value = 'Não foi possível carregar etapas e responsáveis. Tente novamente.'
  }
})

async function submit() {
  if (!current.value || !user.value) return
  errorMessage.value = ''
  pending.value = true
  try {
    const assignee = current.value.role === 'agent' ? user.value.sub : assignedTo.value || null
    const { data, error } = await supabase
      .from('contacts')
      .insert({
        organization_id: current.value.id,
        full_name: name.value.trim(),
        email: email.value.trim().toLowerCase() || null,
        phone: phone.value.trim() || null,
        source: source.value.trim() || null,
        stage_id: stageId.value || null,
        assigned_to: assignee,
        next_action: nextAction.value.trim() || null,
        next_action_at: nextActionAt.value ? new Date(nextActionAt.value).toISOString() : null
      })
      .select('id')
      .single()
    if (error) throw error
    await navigateTo(`/app/contatos/${data.id}`)
  } catch (error) {
    console.error('Contact creation failed', error)
    errorMessage.value = 'Não foi possível salvar o contato. Seus dados foram mantidos; tente novamente.'
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <section class="mx-auto w-full max-w-2xl flex-1 space-y-6 p-5 sm:p-8">
    <div>
      <NuxtLink to="/app/contatos" class="text-sm text-primary hover:underline">← Voltar aos contatos</NuxtLink>
      <h1 class="mt-3 text-2xl font-semibold text-highlighted">Novo contato</h1>
      <p class="mt-1 text-sm text-muted">Registre os dados iniciais e defina o próximo passo.</p>
    </div>

    <UAlert v-if="organizationError || errorMessage" color="error" variant="subtle" :description="organizationError || errorMessage || ''" />

    <form class="space-y-4 rounded-xl border border-default p-5 sm:p-6" @submit.prevent="submit">
      <UFormField label="Nome" name="name" required>
        <UInput v-model="name" class="w-full" autocomplete="name" minlength="2" maxlength="160" required />
      </UFormField>
      <div class="grid gap-4 sm:grid-cols-2">
        <UFormField label="E-mail" name="email">
          <UInput v-model="email" class="w-full" type="email" autocomplete="email" maxlength="254" />
        </UFormField>
        <UFormField label="Telefone" name="phone">
          <UInput v-model="phone" class="w-full" type="tel" autocomplete="tel" maxlength="32" />
        </UFormField>
      </div>
      <UFormField label="Origem" name="source">
        <UInput v-model="source" class="w-full" placeholder="Ex.: indicação, site" maxlength="120" />
      </UFormField>
      <div class="grid gap-4 sm:grid-cols-2">
        <UFormField label="Etapa" name="stage">
          <select v-model="stageId" class="w-full rounded-md border border-default bg-default px-3 py-2 text-sm text-highlighted">
            <option value="">Sem etapa</option>
            <option v-for="stage in stages" :key="stage.id" :value="stage.id">{{ stage.name }}</option>
          </select>
        </UFormField>
        <UFormField label="Responsável" name="assignee">
          <select v-model="assignedTo" class="w-full rounded-md border border-default bg-default px-3 py-2 text-sm text-highlighted" :disabled="current?.role === 'agent'">
            <option value="">Sem responsável</option>
            <option v-for="member in members" :key="member.user_id" :value="member.user_id">{{ member.display_name }}</option>
          </select>
        </UFormField>
      </div>
      <UFormField label="Próxima ação" name="nextAction">
        <UInput v-model="nextAction" class="w-full" maxlength="500" placeholder="Ex.: ligar para apresentar a proposta" />
      </UFormField>
      <UFormField label="Data da próxima ação" name="nextActionAt">
        <UInput v-model="nextActionAt" class="w-full" type="datetime-local" />
      </UFormField>
      <div class="flex flex-wrap gap-3 pt-2">
        <UButton type="submit" :loading="pending" :disabled="pending || name.trim().length < 2">Salvar contato</UButton>
        <UButton to="/app/contatos" color="neutral" variant="ghost">Cancelar</UButton>
      </div>
    </form>
  </section>
</template>
