import { publicOrigin } from '../../shared/utils/site'

export default defineEventHandler((event) => {
  const origin = publicOrigin(useRuntimeConfig(event).public.siteUrl)
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  const location = origin
    ? `<url><loc>${origin.replace(/&/g, '&amp;').replace(/</g, '&lt;')}/</loc></url>`
    : ''
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${location}</urlset>`
})
