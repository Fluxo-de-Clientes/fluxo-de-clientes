<script setup lang="ts">
import { pt_br } from '@nuxt/ui/locale'

useHead({
  htmlAttrs: { lang: 'pt-BR' },
  link: [
    { rel: 'icon', type: 'image/x-icon', sizes: '32x32', href: '/favicon.ico?v=fluxo-20261002' },
    { rel: 'icon', type: 'image/svg+xml', sizes: 'any', href: '/brand/simbolo-original.svg' }
  ]
})
useSeoMeta({ title: 'Fluxo de Clientes', description: 'Organize contatos, acompanhe o atendimento e defina a próxima ação da equipe.' })
</script>

<template>
  <UApp :locale="pt_br" :toaster="{ position: 'top-right' }">
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator color="var(--ui-primary)" />
    <NuxtLayout><NuxtPage /></NuxtLayout>
  </UApp>
</template>
