<script setup lang="ts">
import { ref } from 'vue'
import { navigation } from '~/data/content'

const menuOpen = ref(false)
const menuToggle = ref<HTMLButtonElement>()
const { openDemo } = useDemo()
const config = useRuntimeConfig()

function closeMenu(restoreFocus = false) {
  menuOpen.value = false
  if (restoreFocus) menuToggle.value?.focus()
}

function requestDemoFromMenu() {
  closeMenu()
  return openDemo()
}
</script>

<template>
  <header class="site-container py-4" @keydown.esc="closeMenu(true)">
    <div class="od-row justify-between gap-6">
      <a href="#inicio" aria-label="Fluxo de Clientes, início" class="shrink-0"><BrandLogo /></a>
      <nav aria-label="Navegação principal" class="hidden xl:block">
        <ul class="od-row gap-6 list-none p-0 m-0">
          <li v-for="item in navigation" :key="item.href">
            <a :href="item.href" class="nav-link flex min-h-11 items-center font-medium">{{ item.label }}</a>
          </li>
        </ul>
      </nav>
      <div class="hidden xl:flex items-center gap-4">
        <a
          v-if="config.public.loginUrl"
          :href="String(config.public.loginUrl)"
          class="button border-border bg-transparent"
          >Entrar</a
        >
        <BaseButton @click="openDemo">Solicitar demonstração</BaseButton>
      </div>
      <button
        ref="menuToggle"
        class="icon-button xl:hidden"
        :aria-expanded="menuOpen"
        aria-controls="mobile-menu"
        :aria-label="menuOpen ? 'Fechar menu' : 'Abrir menu'"
        @click="menuOpen = !menuOpen"
      >
        <AppIcon :name="menuOpen ? 'close' : 'menu'" />
      </button>
    </div>
    <nav
      v-if="menuOpen"
      id="mobile-menu"
      aria-label="Navegação mobile"
      class="border-t border-border mt-4 pt-4 pb-2 xl:hidden"
    >
      <ul class="od-stack list-none p-0 m-0">
        <li v-for="item in navigation" :key="item.href">
          <a :href="item.href" class="flex items-center min-h-11 font-medium" @click="closeMenu()">{{
            item.label
          }}</a>
        </li>
      </ul>
      <div class="od-cluster gap-4 mt-4">
        <BaseButton v-if="config.public.loginUrl" :href="String(config.public.loginUrl)" variant="secondary"
          >Entrar</BaseButton
        >
        <BaseButton @click="requestDemoFromMenu">Solicitar demonstração</BaseButton>
      </div>
    </nav>
  </header>
</template>
