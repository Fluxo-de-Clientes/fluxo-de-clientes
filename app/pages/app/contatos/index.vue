<script setup lang="ts">
import type { Database } from '~/types/database.types'

definePageMeta({ middleware: 'global-auth' })
useSeoMeta({ title: 'Contatos · Fluxo de Clientes' })

const supabase = useSupabaseClient<Database>()
const { current, loading: organizationsLoading, loadError: organizationError, refresh: refreshOrganizations } = useCurrentOrganization()
const { stages, members, refresh: refreshOptions } = useContactOptions()
const contacts = ref<Database['public']['Tables']['contacts']['Row'][]>([])
const query = ref('')
const pending = ref(true)
const errorMessage = ref('')
const user = useSupabaseUser()

const canCreate = computed(() => ['admin', 'manager', 'agent'].includes(current.value?.role ?? ''))
const filteredContacts = computed(() => {
  const term = query.value.trim().toLocaleLowerCase('pt-BR')
  if (!term) return contacts.value
  return contacts.value.filter(contact =>
    contact.full_name.toLocaleLowerCase('pt-BR').includes(term)
    || contact.email?.toLocaleLowerCase('pt-BR').includes(term)
    || contact.phone?.includes(term)
  )
})

async function loadContacts() {
  errorMessage.value = ''
  if (!current.value) return
  pending.value = true
  try {
    await refreshOptions(current.value.id)
    let request = supabase
      .from('contacts')
      .select('*')
      .eq('organization_id', current.value.id)
      .order('updated_at', { ascending: false })

    if (current.value.role === 'agent') request = request.eq('assigned_to', user.value?.sub ?? '')
    const { data, error } = await request
    if (error) throw error
    contacts.value = data
  } catch (error) {
    console.error('Contacts could not be loaded', error)
    errorMessage.value = 'Não foi possível carregar os contatos. Tente novamente.'
  } finally {
    pending.value = false
  }
}

async function initialize() {
  await refreshOrganizations()
  if (organizationError.value) return
  if (!current.value) {
    await navigateTo('/app/configuracao')
    return
  }
  await loadContacts()
}

onMounted(initialize)
watch(() => current.value?.id, (id, previousId) => {
  if (import.meta.client && id && previousId && id !== previousId) loadContacts()
})
</script>

<template>
  <section class="mx-auto w-full max-w-6xl flex-1 space-y-6 p-5 sm:p-8">
    <header class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 class="text-2xl font-semibold text-highlighted">Contatos</h1>
        <p class="mt-1 text-sm text-muted">Acompanhe responsáveis, etapas e próximas ações da equipe.</p>
      </div>
      <UButton v-if="canCreate" to="/app/contatos/novo" icon="i-lucide-user-plus">Novo contato</UButton>
    </header>

    <UAlert v-if="organizationError || errorMessage" color="error" variant="subtle" :description="organizationError || errorMessage || ''">
      <template #actions>
        <UButton size="xs" color="neutral" variant="outline" @click="initialize">Tentar novamente</UButton>
      </template>
    </UAlert>

    <UInput v-model="query" icon="i-lucide-search" placeholder="Buscar por nome, e-mail ou telefone" aria-label="Buscar contatos" class="w-full sm:max-w-sm" />

    <div v-if="pending || organizationsLoading" class="space-y-3" aria-live="polite">
      <USkeleton v-for="row in 3" :key="row" class="h-16 w-full" />
    </div>
    <div v-else-if="!contacts.length && !errorMessage" class="rounded-xl border border-dashed border-default p-8 text-center">
      <h2 class="font-semibold text-highlighted">Nenhum contato cadastrado</h2>
      <p class="mt-2 text-sm text-muted">Adicione o primeiro contato para acompanhar sua operação.</p>
      <UButton v-if="canCreate" to="/app/contatos/novo" class="mt-4">Adicionar contato</UButton>
    </div>
    <div v-else-if="!filteredContacts.length" class="rounded-xl border border-default p-8 text-center">
      <p class="text-sm text-muted">Nenhum contato corresponde à busca.</p>
      <UButton class="mt-3" color="neutral" variant="ghost" @click="query = ''">Limpar busca</UButton>
    </div>
    <div v-else class="overflow-x-auto rounded-xl border border-default">
      <table class="w-full min-w-[720px] text-left text-sm">
        <thead class="bg-elevated text-muted">
          <tr>
            <th scope="col" class="px-4 py-3 font-medium">Contato</th>
            <th scope="col" class="px-4 py-3 font-medium">Etapa</th>
            <th scope="col" class="px-4 py-3 font-medium">Responsável</th>
            <th scope="col" class="px-4 py-3 font-medium">Origem</th>
            <th scope="col" class="px-4 py-3 font-medium">Próxima ação</th>
            <th scope="col" class="px-4 py-3 font-medium">Atualizado</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-default">
          <tr v-for="contact in filteredContacts" :key="contact.id" class="hover:bg-elevated/50">
            <td class="px-4 py-3">
              <NuxtLink :to="`/app/contatos/${contact.id}`" class="font-medium text-highlighted hover:text-primary hover:underline">
                {{ contact.full_name }}
              </NuxtLink>
              <p class="mt-1 text-xs text-muted">{{ contact.email || contact.phone || 'Sem dados de contato' }}</p>
            </td>
            <td class="px-4 py-3 text-muted">{{ stages.find(stage => stage.id === contact.stage_id)?.name || 'Sem etapa' }}</td>
            <td class="px-4 py-3 text-muted">{{ members.find(member => member.user_id === contact.assigned_to)?.display_name || 'Sem responsável' }}</td>
            <td class="px-4 py-3 text-muted">{{ contact.source || 'Não informada' }}</td>
            <td class="px-4 py-3 text-muted">{{ contact.next_action || 'Sem próxima ação definida' }}</td>
            <td class="px-4 py-3 text-muted">{{ new Date(contact.updated_at).toLocaleDateString('pt-BR') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
