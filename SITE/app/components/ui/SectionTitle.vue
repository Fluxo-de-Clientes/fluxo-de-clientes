<script setup lang="ts">
defineProps<{ centered?: boolean }>()
</script>

<template>
  <h2 class="section-title" :class="{ 'text-center': centered }"><slot /></h2>
</template>
