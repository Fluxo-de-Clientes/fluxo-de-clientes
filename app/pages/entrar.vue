<script setup lang="ts">
import type { Database } from '~/types/database.types'

definePageMeta({ layout: 'auth' })
useSeoMeta({ title: 'Entrar · Fluxo de Clientes' })

const supabase = useSupabaseClient<Database>()
const redirectCookie = useSupabaseCookieRedirect()
const email = ref('')
const password = ref('')
const pending = ref(false)
const errorMessage = ref('')

async function submit() {
  errorMessage.value = ''
  pending.value = true
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value.trim(),
      password: password.value
    })
    if (error) throw error

    const redirectPath = redirectCookie.pluck()
    const redirect = redirectPath?.startsWith('/app') ? redirectPath : '/app'
    await navigateTo(redirect)
  } catch (error) {
    console.error('Sign-in failed', error)
    errorMessage.value = 'Não foi possível entrar. Confira seu e-mail e sua senha e tente novamente.'
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold text-highlighted">Acesse sua conta</h1>
      <p class="mt-2 text-sm text-muted">Entre para continuar o acompanhamento da sua equipe.</p>
    </div>

    <UAlert v-if="errorMessage" color="error" variant="subtle" :description="errorMessage" />

    <form class="space-y-4" @submit.prevent="submit">
      <UFormField label="E-mail" name="email" required>
        <UInput v-model="email" class="w-full" type="email" autocomplete="username" required />
      </UFormField>
      <UFormField label="Senha" name="password" required>
        <UInput v-model="password" class="w-full" type="password" autocomplete="current-password" required />
      </UFormField>
      <UButton type="submit" block :loading="pending" :disabled="!email.trim() || !password">
        Entrar
      </UButton>
    </form>

    <NuxtLink to="/recuperar-acesso" class="block text-center text-sm text-primary hover:underline">
      Esqueci minha senha
    </NuxtLink>
  </div>
</template>
