<script setup lang="ts">
import { steps } from '~/data/content'
</script>

<template>
  <section id="como-funciona" aria-labelledby="how-title" class="site-container section-space">
    <SectionTitle id="how-title">Como funciona</SectionTitle>
    <ol class="grid lg:grid-cols-3 gap-8 lg:gap-6 mt-8 p-0 list-none">
      <li v-for="(step, index) in steps" :key="step.title" class="od-row-top gap-4">
        <span class="flex items-center justify-center shrink-0 size-10 rounded-full bg-paper font-medium"
          >0{{ index + 1 }}</span
        >
        <span class="icon-disc size-12"><AppIcon :name="step.icon" :size="24" /></span>
        <div class="od-field od-fill">
          <h3 class="font-semibold text-lg leading-snug">{{ step.title }}</h3>
          <p class="text-muted mt-2 leading-normal">{{ step.description }}</p>
        </div>
        <AppIcon v-if="index < 2" name="arrow-right" class="hidden lg:block text-muted mt-3" :size="20" />
      </li>
    </ol>
  </section>
</template>
