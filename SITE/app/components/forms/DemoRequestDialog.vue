<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, reactive, ref, watch } from 'vue'

const { isDemoOpen } = useDemo()
const config = useRuntimeConfig()
const form = reactive({ name: '', email: '', company: '', message: '' })
const errors = reactive({ name: '', email: '' })
const status = ref<'idle' | 'sending' | 'success' | 'unavailable' | 'failure'>('idle')
const hasErrors = computed(() => Boolean(errors.name || errors.email))
const integrationAvailable = computed(
  () =>
    /^https?:\/\//i.test(String(config.public.demoEndpoint)) ||
    /^\/(?!\/)/.test(String(config.public.demoEndpoint)),
)
let controller: AbortController | undefined

function validateOnBlur(field: 'name' | 'email', event: FocusEvent) {
  // Submit validates both fields. Avoid moving its button between pointerdown and click.
  const nextControl = event.relatedTarget
  if (nextControl instanceof HTMLButtonElement && nextControl.type === 'submit') return
  validate(field)
}

function validate(field: 'name' | 'email') {
  if (field === 'name')
    errors.name = form.name.trim().length >= 2 ? '' : 'Informe seu nome com pelo menos 2 caracteres.'
  if (field === 'email')
    errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
      ? ''
      : 'Informe um e-mail completo, como nome@empresa.com.'
}

async function submit() {
  if (status.value === 'sending') return
  validate('name')
  validate('email')
  if (hasErrors.value) {
    await nextTick()
    document.getElementById(errors.name ? 'demo-name' : 'demo-email')?.focus()
    return
  }
  if (!integrationAvailable.value) {
    status.value = 'unavailable'
    return
  }
  status.value = 'sending'
  controller = new AbortController()
  try {
    const response = await $fetch<{ success: boolean }>(String(config.public.demoEndpoint), {
      method: 'POST',
      body: {
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
        message: form.message.trim(),
      },
      signal: controller.signal,
      timeout: 15000,
      retry: 0,
    })
    if (response?.success !== true) throw new Error('Unconfirmed submission')
    status.value = 'success'
  } catch {
    if (!controller.signal.aborted) status.value = 'failure'
  }
}

watch(isDemoOpen, (open) => {
  if (!open) controller?.abort()
  status.value = 'idle'
})
onBeforeUnmount(() => controller?.abort())
</script>

<template>
  <BaseDialog
    :open="isDemoOpen"
    title="Vamos conversar sobre seu fluxo?"
    description="Conte um pouco sobre sua operação para solicitar uma demonstração."
    @close="isDemoOpen = false"
  >
    <div v-if="status === 'success'" class="od-stack gap-4" role="status">
      <AppIcon name="check-circle" :size="40" />
      <h3 class="text-xl font-semibold">Solicitação enviada.</h3>
      <p class="text-muted">Recebemos suas informações para a demonstração.</p>
      <BaseButton class="self-start" @click="isDemoOpen = false">Voltar à página</BaseButton>
    </div>
    <form v-else class="od-stack gap-5" novalidate :aria-busy="status === 'sending'" @submit.prevent="submit">
      <p v-if="!integrationAvailable" class="rounded-control bg-paper p-4 text-sm">
        O agendamento online ainda não está disponível. Você pode conhecer o formulário, mas seus dados não
        serão enviados.
      </p>
      <div v-if="hasErrors" class="border border-foreground rounded-control p-4" role="alert">
        <p class="font-semibold">Confira os campos abaixo:</p>
        <ul class="mt-2 list-disc pl-5">
          <li v-if="errors.name">
            <a href="#demo-name" class="underline">{{ errors.name }}</a>
          </li>
          <li v-if="errors.email">
            <a href="#demo-email" class="underline">{{ errors.email }}</a>
          </li>
        </ul>
      </div>
      <div>
        <label class="field-label" for="demo-name"
          >Nome <span class="font-normal text-sm">(obrigatório)</span></label
        ><input
          id="demo-name"
          v-model="form.name"
          class="field-input"
          name="name"
          autocomplete="name"
          maxlength="120"
          required
          :aria-invalid="Boolean(errors.name)"
          :aria-describedby="errors.name ? 'name-error' : undefined"
          @blur="validateOnBlur('name', $event)"
        />
        <p v-if="errors.name" id="name-error" class="field-error">{{ errors.name }}</p>
      </div>
      <div>
        <label class="field-label" for="demo-email"
          >E-mail <span class="font-normal text-sm">(obrigatório)</span></label
        ><input
          id="demo-email"
          v-model="form.email"
          class="field-input"
          name="email"
          type="email"
          inputmode="email"
          autocomplete="email"
          maxlength="254"
          required
          :aria-invalid="Boolean(errors.email)"
          :aria-describedby="errors.email ? 'email-error' : undefined"
          @blur="validateOnBlur('email', $event)"
        />
        <p v-if="errors.email" id="email-error" class="field-error">{{ errors.email }}</p>
      </div>
      <div>
        <label class="field-label" for="demo-company"
          >Empresa <span class="text-sm font-normal text-muted">(opcional)</span></label
        ><input
          id="demo-company"
          v-model="form.company"
          class="field-input"
          name="company"
          autocomplete="organization"
          maxlength="160"
        />
      </div>
      <div>
        <label class="field-label" for="demo-message"
          >O que você quer organizar? <span class="text-sm font-normal text-muted">(opcional)</span></label
        ><textarea
          id="demo-message"
          v-model="form.message"
          class="field-input resize-y"
          name="message"
          rows="3"
          maxlength="1500"
          placeholder="Conte sobre os canais e a rotina da sua equipe."
        />
      </div>
      <p v-if="config.public.privacyUrl" class="text-sm text-muted">
        Consulte nossa
        <a
          :href="String(config.public.privacyUrl)"
          class="underline"
          target="_blank"
          rel="noopener noreferrer"
          >política de privacidade</a
        >.
      </p>
      <p v-if="status === 'unavailable'" role="status" class="rounded-control bg-paper p-4">
        Dados conferidos. Nenhuma solicitação foi enviada, pois o agendamento ainda não está disponível.
      </p>
      <p v-if="status === 'failure'" role="alert" class="field-error">
        Não foi possível confirmar o envio. Seus dados continuam no formulário. Tente novamente em instantes.
      </p>
      <BaseButton type="submit" :disabled="status === 'sending'">{{
        status === 'sending'
          ? 'Enviando solicitação…'
          : integrationAvailable
            ? 'Solicitar demonstração'
            : 'Conferir informações'
      }}</BaseButton>
      <p class="text-xs text-muted">Os campos são mantidos apenas enquanto esta página estiver aberta.</p>
    </form>
  </BaseDialog>
</template>
