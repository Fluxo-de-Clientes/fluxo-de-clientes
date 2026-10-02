<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ confirm: [] }>()
</script>

<template>
  <UModal v-model:open="open" title="Excluir conversa" description="A conversa será removida desta sessão.">
    <template #footer>
      <UButton label="Excluir" color="error" @click="emit('confirm'); open = false" />
      <UButton label="Cancelar" color="neutral" variant="ghost" @click="open = false" />
    </template>
  </UModal>
</template>
