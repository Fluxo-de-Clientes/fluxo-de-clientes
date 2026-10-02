<template>
  <UDashboardNavbar :ui="{ left: 'min-w-0' }" class="border-b-0 sm:px-4">
    <template #title><slot name="title">Fluxo de Clientes</slot></template>
    <template #right>
      <slot />
      <UColorModeButton />
      <UButton to="/" icon="i-lucide-circle-plus" color="neutral" variant="ghost" class="lg:hidden" aria-label="Nova conversa" />
    </template>
  </UDashboardNavbar>
</template>
