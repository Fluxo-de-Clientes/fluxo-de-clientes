# Status do projeto — Fluxo de Clientes

Atualizado em **2 de outubro de 2026**, horário de São Paulo. Fonte canônica da situação do produto, dos repositórios e da implantação. As PRs documentais dos repositórios complementares apontam para este documento, sem manter cópias concorrentes do status.

## Situação atual

O site comercial foi restabelecido após o erro 500 causado pela ausência da chave pública do Supabase no Netlify. A produção usa a main no commit [aef6f5932ed14d34fbbd7409fb109bbdf55f3b79](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/commit/aef6f5932ed14d34fbbd7409fb109bbdf55f3b79), que integrou a [PR #6](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/pull/6).

| Área | Estado verificado | Limite |
| --- | --- | --- |
| Site comercial | [fluxodeclientes.com.br](https://fluxodeclientes.com.br) responde HTTP 200; landing, painel de integrações e marca presentes no HTML. | A verificação HTTP não substitui uma revisão visual completa. |
| CTAs | “Explorar a plataforma” e “Levar meu fluxo para o app” apontam para https://app.fluxodeclientes.com.br. | Navegação não comprova integração de dados entre serviços. |
| Entrada e demonstração | /entrar e /demonstracao respondem HTTP 200. | Login completo e envio de formulário não foram executados nesta validação. |
| Aplicativo separado | https://app.fluxodeclientes.com.br termina em /login, HTTP 200, servidor Nginx. | Repositório de origem e operação interna ainda não identificados/verificados. |
| Supabase | Projeto bkhuyaivdvxjqybcglyo ativo e saudável; configuração pública presente no Netlify em produção. | Nenhuma migration aplicada e nenhuma tabela em public na consulta realizada. |
| Contatos e captação | Código integrado pela PR #6. | Dependem do schema revisado, configuração privada e validação funcional; ainda não comprovados como operacionais. |
| Conversas e canais | Conversas transitórias em sessão; painel ilustrativo com pulsos intermitentes via motion-v. | Os canais exibidos não representam conectores reais ativos. |

## Implantação confirmada

| Item | Evidência |
| --- | --- |
| Projeto Netlify | [fluxodeclientes](https://app.netlify.com/projects/fluxodeclientes), ID 2ea03f45-ba43-41a6-84c7-41a7f117c980. |
| Deploy publicado | [6ac054636c298e1572a7da39](https://app.netlify.com/projects/fluxodeclientes/deploys/6ac054636c298e1572a7da39), ready, contexto production. |
| Código | main, commit aef6f5932ed14d34fbbd7409fb109bbdf55f3b79, confirmado pelo provedor. |
| Publicação | **2 de outubro de 2026, às 22:04:14**, São Paulo (2026-10-03T01:04:14.832Z). |
| Runtime do build | Log confirma Node.js **22.23.1**, npm **10.9.8**, instalação, build Nuxt e empacotamento concluídos. |
| Runtime da função | nodejs22.x, segundo os metadados do deploy. |
| Verificação externa | HTTP 200 em /, /entrar, /demonstracao, /brand/simbolo-original.svg e no login do aplicativo externo. |
| Conteúdo | Marca oficial, painel de integrações e dois links para o aplicativo presentes; erro de inicialização Supabase ausente. |

A recuperação alterou a configuração pública do ambiente e refez o build da versão já mesclada. A nova prevenção de build e as atualizações documentais desta PR dependem de merge humano e não fazem parte do deploy acima.

## Incidente: cliente Supabase sem chave

**Sintoma:** depois do merge da PR #6, o site respondia HTTP 500 com a mensagem de URL/chave exigidas para criar o cliente Supabase. O deploy [6ac04ee10593fa6ebf8f361e](https://app.netlify.com/projects/fluxodeclientes/deploys/6ac04ee10593fa6ebf8f361e) estava ready, mas o Lighthouse e uma requisição externa confirmaram a falha.

**Causa:** o projeto Netlify estava sem variáveis. nuxt.config.ts tinha fallback para a URL, mas não para a chave. O plugin SSR inicializa o cliente em todas as páginas, inclusive na landing. O módulo instalado apenas avisa durante o build quando falta a chave; por isso build e CI aprovados não garantiam uma página utilizável.

**Correção realizada:** cadastrar NUXT_PUBLIC_SUPABASE_URL e NUXT_PUBLIC_SUPABASE_KEY para o projeto registrado, no contexto production, e reconstruir a main por `netlify deploy --trigger --prod --site 2ea03f45-ba43-41a6-84c7-41a7f117c980`. Os valores permanecem no provedor e não foram versionados.

O plano atual não aceitou a seleção granular de Builds/Functions: o conector informou sucesso, mas a leitura de confirmação permaneceu vazia. Com **All scopes**, as duas variáveis públicas foram persistidas e confirmadas por leitura. Uma tentativa de upload de fonte em ZIP falhou na interpretação de .nvmrc; o build diretamente do Git concluiu com o runtime correto. Nenhuma alteração de versão ou dependência foi necessária.

**Prevenção proposta nesta PR:** [scripts/check-deploy-env.mjs](../scripts/check-deploy-env.mjs), executado pelo prebuild, interrompe builds Netlify de produção quando falta qualquer uma das duas variáveis públicas. O erro lista somente os nomes. CI, desenvolvimento local e previews podem compilar sem credenciais; isso não comprova disponibilidade operacional dessas prévias. Após cada deploy, verificar HTTP e conteúdo real das rotas públicas.

## Supabase: implantação pendente

- Projeto [bkhuyaivdvxjqybcglyo](https://supabase.com/dashboard/project/bkhuyaivdvxjqybcglyo), organização quadrilha_calango, São Paulo, PostgreSQL 17.11. Identificação em [SUPABASE.md](SUPABASE.md) e [INTEGRATIONS.yaml](../INTEGRATIONS.yaml).
- Consulta somente de leitura retornou **nenhuma migration aplicada e nenhuma tabela em public**. Nenhum registro de usuário foi consultado e nenhum SQL de alteração foi executado nesta atualização.
- A [migration inicial](../supabase/migrations/20261002190000_initial_product_schema.sql) continua no repositório principal. Não foi duplicada nem transferida.
- Revisar antes da aplicação a política “Members can view permitted contacts”: a leitura por responsável/criador precisa exigir vínculo atual com a organização, inclusive após remoção de um membro.
- O registro de demonstrações exige NUXT_SUPABASE_SECRET_KEY somente no servidor e a tabela demo_requests. Essa chave não foi configurada nesta recuperação.
- Contatos e empresas requerem schema, RLS e testes de autorização. Retornos Auth, recuperação de senha e NUXT_PUBLIC_APP_URL precisam ser validados para a origem efetiva dessas rotas.

## Organização e responsabilidades

| Repositório | Estado de implementação | Atualização documental |
| --- | --- | --- |
| [fluxo-de-clientes](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes) | Fonte atual do site Nuxt, APIs e migration inicial. | Esta PR atualiza status, inventário e prevenção do incidente. |
| [fluxo-de-clientes-database](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes-database) | main contém README; ainda não é a fonte executável de migrations. | [PR #1](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes-database/pull/1) com responsabilidades e referência à fonte atual. |
| [fluxo-de-clientes-workers](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes-workers) | main contém README; sem serviço de filas/workers implementado. | [PR #1](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes-workers/pull/1). |
| [fluxo-de-clientes-infra](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes-infra) | main contém README; infraestrutura executável ainda não versionada. | [PR #1](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes-infra/pull/1) inclui procedimento de configuração, deploy e verificação do Netlify. |
| [fluxo-de-clientes-docs](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes-docs) | main contém somente README; índice de documentação em revisão. | [PR #1](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes-docs/pull/1) atualizado com fontes atuais e catálogo. |
| [.github](https://github.com/Fluxo-de-Clientes/.github) | main contém somente README; catálogo e referências de governança em revisão. | [PR #1](https://github.com/Fluxo-de-Clientes/.github/pull/1) atualizado com fontes atuais e responsabilidades. |

As cinco PRs complementares estão abertas para revisão. A regra do workspace exige merge humano; nenhuma foi mesclada automaticamente. A existência de repositório, domínio ou campo YAML não comprova serviço operacional.

## Código integrado e histórico

- PRs principais [#3](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/pull/3), [#4](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/pull/4), [#5](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/pull/5) e [#6](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/pull/6) integradas à main.
- A PR #6 foi mesclada em **2 de outubro de 2026, às 21:31:10**, São Paulo (2026-10-03T00:31:10Z). Inclui código Supabase, painel de canais, símbolo oficial e CTAs externos.
- O head da PR #6, 99f8f9ddc480e244e0180b075f074e702c50c0bf, teve [CI aprovado](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/actions/runs/37081824001). Esse build não validava variáveis de produção nem banco real.
- A correção histórica de Node 20 e a política de runtime estão em [BUILD-RUNTIME.md](BUILD-RUNTIME.md). Os [registros anteriores](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/blob/aef6f5932ed14d34fbbd7409fb109bbdf55f3b79/docs/PROJECT-STATUS.md) preservam as evidências dos PRs #3–#6 e a limitação local de empacotamento Nitro no Windows (EPERM readlink).
- Nesta atualização, npm test aprovou **9 testes**: 3 de dados/geometria e 6 de verificação de ambiente. git diff --check aprovado. Esses testes não validam Auth, gravação de contatos ou RLS.

## Próximas ações

1. Revisar e mesclar as PRs documentais e a prevenção de build; conferir os checks de cada head.
2. Revisar a migration/políticas antes de qualquer aplicação; definir a transferência futura para o repositório de banco com fonte única e histórico preservado.
3. Configurar e validar demonstração, Auth e contatos em ambiente de teste antes de declará-los disponíveis em produção.
4. Identificar o repositório/processo de implantação de app.fluxodeclientes.com.br e registrar evidência no inventário.
5. Após cada merge/deploy, atualizar este documento com commit, runtime, HTTP e limites da validação. Não usar apenas ready como teste de funcionamento.
