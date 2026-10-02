<script setup lang="ts">
import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin)

const { createChat } = useVisualChats()

const solutions = [
  { title: 'Marketing', text: 'Veja a origem dos contatos.', icon: 'i-lucide-megaphone' },
  { title: 'Funil de clientes', text: 'Acompanhe cada etapa.', icon: 'i-lucide-filter' },
  { title: 'Atendimento', text: 'Organize conversas e responsáveis.', icon: 'i-lucide-message-circle' },
  { title: 'IA para negócios', text: 'Encontre pontos de atenção.', icon: 'i-lucide-sparkles' },
  { title: 'Automações', text: 'Agilize tarefas recorrentes.', icon: 'i-lucide-settings-2' },
  { title: 'Análise e decisão', text: 'Use os dados para escolher o próximo passo.', icon: 'i-lucide-chart-no-axes-column-increasing' }
]

const stages = [
  { number: '01', title: 'Conecte seus canais', text: 'Integre os seus canais de comunicação em um só lugar.', icon: 'i-lucide-link-2' },
  { number: '02', title: 'Organize a operação', text: 'Defina etapas, responsáveis e regras do seu processo.', icon: 'i-lucide-list-checks' },
  { number: '03', title: 'Acompanhe e ajuste', text: 'Use os dados para identificar o que pode melhorar.', icon: 'i-lucide-chart-no-axes-column-increasing' }
]

const audiences = [
  { title: 'Negócios locais', text: 'Centralize o atendimento e acompanhe seus clientes do dia a dia.', icon: 'i-lucide-store' },
  { title: 'Agências e consultores', text: 'Gerencie múltiplos clientes e campanhas em um só ambiente.', icon: 'i-lucide-users-round' },
  { title: 'Equipes comerciais', text: 'Dê visibilidade ao funil e mantenha o time alinhado com os próximos passos.', icon: 'i-lucide-chart-no-axes-column-increasing' }
]

const faqs = [
  { question: 'Como a plataforma ajuda no atendimento?', answer: 'Reúne conversas, responsáveis e etapas para que a equipe acompanhe cada contato com contexto.' },
  { question: 'A IA pode apoiar a minha equipe?', answer: 'A IA ajuda a resumir conversas e sinalizar pontos de atenção. A equipe mantém o controle das decisões.' },
  { question: 'Como conhecer os recursos disponíveis?', answer: 'Explore a demonstração local desta aplicação para conhecer o fluxo de conversas e atendimento.' }
]

