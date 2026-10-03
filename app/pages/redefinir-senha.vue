<script setup lang="ts">
import type { Database } from '~/types/database.types'

definePageMeta({ layout: 'auth' })
useSeoMeta({ title: 'Definir nova senha · Fluxo de Clientes' })

const supabase = useSupabaseClient<Database>()
const session = useSupabaseSession()
const password = ref('')
const confirmation = ref('')
const pending = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

async function submit() {
  errorMessage.value = ''
  successMessage.value = ''
  if (password.value.length < 8) {
    errorMessage.value = 'A senha deve ter pelo menos 8 caracteres.'
    return
  }
  if (password.value !== confirmation.value) {
    errorMessage.value = 'As senhas não correspondem.'
    return
  }
  if (!session.value) {
    errorMessage.value = 'O link de recuperação expirou. Solicite um novo.'
    return
  }

  pending.value = true
  try {
    const { error } = await supabase.auth.updateUser({ password: password.value })
    if (error) throw error
    successMessage.value = 'Senha atualizada. Você já pode entrar com a nova senha.'
    password.value = ''
    confirmation.value = ''
  } catch (error) {
    console.error('Password update failed', error)
    errorMessage.value = 'Não foi possível atualizar a senha. Solicite um novo link de recuperação.'
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold text-highlighted">Defina uma nova senha</h1>
      <p class="mt-2 text-sm text-muted">Escolha uma senha com pelo menos 8 caracteres.</p>
    </div>
    <UAlert v-if="errorMessage" color="error" variant="subtle" :description="errorMessage" />
    <UAlert v-if="successMessage" color="success" variant="subtle" :description="successMessage">
      <template #actions>
        <UButton to="/entrar" size="xs" color="neutral" variant="outline">Entrar</UButton>
      </template>
    </UAlert>
    <form class="space-y-4" @submit.prevent="submit">
      <UFormField label="Nova senha" name="password" required>
        <UInput v-model="password" class="w-full" type="password" autocomplete="new-password" required minlength="8" />
      </UFormField>
      <UFormField label="Confirmar senha" name="confirmation" required>
        <UInput v-model="confirmation" class="w-full" type="password" autocomplete="new-password" required minlength="8" />
      </UFormField>
      <UButton type="submit" block :loading="pending" :disabled="!password || !confirmation">
        Salvar nova senha
      </UButton>
    </form>
  </div>
</template>
