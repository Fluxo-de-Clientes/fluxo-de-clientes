<script setup lang="ts">
const { openDemo } = useDemo()
</script>

<template>
  <section
    id="demonstracao"
    aria-labelledby="final-title"
    class="site-container bg-brand rounded-panel p-8 lg:p-12"
  >
    <div class="od-cluster gap-6 justify-between">
      <div class="od-field">
        <h2 id="final-title" class="section-title">Vamos organizar o seu fluxo?</h2>
        <p class="mt-3 text-lg">Conheça a plataforma e veja o que faz sentido para sua operação.</p>
      </div>
      <BaseButton arrow @click="openDemo">Solicitar demonstração</BaseButton>
    </div>
  </section>
</template>
