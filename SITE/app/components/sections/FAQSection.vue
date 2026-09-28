<script setup lang="ts">
import { ref } from 'vue'
import { faqs } from '~/data/content'
const openIndex = ref<number | null>(null)
</script>

<template>
  <section id="perguntas" aria-labelledby="faq-title" class="site-container py-10 lg:py-12">
    <h2 id="faq-title" class="text-[28px] tracking-tight leading-tight font-bold">Perguntas frequentes</h2>
    <div class="od-stack gap-3 mt-6">
      <div
        v-for="(faq, index) in faqs"
        :key="faq.question"
        class="rounded-control border border-border bg-surface"
      >
        <h3>
          <button
            :id="`faq-trigger-${index}`"
            class="flex min-h-14 w-full items-center justify-between gap-4 px-6 py-4 text-left font-medium"
            :aria-expanded="openIndex === index"
            :aria-controls="`faq-answer-${index}`"
            @click="openIndex = openIndex === index ? null : index"
          >
            <span>{{ faq.question }}</span
            ><span class="text-2xl leading-none font-normal" aria-hidden="true">{{
              openIndex === index ? '−' : '+'
            }}</span>
          </button>
        </h3>
        <div
          v-show="openIndex === index"
          :id="`faq-answer-${index}`"
          role="region"
          :aria-labelledby="`faq-trigger-${index}`"
          class="px-6 pb-6"
        >
          <p class="text-muted max-w-[72ch]">{{ faq.answer }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
