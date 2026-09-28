# FLUXO DE CLIENTES

Landing page oficial em Nuxt 4.5.2, Vue 3, TypeScript e Tailwind CSS 4. A estrutura segue a referência fornecida e utiliza a identidade oficial do kit v1.0. Os painéis são componentes Vue com dados fictícios identificados como demonstração.

## Requisitos e instalação

Node.js 22 LTS a partir de 22.19 (ambiente de referência: 22.23.1) ou Node 24 LTS a partir de 24.11. pnpm 12.6.0.

```sh
pnpm install
pnpm dev
```

Acesse o endereço exibido no terminal, normalmente `http://127.0.0.1:3000`.

Sem pnpm global, use `npm exec --yes --package=pnpm@12.6.0 -- pnpm install` e o mesmo prefixo para os demais comandos. No PowerShell com execução de scripts restrita, invoque `npm.cmd` ou `pnpm.cmd`.

## Build, geração e qualidade

```sh
pnpm typecheck
pnpm lint
pnpm test:install
pnpm test
pnpm build
pnpm preview
```

`test:install` instala apenas o Chromium usado pela suíte. Os testes verificam a página, seções, marca, FAQ, navegação, formulário, exemplos interativos e overflow nos quatro breakpoints. Não produzem screenshots, vídeo ou traces.

Para hospedagem estática:

```sh
pnpm generate
```

Publique `.output/public`. O comando `pnpm deliver` também gera o site e copia a entrada `index.html` e suas dependências para a raiz, para uso no Open Design. **Edite os arquivos de `app/`, nunca o HTML gerado.** A raiz publicada pelo Open Design e `.output/public` vêm do mesmo Nuxt.

Os arquivos de entrega copiados para a raiz (`index.html`, `_nuxt/` e assets) são gerados e ignorados pelo Git. O ZIP de entrega da landing e caches exportados não são fontes do projeto.

Para um servidor Node/Nitro, use `pnpm build` e `pnpm preview`, ou execute `.output/server/index.mjs` com `NODE_ENV=production` no ambiente do processo.

## Estrutura

```text
app/
  assets/css/       # Tokens Tailwind, Barlow local e estilos compartilhados
  components/       # Peças de interface organizadas por camada e domínio
    layout/         # Header, footer e apresentação da marca
    hero/           # Abertura da landing
    sections/       # Seções de conteúdo e composição da página
    features/       # Demonstrações da plataforma, separadas por domínio
      dashboard/    # Visão geral e métricas demonstrativas
      funnel/       # Funil e contatos fictícios
      ai/           # Sugestões demonstrativas de IA
    forms/          # Formulário de demonstração
    ui/             # Primitivos visuais compartilhados
    cards/          # Cards reutilizados pelas seções
  composables/     # Demonstração e SEO
  data/content.ts  # Navegação, cards, FAQ e dados demonstrativos
  pages/index.vue  # Composição da página
  types/           # Tipos dos dados e componentes
public/
  brand/           # SVGs oficiais, sem alterações
  icons/           # Ícones de aplicação do kit
  images/          # Open Graph oficial, 1200 × 630
  favicon.png      # Original preservado, 512 × 512
server/routes/     # robots.txt e sitemap.xml; nenhum backend comercial
shared/utils/      # Normalização da origem pública
tests/e2e/         # Playwright com @nuxt/test-utils
scripts/           # Entrega da entrada gerada ao Open Design
```

## Textos, aparência e links

Textos repetidos estão em `app/data/content.ts`; headlines e textos de cada seção estão em seus componentes. Tokens ficam em `app/assets/css/main.css`, usando a configuração CSS `@theme` do Tailwind 4, sem `tailwind.config.ts` legado. Os ícones utilizam apenas `@lucide/vue`, com importação seletiva.

Copie `.env.example` para `.env` e preencha apenas os valores necessários:

| Variável                    | Uso                                                                     |
| --------------------------- | ----------------------------------------------------------------------- |
| `NUXT_PUBLIC_SITE_URL`      | Origem HTTPS real, sem caminho; habilita canonical, indexação e sitemap |
| `NUXT_PUBLIC_LOGIN_URL`     | Link de acesso; o padrão é o ambiente citado no kit                     |
| `NUXT_PUBLIC_DEMO_URL`      | Página externa real de agendamento; tem prioridade sobre o formulário   |
| `NUXT_PUBLIC_DEMO_ENDPOINT` | Endpoint real autorizado para receber o formulário                      |
| `NUXT_PUBLIC_CONTACT_URL`   | Canal oficial de contato                                                |
| `NUXT_PUBLIC_PRIVACY_URL`   | Documento oficial de privacidade                                        |
| `NUXT_PUBLIC_TERMS_URL`     | Termos oficiais                                                         |

No modo estático, essas variáveis são incorporadas **durante o build**. Gere novamente depois de alterá-las. Sem `SITE_URL`, o site permanece `noindex` e o sitemap vazio para evitar indexar uma prévia com domínio incorreto.

O formulário usa POST JSON com `{ name, email, company, message }`. Uma integração real deve responder 2xx e `{ "success": true }`. CORS, proteção contra abuso, validação no servidor, destino e política de tratamento dos dados são responsabilidade dessa integração. Não há credenciais no frontend.

Sem URL ou endpoint de demonstração, o formulário permite conferir os campos, informa que o agendamento está indisponível e **não envia dados nem simula sucesso**. Sem URLs de contato e documentos legais, os respectivos controles apresentam um aviso de indisponibilidade. Esses destinos devem ser configurados antes do lançamento comercial. Os campos e as alterações do funil não são persistidos.

## Netlify

Importe o repositório [familia-calango-br/fluxo-de-clientes](https://github.com/familia-calango-br/fluxo-de-clientes) e selecione a branch `main`. Configure **Base directory: `SITE`**, **Build command: `pnpm generate`** e **Publish directory: `.output/public`** (relativa à base). A base deve ser `SITE` porque a raiz reúne também um painel independente; apenas selecionar Package directory não muda a pasta de instalação.

O `netlify.toml` desta pasta define build, publicação, Node e pnpm. Cadastre as variáveis públicas da tabela acima nas variáveis de ambiente do Netlify, disponíveis durante o build. Nunca use `NUXT_PUBLIC_*` para chaves privadas. Depois de alterar as variáveis, faça um novo deploy.

A configuração segue a [documentação oficial de monorepositórios do Netlify](https://docs.netlify.com/build/configure-builds/monorepos/). Não é necessário banco de dados, função comercial ou serviço de terceiros para exibir o site. A arquitetura mantém compatibilidade com Node/Nitro.

## Identidade e acessibilidade

A marca segue o kit oficial em `../../PROJETO COMPLETO - REGRAS MARCA LOGO/FLUXO_DE_CLIENTES_MARCA_v1/`. A assinatura horizontal preserva a proporção 543:200 e o mínimo de 240 px. O favicon mantém o SHA-256 `8998ddec71dda58027306507a519719beffa6258929a284c496a3f10b31c986a`.

Barlow é a alternativa local adotada porque a fonte de interface não foi fornecida. O lettering do logotipo não depende dela. A licença da fonte está em `public/licenses/Barlow-OFL.txt`; a origem e as decisões de aplicação estão em `docs/identity.md`.

Há HTML semântico, skip link, foco visível, diálogos nativos com retorno de foco, FAQ por teclado e movimento reduzido. Metas de Lighthouse: Performance ≥90 e demais categorias ≥95; são metas, não pontuações declaradas como medidas. A fidelidade foi implementada a partir da imagem, sem alegar inspeção visual após a geração final.
