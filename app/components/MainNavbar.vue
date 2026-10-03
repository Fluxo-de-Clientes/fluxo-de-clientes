<template>
  <UDashboardNavbar :ui="{ left: 'min-w-0' }" class="border-b-0 sm:px-4">
    <template #title><slot name="title">Fluxo de Clientes</slot></template>
    <template #right>
      <slot />
      <UColorModeButton />
      <UButton to="/app/contatos/novo" icon="i-lucide-user-plus" color="neutral" variant="ghost" class="lg:hidden" aria-label="Novo contato" />
    </template>
  </UDashboardNavbar>
</template>
