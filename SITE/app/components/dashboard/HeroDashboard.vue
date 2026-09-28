<script setup lang="ts">
import { computed, ref } from 'vue'

const period = ref('30')
const periodLabel = computed(() => (period.value === '30' ? 'Últimos 30 dias' : 'Últimos 7 dias'))
const metrics = computed(() => (period.value === '30' ? [128, 32, 18] : [34, 12, 7]))
const chartId = useId()
const data = computed(() =>
  period.value === '30'
    ? 'M20 126 L34 120 L46 108 L57 113 L70 96 L81 103 L93 109 L106 94 L118 80 L130 75 L142 85 L154 96 L167 99 L180 83 L192 65 L204 69 L216 43 L228 52 L240 47 L252 53 L264 30 L276 36 L288 22 L300 27'
    : 'M20 125 L66 114 L113 119 L160 88 L207 64 L254 71 L300 34',
)
</script>

<template>
  <div class="dashboard-frame" aria-label="Visão geral ilustrativa da plataforma">
    <div class="dashboard-shell">
      <nav class="dashboard-sidebar" aria-label="Explorar os exemplos da plataforma" data-dark>
        <BrandLogo symbol class="mb-6" />
        <a href="#plataforma" aria-label="Visão geral" class="bg-white/15"
          ><AppIcon name="home" :size="20"
        /></a>
        <a href="#funil" aria-label="Conversas no funil"><AppIcon name="messages" :size="20" /></a>
        <a href="#solucoes" aria-label="Soluções para equipes"><AppIcon name="users" :size="20" /></a>
        <a href="#como-funciona" aria-label="Acompanhamento de resultados"
          ><AppIcon name="chart" :size="20"
        /></a>
        <a href="#inteligencia" aria-label="IA e automações"><AppIcon name="settings" :size="20" /></a>
      </nav>
      <div class="dashboard-main">
        <div class="od-cluster justify-between gap-3 mb-4">
          <h2 class="font-semibold text-lg tracking-tight">Visão geral</h2>
          <div class="od-cluster gap-2">
            <label class="sr-only" for="dashboard-period">Período do exemplo</label>
            <select id="dashboard-period" v-model="period" class="dashboard-select">
              <option value="30">Últimos 30 dias</option>
              <option value="7">Últimos 7 dias</option>
            </select>
            <span class="demo-badge">Dados demonstrativos</span>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-2 lg:gap-3" aria-live="polite" aria-atomic="true">
          <div v-for="(metric, index) in metrics" :key="index" class="dashboard-stat od-stat">
            <span class="text-xs sm:text-sm text-muted">{{
              ['Novos contatos', 'Em atendimento', 'Qualificados'][index]
            }}</span>
            <strong class="dashboard-stat-value od-nowrap">{{ metric }}</strong>
            <span class="text-xs text-muted">{{ periodLabel }}</span>
            <AppIcon
              :name="index === 0 ? 'user' : index === 1 ? 'messages' : 'chart'"
              :size="20"
              class="dashboard-stat-icon"
            />
          </div>
        </div>
        <div class="dashboard-detail">
          <div class="dashboard-card">
            <h3 class="font-semibold text-sm">Contatos ao longo do tempo</h3>
            <svg viewBox="0 0 320 184" class="block w-full mt-5" role="img" :aria-labelledby="chartId">
              <title :id="chartId">
                Evolução ilustrativa de contatos: {{ periodLabel.toLowerCase() }}. Valores demonstrativos, sem
                representar resultados reais.
              </title>
              <g stroke="#eee8df" stroke-width="1">
                <path d="M20 24H306 M20 62H306 M20 100H306 M20 138H306" />
                <path d="M20 24V138 M90 24V138 M160 24V138 M230 24V138 M306 24V138" />
              </g>
              <g fill="#5f584f" font-size="10" font-family="Barlow,sans-serif">
                <text x="0" y="28">120</text>
                <text x="4" y="66">80</text>
                <text x="4" y="104">40</text>
                <text x="10" y="142">0</text>
                <text x="20" y="164">{{ period === '30' ? '1 abr' : '24 abr' }}</text>
                <text x="142" y="164">{{ period === '30' ? '15 abr' : '27 abr' }}</text>
                <text x="274" y="164">30 abr</text>
              </g>
              <path :d="`${data} L300 138 L20 138 Z`" fill="#f0440b" fill-opacity=".12" />
              <path
                d="M20 136 L44 131 L69 135 L92 127 L115 131 L139 121 L161 125 L185 113 L207 118 L231 108 L252 116 L277 107 L300 110"
                fill="none"
                stroke="#978b7d"
                stroke-width="2"
              />
              <path
                :d="data"
                fill="none"
                stroke="#f0440b"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div class="od-cluster gap-4 text-xs text-muted">
              <span class="flex items-center gap-2"
                ><span class="block size-2 rounded-full bg-brand" />Este período</span
              ><span class="flex items-center gap-2"
                ><span class="block size-2 rounded-full bg-border" />Período anterior</span
              >
            </div>
          </div>
          <div class="od-stack gap-3">
            <div class="dashboard-card od-fill">
              <h3 class="font-semibold text-sm mb-4">Funil de clientes</h3>
              <div class="grid grid-cols-[1fr_1fr] items-center gap-3">
                <div class="od-stack text-xs gap-5 text-muted">
                  <span>Contatos</span><span>Qualificados</span><span>Propostas</span>
                </div>
                <div class="od-stack gap-2" aria-hidden="true">
                  <span class="funnel-step" /><span class="funnel-step" /><span class="funnel-step" />
                </div>
              </div>
            </div>
            <a href="#inteligencia" class="dashboard-card od-row gap-3 nav-link">
              <BrandLogo symbol class="shrink-0" />
              <div class="od-field od-fill">
                <strong class="text-xs font-semibold">Próxima ação</strong
                ><span class="text-xs text-muted">Revisar conversas sem retorno</span>
              </div>
              <AppIcon name="arrow-right" :size="16" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
