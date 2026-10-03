<script setup lang="ts">
import { motion } from 'motion-v'

type IntegrationChannel = {
  id: string
  name: string
  detail: string
  icon: string
  position: string
  tone: string
  path: string
  delay: number
}

const panelRoot = ref<HTMLElement | null>(null)
const titleId = useId()
const descriptionId = useId()
const reducedMotion = ref(true)
const panelVisible = ref(false)
const compactLayout = ref(false)

const channels: IntegrationChannel[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    detail: 'Conversas e retornos',
    icon: 'i-lucide-message-circle',
    position: 'integration-channel--left-top',
    tone: 'integration-channel--green',
    path: 'M 188 72 C 276 72 308 154 444 184',
    delay: 0
  },
  {
    id: 'google',
    name: 'Google',
    detail: 'Origem de interesse',
    icon: 'i-lucide-search',
    position: 'integration-channel--left-middle',
    tone: 'integration-channel--blue',
    path: 'M 188 210 C 282 210 338 210 440 210',
    delay: 0.38
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    detail: 'Relacionamento B2B',
    icon: 'i-lucide-linkedin',
    position: 'integration-channel--left-bottom',
    tone: 'integration-channel--linkedin',
    path: 'M 188 348 C 276 348 308 266 444 236',
    delay: 0.76
  },
  {
    id: 'mercado-livre',
    name: 'Mercado Livre',
    detail: 'Pedidos e oportunidades',
    icon: 'i-lucide-shopping-bag',
    position: 'integration-channel--right-top',
    tone: 'integration-channel--yellow',
    path: 'M 812 72 C 724 72 692 154 556 184',
    delay: 0.22
  },
  {
    id: 'nuvemshop',
    name: 'Nuvemshop',
    detail: 'Loja e clientes',
    icon: 'i-lucide-store',
    position: 'integration-channel--right-middle',
    tone: 'integration-channel--purple',
    path: 'M 812 210 C 718 210 662 210 560 210',
    delay: 0.6
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    detail: 'Comércio conectado',
    icon: 'i-lucide-shopping-cart',
    position: 'integration-channel--right-bottom',
    tone: 'integration-channel--coral',
    path: 'M 812 348 C 724 348 692 266 556 236',
    delay: 0.98
  }
]

const shouldAnimate = computed(() => panelVisible.value && !reducedMotion.value && !compactLayout.value)
const signalAnimation = computed(() => {
  if (!shouldAnimate.value) {
    return { pathLength: 0, pathOffset: 0, opacity: 0 }
  }

  return {
    pathLength: 0.1,
    pathOffset: [0, 0.9],
    opacity: 1
  }
})

const signalTransition = {
  duration: 1.9,
  repeat: Infinity,
  ease: 'linear'
}

const flowStatus = computed(() => {
  if (reducedMotion.value) return 'Fluxo completo em modo estático.'
  if (compactLayout.value) return 'Canais organizados em uma visão compacta.'
  if (!panelVisible.value) return 'Canais preparados para o seu fluxo.'
  return 'Sinais fluindo continuamente para o centro da operação.'
})

let visibilityObserver: IntersectionObserver | undefined
let motionPreference: MediaQueryList | undefined
let compactPreference: MediaQueryList | undefined

function updateMotionPreferences() {
  reducedMotion.value = motionPreference?.matches ?? true
  compactLayout.value = compactPreference?.matches ?? false
}

onMounted(() => {
  if (!panelRoot.value) return

  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  compactPreference = window.matchMedia('(max-width: 640px)')
  updateMotionPreferences()

  motionPreference.addEventListener('change', updateMotionPreferences)
  compactPreference.addEventListener('change', updateMotionPreferences)

  visibilityObserver = new IntersectionObserver((entries) => {
    panelVisible.value = entries.some(entry => entry.isIntersecting)
  }, { threshold: 0.35 })
  visibilityObserver.observe(panelRoot.value)
})

onBeforeUnmount(() => {
  visibilityObserver?.disconnect()
  motionPreference?.removeEventListener('change', updateMotionPreferences)
  compactPreference?.removeEventListener('change', updateMotionPreferences)
})
</script>

