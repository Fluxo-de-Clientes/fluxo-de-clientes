---
name: brand-identity
description: 'Use when implementing or reviewing the Fluxo de Clientes logo, colors, typography, favicon, social/app artwork, or branded UI assets.'
---
# Identidade da marca

## Fontes
- Normas e matrizes originais: `PROJETO COMPLETO - REGRAS MARCA LOGO/FLUXO_DE_CLIENTES_MARCA_v1/`.
- Aplicação na landing: `SITE/docs/identity.md` e `SITE/app/assets/css/main.css`.
- Assets de runtime já selecionados: `SITE/public/brand/`, `SITE/public/icons/`, `SITE/public/images/` e `SITE/public/favicon.png`.

## Tokens atuais
- Laranja `#F0440B`, preto `#090909`, papel `#F4EADB`, canvas `#F8F4EC` e branco `#FFFFFF`.
- Apoio: `#5F584F`, `#D5C9BA` e `#978B7D`; use os tokens CSS como fonte efetiva na interface.
- Barlow 400/500/600/700 é a alternativa tipográfica local licenciada; não use o lettering do logotipo como texto.

## Procedimento
1. Identifique se a necessidade é de marca, asset de interface ou decoração demonstrativa.
2. Reutilize o arquivo oficial adequado sem reexportar ou alterar a matriz.
3. Mantenha assets entregues pelo site em `SITE/public/`; não crie cópias de build editáveis.
4. Respeite dimensões mínimas e contexto de contraste registrados em `SITE/docs/identity.md`.
5. Confira alt text, tamanho legível, contraste e comportamento sobre fundos claros/escuros.

## Não fazer
- Não redesenhar, recortar, recolorir ou converter logotipos oficiais.
- Não adicionar uma segunda cópia de um asset sob outro nome ou em uma pasta de saída.
- Não tratar neutros de dashboards como novas cores da marca.