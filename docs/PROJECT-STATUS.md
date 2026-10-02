# Status do projeto — Fluxo de Clientes

Atualizado em **2 de outubro de 2026**. Este é o registro canônico do estado do produto e das mudanças que afetam sua entrega. A situação abaixo distingue código integrado, trabalho em revisão e implantação comprovada.

## Referências e escopo

- Repositório principal: [`Fluxo-de-Clientes/fluxo-de-clientes`](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes).
- Base inspecionada: `main`, commit [`85856008c58062b3dc6d18ede3ae7e61378ad52e`](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/commit/85856008c58062b3dc6d18ede3ae7e61378ad52e).
- Governança: [GITHUB-GOVERNANCE.md](GITHUB-GOVERNANCE.md).
- Diagnóstico, correção e prevenção do erro de build: [BUILD-RUNTIME.md](BUILD-RUNTIME.md).

Os repositórios de documentação e de governança da organização devem apontar para este arquivo. Registros técnicos de funcionalidades complementam este status, sem substituí-lo nem criar uma segunda versão do estado geral.

## Produto integrado à main

| Área | Estado verificado | Limite |
| --- | --- | --- |
| Aplicação | Protótipo em Nuxt 4, Vue 3, TypeScript e Nuxt UI. | Não representa um SaaS operacional completo. |
| Página inicial | Landing e demonstrações visuais presentes no código. | Métricas e exemplos da interface não comprovam dados comerciais reais. |
| Atendimento | Conversas locais usando `useVisualChats()` e rotas `/chat/:id`. | Estado temporário de sessão, sem backend, banco ou persistência. |
| Autenticação e canais reais | Não implementados como serviços operacionais no protótipo inspecionado. | A navegação para uma conversa demonstrativa não comprova login, integração ou captação real. |
| Build no GitHub Actions | Correção histórica do runtime para Node.js 22 já integrada e validada. | O resultado pertence ao commit e à execução registrados em [BUILD-RUNTIME.md](BUILD-RUNTIME.md). |

As convenções e os limites do protótipo estão em [AGENTS.md](../AGENTS.md). Campos de produção nos arquivos YAML descrevem identificação e arquitetura de referência; não comprovam que serviços ou domínios estejam implantados.

## Incidente de build e prevenção

**Sintoma:** `TypeError: trustedFunctions.difference is not a function` durante `nuxt build` no GitHub Actions.

**Causa identificada:** execução com Node.js 20, sem a API de conjuntos exigida pelo código executado no build. O problema foi relacionado ao runtime; não foi necessário atualizar as dependências da aplicação para corrigi-lo.