<template>
  <section ref="panelRoot" class="integrations-panel" :aria-labelledby="titleId">
    <header class="integrations-heading">
      <p class="integrations-eyebrow">CANAIS E INTEGRAÇÕES</p>
      <h2 :id="titleId">Um fluxo central para cada conversa.</h2>
      <p>
        Visualize os canais que podem compor a sua operação e reúna os sinais que ajudam a equipe a agir com contexto.
      </p>
    </header>

    <div class="integrations-network">
      <svg class="integrations-routes" viewBox="0 0 1000 420" role="img" :aria-labelledby="`${titleId} ${descriptionId}`">
        <title>Possibilidades de canais conectados ao Fluxo de Clientes</title>
        <desc :id="descriptionId">
          Exemplo visual com WhatsApp Business, Google, LinkedIn, Mercado Livre, Nuvemshop e WooCommerce conectados a um fluxo central.
        </desc>
        <g aria-hidden="true">
          <path v-for="channel in channels" :key="`${channel.id}-route`" :d="channel.path" class="integration-route" />
          <motion.path
            v-for="channel in channels"
            :key="`${channel.id}-signal-glow`"
            :d="channel.path"
            class="integration-route-signal integration-route-signal--glow"
            :animate="signalAnimation"
            :transition="{ ...signalTransition, delay: channel.delay }"
          />
          <motion.path
            v-for="channel in channels"
            :key="`${channel.id}-signal-core`"
            :d="channel.path"
            class="integration-route-signal"
            :animate="signalAnimation"
            :transition="{ ...signalTransition, delay: channel.delay }"
          />
        </g>
      </svg>

      <article
        v-for="channel in channels"
        :key="channel.id"
        class="integration-channel"
        :class="[channel.position, channel.tone]"
      >
        <span class="integration-channel-icon" aria-hidden="true"><UIcon :name="channel.icon" /></span>
        <span class="integration-channel-copy">
          <strong>{{ channel.name }}</strong>
          <small>{{ channel.detail }}</small>
        </span>
      </article>

      <div class="integration-hub">
        <motion.div
          class="integration-hub-core"
          :animate="shouldAnimate ? { scale: [1, 1.035, 1], y: [0, -2, 0] } : { scale: 1, y: 0 }"
          :transition="{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }"
        >
          <span class="integration-hub-brand" aria-hidden="true">
            <img src="/brand/simbolo-original.svg" alt="" width="264" height="272">
          </span>
          <strong>Fluxo</strong>
        </motion.div>
        <p>Fluxo de Clientes</p>
        <span>Um só contexto para a operação.</span>
      </div>
    </div>

    <footer class="integrations-footer">
      <p>
        <span class="integration-status-dot" aria-hidden="true" />
        {{ flowStatus }}
      </p>
      <a href="https://app.fluxodeclientes.com.br" class="integrations-cta">
        Levar meu fluxo para o app <UIcon name="i-lucide-arrow-up-right" aria-hidden="true" />
      </a>
    </footer>

    <p class="integrations-caption">Exemplo ilustrativo. Os canais disponíveis dependem da configuração da sua operação.</p>
  </section>
</template>

