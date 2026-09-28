<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'original' | 'reverso'; symbol?: boolean }>(), { variant: 'original' })
</script>

<template>
  <img
    v-if="symbol"
    src="/brand/simbolo-original.svg"
    width="264"
    height="272"
    alt=""
    class="od-media brand-symbol"
    decoding="async"
  />
  <img
    v-else
    :src="`/brand/assinatura-horizontal-${variant}.svg`"
    width="543"
    height="200"
    alt="Fluxo de Clientes"
    class="od-media brand-logo"
    decoding="async"
    fetchpriority="high"
  />
</template>
