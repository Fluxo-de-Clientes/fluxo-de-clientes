<script setup lang="ts">
const route = useRoute()
const { chats, addMessage } = useVisualChats()
const chat = computed(() => chats.value.find(item => item.id === route.params.id))
const input = ref('')
const messagesEnd = useTemplateRef('messagesEnd')

function submit() {
  if (!chat.value || !input.value.trim()) return
  addMessage(chat.value.id, input.value)
  input.value = ''
}
watch(() => chat.value?.messages.length, async () => {
  await nextTick()
  messagesEnd.value?.scrollIntoView({ block: 'end' })
})
</script>

<template>
  <UDashboardPanel id="chat" class="min-h-0" :ui="{ body: 'p-0 sm:p-0' }">
    <template #header>
      <Navbar><template #title><span class="truncate">{{ chat?.title || 'Conversa indisponível' }}</span></template></Navbar>
    </template>
    <template #body>
      <UContainer v-if="chat" class="flex min-h-full flex-col gap-6">
        <div class="flex-1 space-y-6 py-6" role="log" aria-label="Mensagens da conversa" aria-live="polite">
          <UChatMessage v-for="message in chat.messages" :key="message.id" v-bind="message" side="right" variant="soft" :ui="{ content: 'whitespace-pre-wrap break-words' }" />
          <div ref="messagesEnd" />
        </div>
        <div class="sticky bottom-0 space-y-2 bg-default pb-4">
          <ChatPrompt v-model="input" @submit="submit" />
        </div>
      </UContainer>
      <div v-else class="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 class="text-xl font-semibold text-highlighted">Conversa indisponível nesta sessão</h1>
        <p class="text-muted">As conversas são temporárias e são descartadas ao recarregar a página.</p>
        <UButton to="/" label="Iniciar nova conversa" icon="i-lucide-circle-plus" />
      </div>
    </template>
  </UDashboardPanel>
</template>
