<script setup lang="ts">
const { openDemo } = useDemo()
</script>

<template>
  <section id="plataforma" aria-labelledby="hero-title" class="site-container pt-6 pb-12 lg:pt-8 lg:pb-16">
    <div class="grid items-center gap-10 lg:gap-8 lg:grid-cols-[.85fr_1.15fr]">
      <div class="min-w-0">
        <p class="eyebrow mb-4">
          MARKETING <span class="px-1">•</span> ATENDIMENTO <span class="px-1">•</span> DADOS
        </p>
        <h1
          id="hero-title"
          class="text-[length:var(--heading-hero)] leading-[1.08] tracking-[-.045em] font-bold"
        >
          Marketing,<br />atendimento e dados<br />no <span class="text-brand">mesmo lugar.</span>
        </h1>
        <p class="section-copy mt-6 max-w-lg">
          Organize conversas, acompanhe o funil e use IA para apoiar a próxima decisão.
        </p>
        <div class="od-cluster gap-4 mt-8">
          <BaseButton arrow @click="openDemo">Solicitar demonstração</BaseButton>
          <BaseButton href="#recursos" variant="secondary">Explorar a plataforma</BaseButton>
        </div>
        <p class="mt-8 text-muted text-sm">Uma visão clara de quem chega e do que acontece depois.</p>
      </div>
      <HeroDashboard />
    </div>
  </section>
</template>