const chartTrace = `M 2.5 115.7 L 5.0 114.2 L 7.5 112.7 L 9.9 112.7 L 12.4 112.7 L 14.9 111.2 L 17.4 111.2 L 19.9 111.2 L 22.4 109.8 L 24.9 108.3 L 27.3 106.8 L 29.8 105.3 L 32.3 103.8 L 34.8 102.4 L 37.3 100.9 L 39.8 97.9 L 42.3 97.9 L 47.2 97.9 L 49.7 97.9 L 52.2 99.4 L 54.7 100.9 L 57.2 102.4 L 59.7 102.4 L 62.1 102.4 L 64.6 102.4 L 67.1 100.9 L 69.6 99.4 L 72.1 97.9 L 74.6 95.0 L 77.1 93.5 L 79.5 90.5 L 82.0 89.0 L 84.5 86.1 L 87.0 86.1 L 89.5 84.6 L 92.0 86.1 L 94.5 86.1 L 96.9 87.6 L 99.4 89.0 L 101.9 90.5 L 104.4 92.0 L 106.9 93.5 L 109.4 95.0 L 111.8 96.4 L 114.3 96.4 L 116.8 97.9 L 119.3 97.9 L 121.8 96.4 L 124.3 96.4 L 126.8 95.0 L 129.2 93.5 L 131.7 90.5 L 134.2 89.0 L 136.7 86.1 L 139.2 84.6 L 141.7 83.1 L 144.2 81.6 L 146.6 80.2 L 149.1 78.7 L 151.6 77.2 L 154.1 74.2 L 156.6 72.8 L 159.1 71.3 L 161.6 69.8 L 164.0 68.3 L 166.5 66.8 L 169.0 65.4 L 171.5 65.4 L 174.0 65.4 L 176.5 65.4 L 179.0 65.4 L 181.4 66.8 L 183.9 66.8 L 186.4 68.3 L 188.9 71.3 L 191.4 72.8 L 193.9 74.2 L 196.4 75.7 L 198.8 78.7 L 201.3 80.2 L 203.8 81.6 L 206.3 83.1 L 208.8 84.6 L 211.3 84.6 L 213.8 84.6 L 216.2 84.6 L 218.7 84.6 L 221.2 83.1 L 223.7 83.1 L 226.2 81.6 L 228.7 78.7 L 231.2 77.2 L 233.6 75.7 L 236.1 72.8 L 238.6 71.3 L 241.1 68.3 L 243.6 66.8 L 246.1 65.4 L 248.6 62.4 L 251.0 60.9 L 253.5 59.4 L 256.0 58.0 L 258.5 56.5 L 261.0 55.0 L 263.5 55.0 L 266.0 56.5 L 268.4 56.5 L 270.9 56.5 L 273.4 56.5 L 275.9 56.5 L 278.4 55.0 L 280.9 53.5 L 283.4 50.6 L 285.8 49.1 L 288.3 46.1 L 290.8 43.2 L 293.3 40.2 L 295.8 38.7 L 298.3 35.8 L 300.8 34.3 L 303.2 34.3 L 305.7 34.3 L 308.2 35.8 L 310.7 37.2 L 313.2 38.7 L 315.7 40.2 L 318.2 41.7 L 320.6 43.2 L 323.1 44.6 L 325.6 46.1 L 328.1 46.1 L 330.6 47.6 L 333.1 47.6 L 335.5 47.6 L 338.0 46.1 L 340.5 46.1 L 343.0 44.6 L 345.5 43.2 L 348.0 43.2 L 350.5 43.2 L 352.9 44.6 L 355.4 44.6 L 357.9 44.6 L 360.4 44.6 L 362.9 43.2 L 365.4 43.2 L 367.9 41.7 L 370.3 38.7 L 372.8 35.8 L 375.3 32.8 L 377.8 29.8 L 380.3 26.9 L 382.8 25.4 L 385.3 25.4 L 387.7 26.9 L 390.2 28.4 L 392.7 29.8 L 395.2 29.8 L 397.7 31.3 L 400.2 29.8 L 402.7 29.8 L 405.1 28.4 L 407.6 25.4 L 410.1 22.4 L 412.6 21.0 L 415.1 19.5 L 417.6 21.0 L 420.1 21.0 L 422.5 22.4`
const chartAreaTrace = `${chartTrace} L 422.5 140 H 2.5 Z`
const chartPreviousTrace = `M 2.5 126.0 L 5.0 126.0 L 7.5 126.0 L 9.9 126.0 L 12.4 124.6 L 14.9 124.6 L 17.4 124.6 L 19.9 124.6 L 22.4 124.6 L 24.9 123.1 L 27.3 123.1 L 29.8 123.1 L 32.3 123.1 L 34.8 123.1 L 37.3 123.1 L 39.8 123.1 L 42.3 123.1 L 44.7 123.1 L 47.2 123.1 L 49.7 123.1 L 52.2 121.6 L 54.7 121.6 L 57.2 121.6 L 59.7 120.1 L 62.1 120.1 L 64.6 120.1 L 67.1 120.1 L 69.6 120.1 L 72.1 121.6 L 74.6 121.6 L 77.1 121.6 L 79.5 121.6 L 82.0 121.6 L 84.5 121.6 L 87.0 121.6 L 89.5 121.6 L 92.0 121.6 L 94.5 121.6 L 96.9 120.1 L 99.4 120.1 L 101.9 120.1 L 104.4 118.6 L 106.9 118.6 L 109.4 118.6 L 111.8 118.6 L 114.3 118.6 L 116.8 118.6 L 119.3 118.6 L 121.8 118.6 L 124.3 117.2 L 126.8 117.2 L 129.2 115.7 L 131.7 115.7 L 134.2 114.2 L 136.7 114.2 L 139.2 114.2 L 141.7 114.2 L 144.2 115.7 L 146.6 115.7 L 149.1 115.7 L 151.6 115.7 L 154.1 117.2 L 156.6 117.2 L 159.1 117.2 L 161.6 117.2 L 164.0 117.2 L 166.5 117.2 L 169.0 115.7 L 171.5 115.7 L 174.0 115.7 L 176.5 114.2 L 179.0 114.2 L 181.4 114.2 L 183.9 114.2 L 186.4 112.7 L 188.9 112.7 L 191.4 111.2 L 193.9 111.2 L 196.4 111.2 L 198.8 109.8 L 201.3 109.8 L 203.8 109.8 L 206.3 108.3 L 208.8 108.3 L 211.3 108.3 L 213.8 108.3 L 216.2 108.3 L 218.7 108.3 L 221.2 109.8 L 223.7 109.8 L 226.2 109.8 L 228.7 109.8 L 231.2 109.8 L 233.6 109.8 L 236.1 109.8 L 238.6 109.8 L 241.1 109.8 L 243.6 108.3 L 246.1 108.3 L 248.6 106.8 L 251.0 106.8 L 253.5 105.3 L 256.0 105.3 L 258.5 103.8 L 261.0 102.4 L 263.5 102.4 L 266.0 100.9 L 268.4 100.9 L 270.9 99.4 L 273.4 99.4 L 275.9 97.9 L 278.4 97.9 L 280.9 97.9 L 283.4 97.9 L 285.8 97.9 L 288.3 97.9 L 290.8 99.4 L 293.3 99.4 L 295.8 100.9 L 298.3 100.9 L 300.8 102.4 L 303.2 102.4 L 305.7 102.4 L 308.2 103.8 L 310.7 103.8 L 313.2 103.8 L 315.7 103.8 L 318.2 103.8 L 320.6 103.8 L 323.1 103.8 L 325.6 103.8 L 328.1 102.4 L 330.6 102.4 L 333.1 100.9 L 335.5 100.9 L 338.0 99.4 L 340.5 99.4 L 343.0 97.9 L 345.5 97.9 L 348.0 99.4 L 350.5 99.4 L 352.9 100.9 L 355.4 100.9 L 357.9 102.4 L 360.4 102.4 L 362.9 103.8 L 365.4 103.8 L 367.9 103.8 L 370.3 103.8 L 372.8 103.8 L 375.3 103.8 L 377.8 102.4 L 380.3 102.4 L 382.8 102.4 L 385.3 100.9 L 387.7 99.4 L 390.2 99.4 L 392.7 97.9 L 395.2 97.9 L 397.7 96.4 L 400.2 95.0 L 402.7 95.0 L 405.1 93.5 L 407.6 93.5 L 410.1 93.5 L 412.6 93.5 L 415.1 95.0 L 417.6 95.0 L 420.1 96.4 L 422.5 96.4`

