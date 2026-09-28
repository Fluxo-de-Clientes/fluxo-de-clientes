<script setup lang="ts">
import { ref } from 'vue'
const { openDemo } = useDemo()
const config = useRuntimeConfig()
const noticeTitle = ref('')
const year = new Date().getFullYear()
const items = computed(() => [
  { label: 'Contato', url: String(config.public.contactUrl || '') },
  { label: 'Privacidade', url: String(config.public.privacyUrl || '') },
  { label: 'Termos', url: String(config.public.termsUrl || '') },
])
</script>

<template>
  <footer class="site-container py-8 lg:py-10">
    <div class="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
      <div>
        <a href="#inicio" aria-label="Fluxo de Clientes, início" class="inline-block"><BrandLogo /></a>
        <p class="text-muted text-sm mt-2">Marketing, atendimento e dados conectados.</p>
      </div>
      <nav aria-label="Navegação do rodapé" class="od-cluster gap-x-6 gap-y-2 text-sm">
        <a href="#plataforma" class="footer-link flex min-h-11 items-center">Plataforma</a>
        <button class="footer-link min-h-11" @click="openDemo">Demonstração</button>
        <template v-for="item in items" :key="item.label"
          ><a v-if="item.url" :href="item.url" class="footer-link flex min-h-11 items-center">{{
            item.label
          }}</a
          ><button v-else class="footer-link min-h-11" @click="noticeTitle = item.label">
            {{ item.label }}
          </button></template
        >
      </nav>
      <p class="text-muted text-xs">© {{ year }} FLUXO DE CLIENTES</p>
    </div>
    <BaseDialog :open="Boolean(noticeTitle)" :title="noticeTitle" @close="noticeTitle = ''"
      ><p class="text-muted">
        {{
          noticeTitle === 'Contato'
            ? 'O canal de contato ainda não está disponível nesta página. Volte em breve para conversar com a equipe.'
            : 'Este documento ainda não foi disponibilizado nesta página. Volte em breve para consultar a versão oficial.'
        }}
      </p>
      <BaseButton variant="secondary" class="mt-6" @click="noticeTitle = ''"
        >Voltar à página</BaseButton
      ></BaseDialog
    >
  </footer>
</template>