| Mudança | Estado | Evidência / próxima etapa |
| --- | --- | --- |
| Alteração histórica do CI de Node.js 20 para Node.js 22, commit [`65f2ecb4`](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/commit/65f2ecb4d333a9da79d9446b27e5092aed71f2c1) | Integrada; build posterior aprovado. | [Falha antiga](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/actions/runs/37031519464/job/110919246247) e [CI aprovado da main em 85856008](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/actions/runs/37045837461). |
| Prevenção na branch `fix/node-runtime-governance` | [PR #5](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/pull/5) aberto; CI completo aprovado em `7dfda52c`; prévia Netlify pronta. Ainda não integrada nem publicada em produção. | Node.js `22.23.1` em `.nvmrc`, `engines.node: ^22.23.1`, `engine-strict=true` em `.npmrc` e CI lendo `node-version-file`. [Execução 37065889111](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/actions/runs/37065889111). |
| Dependências de aplicação | Preservadas nesta prevenção. | Nenhuma atualização de Nuxt UI, Nuxt, Vue ou demais bibliotecas é apresentada como necessária à correção do runtime. |
| Documentação de diagnóstico, status e governança | Atualizada junto com a prevenção; PRs de comunicação abertos. | Referências na organização em [.github#1](https://github.com/Fluxo-de-Clientes/.github/pull/1) e na documentação em [fluxo-de-clientes-docs#1](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes-docs/pull/1). Atualizar o estado após integração e implantação comprovadas. |

O build aprovado de um commit anterior não substitui a validação da branch de prevenção. A família Node.js 22 foi selecionada para padronizar o ambiente testado; isso não significa que Node.js 24 seja intrinsecamente incompatível. Uma versão selecionada no painel do provedor também não comprova a versão efetivamente utilizada em um deploy; verificar os logs da execução correspondente.

### Validação da prevenção

- Ambiente local: Windows, Node.js `22.23.1`, npm `10.9.8`, cópia isolada da base `85856008` com as alterações desta branch.
- `npm ci --no-audit --no-fund`: aprovado, com cache novo; nenhuma versão de dependência foi alterada no lockfile. A opção de auditoria não foi executada nessa instalação.
- `Set.prototype.difference`: disponível. Configuração npm `engine-strict`: ativa.
- `npm run build`: compilação de cliente e servidor concluída, mas empacotamento Nitro bloqueado por `EPERM` ao executar `readlink` em `C:\Users\User`, no ambiente local restrito. O build local completo **não** foi aprovado.
- Revisão do diff e `git diff --check`: sem problemas materiais. Permanecem avisos de depreciação e de tempo de plugins; não foram tratados como causa do erro histórico.
- CI da prevenção: **aprovado** no commit [`7dfda52c82a6a863e0c6d9ebb0168cbcda4239f7`](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/commit/7dfda52c82a6a863e0c6d9ebb0168cbcda4239f7), [execução 37065889111](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/actions/runs/37065889111/job/111033455949). O log confirma Node `22.23.1`, npm `10.9.8`, instalação e build completos. O bloqueio local não foi contornado alterando código ou desativando a validação de runtime.
- Prévia Netlify associada a `7dfda52c`: status `netlify/fluxodeclientes/deploy-preview` aprovado, com [Deploy Preview #5](https://deploy-preview-5--fluxodeclientes.netlify.app) pronto. Isso valida a entrega em prévia, não a atualização da produção. O patch do runtime dessa prévia não foi obtido nos logs do provedor.
- Este registro documenta o commit verificado. Para commits posteriores, inclusive atualizações desta documentação, consulte os checks do [PR #5](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/pull/5/checks).

## Implantação confirmada

| Item | Evidência observada |
| --- | --- |
| Provedor | Netlify. |
| Site | [fluxodeclientes.com.br](https://fluxodeclientes.com.br). |
| Deploy publicado | `6ac003151eb2525fa8185e5f`, estado `ready`. |
| Código associado | `main`, commit `85856008c58062b3dc6d18ede3ae7e61378ad52e`. |
| Data do deploy | 2 de outubro de 2026, às 16:17:14, horário de São Paulo (`2026-10-02T19:17:14Z`). |
| Runtime efetivo desse deploy | Não obtido na consulta realizada; não inferido a partir da seleção de Node.js 24.x mostrada no painel. |
| Novo pin de runtime | A configuração da branch `fix/node-runtime-governance` ainda não tem implantação confirmada neste registro. |

Os dados acima vieram da consulta ao provedor. Eles confirmam a publicação daquele commit; não confirmam serviços externos, todos os fluxos do produto ou a implantação de alterações posteriores.

## Trabalho em revisão

| PR | Escopo | Situação observada |
| --- | --- | --- |
| [#3 — Add Motion for Vue dependency](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/pull/3) | Dependência direta `motion-v`; branch `feat/landing-reference-v2`, head `49d5cabebc067b28d05e5e4b5abe93cdb44d9a64`. | Aberto, não integrado à `main`. |
| [#4 — Refina dashboard, funil e fluxo animado da landing](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/pull/4) | Componentes demonstrativos, dados coerentes, animações, testes e registro técnico; branch `feat/dashboard-premium-customer-flow`, head `063013fa41fed003adb349744c2d305c7b73a9dd`. | Aberto, não integrado à `main`. Os resultados de QA pertencem ao trabalho desse PR. |
| [#5 — Padroniza Node e estabelece status e diagnóstico de build](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/pull/5) | Runtime, prevenção, status, governança e agente BUILD ERROR RESEARCH. | Aberto; instalação e build aprovados no CI de `7dfda52c`, prévia Netlify pronta. Integração e produção pendentes. |

O [registro DASHBOARD-PREMIUM.md](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/blob/063013fa41fed003adb349744c2d305c7b73a9dd/docs/DASHBOARD-PREMIUM.md) documenta o PR #4. Sua existência não significa que a funcionalidade esteja publicada em produção. O comando `npm test` adicionado nesse PR também não deve ser presumido como disponível na `main` inspecionada.

## Próximas ações

1. Revisar e integrar o [PR #5](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/pull/5), verificando os checks do commit atual, e os PRs relacionados de governança e documentação.
2. Após a integração autorizada, confirmar o commit publicado e o runtime nos logs do novo deploy Netlify.
3. Revisar os PRs #3 e #4 separadamente; atualizar este documento quando seu estado mudar.
4. Manter os limites do protótipo explícitos ao planejar autenticação, persistência, integrações e operação comercial.

## Como manter este documento

Atualize este arquivo no mesmo PR de mudanças relevantes no produto, build, dependências, infraestrutura ou condições de entrega. Cada atualização deve identificar a data, o repositório, a referência de código, o ambiente, a evidência, as limitações e o próximo passo. Preserve a distinção entre **proposto**, **em desenvolvimento**, **em revisão**, **integrado à main** e **implantado**. Resultados de testes e implantação só se aplicam à referência efetivamente verificada.
