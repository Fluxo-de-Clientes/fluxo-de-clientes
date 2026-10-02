// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
  '@nuxtjs/supabase',
  '@nuxt/ui',
  '@nuxt/eslint'
],
  supabase: {
    url: process.env.NUXT_PUBLIC_SUPABASE_URL || 'https://bkhuyaivdvxjqybcglyo.supabase.co',
    redirect: true,
    redirectOptions: {
      login: '/entrar',
      callback: '/auth/callback',
      include: ['/app', '/app/**'],
      saveRedirectToCookie: true
    }
  },
  runtimeConfig: {
    public: {
      appUrl: process.env.NUXT_PUBLIC_APP_URL || ''
    }
  },
  css: ['~/assets/css/main.css'],
  icon: {
    provider: 'none',
    serverBundle: false,
    fallbackToApi: false,
    clientBundle: { scan: true, icons: ['lucide:sun', 'lucide:moon', 'lucide:panel-left-open', 'lucide:panel-left-close', 'lucide:search', 'lucide:x', 'lucide:chevron-down', 'lucide:check'] }
  }
})