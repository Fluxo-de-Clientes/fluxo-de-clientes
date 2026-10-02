<script setup lang="ts">
import { pt_br } from '@nuxt/ui/locale'

useHead({ htmlAttrs: { lang: 'pt-BR' } })
useSeoMeta({ title: 'Fluxo de Clientes', description: 'Interface de conversas do Fluxo de Clientes.' })
</script>

<template>
  <UApp :locale="pt_br" :toaster="{ position: 'top-right' }">
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator color="var(--ui-primary)" />
    <NuxtLayout><NuxtPage /></NuxtLayout>
  </UApp>
</template>
