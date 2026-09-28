import { publicOrigin } from '~~/shared/utils/site'

export function useLandingSeo() {
  const config = useRuntimeConfig()
  const origin = publicOrigin(config.public.siteUrl)
  const title = 'Fluxo de Clientes | Marketing, atendimento e dados no mesmo lugar'
  const description =
    'Organize conversas, acompanhe o funil e use IA para apoiar a próxima decisão. Conheça a Fluxo de Clientes e solicite uma demonstração.'
  const image = `${origin}/images/opengraph-original-1200px.png`

  useSeoMeta({
    title,
    description,
    robots: origin ? 'index, follow' : 'noindex, nofollow',
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogSiteName: 'FLUXO DE CLIENTES',
    ogLocale: 'pt_BR',
    ogUrl: origin ? `${origin}/` : undefined,
    ogImage: image,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: 'Identidade oficial da Fluxo de Clientes',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    twitterImageAlt: 'Identidade oficial da Fluxo de Clientes',
  })

  const organization = {
    '@type': 'Organization',
    name: 'FLUXO DE CLIENTES',
    ...(origin
      ? {
          '@id': `${origin}/#organization`,
          url: `${origin}/`,
          logo: `${origin}/brand/assinatura-horizontal-original.svg`,
        }
      : {}),
  }
  useHead({
    link: origin ? [{ rel: 'canonical', href: `${origin}/` }] : [],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            organization,
            ...(origin
              ? [
                  {
                    '@type': 'WebSite',
                    '@id': `${origin}/#website`,
                    name: 'FLUXO DE CLIENTES',
                    url: `${origin}/`,
                    inLanguage: 'pt-BR',
                    publisher: { '@id': `${origin}/#organization` },
                  },
                ]
              : []),
          ],
        }).replace(/</g, '\\u003c'),
      },
    ],
  })
}
