import type { VisualChat } from '~/types/chat'

// Estado transitório da interface: não faz chamadas de rede ou persistência.
export function useVisualChats() {
  const chats = useState<VisualChat[]>('visual-chats', () => [])

  function createChat(text: string) {
    const content = text.trim()
    if (!content) return
    const id = crypto.randomUUID()
    chats.value.unshift({
      id,
      title: content.slice(0, 60),
      messages: [{ id: crypto.randomUUID(), role: 'user', parts: [{ type: 'text', text: content }] }]
    })
    return id
  }

  function addMessage(id: string, text: string) {
    const chat = chats.value.find(item => item.id === id)
    if (!chat || !text.trim()) return
    chat.messages.push({ id: crypto.randomUUID(), role: 'user', parts: [{ type: 'text', text: text.trim() }] })
  }

  function renameChat(id: string, title: string) {
    const chat = chats.value.find(item => item.id === id)
    if (chat && title.trim()) chat.title = title.trim()
  }

  function deleteChat(id: string) {
    chats.value = chats.value.filter(item => item.id !== id)
  }

  return { chats, createChat, addMessage, renameChat, deleteChat }
}
