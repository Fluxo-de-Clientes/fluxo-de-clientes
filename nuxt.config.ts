// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
  '@nuxt/ui',
  '@nuxt/eslint'
],
  css: ['~/assets/css/main.css'],
  icon: {
    provider: 'none',
    serverBundle: false,
    fallbackToApi: false,
    clientBundle: { scan: true, icons: ['lucide:sun', 'lucide:moon', 'lucide:panel-left-open', 'lucide:panel-left-close', 'lucide:search', 'lucide:x', 'lucide:chevron-down', 'lucide:check'] }
  }
})