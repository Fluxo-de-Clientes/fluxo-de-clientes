<script setup lang="ts">
definePageMeta({ middleware: 'global-auth' })

const { organizations, loading, loadError, refresh } = useCurrentOrganization()

onMounted(async () => {
  await refresh()
  if (loadError.value) return
  await navigateTo(organizations.value.length ? '/app/contatos' : '/app/configuracao')
})
</script>

<template>
  <div class="flex flex-1 items-center justify-center p-8">
    <div class="space-y-4 text-center">
      <p v-if="loading" class="text-muted">Carregando sua empresa…</p>
      <UAlert v-else-if="loadError" color="error" variant="subtle" :description="loadError" />
    </div>
  </div>
</template>