function openDemo(message: string) {
  const id = createChat(message)
  if (id) navigateTo(`/chat/${id}`)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('.site-header', { opacity: 0, y: -14, duration: 0.55 })
    .from('.hero-copy > *', { opacity: 0, y: 20, stagger: 0.1, duration: 0.65 }, '-=0.2')
    .from('.dashboard-shell', { opacity: 0, x: 24, duration: 0.75 }, '-=0.35')

  gsap.fromTo('.dashboard-chart-line', { drawSVG: '0%' }, {
    drawSVG: '100%',
    duration: 1.8,
    delay: 0.65,
    ease: 'power2.out'
  })

  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
    gsap.from(element, {
      opacity: 0,
      y: 22,
      duration: 0.65,
      ease: 'power3.out',
      scrollTrigger: { trigger: element, start: 'top 86%', once: true }
    })
  })
})

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<template>
  <div class="landing-page">
    <header class="site-header">
      <div class="site-container header-inner">
        <NuxtLink to="/" class="brand-link" aria-label="Fluxo de Clientes, início">
          <BrandLogo class="header-logo" />
        </NuxtLink>
        <nav class="main-nav" aria-label="Navegação principal">
          <a href="#plataforma">Plataforma</a>
          <a href="#solucoes">Soluções</a>
          <a href="#como-funciona">Como funciona</a>
          <a href="#perguntas">Perguntas</a>
        </nav>
        <div class="header-actions">
          <button class="button button-light" @click="openDemo('Quero acessar a plataforma')">Entrar</button>
          <button class="button button-dark" @click="openDemo('Quero solicitar uma demonstração')">Solicitar demonstração</button>
        </div>
      </div>
    </header>

    <main>
      <section id="plataforma" class="hero-section">
        <div class="site-container hero-grid">
          <div class="hero-copy">
            <p class="eyebrow">MARKETING <span>·</span> ATENDIMENTO <span>·</span> DADOS</p>
            <h1>Marketing, atendimento e dados no <span>mesmo lugar.</span></h1>
            <p class="hero-description">Organize conversas, acompanhe o funil e use IA para apoiar a próxima decisão.</p>
            <div class="hero-actions">
              <button class="button button-dark button-arrow" @click="openDemo('Quero solicitar uma demonstração')">
                Solicitar demonstração <UIcon name="i-lucide-arrow-right" />
              </button>
              <a class="button button-sage" href="#solucoes">Explorar a plataforma</a>
            </div>
            <p class="hero-note">Uma visão clara de quem chega e do que acontece depois.</p>
          </div>

          <div class="dashboard-shell" aria-label="Prévia demonstrativa do painel">
            <aside class="dashboard-rail" aria-label="Menu do painel">
              <span class="rail-brand"><UIcon name="i-lucide-waypoints" /></span>
              <UIcon name="i-lucide-house" />
              <UIcon name="i-lucide-message-circle" />
              <UIcon name="i-lucide-users-round" />
              <UIcon name="i-lucide-chart-no-axes-column-increasing" />
              <UIcon name="i-lucide-settings-2" />
            </aside>
            <div class="dashboard-content">
              <div class="dashboard-heading">
                <h2>Visão geral</h2>
                <div class="dashboard-filters">
                  <span class="filter-chip">Últimos 30 dias <UIcon name="i-lucide-chevron-down" /></span>
                  <span class="demo-chip">Dados demonstrativos</span>
                </div>
              </div>
              <div class="metric-grid">
                <article class="metric-card">
                  <p>Novos contatos</p><strong>128</strong><span><UIcon name="i-lucide-arrow-up-right" /> 12%</span>
                  <UIcon class="metric-icon" name="i-lucide-user-round" />
                </article>
                <article class="metric-card">
                  <p>Em atendimento</p><strong>32</strong><span><UIcon name="i-lucide-arrow-up-right" /> 5%</span>
                  <UIcon class="metric-icon" name="i-lucide-message-circle" />
                </article>
                <article class="metric-card">
                  <p>Qualificados</p><strong>18</strong><span><UIcon name="i-lucide-arrow-up-right" /> 20%</span>
                  <UIcon class="metric-icon" name="i-lucide-chart-no-axes-column-increasing" />
                </article>
              </div>
              <div class="dashboard-lower">
                <section class="chart-card" aria-label="Contatos ao longo do tempo">
                  <h3>Contatos ao longo do tempo</h3>
                  <div class="chart-area">
                    <div class="chart-y-labels"><span>120</span><span>80</span><span>40</span><span>0</span></div>
                    <svg viewBox="0 0 430 150" preserveAspectRatio="none" role="img" aria-label="Gráfico demonstrativo de contatos">
                      <path class="chart-gridline" d="M0 18H430M0 55H430M0 92H430M0 129H430" />
                      <path class="chart-area-fill" :d="chartAreaTrace" />
                      <path class="chart-previous" :d="chartPreviousTrace" />
                      <path class="dashboard-chart-line" :d="chartTrace" />
                    </svg>
                  </div>
                  <div class="chart-dates"><span>1 abr</span><span>8 abr</span><span>15 abr</span><span>22 abr</span><span>30 abr</span></div>
                  <div class="chart-legend"><span><i class="legend-current" /> Este período</span><span><i class="legend-previous" /> Período anterior</span></div>
                </section>
                <section class="funnel-card" aria-label="Funil de clientes">
                  <h3>Funil de clientes</h3>
                  <div class="funnel-row"><span>Contatos</span><i class="funnel-bar funnel-bar-one" /></div>
                  <div class="funnel-row"><span>Qualificados</span><i class="funnel-bar funnel-bar-two" /><b>128</b></div>
                  <div class="funnel-row"><span>Propostas</span><i class="funnel-bar funnel-bar-three" /><b>18</b></div>
                </section>
              </div>
              <button class="next-action" @click="openDemo('Revisar conversas sem retorno')">
                <span class="next-icon"><UIcon name="i-lucide-waypoints" /></span>
                <span><strong>Próxima ação</strong><small>Revisar conversas sem retorno</small></span>
                <UIcon name="i-lucide-chevron-right" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="solucoes" class="solutions-section" data-reveal>
        <div class="site-container">
          <h2>Cada etapa do negócio, no <span>mesmo fluxo.</span></h2>
          <div class="solutions-grid">
            <article v-for="solution in solutions" :key="solution.title" class="solution-item">
              <span class="solution-icon"><UIcon :name="solution.icon" /></span>
              <div><h3>{{ solution.title }}</h3><p>{{ solution.text }}</p></div>
            </article>
          </div>
        </div>
      </section>

      <section id="funil" class="funnel-section" data-reveal>
        <div class="site-container funnel-grid">
          <div class="pipeline-window" aria-label="Exemplo demonstrativo do funil de clientes">
            <div class="pipeline-toolbar"><span><UIcon name="i-lucide-panels-top-left" /> Funil de clientes</span><span><UIcon name="i-lucide-search" /> Últimos 30 dias <UIcon name="i-lucide-chevron-down" /></span></div>
            <div class="pipeline-columns">
              <section class="pipeline-column">
                <h3>Em atendimento <small>(12)</small></h3>
                <article><b class="avatar avatar-coral">CA</b><span><strong>Contato inicial</strong><small>Via site · 2h atrás</small></span><UIcon name="i-lucide-ellipsis" /></article>
                <article><b class="avatar avatar-gray">MS</b><span><strong>Mariana Souza</strong><small>Instagram · 4h atrás</small></span><UIcon name="i-lucide-ellipsis" /></article>
                <article><b class="avatar avatar-peach">EA</b><span><strong>Empresa Alfa</strong><small>Indicação · 1 dia atrás</small></span><UIcon name="i-lucide-ellipsis" /></article>
                <article><b class="avatar avatar-green">CL</b><span><strong>Carlos Lima</strong><small>WhatsApp · 1 dia atrás</small></span><UIcon name="i-lucide-ellipsis" /></article>
              </section>
              <section class="pipeline-column">
                <h3>Qualificados <small>(6)</small></h3>
                <article><b class="avatar avatar-green">CB</b><span><strong>Clínica Bem Viver</strong><small>2h atrás</small></span><UIcon name="i-lucide-ellipsis" /></article>
                <article><b class="avatar avatar-sand">MF</b><span><strong>Mateus Ferreira</strong><small>5h atrás</small></span><UIcon name="i-lucide-ellipsis" /></article>
                <article><b class="avatar avatar-pink">SS</b><span><strong>Shopee Store</strong><small>1 dia atrás</small></span><UIcon name="i-lucide-ellipsis" /></article>
                <article><b class="avatar avatar-blue">JA</b><span><strong>Juliana Andrade</strong><small>1 dia atrás</small></span><UIcon name="i-lucide-ellipsis" /></article>
              </section>
              <section class="pipeline-column">
                <h3>Propostas <small>(4)</small></h3>
                <article><b class="avatar avatar-peach">AH</b><span><strong>Agência Horizonte</strong><small>1h atrás</small></span><UIcon name="i-lucide-ellipsis" /></article>
                <article><b class="avatar avatar-gray">RN</b><span><strong>Ricardo Nunes</strong><small>1 dia atrás</small></span><UIcon name="i-lucide-ellipsis" /></article>
                <article><b class="avatar avatar-purple">FA</b><span><strong>Fernanda Alves</strong><small>2 dias atrás</small></span><UIcon name="i-lucide-ellipsis" /></article>
              </section>
            </div>
            <p class="illustrative-note">Exemplo ilustrativo</p>
          </div>
          <div class="funnel-copy">
            <h2>Entenda onde as conversas param.</h2>
            <p>Acompanhe o caminho entre o primeiro contato e o próximo passo.</p>
            <ul>
              <li><UIcon name="i-lucide-circle-check" /> Origem do contato</li>
              <li><UIcon name="i-lucide-circle-check" /> Etapa e responsável</li>
              <li><UIcon name="i-lucide-circle-check" /> Histórico da conversa</li>
            </ul>
            <a href="#como-funciona" class="text-link">Conhecer o funil <UIcon name="i-lucide-arrow-right" /></a>
          </div>
        </div>
      </section>

      <section class="ai-section" data-reveal>
        <div class="site-container ai-grid">
          <div class="ai-copy">
            <h2>IA que ajuda a equipe a agir.</h2>
            <p>Resumos, sinais de atenção e sugestões para organizar a rotina.</p>
            <span class="control-pill"><UIcon name="i-lucide-shield-check" /> A equipe mantém o controle</span>
          </div>
          <div class="assistant-window" aria-label="Exemplo ilustrativo do assistente de análise">
            <div class="assistant-heading"><span><UIcon name="i-lucide-waypoints" /> Assistente de análise</span><small>Exemplo ilustrativo</small></div>
            <div class="assistant-note">
              <UIcon name="i-lucide-sparkles" />
              <div><strong>Há conversas aguardando retorno.</strong><p>Alguns contatos estão sem atividade há mais de 3 dias. Reveja e defina o próximo passo.</p><button class="button button-assistant" @click="openDemo('Revisar sugestões de conversas sem retorno')">Revisar sugestões</button></div>
            </div>
            <div class="automation-box">
              <strong>Sugestão de automação</strong>
              <div class="automation-flow"><span><i class="automation-icon icon-person"><UIcon name="i-lucide-user-round" /></i><small>Novo contato</small></span><b>⟶</b><span><i class="automation-icon icon-message"><UIcon name="i-lucide-message-circle" /></i><small>Enviar mensagem</small></span><b>⟶</b><span><i class="automation-icon icon-task"><UIcon name="i-lucide-tag" /></i><small>Criar tarefa</small></span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" class="process-section" data-reveal>
        <div class="site-container">
          <h2>Como funciona</h2>
          <div class="process-grid">
            <template v-for="(stage, index) in stages" :key="stage.number">
              <article class="process-item">
                <div class="process-icons"><span class="step-number">{{ stage.number }}</span><span class="process-icon"><UIcon :name="stage.icon" /></span></div>
                <div><h3>{{ stage.title }}</h3><p>{{ stage.text }}</p></div>
              </article>
              <UIcon v-if="index < stages.length - 1" class="process-arrow" name="i-lucide-arrow-right" />
            </template>
          </div>
        </div>
      </section>

      <section class="audience-section" data-reveal>
        <div class="site-container">
          <h2>Para quem precisa organizar o crescimento.</h2>
          <div class="audience-grid">
            <article v-for="audience in audiences" :key="audience.title" class="audience-card">
              <span class="solution-icon"><UIcon :name="audience.icon" /></span>
              <div><h3>{{ audience.title }}</h3><p>{{ audience.text }}</p></div>
            </article>
          </div>
        </div>
      </section>

      <section id="perguntas" class="faq-section" data-reveal>
        <div class="site-container">
          <h2>Perguntas frequentes</h2>
          <div class="faq-list">
            <details v-for="faq in faqs" :key="faq.question" class="faq-item">
              <summary>{{ faq.question }} <UIcon name="i-lucide-plus" /></summary>
              <p>{{ faq.answer }}</p>
            </details>
          </div>
        </div>
      </section>

      <section id="contato" class="cta-section" data-reveal>
        <div class="site-container cta-inner">
          <div><h2>Vamos organizar o seu fluxo?</h2><p>Conheça a plataforma e veja o que faz sentido para sua operação.</p></div>
          <button class="button button-dark button-arrow" @click="openDemo('Quero organizar meu fluxo e conhecer a plataforma')">Solicitar demonstração <UIcon name="i-lucide-arrow-right" /></button>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="site-container footer-inner">
        <NuxtLink to="/" class="footer-brand" aria-label="Fluxo de Clientes, início"><BrandLogo class="footer-logo" /><small>Marketing, atendimento e dados conectados.</small></NuxtLink>
        <nav aria-label="Navegação do rodapé"><a href="#plataforma">Plataforma</a><a href="#contato">Demonstração</a><a href="#contato">Contato</a><a href="#perguntas">Privacidade</a><a href="#perguntas">Termos</a></nav>
        <small class="copyright">© 2026 FLUXO DE CLIENTES</small>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.landing-page {
  --ink: #151713;
  --muted: #777a72;
  --line: #e6e8e2;
  --paper: #fbfbf8;
  --surface: #fff;
  --orange: #f0440b;
  --orange-soft: #fff0e9;
  --sage: #eef1e8;
  --green: #20261d;
  color: var(--ink);
  background: var(--paper);
  font-family: "DM Sans", "Avenir Next", "Segoe UI", sans-serif;
  font-size: 14px;
  line-height: 1.45;
  overflow: hidden;
}

