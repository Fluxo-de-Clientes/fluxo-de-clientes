<script setup lang="ts">
withDefaults(
  defineProps<{
    href?: string
    variant?: 'primary' | 'secondary' | 'light' | 'text'
    arrow?: boolean
    type?: 'button' | 'submit'
    disabled?: boolean
  }>(),
  { href: undefined, variant: 'primary', type: 'button' },
)
</script>

<template>
  <a v-if="href" :href="href" class="button" :class="`button--${variant}`">
    <span><slot /></span><AppIcon v-if="arrow" name="arrow-right" :size="18" />
  </a>
  <button v-else :type="type" :disabled="disabled" class="button" :class="`button--${variant}`">
    <span><slot /></span><AppIcon v-if="arrow" name="arrow-right" :size="18" />
  </button>
</template>
