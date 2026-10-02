<script setup lang="ts">
import { demoContactTotal, demoPipeline } from '~/utils/contactTrend'

const emit = defineEmits<{ 'open-demo': [message: string] }>()
const metrics = [
  { label: 'Novos contatos', value: String(demoContactTotal), detail: 'no período', icon: 'i-lucide-users-round', tone: 'coral' },
  { label: 'Em atendimento', value: String(demoPipeline[1].value), detail: 'com a equipe', icon: 'i-lucide-messages-square', tone: 'sage' },
  { label: 'Qualificados', value: String(demoPipeline[2].value), detail: 'próximo passo', icon: 'i-lucide-user-check', tone: 'sage' },
  { label: 'Conversão', value: `${(demoPipeline[3].value / demoContactTotal * 100).toFixed(1).replace('.', ',')}%`, detail: 'em propostas', icon: 'i-lucide-trending-up', tone: 'sage' }
]
const activity = [
  { icon: 'i-lucide-instagram', title: 'Contato chegou via Instagram', detail: 'Novo contato', time: 'há 2 min', tone: 'coral' },
  { icon: 'i-lucide-sparkles', title: 'IA sinalizou conversa sem resposta', detail: 'Revisão da equipe', time: 'há 8 min', tone: 'sage' },
  { icon: 'i-lucide-check', title: 'Lead avançou para proposta', detail: 'Funil atualizado', time: 'há 12 min', tone: 'sage' }
]
</script>

<template>
  <div class="preview-container">
    <section class="preview-dashboard" aria-label="Prévia demonstrativa do painel Fluxo de Clientes">
      <div class="preview-rail" aria-hidden="true">
        <span class="preview-rail-brand"><UIcon name="i-lucide-waypoints" /></span>
        <span class="preview-rail-active"><UIcon name="i-lucide-layout-dashboard" /></span>
        <span><UIcon name="i-lucide-messages-square" /></span>
        <span><UIcon name="i-lucide-users-round" /></span>
        <span><UIcon name="i-lucide-chart-no-axes-combined" /></span>
        <span class="preview-rail-settings"><UIcon name="i-lucide-settings-2" /></span>
        <span class="preview-rail-avatar">FC</span>
      </div>

      <div class="preview-workspace">
        <header class="preview-topbar">
          <span class="preview-workspace-name"><i /> Seu espaço de trabalho</span>
          <span class="preview-demo-label">Dados demonstrativos</span>
        </header>

        <div class="preview-main">
          <div class="preview-heading">
            <div><p>PAINEL DA OPERAÇÃO</p><h2>Visão geral</h2></div>
            <span class="preview-period"><UIcon name="i-lucide-calendar-days" aria-hidden="true" /> 1–30 abr</span>
          </div>

          <div class="preview-metrics">
            <article v-for="metric in metrics" :key="metric.label" class="preview-metric" :class="`preview-metric-${metric.tone}`">
              <div class="preview-metric-label"><span>{{ metric.label }}</span><UIcon :name="metric.icon" aria-hidden="true" /></div>
              <strong>{{ metric.value }}</strong>
              <p>{{ metric.detail }}</p>
            </article>
          </div>

          <div class="preview-analysis">
            <LandingContactTrend />
            <section class="preview-funnel" aria-label="Funil demonstrativo de conversão em propostas">
              <h3>Avanço no funil</h3>
              <p>Contatos que chegaram à etapa</p>
              <ol>
                <li v-for="stage in demoPipeline" :key="stage.label">
                  <div><span>{{ stage.label }}</span><strong>{{ stage.value }}</strong></div>
                  <span class="preview-funnel-track" aria-hidden="true"><i :class="`preview-bar-${stage.tone}`" :style="{ width: `${stage.value / demoContactTotal * 100}%` }" /></span>
                </li>
              </ol>
              <span class="preview-funnel-note"><UIcon name="i-lucide-arrow-up-right" aria-hidden="true" /> 12 propostas em 128 contatos</span>
            </section>
          </div>

          <section class="preview-activity" aria-label="Atividades demonstrativas recentes">
            <div class="preview-activity-heading"><h3>Atividade recente</h3><span>No seu fluxo</span></div>
            <ol>
              <li v-for="event in activity" :key="event.title">
                <span class="preview-event-icon" :class="`preview-event-${event.tone}`"><UIcon :name="event.icon" aria-hidden="true" /></span>
                <div class="preview-event-copy"><strong>{{ event.title }}</strong><span>{{ event.detail }}</span></div>
                <span class="preview-event-time">{{ event.time }}</span>
              </li>
            </ol>
          </section>

          <button class="preview-action" type="button" @click="emit('open-demo', 'Revisar conversas sem retorno')">
            <span class="preview-action-icon"><UIcon name="i-lucide-sparkles" aria-hidden="true" /></span>
            <span><strong>Um próximo passo mais claro.</strong><small>Revisar conversas sem retorno</small></span>
            <UIcon class="preview-action-arrow" name="i-lucide-arrow-right" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
    <p class="preview-caption"><UIcon name="i-lucide-info" aria-hidden="true" /> Prévia ilustrativa. Explore o atendimento na demonstração.</p>
  </div>
