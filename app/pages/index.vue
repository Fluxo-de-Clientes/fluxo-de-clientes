<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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
  { question: 'Como conhecer os recursos disponíveis?', answer: 'Solicite uma demonstração e informe o que precisa organizar. A equipe vai apresentar as possibilidades para o seu caso.' }
]

const landingRoot = ref<HTMLElement | null>(null)
let motion: ReturnType<typeof gsap.matchMedia> | undefined

onMounted(() => {
  motion = gsap.matchMedia()
  motion.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.hero-copy > *', { opacity: 0, y: 16, stagger: 0.08, duration: 0.55 })
      .from('.hero-visual', { opacity: 0, y: 20, duration: 0.7 }, '-=0.5')

    gsap.utils.toArray<HTMLElement>('[data-reveal]', landingRoot.value).forEach((element) => {
      gsap.from(element, {
        y: 18,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: element, start: 'top 92%', once: true }
      })
    })
  }, landingRoot.value!)
})

onBeforeUnmount(() => motion?.revert())
</script>

<template>
  <div ref="landingRoot" class="landing-page">
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
          <NuxtLink to="/entrar" class="button button-light">Entrar</NuxtLink>
          <NuxtLink to="/demonstracao" class="button button-dark">Solicitar demonstração</NuxtLink>
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
              <NuxtLink to="/demonstracao" class="button button-dark button-arrow">
                Solicitar demonstração <UIcon name="i-lucide-arrow-right" />
              </NuxtLink>
              <a class="button button-sage" href="#solucoes">Explorar a plataforma</a>
            </div>
            <p class="hero-note">Uma visão clara de quem chega e do que acontece depois.</p>
          </div>

          <div class="hero-visual">
            <LandingDashboardPreview @open-demo="navigateTo('/demonstracao')" />
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
          <LandingPipelinePreview />
          <div class="funnel-copy">
            <h2>Entenda onde as conversas param.</h2>
            <p>Acompanhe o caminho entre o primeiro contato e o próximo passo.</p>
            <ul>
              <li><UIcon name="i-lucide-circle-check" /> Origem do contato</li>
              <li><UIcon name="i-lucide-circle-check" /> Etapa e responsável</li>
              <li><UIcon name="i-lucide-circle-check" /> Histórico da conversa</li>
            </ul>
            <NuxtLink to="/demonstracao?interesse=funil" class="text-link">Conhecer o funil <UIcon name="i-lucide-arrow-right" /></NuxtLink>
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
              <div><strong>Há conversas aguardando retorno.</strong><p>Alguns contatos estão sem atividade há mais de 3 dias. Reveja e defina o próximo passo.</p><span class="button button-assistant" aria-hidden="true">Exemplo ilustrativo</span></div>
            </div>
            <LandingCustomerFlow />
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
          <NuxtLink to="/demonstracao" class="button button-dark button-arrow">Solicitar demonstração <UIcon name="i-lucide-arrow-right" /></NuxtLink>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="site-container footer-inner">
        <NuxtLink to="/" class="footer-brand" aria-label="Fluxo de Clientes, início"><BrandLogo class="footer-logo" /><small>Marketing, atendimento e dados conectados.</small></NuxtLink>
        <nav aria-label="Navegação do rodapé"><a href="#plataforma">Plataforma</a><NuxtLink to="/demonstracao">Demonstração</NuxtLink><NuxtLink to="/entrar">Entrar</NuxtLink></nav>
        <small class="copyright">© 2026 FLUXO DE CLIENTES</small>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.landing-page {
  --ink: #151713;
  --muted: #62685e;
  --line: #e6e8e2;
  --paper: #fbfbf8;
  --surface: #fff;
  --orange: #f0440b;
  --orange-soft: #fff0e9;
  --sage: #eef1e8;
  --green: #20261d;
  --preview-ink: #24271f;
  --preview-muted: #62685e;
  --preview-border: #e2e6dc;
  --preview-surface: #fff;
  --preview-subtle: #f6f7f3;
  --preview-coral: #f46b4d;
  --preview-sage: #eef1e9;
  --preview-radius: 16px;
  --preview-shadow: 0 20px 60px rgb(36 39 31 / 8%), 0 2px 8px rgb(36 39 31 / 4%);
  color: var(--ink);
  background: var(--paper);
  font-family: "DM Sans", "Avenir Next", "Segoe UI", sans-serif;
  font-size: 14px;
  line-height: 1.45;
  overflow-x: clip;
}

