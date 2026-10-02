<script setup lang="ts">
const input = defineModel<string>({ default: '' })
defineProps<{ disabled?: boolean }>()
const emit = defineEmits<{ submit: [] }>()
</script>

<template>
  <UChatPrompt v-model="input" :disabled="disabled" placeholder="Escreva uma mensagem..." aria-label="Mensagem" color="neutral" variant="subtle" @submit="emit('submit')">
    <template #footer>
      <span class="text-xs text-muted">Enter para enviar · Shift + Enter para nova linha</span>
      <UButton type="submit" icon="i-lucide-arrow-up" :disabled="disabled || !input.trim()" color="neutral" size="sm" aria-label="Enviar mensagem" />
    </template>
  </UChatPrompt>
</template>
