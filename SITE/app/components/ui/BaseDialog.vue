<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps<{ open: boolean; title: string; description?: string }>()
const emit = defineEmits<{ close: [] }>()
const dialog = ref<HTMLDialogElement>()
const titleId = useId()
const descriptionId = useId()
let previousFocus: HTMLElement | null = null
let previousOverflow = ''

function restorePage() {
  document.documentElement.style.overflow = previousOverflow
  previousFocus?.focus({ preventScroll: true })
}

watch(
  () => props.open,
  async (open) => {
    await nextTick()
    if (!dialog.value) return
    if (open && !dialog.value.open) {
      previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
      previousOverflow = document.documentElement.style.overflow
      dialog.value.showModal()
      document.documentElement.style.overflow = 'hidden'
    } else if (!open && dialog.value.open) {
      dialog.value.close()
      restorePage()
    }
  },
)

function backdrop(event: MouseEvent) {
  if (event.target !== dialog.value) return
  const box = dialog.value.getBoundingClientRect()
  if (
    event.clientX < box.left ||
    event.clientX > box.right ||
    event.clientY < box.top ||
    event.clientY > box.bottom
  )
    emit('close')
}

onBeforeUnmount(() => {
  if (dialog.value?.open) restorePage()
})
</script>

<template>
  <Teleport to="body">
    <dialog
      ref="dialog"
      class="app-dialog"
      :aria-labelledby="titleId"
      :aria-describedby="description ? descriptionId : undefined"
      @cancel.prevent="emit('close')"
      @click="backdrop"
    >
      <div class="od-row-top justify-between gap-6">
        <div class="od-field od-fill">
          <h2 :id="titleId" class="text-2xl font-bold">{{ title }}</h2>
          <p v-if="description" :id="descriptionId" class="mt-2 text-muted">{{ description }}</p>
        </div>
        <button class="icon-button od-fixed" aria-label="Fechar janela" autofocus @click="emit('close')">
          <AppIcon name="close" />
        </button>
      </div>
      <div class="mt-6"><slot /></div>
    </dialog>
  </Teleport>
</template>
