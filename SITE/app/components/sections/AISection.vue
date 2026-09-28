<template>
  <section
    id="inteligencia"
    aria-labelledby="ai-title"
    class="section-space bg-dark-surface text-paper rounded-panel"
    data-dark
  >
    <div class="site-container grid items-center gap-10 lg:gap-12 lg:grid-cols-[.8fr_1.2fr]">
      <div>
        <SectionTitle id="ai-title"
          >IA que ajuda a<br class="hidden lg:block" />
          equipe a agir.</SectionTitle
        >
        <p class="section-copy text-dark-muted mt-5">
          Resumos, sinais de atenção e sugestões para organizar a rotina.
        </p>
        <div class="od-row gap-3 mt-8 rounded-full border border-white/20 bg-white/5 w-fit px-5 py-3">
          <AppIcon name="shield" :size="24" /><span>A equipe mantém o controle</span>
        </div>
      </div>
      <AIAssistantPanel />
    </div>
  </section>
</template>
