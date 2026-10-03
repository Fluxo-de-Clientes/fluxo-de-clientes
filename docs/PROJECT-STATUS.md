# Status do projeto — Fluxo de Clientes

Atualizado em **2 de outubro de 2026**. Este é o registro canônico do estado do produto e das mudanças que afetam sua entrega. A situação abaixo distingue código integrado, trabalho em revisão e implantação comprovada.

## Referências e escopo

- Repositório principal: [`Fluxo-de-Clientes/fluxo-de-clientes`](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes).
- Base inspecionada: `main`, commit [`7a90f4c239ca793ee3d8eb7d938a59cd8bcfcb52`](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/commit/7a90f4c239ca793ee3d8eb7d938a59cd8bcfcb52), com os PRs #3, #4 e #5 integrados. Evidências de validação e implantação anteriores permanecem vinculadas aos commits indicados em cada seção.
- Trabalho em revisão: [PR #6](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/pull/6), branch `feat/supabase-contact-workflows`, incorporando essa base após o head [`175466a`](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/commit/175466a6bbf44c2eba7be7eb2dcd81480e8cfcff). Os resultados locais desta resolução estão registrados abaixo; isso não representa integração do PR à `main` nem implantação.
- Governança: [GITHUB-GOVERNANCE.md](GITHUB-GOVERNANCE.md).
- Diagnóstico, correção e prevenção do erro de build: [BUILD-RUNTIME.md](BUILD-RUNTIME.md).

Os repositórios de documentação e de governança da organização devem apontar para este arquivo. Registros técnicos de funcionalidades complementam este status, sem substituí-lo nem criar uma segunda versão do estado geral.

## Produto integrado à main

| Área | Estado verificado | Limite |
| --- | --- | --- |
| Aplicação | Protótipo em Nuxt 4, Vue 3, TypeScript e Nuxt UI. | Não representa um SaaS operacional completo. |
| Página inicial | Landing, dependência `motion-v` e componentes de dashboard, funil e fluxo animado integrados pelos PRs #3 e #4; `npm test` disponível. | Métricas e exemplos da interface não comprovam dados comerciais reais. A integração não comprova implantação. |
| Atendimento | Conversas locais usando `useVisualChats()` e rotas `/chat/:id`. | Estado temporário de sessão, sem backend, banco ou persistência. |
| Autenticação e canais reais | Não implementados como serviços operacionais no protótipo inspecionado. | A navegação para uma conversa demonstrativa não comprova login, integração ou captação real. |
| Build no GitHub Actions | Correção histórica do runtime para Node.js 22 já integrada e validada; prevenção com `.nvmrc`, `engines` e `engine-strict` integrada pelo PR #5 em `7a90f4c`. | Cada resultado pertence ao commit e à execução registrados em [BUILD-RUNTIME.md](BUILD-RUNTIME.md). A integração não comprova runtime ou publicação em produção. |

Esta tabela descreve a `main` em `7a90f4c`. O PR #6 propõe autenticação, captação de demonstrações e gestão de contatos com Supabase, mantendo as conversas demonstrativas transitórias; essas funcionalidades continuam em revisão. As convenções da branch atual estão em [AGENTS.md](../AGENTS.md). Campos de produção nos arquivos YAML descrevem identificação e arquitetura de referência; não comprovam que serviços ou domínios estejam implantados.

## Incidente de build e prevenção

**Sintoma:** `TypeError: trustedFunctions.difference is not a function` durante `nuxt build` no GitHub Actions.

**Causa identificada:** execução com Node.js 20, sem a API de conjuntos exigida pelo código executado no build. O problema foi relacionado ao runtime; não foi necessário atualizar as dependências da aplicação para corrigi-lo.

| Mudança | Estado | Evidência / próxima etapa |
| --- | --- | --- |
| Alteração histórica do CI de Node.js 20 para Node.js 22, commit [`65f2ecb4`](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/commit/65f2ecb4d333a9da79d9446b27e5092aed71f2c1) | Integrada; build posterior aprovado. | [Falha antiga](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/actions/runs/37031519464/job/110919246247) e [CI aprovado da main em 85856008](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/actions/runs/37045837461). |
| Prevenção na branch `fix/node-runtime-governance` | [PR #5](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/pull/5) integrado à `main` no merge [`7a90f4c`](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/commit/7a90f4c239ca793ee3d8eb7d938a59cd8bcfcb52). Implantação em produção ainda não confirmada neste registro. | Node.js `22.23.1` em `.nvmrc`, `engines.node: ^22.23.1`, `engine-strict=true` em `.npmrc` e CI lendo `node-version-file`. Evidência histórica de CI e prévia em `7dfda52c`: [execução 37065889111](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/actions/runs/37065889111); esse resultado não valida commits posteriores. |
| Dependências de aplicação | Preservadas nesta prevenção. | Nenhuma atualização de Nuxt UI, Nuxt, Vue ou demais bibliotecas é apresentada como necessária à correção do runtime. |
| Documentação de diagnóstico, status e governança | Integrada neste repositório pelo PR #5; situação atual dos PRs de comunicação não verificada nesta atualização. | Referências na organização em [.github#1](https://github.com/Fluxo-de-Clientes/.github/pull/1) e na documentação em [fluxo-de-clientes-docs#1](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes-docs/pull/1). Atualizar o estado após integração e implantação comprovadas. |

O build aprovado de um commit anterior não substitui a validação da nova combinação de alterações do PR #6. A família Node.js 22 foi selecionada para padronizar o ambiente testado; isso não significa que Node.js 24 seja intrinsecamente incompatível. Uma versão selecionada no painel do provedor também não comprova a versão efetivamente utilizada em um deploy; verificar os logs da execução correspondente.

### Validação histórica da prevenção

- Ambiente local: Windows, Node.js `22.23.1`, npm `10.9.8`, cópia isolada da base `85856008` com as alterações de prevenção do PR #5.
- `npm ci --no-audit --no-fund`: aprovado, com cache novo; nenhuma versão de dependência foi alterada no lockfile. A opção de auditoria não foi executada nessa instalação.
- `Set.prototype.difference`: disponível. Configuração npm `engine-strict`: ativa.
- `npm run build`: compilação de cliente e servidor concluída, mas empacotamento Nitro bloqueado por `EPERM` ao executar `readlink` em `C:\Users\User`, no ambiente local restrito. O build local completo **não** foi aprovado.
- Revisão do diff e `git diff --check`: sem problemas materiais. Permanecem avisos de depreciação e de tempo de plugins; não foram tratados como causa do erro histórico.
- CI da prevenção: **aprovado** no commit [`7dfda52c82a6a863e0c6d9ebb0168cbcda4239f7`](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/commit/7dfda52c82a6a863e0c6d9ebb0168cbcda4239f7), [execução 37065889111](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/actions/runs/37065889111/job/111033455949). O log confirma Node `22.23.1`, npm `10.9.8`, instalação e build completos. O bloqueio local não foi contornado alterando código ou desativando a validação de runtime.
- Prévia Netlify associada a `7dfda52c`: status `netlify/fluxodeclientes/deploy-preview` aprovado, com [Deploy Preview #5](https://deploy-preview-5--fluxodeclientes.netlify.app) pronto. Isso valida a entrega em prévia, não a atualização da produção. O patch do runtime dessa prévia não foi obtido nos logs do provedor.
- Este registro documenta o commit verificado. Para commits posteriores, inclusive atualizações desta documentação, consulte os checks do [PR #5](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/pull/5/checks).

### Validação da resolução de conflitos do PR #6

- Base da combinação: head `175466a` e `main` em `7a90f4c`, em cópia de trabalho isolada, no Windows com Node.js `22.23.1` e npm `10.9.8`.
- `npm ci --no-audit --no-fund`, com cache novo: aprovado, incluindo `nuxt prepare`. A auditoria de dependências não foi executada nessa instalação.
- `npm test`: aprovado, 3 testes de dados e geometria do gráfico, sem falhas.
- Consistência de runtime e dependências: aprovada. `package.json` e `package-lock.json` preservam todos os scripts e dependências de `175466a`; a única mudança semântica nesses arquivos é `engines.node: ^22.23.1`. `.nvmrc` e `.npmrc` mantêm a política do PR #5.
- Revisão dos arquivos resolvidos e `git diff --check`: aprovados, sem marcadores de conflito. Código da aplicação, APIs e migrations permanecem iguais a `175466a`.
- `npm run build`: cliente e servidor compilados; empacotamento Nitro interrompido por `EPERM` ao executar `readlink` em `C:\Users\User`, a mesma limitação do ambiente Windows restrito registrada na validação histórica. O build local completo não foi aprovado; nenhuma configuração da aplicação foi alterada para contornar essa restrição.
- Consulte os [checks do PR #6](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/pull/6/checks) para o CI e a prévia do commit correspondente. Resultados anteriores não validam uma atualização posterior.

Esta validação não exercita autenticação, escrita de contatos ou políticas RLS contra o Supabase. Nenhuma migration foi aplicada durante a resolução de conflitos.

### Painel de canais e integrações em revisão

- A landing do PR #6 passa a incluir uma seção demonstrativa de canais e integrações entre as soluções e o funil. Ela apresenta WhatsApp Business, Google, LinkedIn, Mercado Livre, Nuvemshop e WooCommerce como possibilidades de composição da operação e oferece continuidade para `https://app.fluxodeclientes.com.br`; não afirma que os serviços estejam ativos ou configurados.
- O painel usa `motion-v` para transmitir pulsos luminosos intermitentes pelas rotas entre os canais e o hub central. A animação respeita `prefers-reduced-motion` e troca para uma organização estática em telas compactas.
- Nesta alteração, `npm ci --no-audit --no-fund`, `npm test` (3 testes) e `git diff --check` foram aprovados. O servidor de desenvolvimento respondeu `200` para a landing com configuração local não produtiva. O cliente e o servidor de `npm run build` compilaram, mas o empacotamento Nitro voltou a ser interrompido pelo `EPERM` de `readlink` em `C:\\Users\\User` do ambiente Windows restrito; consulte os checks do commit atualizado do PR para a validação completa.

## Última implantação confirmada neste registro

| Item | Evidência observada |
| --- | --- |
| Provedor | Netlify. |
| Site | [fluxodeclientes.com.br](https://fluxodeclientes.com.br). |
| Deploy publicado | `6ac003151eb2525fa8185e5f`, estado `ready`. |
| Código associado | `main`, commit `85856008c58062b3dc6d18ede3ae7e61378ad52e`. |
| Data do deploy | 2 de outubro de 2026, às 16:17:14, horário de São Paulo (`2026-10-02T19:17:14Z`). |
| Runtime efetivo desse deploy | Não obtido na consulta realizada; não inferido a partir da seleção de Node.js 24.x mostrada no painel. |
| Novo pin de runtime | A configuração integrada pelo PR #5 ainda não tem implantação confirmada neste registro. |

Os dados acima vieram da consulta ao provedor. Eles confirmam a publicação daquele commit; não confirmam serviços externos, todos os fluxos do produto ou a implantação de alterações posteriores.

## Situação dos PRs

| PR | Escopo | Situação observada |
| --- | --- | --- |
| [#3 — Add Motion for Vue dependency](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/pull/3) | Dependência direta `motion-v`; branch `feat/landing-reference-v2`, head `49d5cabebc067b28d05e5e4b5abe93cdb44d9a64`. | Integrado à `main` no merge `a1fa5f6`. |
| [#4 — Refina dashboard, funil e fluxo animado da landing](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/pull/4) | Componentes demonstrativos, dados coerentes, animações, testes e registro técnico; branch `feat/dashboard-premium-customer-flow`, head `063013fa41fed003adb349744c2d305c7b73a9dd`. | Integrado à `main` no merge `80e6f59`. Os resultados de QA pertencem ao trabalho desse PR. |
| [#5 — Padroniza Node e estabelece status e diagnóstico de build](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/pull/5) | Runtime, prevenção, status, governança e agente BUILD ERROR RESEARCH. | Integrado à `main` no merge `7a90f4c`. CI e prévia históricos aprovados em `7dfda52c`; implantação do novo runtime em produção não confirmada neste registro. |
| [#6](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/pull/6) | Autenticação e fluxos de contatos com Supabase; branch `feat/supabase-contact-workflows`. | Aberto, em revisão, com resolução dos conflitos ao incorporar a `main` em `7a90f4c` após o head `175466a`. Resultados locais registrados acima; conferir os checks do commit atual. Não integrado à `main`; implantação e aplicação da migration não confirmadas nesta atualização. |

O [registro DASHBOARD-PREMIUM.md](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/blob/063013fa41fed003adb349744c2d305c7b73a9dd/docs/DASHBOARD-PREMIUM.md) documenta o PR #4. Sua integração e a disponibilidade de `npm test` na `main` em `80e6f59` não comprovam novos resultados de validação nem publicação em produção.

## Próximas ações

1. Conferir os checks do commit atual do [PR #6](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/pull/6) e concluir a revisão da integração com Supabase após a resolução de conflitos com a `main` em `7a90f4c`.
2. Confirmar o commit publicado e o runtime nos logs do deploy Netlify que contenha a prevenção integrada pelo PR #5.
3. Verificar a situação dos PRs relacionados de governança e documentação e manter suas referências ao status canônico.
4. Revisar a integração funcional do PR #6 e registrar separadamente código integrado, configuração do ambiente, aplicação autorizada da migration e implantação comprovada. Manter os limites das conversas demonstrativas explícitos.

## Como manter este documento

Atualize este arquivo no mesmo PR de mudanças relevantes no produto, build, dependências, infraestrutura ou condições de entrega. Cada atualização deve identificar a data, o repositório, a referência de código, o ambiente, a evidência, as limitações e o próximo passo. Preserve a distinção entre **proposto**, **em desenvolvimento**, **em revisão**, **integrado à main** e **implantado**. Resultados de testes e implantação só se aplicam à referência efetivamente verificada.
