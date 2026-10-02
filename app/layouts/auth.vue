<template>
  <main class="flex min-h-screen items-center justify-center bg-neutral-50 px-4 py-10 dark:bg-neutral-950">
    <section class="w-full max-w-md rounded-2xl border border-default bg-default p-6 shadow-sm sm:p-8">
      <NuxtLink to="/" class="mb-8 flex justify-center" aria-label="Fluxo de Clientes, início">
        <BrandLogo class="w-60 max-w-full" />
      </NuxtLink>
      <slot />
    </section>
  </main>
</template>
