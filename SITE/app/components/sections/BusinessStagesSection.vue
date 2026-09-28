<script setup lang="ts">
import { features } from '~/data/content'
</script>

<template>
  <section
    id="recursos"
    aria-labelledby="capabilities-title"
    class="bg-surface/60 rounded-t-panel py-10 lg:py-12"
  >
    <div class="site-container">
      <SectionTitle id="capabilities-title" centered
        >Cada etapa do negócio, no <span class="text-brand">mesmo fluxo.</span></SectionTitle
      >
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <FeatureCard v-for="feature in features" :key="feature.title" :feature="feature" />
      </div>
    </div>
  </section>
</template>