.landing-page *, .landing-page *::before, .landing-page *::after { box-sizing: border-box; }
.site-container { width: min(100% - 72px, 1240px); margin-inline: auto; }
.site-header { height: 76px; background: rgba(251, 251, 248, .96); }
.header-inner { height: 100%; display: flex; align-items: center; justify-content: space-between; gap: 28px; }
.brand-link { width: 174px; flex: 0 0 174px; display: block; }
.header-logo { display: block; width: 100%; height: auto; }
.main-nav, .header-actions, .hero-actions { display: flex; align-items: center; }
.main-nav { gap: clamp(20px, 3vw, 42px); margin-inline: auto; }
.main-nav a, .site-footer nav a { color: #343630; text-decoration: none; font-size: 13px; transition: color .2s ease; }
.main-nav a:hover, .site-footer nav a:hover { color: var(--orange); }
.header-actions { gap: 10px; }
.button { min-height: 42px; display: inline-flex; align-items: center; justify-content: center; gap: 10px; padding: 0 18px; border: 1px solid transparent; border-radius: 13px; font: inherit; font-size: 12px; font-weight: 700; text-decoration: none; white-space: nowrap; cursor: pointer; transition: transform .18s ease, background .18s ease, border-color .18s ease; }
.button:hover { transform: translateY(-1px); }
.button-light { border-color: #e6e7e1; background: transparent; color: var(--ink); }
.button-light:hover { background: #fff; }
.button-dark { background: var(--green); color: #fff; }
.button-dark:hover { background: #30392b; }
.button-sage { background: #ecefe8; color: var(--ink); }
.button-sage:hover { background: #e0e5da; }
.button-arrow :deep(svg) { width: 15px; height: 15px; }
.hero-section { padding: 8px 0 34px; }
.hero-grid { min-height: 346px; display: grid; grid-template-columns: minmax(300px, .84fr) minmax(0, 1.16fr); align-items: center; gap: 44px; }
.hero-copy { max-width: 470px; }
.eyebrow { margin: 0 0 13px; color: #656961; font-size: 10px; font-weight: 700; letter-spacing: .08em; }
.eyebrow span { color: #b7bab1; padding-inline: 2px; }
.hero-copy h1 { max-width: 480px; margin: 0; font-size: clamp(36px, 4vw, 50px); font-weight: 800; letter-spacing: 0; line-height: 1.03; }
.hero-copy h1 span, .solutions-section h2 span { color: var(--orange); }
.hero-description { max-width: 420px; margin: 14px 0 18px; color: var(--muted); font-size: 16px; line-height: 1.5; }
.hero-actions { flex-wrap: wrap; gap: 10px; }
.hero-note { margin: 19px 0 0; color: #85877f; font-size: 11px; }
.dashboard-shell { min-width: 0; min-height: 320px; position: relative; display: grid; grid-template-columns: 38px minmax(0, 1fr); border: 1px solid #dfe2da; border-radius: 20px; background: #fff; box-shadow: 0 12px 34px rgba(34, 40, 31, .12); }
.dashboard-rail { display: flex; flex-direction: column; align-items: center; gap: 21px; padding: 13px 0; border-radius: 18px 0 0 18px; background: #252b21; color: #d2d8cc; }
.dashboard-rail :deep(svg) { width: 15px; height: 15px; }
.dashboard-rail .rail-brand { color: var(--orange); }
.dashboard-content { position: relative; min-width: 0; padding: 13px 14px 48px; }
.dashboard-heading, .dashboard-filters { display: flex; align-items: center; }
.dashboard-heading { min-height: 28px; justify-content: space-between; gap: 8px; margin-bottom: 10px; }
.dashboard-heading h2 { margin: 0; font-size: 15px; font-weight: 800; }
.dashboard-filters { gap: 7px; }
.filter-chip, .demo-chip { min-height: 26px; display: inline-flex; align-items: center; gap: 7px; padding: 0 10px; border: 1px solid #eceee9; border-radius: 9px; color: #5e625a; font-size: 9px; white-space: nowrap; }
.demo-chip { border: 0; background: var(--orange-soft); color: #d85731; }
.filter-chip :deep(svg) { width: 11px; height: 11px; }
.metric-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
.metric-card { position: relative; min-height: 69px; padding: 9px 10px; border: 1px solid #eff0ed; border-radius: 10px; background: #fff; }
.metric-card p { margin: 0 0 3px; color: #71756c; font-size: 9px; }
.metric-card strong { display: block; font-size: 21px; line-height: 1; }
.metric-card > span { display: flex; align-items: center; gap: 2px; margin-top: 4px; color: #5a9365; font-size: 9px; font-weight: 700; }
.metric-card > span :deep(svg) { width: 10px; height: 10px; }
.metric-icon { position: absolute; right: 10px; top: 29px; width: 16px; height: 16px; color: #a5aa91; }
.dashboard-lower { display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(120px, .85fr); gap: 8px; margin-top: 9px; }
.chart-card, .funnel-card { min-width: 0; min-height: 146px; padding: 10px; border: 1px solid #eff0ed; border-radius: 10px; background: #fff; }
.chart-card h3, .funnel-card h3 { margin: 0; font-size: 10px; font-weight: 800; }
.chart-area { height: 91px; display: grid; grid-template-columns: 23px minmax(0, 1fr); align-items: stretch; margin-top: 4px; }
.chart-y-labels { display: flex; flex-direction: column; justify-content: space-between; padding: 1px 4px 3px 0; color: #8c9087; font-size: 7px; }
.chart-area svg { width: 100%; height: 100%; overflow: visible; }
.chart-gridline { fill: none; stroke: #edf0eb; stroke-width: 1; }
.chart-area-fill { fill: var(--orange); opacity: .1; }
.chart-previous { fill: none; stroke: #b5bba3; stroke-width: 2; }
.dashboard-chart-line { fill: none; stroke: #f46b4d; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
.chart-dates, .chart-legend { display: flex; justify-content: space-between; color: #888c83; font-size: 7px; }
.chart-dates { margin-left: 23px; }
.chart-legend { justify-content: flex-start; gap: 12px; margin-top: 7px; font-size: 8px; }
.chart-legend span { display: flex; align-items: center; gap: 4px; }
.chart-legend i { width: 7px; height: 7px; display: inline-block; border-radius: 50%; }
.legend-current { background: #f46b4d; }
.legend-previous { background: #b5bba3; }
.funnel-card { display: flex; flex-direction: column; gap: 13px; }
.funnel-card h3 { margin-bottom: 2px; }
.funnel-row { min-height: 18px; display: grid; grid-template-columns: 1fr auto 24px; align-items: center; gap: 5px; color: #686d63; font-size: 8px; }
.funnel-row > b { color: #6a6d66; font-size: 8px; font-weight: 600; text-align: right; }
.funnel-bar { height: 17px; display: block; border-radius: 2px 2px 6px 6px; transform: skew(-12deg); }
.funnel-bar-one { width: 66px; background: linear-gradient(90deg, #f46b4d, #f27c5c); }
.funnel-bar-two { width: 42px; background: #c6cdb5; }
.funnel-bar-three { width: 25px; background: #b5bea4; }
.next-action { position: absolute; right: 9px; bottom: 8px; min-width: 184px; display: flex; align-items: center; gap: 8px; padding: 7px 9px; border: 1px solid #edece7; border-radius: 12px; background: #fff; box-shadow: 0 5px 15px rgba(25, 29, 23, .12); text-align: left; cursor: pointer; }
.next-icon { color: var(--orange); }
.next-icon :deep(svg), .next-action > :deep(svg) { width: 15px; height: 15px; }
.next-action > span:nth-child(2) { flex: 1; }
.next-action strong, .next-action small { display: block; }
.next-action strong { font-size: 9px; }
.next-action small { margin-top: 2px; color: #767a71; font-size: 8px; }
.solutions-section { padding: 23px 0 24px; border-radius: 28px 28px 0 0; background: rgba(255, 255, 255, .73); }
.solutions-section h2, .audience-section h2, .faq-section h2, .process-section > .site-container > h2 { margin: 0 0 15px; font-size: 27px; font-weight: 800; letter-spacing: 0; line-height: 1.15; }
.solutions-section h2 { margin-bottom: 14px; text-align: center; }
.solutions-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
.solution-item, .audience-card { min-height: 87px; display: flex; align-items: center; gap: 13px; padding: 13px 15px; border: 1px solid var(--line); border-radius: 12px; background: rgba(255, 255, 255, .82); }
.solution-icon, .process-icon { width: 47px; height: 47px; flex: 0 0 47px; display: grid; place-items: center; border-radius: 50%; background: var(--orange-soft); color: var(--orange); }
.solution-icon :deep(svg), .process-icon :deep(svg) { width: 21px; height: 21px; stroke-width: 1.8; }
.solution-item h3, .audience-card h3 { margin: 0 0 4px; font-size: 13px; font-weight: 800; }
.solution-item p, .audience-card p { margin: 0; color: var(--muted); font-size: 11px; line-height: 1.35; }
.funnel-section { padding: 25px 0 27px; background: var(--sage); }
.funnel-grid { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(270px, .7fr); align-items: center; gap: 48px; }
.pipeline-window { min-width: 0; padding: 11px; border: 1px solid #d9dfd3; border-radius: 14px; background: #fdfdfb; box-shadow: 0 8px 20px rgba(41, 49, 36, .08); }
.pipeline-toolbar { min-height: 23px; display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 0 7px 8px; color: #53584f; font-size: 9px; }
.pipeline-toolbar span { display: inline-flex; align-items: center; gap: 7px; }
.pipeline-toolbar :deep(svg) { width: 12px; height: 12px; }
.pipeline-columns { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
.pipeline-column { min-width: 0; padding: 7px; border-radius: 9px; background: #f3f4f0; }
.pipeline-column:nth-child(2) { background: #f1f2e9; }
.pipeline-column:nth-child(3) { background: #f8f1ed; }
.pipeline-column h3 { display: flex; justify-content: space-between; gap: 3px; margin: 0 0 6px; font-size: 9px; white-space: nowrap; }
.pipeline-column h3 small { color: #858980; font-size: 8px; font-weight: 500; }
.pipeline-column article { min-height: 43px; display: flex; align-items: center; gap: 5px; margin-top: 5px; padding: 5px; border: 1px solid #eeefeb; border-radius: 7px; background: #fff; }
.pipeline-column article > span { min-width: 0; flex: 1; }
.pipeline-column article strong, .pipeline-column article small { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pipeline-column article strong { font-size: 7px; }
.pipeline-column article small { margin-top: 2px; color: #858980; font-size: 7px; }
.pipeline-column article > :deep(svg) { width: 11px; height: 11px; flex: 0 0 11px; color: #858980; }
.avatar { width: 22px; height: 22px; flex: 0 0 22px; display: grid; place-items: center; border-radius: 50%; font-size: 7px; font-weight: 700; font-style: normal; }
.avatar-coral { background: #f7d0c3; color: #b95538; }.avatar-gray { background: #dce0dd; color: #5f655f; }.avatar-peach { background: #f1dfd0; color: #8a6854; }.avatar-green { background: #cfe0d4; color: #567962; }.avatar-sand { background: #e8e4c8; color: #77744f; }.avatar-pink { background: #eed7d2; color: #8f6057; }.avatar-blue { background: #cfe3df; color: #4d786e; }.avatar-purple { background: #ded9e8; color: #6f6681; }
.illustrative-note { margin: 6px 0 0 3px; color: #8a8e84; font-size: 8px; }
.funnel-copy { max-width: 360px; }
.funnel-copy h2, .ai-copy h2 { margin: 0; font-size: 31px; font-weight: 800; line-height: 1.08; }
.funnel-copy > p, .ai-copy > p { margin: 11px 0 17px; color: var(--muted); font-size: 15px; line-height: 1.45; }
.funnel-copy ul { display: grid; gap: 8px; margin: 0 0 18px; padding: 0; list-style: none; }
.funnel-copy li { display: flex; align-items: center; gap: 10px; font-size: 13px; }
.funnel-copy li :deep(svg) { width: 20px; height: 20px; color: #f46b4d; fill: #f46b4d; stroke: #fff; }
.text-link { display: inline-flex; align-items: center; gap: 8px; color: #d65332; font-size: 13px; font-weight: 700; text-decoration: underline; text-underline-offset: 4px; }
.text-link :deep(svg) { width: 15px; height: 15px; }
.ai-section { padding: 25px 0; border-radius: 20px; background: #20251d; color: #fff; }
.ai-grid { display: grid; grid-template-columns: minmax(230px, .72fr) minmax(0, 1.28fr); align-items: center; gap: 58px; }
.ai-copy { padding: 9px 0; }
.ai-copy h2 { max-width: 330px; font-size: 34px; }
.ai-copy > p { max-width: 355px; color: #e0e3dc; }
.control-pill { display: inline-flex; align-items: center; gap: 8px; margin-top: 3px; padding: 9px 14px; border: 1px solid rgba(255,255,255,.17); border-radius: 24px; background: rgba(255,255,255,.08); color: #e4e7df; font-size: 11px; }
.control-pill :deep(svg) { width: 15px; height: 15px; }
.assistant-window { padding: 15px; border: 1px solid rgba(227, 234, 218, .35); border-radius: 15px; background: rgba(255,255,255,.035); }
.assistant-heading, .assistant-heading > span { display: flex; align-items: center; }
.assistant-heading { justify-content: space-between; gap: 12px; margin-bottom: 10px; font-size: 11px; font-weight: 700; }
.assistant-heading > span { gap: 9px; }
.assistant-heading > span :deep(svg) { width: 16px; height: 16px; color: var(--orange); }
.assistant-heading small { padding: 4px 9px; border: 1px solid rgba(255,255,255,.3); border-radius: 12px; color: #dadfd4; font-size: 8px; font-weight: 500; }
.assistant-note { display: flex; gap: 13px; padding: 13px; border: 1px solid rgba(227,234,218,.14); border-radius: 12px; background: rgba(255,255,255,.05); }
.assistant-note > :deep(svg) { width: 23px; height: 23px; flex: 0 0 23px; color: #f46b4d; }
.assistant-note strong { font-size: 12px; }
.assistant-note p { max-width: 500px; margin: 4px 0 9px; color: #d4d8d0; font-size: 10px; line-height: 1.4; }
.button-assistant { min-height: 30px; padding-inline: 12px; background: #fff; color: #22271f; font-size: 9px; }
.automation-box { margin-top: 9px; padding: 11px 13px; border: 1px solid rgba(227,234,218,.14); border-radius: 12px; background: rgba(255,255,255,.035); }
.automation-box > strong { font-size: 10px; }
.automation-flow { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 10px; }
.automation-flow > span { display: flex; align-items: center; gap: 8px; }
.automation-flow > b { color: #dce1d7; font-weight: 500; }
.automation-flow small { color: #e2e5df; font-size: 9px; white-space: nowrap; }
.automation-icon { width: 35px; height: 35px; display: grid; place-items: center; border-radius: 9px; }
.automation-icon :deep(svg) { width: 17px; height: 17px; }
.icon-person { background: #315a3c; }.icon-message { background: #355a53; }.icon-task { background: #784c35; }
.process-section { padding: 24px 0 27px; }
.process-section > .site-container > h2 { margin-bottom: 14px; }
.process-grid { display: grid; grid-template-columns: 1fr 28px 1fr 28px 1fr; align-items: center; gap: 12px; }
.process-item { display: flex; align-items: flex-start; gap: 12px; }
.process-icons { display: flex; align-items: center; gap: 7px; flex: 0 0 auto; }
.step-number { width: 29px; height: 29px; display: grid; place-items: center; border-radius: 50%; background: var(--orange-soft); color: #dc5c3b; font-size: 11px; font-weight: 700; }
.process-icon { width: 33px; height: 33px; flex-basis: 33px; background: #fff0e9; }
.process-icon :deep(svg) { width: 16px; height: 16px; }
.process-item h3 { margin: 2px 0 4px; font-size: 12px; font-weight: 800; }
.process-item p { margin: 0; color: var(--muted); font-size: 10px; line-height: 1.4; }
.process-arrow { width: 16px; height: 16px; color: #61665d; }
.audience-section { padding: 20px 0 16px; border-radius: 22px 22px 0 0; background: rgba(255,255,255,.72); }
.audience-section h2 { margin-bottom: 12px; }
.audience-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
.audience-card { min-height: 90px; }
.faq-section { padding: 17px 0 20px; background: rgba(255,255,255,.72); }
.faq-section h2 { margin-bottom: 10px; font-size: 23px; }
.faq-list { display: grid; gap: 7px; }
.faq-item { border: 1px solid var(--line); border-radius: 10px; background: #fff; }
.faq-item summary { min-height: 38px; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 0 14px; font-size: 11px; font-weight: 700; list-style: none; cursor: pointer; }
.faq-item summary::-webkit-details-marker { display: none; }
.faq-item summary :deep(svg) { width: 15px; height: 15px; transition: transform .2s ease; }
.faq-item[open] summary :deep(svg) { transform: rotate(45deg); }
.faq-item > p { margin: 0; padding: 0 14px 12px; color: var(--muted); font-size: 11px; }
.cta-section { padding: 3px 0 20px; background: rgba(255,255,255,.72); }
.cta-inner { min-height: 95px; display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 19px 28px; border-radius: 15px; background: #f57858; }
.cta-inner h2 { margin: 0; font-size: 25px; font-weight: 800; line-height: 1.15; }
.cta-inner p { margin: 4px 0 0; color: #5d2e20; font-size: 12px; }
.cta-inner .button-dark { flex: 0 0 auto; }
.site-footer { padding: 15px 0 18px; background: var(--paper); }
.footer-inner { display: flex; align-items: center; justify-content: space-between; gap: 22px; }
.footer-brand { display: grid; grid-template-columns: 34px auto; align-items: center; column-gap: 9px; color: var(--ink); text-decoration: none; }
.footer-logo { width: 34px; height: auto; grid-row: span 2; }
.footer-brand small { color: var(--muted); font-size: 9px; }
.site-footer nav { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; }
.site-footer nav a { color: #74776f; font-size: 9px; }
.copyright { color: #888b83; font-size: 8px; white-space: nowrap; }

@media (max-width: 1050px) {
  .site-container { width: min(100% - 48px, 1240px); }
  .header-inner { gap: 18px; }
  .brand-link { width: 150px; flex-basis: 150px; }
  .main-nav { gap: 18px; }
  .hero-grid { gap: 28px; grid-template-columns: minmax(250px, .78fr) minmax(0, 1.22fr); }
  .hero-copy h1 { font-size: 40px; }
  .dashboard-content { padding-inline: 10px; }
  .funnel-grid { gap: 30px; }
}

@media (max-width: 800px) {
  .site-header { height: auto; min-height: 68px; }
  .header-inner { min-height: 68px; flex-wrap: wrap; padding-block: 10px; }
  .main-nav { order: 3; width: 100%; justify-content: center; gap: 24px; padding: 4px 0 2px; }
  .hero-grid { grid-template-columns: 1fr; gap: 26px; padding-block: 22px 4px; }
  .hero-copy { max-width: 560px; }
  .hero-copy h1 { max-width: 520px; font-size: clamp(38px, 7vw, 52px); }
  .dashboard-shell { min-height: 300px; }
  .solutions-section { padding-top: 26px; }
  .funnel-grid { grid-template-columns: 1fr; gap: 23px; }
  .funnel-copy { max-width: 600px; }
  .ai-grid { grid-template-columns: 1fr; gap: 20px; }
  .ai-copy h2 { max-width: 500px; }
  .process-grid { grid-template-columns: 1fr; gap: 17px; }
  .process-item { max-width: 520px; }
  .process-arrow { display: none; }
}

@media (max-width: 600px) {
  .site-container { width: min(100% - 32px, 1240px); }
  .header-inner { gap: 9px; }
  .brand-link { width: 138px; flex-basis: 138px; }
  .header-actions { gap: 6px; }
  .header-actions .button { min-height: 36px; padding-inline: 10px; font-size: 10px; }
  .header-actions .button-light { display: none; }
  .main-nav { justify-content: space-between; gap: 8px; }
  .main-nav a { font-size: 10px; }
  .hero-grid { padding-top: 17px; }
  .hero-copy h1 { font-size: 38px; }
  .hero-description { font-size: 14px; }
  .hero-actions .button { min-height: 40px; padding-inline: 12px; font-size: 10px; }
  .dashboard-shell { grid-template-columns: 30px minmax(0, 1fr); border-radius: 14px; }
  .dashboard-rail { gap: 15px; }
  .dashboard-content { padding: 10px 7px 47px; }
  .dashboard-heading { align-items: flex-start; }
  .dashboard-heading h2 { padding-top: 5px; font-size: 12px; }
  .dashboard-filters { flex-wrap: wrap; justify-content: flex-end; gap: 4px; }
  .filter-chip, .demo-chip { min-height: 22px; padding-inline: 6px; font-size: 7px; }
  .metric-grid { gap: 4px; }
  .metric-card { min-height: 61px; padding: 7px 5px; }
  .metric-card p { font-size: 7px; }
  .metric-card strong { font-size: 18px; }
  .metric-card > span { font-size: 7px; }
  .metric-icon { right: 5px; top: 27px; width: 12px; height: 12px; }
  .dashboard-lower { grid-template-columns: minmax(0, 1.4fr) minmax(96px, .8fr); gap: 4px; }
  .chart-card, .funnel-card { min-height: 130px; padding: 7px 5px; }
  .chart-card h3, .funnel-card h3 { font-size: 8px; }
  .chart-area { height: 77px; grid-template-columns: 16px minmax(0, 1fr); }
  .chart-y-labels { font-size: 6px; }
  .chart-dates { margin-left: 16px; font-size: 6px; }
  .chart-legend { gap: 5px; font-size: 6px; }
  .funnel-card { gap: 11px; }
  .funnel-row { grid-template-columns: 1fr auto; font-size: 7px; }
  .funnel-row > b { display: none; }
  .funnel-bar-one { width: 48px; }.funnel-bar-two { width: 32px; }.funnel-bar-three { width: 20px; }
  .next-action { right: 6px; bottom: 6px; min-width: 160px; }
  .solutions-section h2, .audience-section h2, .process-section > .site-container > h2 { font-size: 23px; }
  .solutions-grid, .audience-grid { grid-template-columns: 1fr; gap: 8px; }
  .solution-item, .audience-card { min-height: 72px; }
  .funnel-copy h2, .ai-copy h2 { font-size: 29px; }
  .pipeline-window { padding: 6px; }
  .pipeline-toolbar { padding-inline: 3px; font-size: 7px; }
  .pipeline-columns { gap: 3px; }
  .pipeline-column { padding: 4px; }
  .pipeline-column h3 { font-size: 7px; }
  .pipeline-column h3 small { font-size: 6px; }
  .pipeline-column article { gap: 3px; padding: 3px; }
  .pipeline-column article strong, .pipeline-column article small { font-size: 6px; }
  .avatar { width: 18px; height: 18px; flex-basis: 18px; font-size: 6px; }
  .ai-section { border-radius: 15px; }
  .assistant-window { padding: 9px; }
  .assistant-note { gap: 8px; padding: 9px; }
  .automation-box { padding-inline: 8px; }
  .automation-flow { gap: 4px; }
  .automation-flow > span { flex-direction: column; gap: 4px; text-align: center; }
  .automation-flow > b { font-size: 11px; }
  .automation-flow small { font-size: 7px; }
  .automation-icon { width: 30px; height: 30px; }
  .cta-inner { align-items: flex-start; flex-direction: column; padding: 19px; }
  .cta-inner h2 { font-size: 22px; }
  .footer-inner { align-items: flex-start; flex-wrap: wrap; }
  .site-footer nav { width: 100%; justify-content: flex-start; gap: 13px; }
  .copyright { margin-left: auto; }
}

@media (prefers-reduced-motion: reduce) {
  .landing-page *, .landing-page *::before, .landing-page *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; }
}
</style>
