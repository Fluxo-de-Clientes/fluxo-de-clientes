<script setup lang="ts">
import { ref } from 'vue'
const board = ref<{ explore: () => void }>()
</script>

<template>
  <section id="funil" aria-labelledby="funnel-title" class="section-space bg-paper rounded-t-panel">
    <div class="site-container grid gap-10 lg:gap-12 lg:grid-cols-[1.3fr_.7fr] items-center">
      <FunnelBoard ref="board" />
      <div>
        <SectionTitle id="funnel-title">Entenda onde as conversas param.</SectionTitle>
        <p class="section-copy mt-5">Acompanhe o caminho entre o primeiro contato e o próximo passo.</p>
        <ul class="od-stack gap-4 list-none p-0 mt-8">
          <li
            v-for="item in ['Origem do contato', 'Etapa e responsável', 'Histórico da conversa']"
            :key="item"
            class="od-row gap-4"
          >
            <span class="flex size-8 shrink-0 rounded-full bg-brand items-center justify-center"
              ><AppIcon name="check" :size="18" /></span
            ><span>{{ item }}</span>
          </li>
        </ul>
        <BaseButton variant="text" arrow class="mt-6" @click="board?.explore()">Conhecer o funil</BaseButton>
      </div>
    </div>
  </section>
</template>
