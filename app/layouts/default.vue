<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const route = useRoute()
const isHome = computed(() => route.path === '/')
const { chats, renameChat, deleteChat } = useVisualChats()
const sidebarOpen = ref(false)
const searchOpen = ref(false)
const renameOpen = ref(false)
const deleteOpen = ref(false)
const selected = ref({ id: '', title: '' })
const chatItems = computed(() => chats.value.map(chat => ({
  id: chat.id, label: chat.title, to: `/chat/${chat.id}`, slot: 'chat' as const
})))
const groups = computed(() => [{ id: 'chats', label: 'Conversas desta sessão', items: chatItems.value }])

function actions(id: string): DropdownMenuItem[] {
  return [
    { label: 'Renomear', icon: 'i-lucide-pencil', onSelect: () => {
      const chat = chats.value.find(item => item.id === id)
      if (chat) { selected.value = { id, title: chat.title }; renameOpen.value = true }
    } },
    { label: 'Excluir', icon: 'i-lucide-trash', color: 'error', onSelect: () => {
      selected.value = { id, title: '' }; deleteOpen.value = true
    } }
  ]
}

function confirmDelete() {
  deleteChat(selected.value.id)
  if (route.params.id === selected.value.id) navigateTo('/')
}
watch(() => route.fullPath, () => { sidebarOpen.value = false; searchOpen.value = false })
defineShortcuts({ meta_o: () => navigateTo('/') })
</script>

<template>
  <div v-if="isHome" class="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-white">
    <slot />
  </div>

  <UDashboardGroup v-else unit="rem">
    <UDashboardSidebar id="default" v-model:open="sidebarOpen" :min-size="12" collapsible resizable :menu="{ inset: true }" class="border-r-0 py-4 dark:[--ui-bg-elevated:var(--ui-color-neutral-900)]">
      <template #header="{ collapsed }">
        <NuxtLink v-if="!collapsed" to="/" class="flex items-center gap-2 rounded-md focus-visible:outline-primary" aria-label="Fluxo de Clientes — início">
          <BrandLogo class="w-36" />
        </NuxtLink>
        <UDashboardSidebarCollapse class="ms-auto" />
      </template>
      <template #default="{ collapsed }">
        <UNavigationMenu
:collapsed="collapsed" orientation="vertical" :items="[
          { label: 'Nova conversa', to: '/', icon: 'i-lucide-circle-plus', kbds: ['meta', 'o'] },
          { label: 'Buscar', icon: 'i-lucide-search', kbds: ['meta', 'k'], onSelect: () => { searchOpen = true } }
        ]" />
        <template v-if="!collapsed">
          <p class="px-2 pt-4 text-xs text-muted">Conversas desta sessão</p>
          <UNavigationMenu :items="chatItems" orientation="vertical" :ui="{ link: 'pr-10', linkTrailing: 'absolute right-1' }">
            <template #chat-trailing="{ item }">
              <UDropdownMenu :items="actions(item.id)" :content="{ align: 'end' }">
                <UButton icon="i-lucide-ellipsis" color="neutral" variant="ghost" size="xs" aria-label="Ações da conversa" @click.stop.prevent />
              </UDropdownMenu>
            </template>
          </UNavigationMenu>
          <p v-if="!chats.length" class="px-2 py-3 text-sm text-muted">Suas conversas aparecerão aqui.</p>
        </template>
      </template>
      <template #footer="{ collapsed }"><UserMenu :collapsed="collapsed" /></template>
    </UDashboardSidebar>
    <UDashboardSearch v-model:open="searchOpen" placeholder="Buscar conversas..." :groups="groups" />
    <div class="m-2 flex min-w-0 flex-1 overflow-hidden rounded-lg bg-default/75 shadow-sm ring ring-default sm:m-4 lg:ml-0"><slot /></div>
    <ModalRename v-model:open="renameOpen" :title="selected.title" @save="renameChat(selected.id, $event)" />
    <ModalConfirm v-model:open="deleteOpen" @confirm="confirmDelete" />
  </UDashboardGroup>
</template>
