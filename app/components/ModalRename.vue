<script setup lang="ts">
const props = defineProps<{ title: string }>()
const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ save: [title: string] }>()
const value = ref(props.title)
watch(() => [props.title, open.value], () => { value.value = props.title })
function submit() {
  if (!value.value.trim()) return
  emit('save', value.value.trim())
  open.value = false
}
</script>

<template>
  <UModal v-model:open="open" title="Renomear conversa" description="Escolha um título para esta conversa.">
    <template #body>
      <form id="rename-chat" @submit.prevent="submit">
        <UFormField label="Título"><UInput v-model="value" autofocus class="w-full" /></UFormField>
      </form>
    </template>
    <template #footer>
      <UButton label="Salvar" type="submit" form="rename-chat" :disabled="!value.trim()" />
      <UButton label="Cancelar" color="neutral" variant="ghost" @click="open = false" />
    </template>
  </UModal>
</template>
