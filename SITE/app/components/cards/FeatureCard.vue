<script setup lang="ts">
import type { Feature } from '~/types/content'
defineProps<{ feature: Feature }>()
</script>

<template>
  <BaseCard class="feature-card od-row-top gap-4 transition-transform duration-200">
    <span class="icon-disc"><AppIcon :name="feature.icon" :size="30" /></span>
    <div class="od-field od-fill pt-1">
      <h3 class="font-semibold text-xl leading-tight">{{ feature.title }}</h3>
      <p class="text-muted mt-2 leading-normal">{{ feature.description }}</p>
    </div>
  </BaseCard>
</template>
