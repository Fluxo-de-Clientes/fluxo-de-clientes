<script setup lang="ts">
import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

const flowRoot = ref<HTMLElement | null>(null)
const titleId = useId()
const reducedMotion = ref(true)
const playing = ref(false)
const complete = ref(false)
const activeStage = ref(2)

const stages = [
  { title: 'Contato', detail: 'Chega pelo seu canal', icon: 'M-10 12C-10 4 10 4 10 12M0 1A6 6 0 1 0 0-11A6 6 0 1 0 0 1' },
  { title: 'Conversa', detail: 'Ganha contexto', icon: 'M-12-9Q-12-12-9-12H9Q12-12 12-9V5Q12 8 9 8H-3L-10 13V8Q-12 8-12 5Z' },
  { title: 'Oportunidade', detail: 'Tem um próximo passo', icon: 'M-11 0L-3 8L12-8' }
]

let animation: gsap.core.Timeline | undefined
let media: gsap.MatchMedia | undefined
let animationContext: gsap.Context | undefined
let observer: IntersectionObserver | undefined

function replay() {
  if (reducedMotion.value || playing.value || !animation) return
  observer?.disconnect()
  complete.value = false
  animation.restart()
}

onMounted(() => {
  if (!flowRoot.value) return
  gsap.registerPlugin(DrawSVGPlugin, MorphSVGPlugin, MotionPathPlugin)

  animationContext = gsap.context(() => {
    media = gsap.matchMedia()
    media.add({
      reduce: '(prefers-reduced-motion: reduce)',
      animate: '(prefers-reduced-motion: no-preference)'
    }, (context) => {
      reducedMotion.value = Boolean(context.conditions?.reduce)
      playing.value = false
      complete.value = false
      activeStage.value = 2
      if (reducedMotion.value) return

      const paths = flowRoot.value!.querySelectorAll<SVGPathElement>('.flow-progress')
      const glyphs = flowRoot.value!.querySelectorAll<SVGPathElement>('.flow-glyph')
      const signal = flowRoot.value!.querySelector<SVGCircleElement>('.flow-signal')!
      const routeOne = flowRoot.value!.querySelector<SVGPathElement>('.flow-route-one')!
      const routeTwo = flowRoot.value!.querySelector<SVGPathElement>('.flow-route-two')!

      // Every animated property belongs to this matchMedia context and is reverted
      // when the preference changes or the component leaves the page.
      animation = gsap.timeline({
        paused: true,
        defaults: { ease: 'power2.inOut' },
        onStart: () => {
          playing.value = true
          complete.value = false
          activeStage.value = 0
        },
        onComplete: () => {
          playing.value = false
          complete.value = true
        }
      })
        .set(paths, { drawSVG: '0%' })
        .set(glyphs[1]!, { attr: { d: 'M-3 0L0-3L3 0L0 3Z' } })
        .set(glyphs[2]!, { attr: { d: 'M-3 0L0-3L3 0L0 3Z' } })
        .set(signal, { opacity: 0 })
        .to(paths[0]!, { drawSVG: '100%', duration: 0.8 }, 0.2)
        .to(signal, {
          opacity: 1,
          motionPath: { path: routeOne, align: routeOne, alignOrigin: [0.5, 0.5] },
          duration: 0.8
        }, 0.2)
        .set(signal, { opacity: 0 }, 1)
        .call(() => { activeStage.value = 1 }, [], 1)
        .to(glyphs[1]!, { morphSVG: stages[1]!.icon, duration: 0.4 }, 1)
        .to(paths[1]!, { drawSVG: '100%', duration: 0.8 }, 1.65)
        .to(signal, {
          opacity: 1,
          motionPath: { path: routeTwo, align: routeTwo, alignOrigin: [0.5, 0.5] },
          duration: 0.8
        }, 1.65)
        .set(signal, { opacity: 0 }, 2.45)
        .call(() => { activeStage.value = 2 }, [], 2.45)
        .to(glyphs[2]!, { morphSVG: stages[2]!.icon, duration: 0.4 }, 2.45)

      observer = new IntersectionObserver((entries) => {
        if (entries.some(entry => entry.isIntersecting)) replay()
      }, { threshold: 0.4 })
      observer.observe(flowRoot.value!)

      return () => {
        observer?.disconnect()
        animation = undefined
        playing.value = false
      }
    })
  }, flowRoot.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  media?.revert()
  animationContext?.revert()
})
</script>

<template>
  <section ref="flowRoot" class="customer-flow" :aria-labelledby="titleId">
    <header class="flow-heading">
      <div>
        <p class="flow-eyebrow">JORNADA DE ATENDIMENTO</p>
        <h3 :id="titleId">Do contato à oportunidade.</h3>
      </div>
      <span class="flow-heading-icon" aria-hidden="true"><UIcon name="i-lucide-workflow" /></span>
    </header>

    <div class="flow-diagram">
      <svg class="flow-visual" viewBox="0 0 600 96" fill="none" aria-hidden="true">
        <path class="flow-route flow-route-one" d="M140 48C180 48 220 48 260 48" />
        <path class="flow-route flow-route-two" d="M340 48C380 48 420 48 460 48" />
        <path class="flow-progress" d="M140 48C180 48 220 48 260 48" />
        <path class="flow-progress" d="M340 48C380 48 420 48 460 48" />
        <g v-for="(stage, index) in stages" :key="stage.title" :transform="`translate(${100 + index * 200} 48)`" class="flow-node" :class="{ 'is-reached': index <= activeStage }">
          <circle class="flow-node-halo" r="36" />
          <rect class="flow-node-box" x="-26" y="-26" width="52" height="52" rx="16" />
          <path class="flow-glyph" :d="stage.icon" />
        </g>
        <circle class="flow-signal" r="4" />
      </svg>
      <ol class="flow-labels">
        <li v-for="stage in stages" :key="stage.title">
          <strong>{{ stage.title }}</strong>
          <span>{{ stage.detail }}</span>
        </li>
      </ol>
    </div>

    <footer class="flow-footer">
      <p class="flow-caption">
        <span class="flow-status-dot" aria-hidden="true" />
        <span v-if="playing">Organizando o próximo passo…</span>
        <span v-else-if="complete">Próximo passo definido para a equipe.</span>
        <span v-else>O contexto acompanha cada etapa.</span>
      </p>
      <UButton
        class="flow-replay"
        color="neutral"
        variant="ghost"
        icon="i-lucide-rotate-ccw"
        :disabled="reducedMotion || playing"
        :title="reducedMotion ? 'Animação desativada pela preferência de movimento reduzido.' : undefined"
        @click="replay"
      >
        Reproduzir fluxo
      </UButton>
    </footer>
    <span class="flow-screen-reader" role="status">{{ complete ? 'Sequência concluída. O contato ganhou contexto na conversa e se tornou uma oportunidade com um próximo passo.' : '' }}</span>
  </section>
</template>

<style scoped>
.customer-flow { min-width: 0; margin-top: 16px; padding: clamp(16px, 3vw, 24px); border: 1px solid #59634f; border-radius: 20px; background: linear-gradient(135deg, #323b2d, #293124); color: #f6f7f2; }
.flow-heading { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.flow-eyebrow { margin: 0 0 6px; color: #bfccb4; font-size: 12px; font-weight: 600; letter-spacing: .08em; }
.flow-heading h3 { margin: 0; font-size: clamp(17px, 2vw, 21px); font-weight: 650; letter-spacing: -.025em; line-height: 1.3; }
.flow-heading-icon { display: grid; place-items: center; width: 38px; height: 38px; flex: 0 0 38px; border: 1px solid #657257; border-radius: 12px; color: #d2dfc5; }
.flow-heading-icon :deep(svg) { width: 19px; height: 19px; }
.flow-diagram { margin-block: 20px 24px; }
.flow-visual { display: block; width: 100%; height: auto; overflow: visible; }
.flow-route { stroke: #617154; stroke-width: 1.5; }
.flow-progress { stroke: #e5b39a; stroke-width: 2; stroke-linecap: round; }
.flow-node-halo { fill: #e9b292; opacity: .06; }
.flow-node-box { fill: #35432d; stroke: #829373; stroke-width: 1.5; }
.flow-node.is-reached .flow-node-box { fill: #4d583d; stroke: #c3d2ad; }
.flow-node.is-reached:last-of-type .flow-node-box { fill: #815338; stroke: #e5b39a; }
.flow-glyph { stroke: #eef2e7; stroke-width: 2; stroke-linejoin: round; stroke-linecap: round; }
.flow-signal { fill: #fff1da; opacity: 0; }
.flow-labels { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; margin: 0; padding: 0; list-style: none; text-align: center; }
.flow-labels li { min-width: 0; }
.flow-labels strong { display: block; font-size: clamp(12px, 1.3vw, 14px); font-weight: 650; }
.flow-labels span { display: block; max-width: 125px; margin: 5px auto 0; color: #c7d1be; font-size: 12px; line-height: 1.5; text-wrap: balance; }
.flow-footer { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; padding-top: 16px; border-top: 1px solid #56634a; }
.flow-caption { display: flex; align-items: center; gap: 8px; margin: 0; color: #d6dece; font-size: 12px; line-height: 1.5; }
.flow-status-dot { width: 5px; height: 5px; flex: 0 0 5px; border-radius: 50%; background: #d3dfbd; }
.flow-replay { min-height: 44px; padding: 10px 12px; border: 1px solid #859277; border-radius: 10px; color: #f3f6ed; font-size: 12px; font-weight: 600; cursor: pointer; }
.flow-replay:hover:not(:disabled) { background: #47533c; }
.flow-replay:focus-visible { outline: 2px solid #f5bf9f; outline-offset: 3px; }
.flow-replay:disabled { cursor: default; opacity: .6; }
.flow-screen-reader { position: absolute; width: 1px; height: 1px; padding: 0; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
@media (max-width: 380px) {
  .customer-flow { padding-inline: 12px; }
  .flow-heading-icon { display: none; }
  .flow-labels { gap: 3px; }
}
</style>
