---
name: ptbr-content-seo
description: 'Use when writing or editing Brazilian Portuguese landing-page copy, product messaging, headings, calls to action, FAQ, metadata, canonical URLs, or SEO.'
---
# Conteúdo pt-BR e SEO

## Voz e promessa
- Público: pequenas e médias empresas que precisam organizar dados, tráfego, funil, marketing e atendimento.
- Use português brasileiro natural, frases diretas e termos concretos; explique jargão quando inevitável.
- Mantenha consistência entre promessa principal, prova do produto, benefícios, FAQ e CTA.
- Trate painéis, métricas, contatos e sugestões como demonstração fictícia; nunca crie depoimentos, clientes ou resultados.

## Procedimento
1. Procure texto compartilhado em `SITE/app/data/content.ts`; texto específico pode viver no componente da seção.
2. Preserve nomes de rotas/âncoras, acessibilidade dos controles e hierarquia de headings.
3. Revise title, description, Open Graph, canonical, robots e sitemap junto com `SITE/app/composables/useLandingSeo.ts` e `SITE/server/routes/`.
4. Não habilite indexação sem `NUXT_PUBLIC_SITE_URL` correto; variáveis públicas são definidas no build estático.
5. Verifique que texto não contradiz disponibilidade real de demonstração, contato, privacidade ou termos.

## Critério
Cada seção deve acrescentar informação, evitar repetição e terminar com um próximo passo compreensível, sem prometer resultado não comprovado.