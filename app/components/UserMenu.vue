<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

defineProps<{ collapsed?: boolean }>()
const colorMode = useColorMode()
const items = computed<DropdownMenuItem[]>(() => [
  { label: 'Aparência', type: 'label' },
  ...[
    { label: 'Claro', value: 'light', icon: 'i-lucide-sun' },
    { label: 'Escuro', value: 'dark', icon: 'i-lucide-moon' },
    { label: 'Sistema', value: 'system', icon: 'i-lucide-monitor' }
  ].map(item => ({
    label: item.label,
    icon: item.icon,
    type: 'checkbox' as const,
    checked: colorMode.preference === item.value,
    onSelect: () => { colorMode.preference = item.value }
  }))
])
</script>

<template>
  <UDropdownMenu :items="items" :content="{ align: 'end' }">
    <UButton :label="collapsed ? undefined : 'Aparência'" icon="i-lucide-palette" :square="collapsed" color="neutral" variant="ghost" block aria-label="Configurar aparência" />
  </UDropdownMenu>
</template>