.landing-page *, .landing-page *::before, .landing-page *::after { box-sizing: border-box; }
.landing-page :deep(:focus-visible) { outline: 3px solid #ae3e20; outline-offset: 4px; }
.ai-section :deep(:focus-visible) { outline-color: #ffb39c; }
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
.hero-section { padding: 44px 0 64px; }
.hero-grid { display: grid; grid-template-columns: minmax(290px, .76fr) minmax(0, 1.24fr); align-items: center; gap: 40px; }
.hero-visual { min-width: 0; }
.hero-copy { max-width: 470px; }
.eyebrow { margin: 0 0 13px; color: #656961; font-size: 10px; font-weight: 700; letter-spacing: .08em; }
.eyebrow span { color: #b7bab1; padding-inline: 2px; }
.hero-copy h1 { max-width: 480px; margin: 0; font-size: clamp(38px, 4vw, 54px); font-weight: 800; letter-spacing: 0; line-height: 1.03; }
.hero-copy h1 span, .solutions-section h2 span { color: var(--orange); }
.hero-description { max-width: 420px; margin: 14px 0 18px; color: var(--muted); font-size: 16px; line-height: 1.5; }
.hero-actions { flex-wrap: wrap; gap: 10px; }
.hero-note { max-width: 320px; margin: 22px 0 0; color: var(--muted); font-size: 12px; line-height: 1.6; }
.solutions-section { padding: 36px 0 40px; border-radius: 28px 28px 0 0; background: rgba(255, 255, 255, .73); }
.solutions-section h2, .audience-section h2, .faq-section h2, .process-section > .site-container > h2 { margin: 0 0 15px; font-size: 27px; font-weight: 800; letter-spacing: 0; line-height: 1.15; }
.solutions-section h2 { margin-bottom: 14px; text-align: center; }
.solutions-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
.solution-item, .audience-card { min-height: 87px; display: flex; align-items: center; gap: 13px; padding: 13px 15px; border: 1px solid var(--line); border-radius: 12px; background: rgba(255, 255, 255, .82); }
.solution-icon, .process-icon { width: 47px; height: 47px; flex: 0 0 47px; display: grid; place-items: center; border-radius: 50%; background: var(--orange-soft); color: var(--orange); }
.solution-icon :deep(svg), .process-icon :deep(svg) { width: 21px; height: 21px; stroke-width: 1.8; }
.solution-item h3, .audience-card h3 { margin: 0 0 4px; font-size: 13px; font-weight: 800; }
.solution-item p, .audience-card p { margin: 0; color: var(--muted); font-size: 11px; line-height: 1.35; }
.funnel-section { padding: 56px 0; background: var(--sage); }
.funnel-grid { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(270px, .7fr); align-items: center; gap: 48px; }
.funnel-copy { max-width: 360px; }
.funnel-copy h2, .ai-copy h2 { margin: 0; font-size: 31px; font-weight: 800; line-height: 1.08; }
.funnel-copy > p, .ai-copy > p { margin: 11px 0 17px; color: var(--muted); font-size: 15px; line-height: 1.45; }
.funnel-copy ul { display: grid; gap: 8px; margin: 0 0 18px; padding: 0; list-style: none; }
.funnel-copy li { display: flex; align-items: center; gap: 10px; font-size: 13px; }
.funnel-copy li :deep(svg) { width: 20px; height: 20px; color: #f46b4d; fill: #f46b4d; stroke: #fff; }
.text-link { display: inline-flex; align-items: center; gap: 8px; color: #d65332; font-size: 13px; font-weight: 700; text-decoration: underline; text-underline-offset: 4px; }
.text-link :deep(svg) { width: 15px; height: 15px; }
.ai-section { padding: 48px 0; border-radius: 20px; background: #20251d; color: #fff; }
.ai-grid { display: grid; grid-template-columns: minmax(230px, .72fr) minmax(0, 1.28fr); align-items: center; gap: 58px; }
.ai-copy { padding: 9px 0; }
.ai-copy h2 { max-width: 330px; font-size: 34px; }
.ai-copy > p { max-width: 355px; color: #e0e3dc; }
.control-pill { display: inline-flex; align-items: center; gap: 8px; margin-top: 3px; padding: 9px 14px; border: 1px solid rgba(255,255,255,.17); border-radius: 24px; background: rgba(255,255,255,.08); color: #e4e7df; font-size: 11px; }
.control-pill :deep(svg) { width: 15px; height: 15px; }
.assistant-window { padding: 20px; border: 1px solid rgba(227, 234, 218, .35); border-radius: 15px; background: rgba(255,255,255,.035); }
.assistant-heading, .assistant-heading > span { display: flex; align-items: center; }
.assistant-heading { justify-content: space-between; gap: 12px; margin-bottom: 16px; font-size: 14px; font-weight: 700; }
.assistant-heading > span { gap: 9px; }
.assistant-heading > span :deep(svg) { width: 16px; height: 16px; color: var(--orange); }
.assistant-heading small { padding: 4px 9px; border: 1px solid rgba(255,255,255,.3); border-radius: 12px; color: #dadfd4; font-size: 11px; font-weight: 500; }
.assistant-note { display: flex; gap: 13px; padding: 13px; border: 1px solid rgba(227,234,218,.14); border-radius: 12px; background: rgba(255,255,255,.05); }
.assistant-note > :deep(svg) { width: 23px; height: 23px; flex: 0 0 23px; color: #f46b4d; }
.assistant-note strong { font-size: 14px; }
.assistant-note p { max-width: 500px; margin: 4px 0 9px; color: #d4d8d0; font-size: 12px; line-height: 1.4; }
.button-assistant { min-height: 40px; padding-inline: 14px; background: #fff; color: #22271f; font-size: 12px; }
.process-section { padding: 44px 0; }
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
  .funnel-grid { gap: 30px; }
}

@media (max-width: 1150px) {
  .site-header { height: auto; min-height: 68px; }
  .header-inner { min-height: 68px; flex-wrap: wrap; padding-block: 10px; }
  .main-nav { order: 3; width: 100%; justify-content: center; gap: 24px; padding: 4px 0 2px; }
  .hero-grid { grid-template-columns: 1fr; gap: 32px; padding-block: 0; }
  .hero-section { padding: 32px 0 40px; }
  .hero-copy { max-width: 560px; }
  .hero-copy h1 { max-width: 520px; font-size: clamp(38px, 7vw, 52px); }
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
  .main-nav { justify-content: space-between; gap: 8px; }
  .main-nav a { font-size: 12px; }
  .hero-grid { padding-top: 17px; }
  .hero-copy h1 { font-size: 38px; }
  .hero-description { font-size: 16px; }
  .hero-actions .button { min-height: 44px; padding-inline: 14px; font-size: 12px; }
  .solutions-section h2, .audience-section h2, .process-section > .site-container > h2 { font-size: 23px; }
  .solutions-grid, .audience-grid { grid-template-columns: 1fr; gap: 8px; }
  .solution-item, .audience-card { min-height: 72px; }
  .funnel-copy h2, .ai-copy h2 { font-size: 29px; }
  .ai-section { border-radius: 15px; }
  .assistant-window { padding: 9px; }
  .assistant-note { gap: 8px; padding: 9px; }
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