<style scoped>
.integrations-panel {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: clamp(32px, 5vw, 58px) clamp(20px, 5vw, 64px) 24px;
  border: 1px solid #3b4636;
  border-radius: 28px;
  background:
    radial-gradient(circle at 50% 48%, rgb(107 134 95 / 22%), transparent 26%),
    radial-gradient(circle at 8% 12%, rgb(228 177 142 / 9%), transparent 24%),
    linear-gradient(135deg, #172018 0%, #20291f 52%, #182119 100%);
  box-shadow: 0 26px 62px rgb(27 35 24 / 18%);
  color: #f5f7f1;
}

.integrations-panel::before {
  position: absolute;
  z-index: -1;
  inset: 0;
  background-image: radial-gradient(rgb(224 232 215 / 13%) .7px, transparent .7px);
  background-size: 18px 18px;
  content: '';
  mask-image: linear-gradient(to bottom, black, transparent 74%);
}

.integrations-heading { max-width: 650px; margin: 0 auto; text-align: center; }
.integrations-eyebrow { margin: 0 0 9px; color: #bcdcae; font-size: 11px; font-weight: 750; letter-spacing: .14em; }
.integrations-heading h2 { margin: 0; font-size: clamp(29px, 4vw, 46px); font-weight: 750; letter-spacing: -.045em; line-height: 1.06; text-wrap: balance; }
.integrations-heading > p:last-child { max-width: 570px; margin: 14px auto 0; color: #c4cec0; font-size: clamp(14px, 1.6vw, 16px); line-height: 1.55; text-wrap: balance; }

.integrations-network { position: relative; width: min(100%, 1000px); min-height: 420px; margin: clamp(28px, 4vw, 42px) auto 16px; }
.integrations-routes { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.integration-route { fill: none; stroke: #52634d; stroke-width: 1.45; vector-effect: non-scaling-stroke; }
.integration-route-signal { fill: none; stroke: #ffd1b3; stroke-width: 2.8; stroke-linecap: round; vector-effect: non-scaling-stroke; }
.integration-route-signal--glow { stroke: #ee905c; stroke-width: 9px; filter: blur(3px); opacity: .48; }

.integration-channel {
  position: absolute;
  width: clamp(148px, 18vw, 194px);
  min-height: 78px;
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 11px 12px;
  border: 1px solid rgb(192 208 184 / 20%);
  border-radius: 17px;
  background: rgb(30 39 29 / 82%);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 5%), 0 11px 22px rgb(6 11 5 / 15%);
}

.integration-channel--left-top { top: 26px; left: 0; }
.integration-channel--left-middle { top: 171px; left: 0; }
.integration-channel--left-bottom { bottom: 26px; left: 0; }
.integration-channel--right-top { top: 26px; right: 0; }
.integration-channel--right-middle { top: 171px; right: 0; }
.integration-channel--right-bottom { right: 0; bottom: 26px; }

.integration-channel-icon { width: 42px; height: 42px; flex: 0 0 42px; display: grid; place-items: center; border-radius: 13px; border: 1px solid rgb(255 255 255 / 10%); }
.integration-channel-icon :deep(svg) { width: 20px; height: 20px; stroke-width: 2; }
.integration-channel-copy { min-width: 0; }
.integration-channel-copy strong, .integration-channel-copy small { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.integration-channel-copy strong { color: #f3f5ef; font-size: 13px; font-weight: 700; }
.integration-channel-copy small { margin-top: 3px; color: #acb9a6; font-size: 11px; }
.integration-channel--green .integration-channel-icon { background: #2f6c4e; color: #d9f1df; }
.integration-channel--blue .integration-channel-icon { background: #304f79; color: #e0efff; }
.integration-channel--linkedin .integration-channel-icon { background: #185b87; color: #dcefff; }
.integration-channel--yellow .integration-channel-icon { background: #866b23; color: #fff2c5; }
.integration-channel--purple .integration-channel-icon { background: #5a4e83; color: #eee9ff; }
.integration-channel--coral .integration-channel-icon { background: #864f3c; color: #ffe9dc; }

.integration-hub { position: absolute; top: 50%; left: 50%; width: 190px; transform: translate(-50%, -50%); text-align: center; }
.integration-hub-core { width: 116px; height: 116px; display: grid; place-content: center; gap: 7px; margin: 0 auto; border: 1px solid #9ab08d; border-radius: 28px; background: linear-gradient(145deg, #41523a, #34422f); box-shadow: 0 0 0 12px rgb(190 219 169 / 4%), 0 18px 36px rgb(5 12 4 / 28%); }
.integration-hub-brand { width: 38px; height: 39px; display: grid; place-items: center; margin: 0 auto; }
.integration-hub-brand img { width: 38px; height: auto; display: block; }
.integration-hub-core strong { color: #f5f7ef; font-size: 15px; letter-spacing: -.02em; }
.integration-hub p { margin: 15px 0 3px; color: #f3f5ee; font-size: 13px; font-weight: 700; }
.integration-hub > span { color: #b7c5b0; font-size: 11px; }

.integrations-footer { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 16px 0 0; border-top: 1px solid rgb(210 222 203 / 14%); }
.integrations-footer p { display: inline-flex; align-items: center; gap: 8px; margin: 0; color: #c4cfbe; font-size: 12px; }
.integration-status-dot { width: 7px; height: 7px; flex: 0 0 7px; border-radius: 50%; background: #c8efa2; box-shadow: 0 0 0 4px rgb(200 239 162 / 10%); }
.integrations-cta { min-height: 42px; display: inline-flex; align-items: center; gap: 8px; padding: 0 14px; border: 1px solid rgb(227 237 219 / 18%); border-radius: 12px; background: rgb(255 255 255 / 7%); color: #f4f7ef; font-size: 12px; font-weight: 700; text-decoration: none; transition: background .2s ease, transform .2s ease; }
.integrations-cta:hover { background: rgb(255 255 255 / 12%); transform: translateY(-1px); }
.integrations-cta :deep(svg) { width: 15px; height: 15px; }
.integrations-caption { margin: 12px 0 0; color: #9dac97; font-size: 10px; text-align: center; }

@media (max-width: 760px) {
  .integrations-network { min-height: 390px; }
  .integration-channel { width: 154px; }
  .integration-channel-icon { width: 38px; height: 38px; flex-basis: 38px; }
  .integration-channel-copy strong { font-size: 11px; }
  .integration-channel-copy small { font-size: 10px; }
  .integration-hub { width: 158px; }
  .integration-hub-core { width: 100px; height: 100px; border-radius: 24px; }
}

@media (max-width: 640px) {
  .integrations-panel { padding: 30px 16px 18px; border-radius: 22px; }
  .integrations-routes { display: none; }
  .integrations-network { min-height: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 9px; margin-block: 26px 18px; }
  .integration-channel, .integration-hub { position: relative; inset: auto; width: auto; transform: none; }
  .integration-channel { min-height: 74px; padding: 10px; }
  .integration-channel-copy strong { font-size: 12px; }
  .integration-channel-copy small { font-size: 10px; }
  .integration-hub { grid-column: 1 / -1; order: -1; margin-bottom: 5px; }
  .integration-hub-core { width: 92px; height: 92px; }
  .integration-hub p { margin-top: 11px; }
  .integrations-footer { align-items: flex-start; flex-direction: column; gap: 12px; }
  .integrations-cta { width: 100%; justify-content: center; }
}

@media (max-width: 390px) {
  .integrations-network { grid-template-columns: 1fr; }
  .integration-hub { grid-column: auto; }
  .integration-channel { min-height: 64px; }
}

@media (prefers-reduced-motion: reduce) {
  .integrations-cta { transition: none; }
}
</style>
