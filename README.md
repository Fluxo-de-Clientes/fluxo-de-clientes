# Fluxo de Clientes

Repositório do ecossistema Fluxo de Clientes, voltado a pequenas e médias empresas.

## Projeto web

A aplicação comercial é mantida em [`SITE/`](SITE/); essa é a única fonte do site Nuxt. Consulte [`SITE/README.md`](SITE/README.md) para instalação, desenvolvimento, testes, build e publicação. Edite os arquivos em `SITE/app/` e `SITE/public/`; as saídas de entrega são geradas e não devem ser versionadas.

## Painel demonstrativo

O console independente em React e Vite fica em [`app/Console Dashboard Client Fluxo de Clientes/fluxo-de-clientes/`](app/Console%20Dashboard%20Client%20Fluxo%20de%20Clientes/fluxo-de-clientes/). Ele usa npm e `package-lock.json`; o site Nuxt usa pnpm e `pnpm-lock.yaml`. Execute a instalação e os comandos dentro da pasta de cada projeto.

## Publicação no Netlify

Conecte este repositório e selecione a branch `main`. Para publicar os dois projetos, crie um projeto Netlify para cada um:

| Projeto | Base directory | Build command | Publish directory |
| --- | --- | --- | --- |
| Site comercial Nuxt | `SITE` | `pnpm generate` | `.output/public` |
| Painel React | `app/Console Dashboard Client Fluxo de Clientes/fluxo-de-clientes` | `npm run build` | `dist` |

As pastas de publicação são relativas à base. Cada projeto tem seu próprio `netlify.toml`. Defina a Base directory explicitamente; a raiz do repositório não contém `package.json`. Veja a [documentação de monorepositórios do Netlify](https://docs.netlify.com/build/configure-builds/monorepos/).

O site aceita as URLs públicas descritas em `SITE/.env.example`; cadastre-as nas variáveis de build do Netlify. O painel demonstrativo não precisa de variáveis de ambiente. Arquivos `.env` e segredos ficam fora do Git; prefixos públicos, como `NUXT_PUBLIC_` e `VITE_`, não devem receber segredos.

## Materiais

- `design/BRIEFING.md`: direção visual e conteúdo.
- `docs/ARQUITETURA.md`: arquitetura prevista para o ecossistema.
- `PROJETO COMPLETO - REGRAS MARCA LOGO/FLUXO_DE_CLIENTES_MARCA_v1/`: kit oficial da marca extraído.
- `PROJETO COMPLETO - REGRAS MARCA LOGO/FLUXO_DE_CLIENTES_MARCA_v1.zip`: arquivo original do kit, mantido em uma única cópia.
- `Bilioteca de SVG fluxo-clientes-svg`: acervo de ilustrações SVG do produto.
- `Briefing_Oferta_Fluxo_de_Clientes_Modelo.docx`: briefing comercial original.

Os diretórios `SITE/public/` e o kit oficial podem conter assets visualmente iguais por exigência de publicação e preservação da fonte. Arquivos temporários, caches e a cópia gerada de entrega ficam fora do Git, conforme `.gitignore`.
