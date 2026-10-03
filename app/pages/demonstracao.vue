<script setup lang="ts">
import { demoRequestSchema, type DemoRequestInput } from '#shared/schemas/demo-request'

definePageMeta({ layout: 'auth' })
useSeoMeta({ title: 'Solicitar demonstração · Fluxo de Clientes' })

const route = useRoute()
const form = reactive<DemoRequestInput>({
  name: '',
  company: '',
  email: '',
  phone: '',
  interest: 'outro',
  details: '',
  source: typeof route.query.source === 'string' ? route.query.source.slice(0, 120) : 'site',
  website: ''
})
const errors = ref<Record<string, string>>({})
const pending = ref(false)
const requestError = ref('')
const receiptId = useState<string | null>('demo-request-receipt', () => null)

const interests = [
  { label: 'Selecione uma necessidade', value: 'outro' },
  { label: 'Atendimento', value: 'atendimento' },
  { label: 'Funil de clientes', value: 'funil' },
  { label: 'Automações', value: 'automacao' },
  { label: 'Análise', value: 'analise' },
  { label: 'Inteligência artificial', value: 'ia' }
]

const requestedInterest = route.query.interesse
if (typeof requestedInterest === 'string' && interests.some(item => item.value === requestedInterest)) {
  form.interest = requestedInterest as DemoRequestInput['interest']
}

async function submit() {
  requestError.value = ''
  errors.value = {}
  const parsed = demoRequestSchema.safeParse(form)
  if (!parsed.success) {
    errors.value = Object.fromEntries(parsed.error.issues.map(issue => [String(issue.path[0]), issue.message]))
    requestError.value = 'Revise os campos indicados antes de enviar.'
    return
  }

  pending.value = true
  try {
    const result = await $fetch<{ id: string }>('/api/demo-requests', {
      method: 'POST',
      body: parsed.data
    })
    receiptId.value = result.id
    await navigateTo('/demonstracao/recebida')
  } catch (error) {
    console.error('Demo request submission failed', error)
    requestError.value = 'Não foi possível enviar sua solicitação agora. Seus dados foram mantidos; tente novamente.'
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold text-highlighted">Solicite uma demonstração</h1>
      <p class="mt-2 text-sm text-muted">Conte um pouco sobre sua operação para a equipe entender como ajudar.</p>
    </div>

    <UAlert v-if="requestError" color="error" variant="subtle" :description="requestError" />

    <form class="space-y-4" novalidate @submit.prevent="submit">
      <UFormField label="Nome" name="name" required :error="errors.name">
        <UInput v-model="form.name" class="w-full" autocomplete="name" maxlength="120" required />
      </UFormField>
      <UFormField label="Empresa" name="company" required :error="errors.company">
        <UInput v-model="form.company" class="w-full" autocomplete="organization" maxlength="160" required />
      </UFormField>
      <UFormField label="E-mail" name="email" required :error="errors.email">
        <UInput v-model="form.email" class="w-full" type="email" autocomplete="email" maxlength="254" required />
      </UFormField>
      <UFormField label="Telefone (opcional)" name="phone" :error="errors.phone">
        <UInput v-model="form.phone" class="w-full" type="tel" autocomplete="tel" maxlength="32" />
      </UFormField>
      <UFormField label="Principal necessidade (opcional)" name="interest">
        <select v-model="form.interest" class="w-full rounded-md border border-default bg-default px-3 py-2 text-sm text-highlighted focus-visible:outline-2 focus-visible:outline-primary">
          <option v-for="interest in interests" :key="interest.value" :value="interest.value">{{ interest.label }}</option>
        </select>
      </UFormField>
      <UFormField label="Detalhes (opcional)" name="details" :error="errors.details">
        <UTextarea v-model="form.details" class="w-full" :rows="3" maxlength="2000" />
      </UFormField>

      <div class="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label for="demo-website">Website</label>
        <input id="demo-website" v-model="form.website" name="website" tabindex="-1" autocomplete="off">
      </div>

      <p class="text-xs text-muted">Usaremos seus dados para responder a esta solicitação. Não envie informações sensíveis.</p>
      <UButton type="submit" block :loading="pending" :disabled="pending || !form.name.trim() || !form.company.trim() || !form.email.trim()">
        Solicitar demonstração
      </UButton>
    </form>

    <NuxtLink to="/" class="block text-center text-sm text-primary hover:underline">Voltar ao início</NuxtLink>
  </div>
</template>
