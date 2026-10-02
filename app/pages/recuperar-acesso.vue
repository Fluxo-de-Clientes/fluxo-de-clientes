<script setup lang="ts">
import type { Database } from '~/types/database.types'

definePageMeta({ layout: 'auth' })
useSeoMeta({ title: 'Recuperar acesso · Fluxo de Clientes' })

const supabase = useSupabaseClient<Database>()
const email = ref('')
const pending = ref(false)
const errorMessage = ref('')
const sent = ref(false)

async function submit() {
  errorMessage.value = ''
  pending.value = true
  try {
    const appUrl = useRuntimeConfig().public.appUrl || window.location.origin
    const { error } = await supabase.auth.resetPasswordForEmail(email.value.trim(), {
      redirectTo: `${appUrl}/auth/callback?next=%2Fredefinir-senha`
    })
    if (error) throw error
    sent.value = true
  } catch (error) {
    console.error('Password reset request failed', error)
    errorMessage.value = 'Não foi possível solicitar a recuperação agora. Tente novamente.'
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold text-highlighted">Recuperar acesso</h1>
      <p class="mt-2 text-sm text-muted">Informe o e-mail da conta para receber as instruções.</p>
    </div>

    <UAlert v-if="sent" color="success" variant="subtle" description="Se houver uma conta para este e-mail, enviaremos instruções para redefinir a senha." />
    <UAlert v-if="errorMessage" color="error" variant="subtle" :description="errorMessage" />

    <form class="space-y-4" @submit.prevent="submit">
      <UFormField label="E-mail" name="email" required>
        <UInput v-model="email" class="w-full" type="email" autocomplete="email" required />
      </UFormField>
      <UButton type="submit" block :loading="pending" :disabled="!email.trim()">
        Enviar instruções
      </UButton>
    </form>

    <NuxtLink to="/entrar" class="block text-center text-sm text-primary hover:underline">
      Voltar para entrar
    </NuxtLink>
  </div>
</template>
