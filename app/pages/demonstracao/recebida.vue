<script setup lang="ts">
definePageMeta({ layout: 'auth' })
useSeoMeta({ title: 'Solicitação recebida · Fluxo de Clientes' })

const receiptId = useState<string | null>('demo-request-receipt', () => null)
</script>

<template>
  <div v-if="receiptId" class="space-y-5 text-center">
    <UIcon name="i-lucide-circle-check" class="mx-auto size-12 text-success" aria-hidden="true" />
    <h1 class="text-2xl font-semibold text-highlighted">Recebemos sua solicitação</h1>
    <p class="text-sm text-muted">Nossa equipe vai entrar em contato pelo e-mail informado.</p>
    <UButton to="/" block>Voltar ao início</UButton>
  </div>
  <div v-else class="space-y-5 text-center">
    <h1 class="text-2xl font-semibold text-highlighted">Solicitação não encontrada</h1>
    <p class="text-sm text-muted">Esta confirmação fica disponível após o envio do formulário nesta sessão.</p>
    <UButton to="/demonstracao" block>Solicitar demonstração</UButton>
  </div>
</template>
