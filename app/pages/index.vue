<script setup lang="ts">
const input = ref('')
const { createChat } = useVisualChats()
const suggestions = [
  { label: 'Organizar o fluxo de clientes', icon: 'i-lucide-workflow' },
  { label: 'Planejar um acompanhamento', icon: 'i-lucide-calendar' },
  { label: 'Revisar uma conversa', icon: 'i-lucide-message-circle' }
]
function submit(text = input.value) {
  const id = createChat(text)
  if (id) { input.value = ''; navigateTo(`/chat/${id}`) }
}
</script>

<template>
  <UDashboardPanel id="home" class="min-h-0" :ui="{ body: 'p-0 sm:p-0' }">
    <template #header><Navbar /></template>
    <template #body>
      <UContainer class="flex flex-1 flex-col justify-center gap-4 py-8 sm:gap-6">
        <h1 class="text-3xl font-bold text-highlighted sm:text-4xl">Como podemos organizar seu atendimento?</h1>
        <p class="text-muted">Inicie uma conversa para visualizar o fluxo de mensagens.</p>
        <ChatPrompt v-model="input" @submit="submit()" />
        <div class="flex flex-wrap gap-2">
          <UButton v-for="item in suggestions" :key="item.label" v-bind="item" size="sm" color="neutral" variant="outline" class="rounded-full" @click="submit(item.label)" />
        </div>
        <p class="text-xs text-muted">Demonstração visual: mensagens disponíveis apenas nesta sessão, sem respostas automáticas.</p>
      </UContainer>
    </template>
  </UDashboardPanel>
</template>
