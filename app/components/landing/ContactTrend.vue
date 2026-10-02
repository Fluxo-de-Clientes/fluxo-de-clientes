<script setup lang="ts">
import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { contactTrend, createTrendPath, demoContactTotal, demoPreviousTotal } from '~/utils/contactTrend'

const chartRoot = ref<HTMLElement | null>(null)
const currentLine = ref<SVGPathElement | null>(null)
const chartId = useId()
const gradientId = `contact-area-${chartId}`
const titleId = `contact-title-${chartId}`
const descriptionId = `contact-description-${chartId}`
const plot = { left: 6, right: 394, top: 14, bottom: 156 }
const valueY = (value: number) => Number((plot.bottom - value / 140 * (plot.bottom - plot.top)).toFixed(2))
const dayX = (day: number) => Number((plot.left + (day - 1) / 29 * (plot.right - plot.left)).toFixed(2))
const series = (key: 'current' | 'previous') => contactTrend.map(point => ({ x: dayX(point.day), y: valueY(point[key]) }))
const currentPath = createTrendPath(series('current'))
const previousPath = createTrendPath(series('previous'))
const areaPath = `${currentPath} L ${plot.right} ${plot.bottom} L ${plot.left} ${plot.bottom} Z`
const growth = Math.round((demoContactTotal / demoPreviousTotal - 1) * 100)
let motion: ReturnType<typeof gsap.matchMedia> | undefined

onMounted(() => {
  gsap.registerPlugin(DrawSVGPlugin)
  motion = gsap.matchMedia()
  motion.add('(prefers-reduced-motion: no-preference)', () => {
    if (!currentLine.value) return
    gsap.fromTo(currentLine.value, { drawSVG: '0%' }, {
      drawSVG: '100%', duration: 1.4, delay: 0.35, ease: 'power2.out'
    })
  }, chartRoot.value ?? undefined)
})

onBeforeUnmount(() => motion?.revert())
</script>

<template>
  <section ref="chartRoot" class="preview-trend" aria-label="Evolução demonstrativa dos contatos">
    <div class="preview-trend-heading">
      <div>
        <h3>Novos contatos</h3>
        <p>Acumulado no período</p>
      </div>
      <span class="preview-trend-growth"><UIcon name="i-lucide-trending-up" aria-hidden="true" /> +{{ growth }}%</span>
    </div>
    <div class="preview-trend-plot">
      <div class="preview-trend-y" aria-hidden="true">
        <span v-for="value in [0, 40, 80, 120]" :key="value" :style="{ top: `${valueY(value) / 166 * 100}%` }">{{ value }}</span>
      </div>
      <svg class="preview-trend-chart" viewBox="0 0 400 166" role="img" :aria-labelledby="`${titleId} ${descriptionId}`">
      <title :id="titleId">Contatos acumulados em abril — dados demonstrativos</title>
      <desc :id="descriptionId">O período começa com 3 contatos e termina com {{ demoContactTotal }}. O período anterior terminou com {{ demoPreviousTotal }}. Aumento de aproximadamente {{ growth }}%.</desc>
      <defs>
        <linearGradient :id="gradientId" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#f46b4d" stop-opacity="0.2" />
          <stop offset="100%" stop-color="#f46b4d" stop-opacity="0.015" />
        </linearGradient>
      </defs>
      <g aria-hidden="true">
        <g v-for="value in [0, 40, 80, 120]" :key="value">
          <line :x1="plot.left" :x2="plot.right" :y1="valueY(value)" :y2="valueY(value)" class="preview-grid-line" />
        </g>
        <path :d="areaPath" :fill="`url(#${gradientId})`" />
        <path :d="previousPath" class="preview-previous-line" />
        <path ref="currentLine" :d="currentPath" class="preview-current-line" />
        <circle :cx="plot.right" :cy="valueY(demoContactTotal)" r="4.5" fill="#f46b4d" stroke="#fff" stroke-width="2" />
      </g>
      </svg>
    </div>
    <div class="preview-trend-dates" aria-hidden="true">
      <span v-for="day in [1, 8, 15, 22, 30]" :key="day" :style="{ left: `${dayX(day) / 400 * 100}%` }">{{ day }} abr</span>
    </div>
    <div class="preview-trend-legend" aria-hidden="true">
      <span><i class="preview-legend-current" /> Abril <b>{{ demoContactTotal }}</b></span>
      <span><i class="preview-legend-previous" /> Período anterior <b>{{ demoPreviousTotal }}</b></span>
    </div>
  </section>
</template>

<style scoped>
.preview-trend { min-width: 0; padding: 18px 16px 16px; border: 1px solid var(--preview-border, #e2e6dc); border-radius: 14px; background: var(--preview-surface, #fff); }
.preview-trend-heading { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
.preview-trend h3 { margin: 0; color: var(--preview-ink, #24271f); font-size: 13px; font-weight: 700; line-height: 1.4; }
.preview-trend p { margin: 3px 0 0; color: #61675a; font-size: 11px; }
.preview-trend-growth { display: inline-flex; align-items: center; gap: 4px; padding: 4px 6px; border-radius: 6px; background: #eef3e9; color: #44623a; font-size: 11px; font-weight: 700; white-space: nowrap; }
.preview-trend-growth :deep(.iconify) { width: 13px; height: 13px; }
.preview-trend-plot { display: grid; grid-template-columns: 26px minmax(0, 1fr); margin-top: 15px; }
.preview-trend-y { position: relative; color: var(--preview-muted, #62685e); font-size: 12px; line-height: 1; }
.preview-trend-y span { position: absolute; right: 6px; transform: translateY(-50%); }
.preview-trend-chart { display: block; width: 100%; overflow: visible; }
.preview-trend-dates { position: relative; height: 22px; margin: 4px 0 4px 26px; color: var(--preview-muted, #62685e); font-size: 12px; line-height: 1.4; }
.preview-trend-dates span { position: absolute; white-space: nowrap; transform: translateX(-50%); }
.preview-trend-dates span:first-child { transform: none; }
.preview-trend-dates span:last-child { transform: translateX(-100%); }
.preview-grid-line { stroke: #e9ece5; stroke-width: 1; vector-effect: non-scaling-stroke; }
.preview-current-line, .preview-previous-line { fill: none; stroke-linecap: round; stroke-linejoin: round; vector-effect: non-scaling-stroke; }
.preview-current-line { stroke: var(--preview-coral, #f46b4d); stroke-width: 2.7; }
.preview-previous-line { stroke: #8a967d; stroke-width: 1.7; stroke-dasharray: 4 5; }
.preview-trend-legend { display: flex; flex-wrap: wrap; gap: 7px 13px; color: #5d6356; font-size: 11px; }
.preview-trend-legend span { display: inline-flex; align-items: center; gap: 5px; }
.preview-trend-legend b { color: #353b2e; font-weight: 600; font-variant-numeric: tabular-nums; }
.preview-trend-legend i { display: inline-block; width: 12px; height: 3px; border-radius: 2px; }
.preview-legend-current { background: #f46b4d; }
.preview-legend-previous { background: repeating-linear-gradient(90deg, #7f8b73 0 4px, transparent 4px 6px); }
@container dashboard (max-width: 560px) {
  .preview-trend { padding: 16px 14px; }
  .preview-trend p, .preview-trend-growth, .preview-trend-legend { font-size: 12px; }
  .preview-trend h3 { font-size: 14px; }
}
</style>
