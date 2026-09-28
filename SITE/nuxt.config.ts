import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-09-28',
  devtools: { enabled: false },
  ssr: true,
  modules: ['@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  components: [{ path: '~/components', pathPrefix: false }],
  vite: { plugins: [tailwindcss()] },
  typescript: { strict: true },
  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      meta: [{ name: 'theme-color', content: '#F8F4EC' }],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/icons/icone-app-192.png' },
      ],
    },
  },
  runtimeConfig: {
    public: {
      siteUrl: '',
      loginUrl: 'https://app.fluxodeclientes.com.br',
      demoEndpoint: '',
      demoUrl: '',
      contactUrl: '',
      privacyUrl: '',
      termsUrl: '',
    },
  },
  routeRules: { '/': { prerender: true } },
  nitro: {
    prerender: { routes: ['/robots.txt', '/sitemap.xml'], crawlLinks: false },
  },
})
