---
name: quality-gates
description: 'Use when selecting or running validation for changes to the Nuxt app, including typecheck, ESLint, Playwright E2E, build, or static generation.'
---
# Gates de qualidade

## Seleção
1. Comece pelo teste mais próximo do comportamento alterado.
2. Para mudanças de componentes, formulários, navegação ou conteúdo interativo, avalie `pnpm test` em `SITE/`.
3. Para tipos/configuração, execute `pnpm typecheck`; para regras e imports, `pnpm lint`.
4. Para comportamento de produção, execute `pnpm build`; para publicação estática, `pnpm generate`.
5. Em alterações de amplo alcance, rode a combinação aplicável de typecheck, lint, E2E e build.

## Ambiente Playwright
- `pnpm test:install` instala o Chromium quando necessário; não repita sem motivo.
- A suíte está em `SITE/tests/e2e/landing.spec.ts` e cobre página/identidade, FAQ por teclado, navegação mobile, formulário sem envio, módulos demonstrativos e overflow.
- Use `pnpm dev` para inspeção local. Não produza screenshots, traces ou vídeos como artefatos se a tarefa não precisar deles.

## Relato
- Informe comandos executados e resultados reais.
- Diferencie teste não executado por falta de pnpm/dependências/Chromium de teste aprovado.
- Não altere testes apenas para ocultar regressões; explique falhas preexistentes separadamente.