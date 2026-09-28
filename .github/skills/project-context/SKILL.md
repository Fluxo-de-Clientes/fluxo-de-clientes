---
name: project-context
description: 'Use when orienting work in this repository, changing project structure, checking whether a feature exists, or choosing the correct app source and commands.'
---
# Contexto do projeto

## Quando usar
- Antes de mudanças que envolvam arquitetura, estrutura, build ou funcionalidades citadas como futuras.
- Quando não estiver claro se uma pasta é fonte, referência de design ou saída gerada.

## Mapa canônico
- `SITE/`: aplicação comercial Nuxt 4.5, Vue 3, TypeScript estrito e Tailwind CSS 4.
- `SITE/app/`: páginas, componentes, composables, conteúdo e estilos da landing.
- `SITE/app/components/`: componentes compartilhados por camada; módulos de produto demonstrativos ficam em `features/dashboard/`, `features/funnel/` e `features/ai/`.
- `SITE/public/`: assets usados em runtime; o kit oficial extraído na raiz é a fonte normativa da marca.
- `SITE/server/routes/`: robots e sitemap, não uma API comercial.
- `SITE/tests/e2e/`: Playwright com `@nuxt/test-utils`.
- `docs/ARQUITETURA.md`: plano futuro para dashboard, Supabase e serviços; não prova que estejam implementados.
- A arquitetura alvo está registrada em `docs/ARQUITETURA.md`: site e dashboard públicos, hub multi-tenant na KVM4, workers na KVM2 (Redis, n8n e agente runtime), autenticação Supabase, Stripe como confirmação de pagamento e provisionamento do Tenant 1.
- VPNs, Redis, n8n, agente runtime, chaves, portas e endpoints privados não devem ser colocados no Git nem expostos em `NUXT_PUBLIC_*`/`VITE_*`.
- `SITE/index.html`, `SITE/_nuxt/`, `SITE/.output/` e cópias de entrega na raiz de `SITE/`: artefatos regeneráveis.

## Comandos
Execute dentro de `SITE/`:
- `pnpm dev`: desenvolvimento local.
- `pnpm typecheck` e `pnpm lint`: tipos e lint.
- `pnpm test:install` uma vez, quando necessário, para instalar Chromium.
- `pnpm test`: suíte de navegador.
- `pnpm build` para servidor Nitro; `pnpm generate` para publicação estática.
- `pnpm deliver` gera o site estático e atualiza a cópia destinada ao Open Design.

## Procedimento
1. Leia a documentação próxima ao componente afetado.
2. Confirme se a solicitação pertence à landing atual ou a um produto futuro separado.
3. Edite a fonte canônica, nunca a saída de build.
4. Execute o teste mais estreito que cubra o comportamento e registre limitações do ambiente.
