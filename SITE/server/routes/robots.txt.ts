import { publicOrigin } from '../../shared/utils/site'

export default defineEventHandler((event) => {
  const origin = publicOrigin(useRuntimeConfig(event).public.siteUrl)
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return origin ? `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n'
})
