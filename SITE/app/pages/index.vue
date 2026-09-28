<script setup lang="ts">
useLandingSeo()
</script>

<template>
  <div id="inicio">
    <a href="#conteudo" class="skip-link">Pular para o conteúdo</a>
    <AppHeader />
    <main id="conteudo" tabindex="-1">
      <HeroSection />
      <BusinessStagesSection />
      <CustomerFunnelSection />
      <AISection />
      <HowItWorksSection />
      <div class="bg-surface/60 rounded-t-panel pb-8"><AudienceSection /><FAQSection /><FinalCTA /></div>
    </main>
    <AppFooter />
    <DemoRequestDialog />
  </div>
</template>
