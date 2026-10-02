<script setup lang="ts">
import { pt_br } from '@nuxt/ui/locale'

useHead({ htmlAttrs: { lang: 'pt-BR' } })
useSeoMeta({ title: 'Fluxo de Clientes', description: 'Organize contatos, acompanhe o atendimento e defina a próxima ação da equipe.' })
</script>

<template>
  <UApp :locale="pt_br" :toaster="{ position: 'top-right' }">
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator color="var(--ui-primary)" />
    <NuxtLayout><NuxtPage /></NuxtLayout>
  </UApp>
</template>
