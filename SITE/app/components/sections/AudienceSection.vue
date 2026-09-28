<script setup lang="ts">
import { audiences } from '~/data/content'
</script>

<template>
  <section id="solucoes" aria-labelledby="audience-title" class="site-container pt-10 lg:pt-12">
    <SectionTitle id="audience-title">Para quem precisa organizar o crescimento.</SectionTitle>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      <FeatureCard v-for="audience in audiences" :key="audience.title" :feature="audience" />
    </div>
  </section>
</template>
