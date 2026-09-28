---
name: responsive-accessibility
description: 'Use when building or reviewing responsive layout, mobile navigation, keyboard interaction, semantic HTML, focus, motion, or accessibility in the landing page.'
---
# Responsividade e acessibilidade

## Procedimento
1. Preserve HTML semântico, ordem de headings, nomes acessíveis e links/botões com finalidade correta.
2. Teste navegação por teclado, foco visível, Escape/retorno de foco em diálogos, FAQ e menu mobile.
3. Respeite `prefers-reduced-motion`, estados de erro/indisponibilidade e feedback anunciado por leitores de tela.
4. Evite overflow horizontal, texto cortado, controles pequenos e mudanças de layout causadas por conteúdo dinâmico.
5. Valide ao menos larguras 375, 768, 1024 e 1440 px; mantenha a suíte E2E em `SITE/tests/e2e/landing.spec.ts` coerente com os riscos.

## Revisão visual
- Use os tokens e a linguagem visual já existente; não substitua o sistema por componentes genéricos.
- Confira estados interativos e conteúdo real, não apenas a aparência em repouso.
- Para alegar conformidade, descreva os critérios e combinações efetivamente avaliados; prefira registrar lacunas a fazer afirmações amplas.