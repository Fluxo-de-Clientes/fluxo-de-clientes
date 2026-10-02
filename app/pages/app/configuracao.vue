<script setup lang="ts">
import type { Database } from '~/types/database.types'

definePageMeta({ middleware: 'global-auth' })
useSeoMeta({ title: 'Configurar empresa · Fluxo de Clientes' })

const supabase = useSupabaseClient<Database>()
const { organizations, loading, loadError, refresh } = useCurrentOrganization()
const name = ref('')
const pending = ref(false)
const errorMessage = ref('')

onMounted(async () => {
  await refresh()
  if (organizations.value.length) await navigateTo('/app/contatos')
})

async function createOrganization() {
  errorMessage.value = ''
  pending.value = true
  try {
    const { error } = await supabase.rpc('create_organization', { organization_name: name.value.trim() })
    if (error) throw error
    await refresh()
    await navigateTo('/app/contatos')
  } catch (error) {
    console.error('Organization setup failed', error)
    errorMessage.value = 'Não foi possível configurar a empresa. Tente novamente.'
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <div class="mx-auto flex w-full max-w-xl flex-1 items-center p-6 sm:p-10">
    <section class="w-full space-y-6">
      <div>
        <h1 class="text-2xl font-semibold text-highlighted">Configure sua empresa</h1>
        <p class="mt-2 text-sm text-muted">Esse nome identifica o espaço de trabalho da sua equipe.</p>
      </div>
      <UAlert v-if="loadError || errorMessage" color="error" variant="subtle" :description="loadError || errorMessage || ''" />
      <form class="space-y-4" @submit.prevent="createOrganization">
        <UFormField label="Nome da empresa" name="organization" required>
          <UInput v-model="name" class="w-full" autocomplete="organization" minlength="2" maxlength="160" required />
        </UFormField>
        <UButton type="submit" :loading="pending || loading" :disabled="pending || loading || name.trim().length < 2">
          Criar espaço de trabalho
        </UButton>
      </form>
    </section>
  </div>
</template>
