<script setup lang="ts">
import type { Database } from '~/types/database.types'

definePageMeta({ layout: 'auth' })
useSeoMeta({ title: 'Confirmando acesso · Fluxo de Clientes' })

const supabase = useSupabaseClient<Database>()
const route = useRoute()
const errorMessage = ref('')

onMounted(async () => {
  const { data, error } = await supabase.auth.getSession()
  if (error || !data.session) {
    errorMessage.value = 'O link expirou ou não é válido. Solicite um novo e-mail de recuperação.'
    return
  }

  const destination = route.query.next === '/redefinir-senha' ? '/redefinir-senha' : '/app'
  await navigateTo(destination, { replace: true })
})
</script>

<template>
  <div class="space-y-4 text-center">
    <h1 class="text-2xl font-semibold text-highlighted">Confirmando seu acesso</h1>
    <p v-if="!errorMessage" class="text-sm text-muted">Aguarde enquanto validamos o link.</p>
    <UAlert v-else color="error" variant="subtle" :description="errorMessage" />
    <UButton v-if="errorMessage" to="/recuperar-acesso" block>Solicitar novo link</UButton>
  </div>
</template>