</template>

<style scoped>
.preview-container { container: dashboard / inline-size; width: 100%; min-width: 0; color: var(--preview-ink, #24271f); }
.preview-dashboard, .preview-dashboard * { box-sizing: border-box; }
.preview-dashboard { display: grid; grid-template-columns: 48px minmax(0, 1fr); overflow: hidden; border: 1px solid #dce1d5; border-radius: 20px; background: var(--preview-subtle, #f6f7f3); box-shadow: var(--preview-shadow, 0 24px 55px -28px rgb(35 45 26 / 29%), 0 4px 12px rgb(35 45 26 / 4%)); }
.preview-rail { display: flex; flex-direction: column; align-items: center; gap: 13px; padding: 16px 7px 14px; border-right: 1px solid #e1e5dc; background: var(--preview-sage, #eef1e9); color: #66715a; }
.preview-rail > span { display: grid; width: 32px; height: 32px; place-items: center; border-radius: 9px; }
.preview-rail :deep(.iconify) { width: 17px; height: 17px; }
.preview-rail .preview-rail-brand { margin-bottom: 13px; background: #242d20; color: #f9957d; }
.preview-rail .preview-rail-active { background: #fff; color: #ae3e27; box-shadow: 0 1px 4px rgb(34 46 25 / 8%); }
.preview-rail .preview-rail-settings { margin-top: auto; }
.preview-rail .preview-rail-avatar { width: 27px; height: 27px; border: 1px solid #d2d9c9; border-radius: 50%; background: #fff; color: #46553b; font-size: 10px; font-weight: 700; }
.preview-workspace { min-width: 0; }
.preview-topbar { display: flex; align-items: center; justify-content: space-between; gap: 8px; min-height: 46px; padding: 10px 18px; border-bottom: 1px solid #e5e8e0; background: rgb(255 255 255 / 75%); }
.preview-workspace-name { display: inline-flex; align-items: center; gap: 7px; color: #505c47; font-size: 11px; font-weight: 600; }
.preview-workspace-name i { width: 6px; height: 6px; border-radius: 50%; background: #74905e; }
.preview-demo-label { padding: 4px 7px; border: 1px solid #eadbd2; border-radius: 5px; background: #fff5ef; color: #93402b; font-size: 11px; line-height: 1.3; white-space: nowrap; }
.preview-main { padding: 18px; }
.preview-heading { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 17px; }
.preview-heading p { margin: 0 0 4px; color: #626e57; font-size: 11px; font-weight: 700; letter-spacing: .08em; }
.preview-heading h2 { margin: 0; color: #24271f; font-size: 23px; font-weight: 750; letter-spacing: -.035em; line-height: 1.2; }
.preview-period { display: inline-flex; align-items: center; gap: 6px; padding: 7px 9px; border: 1px solid #e1e5dc; border-radius: 7px; background: #fff; color: #555f4c; font-size: 11px; white-space: nowrap; }
.preview-period :deep(.iconify) { width: 13px; height: 13px; }
.preview-metrics { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 9px; margin-bottom: 12px; }
.preview-metric { padding: 12px 11px 10px; border: 1px solid #e2e7da; border-radius: 11px; background: #fff; }
.preview-metric-coral { border-color: #f3c7ba; background: linear-gradient(145deg, #fff8f2, #fff); }
.preview-metric-label { display: flex; align-items: flex-start; justify-content: space-between; gap: 5px; min-height: 29px; color: #596250; font-size: 11px; line-height: 1.3; }
.preview-metric-label :deep(.iconify) { width: 14px; height: 14px; flex: 0 0 14px; color: #70805f; }
.preview-metric-coral .preview-metric-label :deep(.iconify) { color: #b64b31; }
.preview-metric > strong { display: block; margin-top: 5px; color: #24271f; font-size: 27px; font-weight: 650; letter-spacing: -.045em; line-height: 1.15; font-variant-numeric: tabular-nums; }
.preview-metric > p { margin: 5px 0 0; color: #626b59; font-size: 11px; }
.preview-analysis { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(180px, 1fr); gap: 12px; }
.preview-funnel { min-width: 0; padding: 18px 14px 14px; border: 1px solid #e7e9e2; border-radius: 14px; background: #fff; }
.preview-funnel h3, .preview-activity h3 { margin: 0; color: #24271f; font-size: 13px; font-weight: 700; line-height: 1.4; }
.preview-funnel > p { margin: 3px 0 15px; color: #61675a; font-size: 11px; line-height: 1.4; }
.preview-funnel ol { display: grid; gap: 12px; margin: 0; padding: 0; list-style: none; }
.preview-funnel li > div { display: flex; align-items: center; justify-content: space-between; gap: 9px; margin-bottom: 5px; color: #565f4c; font-size: 11px; }
.preview-funnel li strong { color: #303a27; font-size: 12px; font-weight: 650; font-variant-numeric: tabular-nums; }
.preview-funnel-track { display: block; height: 5px; overflow: hidden; border-radius: 4px; background: #f0f2ec; }
.preview-funnel-track i { display: block; height: 100%; border-radius: inherit; }
.preview-bar-coral { background: var(--preview-coral, #f46b4d); }.preview-bar-olive { background: #9caa87; }.preview-bar-sage { background: #7f936a; }.preview-bar-green { background: #526b40; }
.preview-funnel-note { display: flex; align-items: center; gap: 4px; margin-top: 15px; color: #5a684c; font-size: 11px; line-height: 1.4; }
.preview-funnel-note :deep(.iconify) { width: 13px; height: 13px; flex: 0 0 13px; }
.preview-activity { margin-top: 12px; padding: 15px 16px 5px; border: 1px solid #e7e9e2; border-radius: 14px; background: #fff; }
.preview-activity-heading { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 7px; }
.preview-activity-heading > span { color: #67725d; font-size: 11px; }
.preview-activity ol { margin: 0; padding: 0; list-style: none; }
.preview-activity li { display: flex; align-items: center; gap: 9px; padding: 9px 0; }
.preview-activity li + li { border-top: 1px solid #edf0e8; }
.preview-event-icon { width: 28px; height: 28px; flex: 0 0 28px; display: grid; place-items: center; border-radius: 8px; background: #f0f3eb; color: #63744e; }
.preview-event-coral { background: #fff0e8; color: #b64b31; }
.preview-event-icon :deep(.iconify) { width: 14px; height: 14px; }
.preview-event-copy { min-width: 0; flex: 1; }
.preview-event-copy strong { display: block; color: #434c39; font-size: 11px; font-weight: 600; line-height: 1.4; }
.preview-event-copy > span { display: block; margin-top: 1px; color: #626c58; font-size: 11px; line-height: 1.4; }
.preview-event-time { flex: 0 0 auto; color: #67715d; font-size: 11px; white-space: nowrap; }
.preview-action { width: 100%; display: flex; align-items: center; gap: 10px; margin-top: 12px; padding: 12px 13px; border: 1px solid #dce3d3; border-radius: 11px; background: #eef1e9; color: #323f28; font: inherit; text-align: left; cursor: pointer; transition: background .18s ease, border-color .18s ease; }
.preview-action:hover { border-color: #a9b59b; background: #e4ebdc; }
.preview-action:focus-visible { outline: 3px solid #b5482d; outline-offset: 3px; }
.preview-action-icon { display: grid; width: 29px; height: 29px; flex: 0 0 29px; place-items: center; border: 1px solid #d9e2ce; border-radius: 8px; background: #fff; color: #64794f; }
.preview-action-icon :deep(.iconify) { width: 16px; height: 16px; }
.preview-action > span:nth-child(2) { min-width: 0; flex: 1; }
.preview-action strong { display: block; font-size: 12px; font-weight: 650; }
.preview-action small { display: block; margin-top: 2px; color: #59664f; font-size: 11px; }
.preview-action-arrow { width: 16px; height: 16px; flex: 0 0 16px; }
.preview-caption { display: flex; align-items: flex-start; justify-content: center; gap: 6px; margin: 12px 5px 0; color: #647159; font-size: 11px; line-height: 1.5; }
.preview-caption :deep(.iconify) { width: 13px; height: 13px; margin-top: 2px; flex: 0 0 13px; }
@container dashboard (max-width: 650px) {
  .preview-metrics { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .preview-metric-label { min-height: 0; }
  .preview-metric > strong { margin-top: 9px; }
  .preview-analysis { grid-template-columns: minmax(0, 1fr); }
  .preview-funnel ol { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px 22px; }
  .preview-funnel-note { margin-top: 13px; }
}
@container dashboard (max-width: 560px) {
  .preview-dashboard { grid-template-columns: 1fr; border-radius: 15px; }
  .preview-rail { display: none; }
  .preview-topbar { padding: 12px 14px; flex-wrap: wrap; }
  .preview-main { padding: 16px 14px; }
  .preview-workspace-name, .preview-demo-label, .preview-period, .preview-metric-label, .preview-metric > p, .preview-funnel > p, .preview-funnel li > div, .preview-funnel-note, .preview-event-copy strong, .preview-event-copy > span, .preview-event-time, .preview-activity-heading > span, .preview-action small, .preview-caption { font-size: 12px; }
  .preview-heading p { font-size: 12px; }
  .preview-metric { padding: 14px 12px; }
  .preview-metric-label { gap: 8px; }
  .preview-metric > strong { font-size: 29px; }
  .preview-funnel h3, .preview-activity h3 { font-size: 14px; }
  .preview-activity { padding: 15px 13px 6px; }
  .preview-activity li { align-items: flex-start; flex-wrap: wrap; gap: 5px 9px; padding: 11px 0; }
  .preview-event-time { width: calc(100% - 37px); margin-left: 37px; }
  .preview-action strong { font-size: 13px; }
}
@container dashboard (max-width: 360px) {
  .preview-heading { align-items: flex-start; }
  .preview-heading h2 { font-size: 22px; }
  .preview-period { padding: 6px; }
  .preview-period :deep(.iconify) { display: none; }
  .preview-metric-label :deep(.iconify) { display: none; }
  .preview-funnel ol { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) { .preview-action { transition: none; } }
</style>
