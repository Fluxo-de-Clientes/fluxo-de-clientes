# Status do projeto — Fluxo de Clientes

Atualizado em **2 de outubro de 2026**, horário de São Paulo. Fonte canônica da situação do produto, dos repositórios e da implantação. As PRs documentais dos repositórios complementares apontam para este documento, sem manter cópias concorrentes do status.

## Situação atual

O site comercial foi restabelecido após o erro 500 causado pela ausência da chave pública do Supabase no Netlify. O deploy funcional verificado usa a main no commit [ed5cdb0a1c6d68ef8fccde277ee097c5bf88a5ae](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/commit/ed5cdb0a1c6d68ef8fccde277ee097c5bf88a5ae), que integrou a prevenção da [PR #7](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/pull/7) sobre o painel e a marca da PR #6. As atualizações dos cinco repositórios complementares também foram mescladas.

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
| Deploy funcional verificado | [6ac05d3fb48eac00085e0214](https://app.netlify.com/projects/fluxodeclientes/deploys/6ac05d3fb48eac00085e0214), ready, contexto production. |
| Código | main, commit ed5cdb0a1c6d68ef8fccde277ee097c5bf88a5ae, confirmado pelo provedor. |
| Publicação | **2 de outubro de 2026, às 22:42:05**, São Paulo (2026-10-03T01:42:05.589Z). |
| Runtime do build | Log confirma Node.js **22.23.1**, npm **10.9.8**, execução do prebuild/check-deploy-env, build Nuxt e publicação concluídos. |
| CI da main | [37087047018](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/actions/runs/37087047018), concluído com sucesso para ed5cdb0. |
| Verificação externa | HTTP 200 em /, /entrar, /demonstracao, /brand/simbolo-original.svg e no login do aplicativo externo. |
| Conteúdo | Marca oficial, painel de integrações e dois links para o aplicativo presentes; erro de inicialização Supabase ausente. |

A recuperação inicial foi publicada no deploy [6ac054636c298e1572a7da39](https://app.netlify.com/projects/fluxodeclientes/deploys/6ac054636c298e1572a7da39), commit aef6f59, às 22:04:14. A publicação das 22:42 acima acrescenta a prevenção de build e o inventário atualizado. As evidências de execução aqui se referem ao commit indicado, sem atribuí-las a commits futuros. O ajuste do ícone da aba descrito abaixo é posterior a essa publicação de referência; sua implantação deve ser conferida no deploy da PR correspondente.

## Encerramento da marca e da documentação

A conferência final identificou que public/favicon.ico ainda continha o símbolo padrão do Nuxt. Esta revisão o substitui pelo símbolo oficial laranja, convertido diretamente do SVG existente, e declara em app/app.vue o favicon SVG com fallback ICO de 32 px. O fallback usa URL versionada para renovar o cache do ícone. A imagem gerada foi inspecionada visualmente; o ajuste não altera o layout da página. A validação de publicação deve confirmar os dois links no head e o conteúdo dos arquivos servidos.

Os registros de status, build e governança foram reconciliados com os merges. Os índices complementares receberam a [PR #2 de documentação](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes-docs/pull/2), mesclada em 3b1dda5782d5245b060094774bd19d1d3d7ad616, e a [PR #2 da organização](https://github.com/Fluxo-de-Clientes/.github/pull/2), mesclada em 4421e22f48402fd86dc8f446cd63971172c7c899, para apontar ao procedimento Netlify já disponível na main.

## Incidente: cliente Supabase sem chave

**Sintoma:** depois do merge da PR #6, o site respondia HTTP 500 com a mensagem de URL/chave exigidas para criar o cliente Supabase. O deploy [6ac04ee10593fa6ebf8f361e](https://app.netlify.com/projects/fluxodeclientes/deploys/6ac04ee10593fa6ebf8f361e) estava ready, mas o Lighthouse e uma requisição externa confirmaram a falha.

**Causa:** o projeto Netlify estava sem variáveis. nuxt.config.ts tinha fallback para a URL, mas não para a chave. O plugin SSR inicializa o cliente em todas as páginas, inclusive na landing. O módulo instalado apenas avisa durante o build quando falta a chave; por isso build e CI aprovados não garantiam uma página utilizável.

**Correção realizada:** cadastrar NUXT_PUBLIC_SUPABASE_URL e NUXT_PUBLIC_SUPABASE_KEY para o projeto registrado, no contexto production, e reconstruir a main por `netlify deploy --trigger --prod --site 2ea03f45-ba43-41a6-84c7-41a7f117c980`. As duas variáveis públicas também foram configuradas e confirmadas em deploy-preview para os próximos builds de revisão. Os valores permanecem no provedor e não foram versionados.

O plano atual não aceitou a seleção granular de Builds/Functions: o conector informou sucesso, mas a leitura de confirmação permaneceu vazia. Com **All scopes**, as duas variáveis públicas foram persistidas e confirmadas por leitura. Uma tentativa de upload de fonte em ZIP falhou na interpretação de .nvmrc; o build diretamente do Git concluiu com o runtime correto. Nenhuma alteração de versão ou dependência foi necessária.

**Prevenção integrada e publicada pela PR #7:** [scripts/check-deploy-env.mjs](../scripts/check-deploy-env.mjs), executado pelo prebuild, interrompe builds Netlify de produção quando falta qualquer uma das duas variáveis públicas. O erro lista somente os nomes. CI, desenvolvimento local e previews podem compilar sem credenciais; isso não comprova disponibilidade operacional dessas prévias. Após cada deploy, verificar HTTP e conteúdo real das rotas públicas.

## Supabase: implantação pendente

- Projeto [bkhuyaivdvxjqybcglyo](https://supabase.com/dashboard/project/bkhuyaivdvxjqybcglyo), organização quadrilha_calango, São Paulo, PostgreSQL 17.11. Identificação em [SUPABASE.md](SUPABASE.md) e [INTEGRATIONS.yaml](../INTEGRATIONS.yaml).
- Consulta somente de leitura retornou **nenhuma migration aplicada e nenhuma tabela em public**. Nenhum registro de usuário foi consultado e nenhum SQL de alteração foi executado nesta atualização.
- A [migration inicial](../supabase/migrations/20261002190000_initial_product_schema.sql) continua no repositório principal. Não foi duplicada nem transferida.
- A revisão confirmou uma falha na política “Members can view permitted contacts”: os ramos de responsável/criador não exigem vínculo atual com a organização. Remover um membro não limpa esses campos, que referenciam auth.users. Antes da aplicação, exigir has_org_role para agent nesse ramo, preservando a leitura ampla de admin/manager/analyst. A correção deve ser validada em PostgreSQL/Supabase descartável com agente vinculado, ex-membro, membro de outra organização e anônimo; a inspeção de código não substitui testes reais de RLS. O schema continua sem aplicação no projeto verificado.
- O registro de demonstrações exige NUXT_SUPABASE_SECRET_KEY somente no servidor e a tabela demo_requests. Essa chave não foi configurada nesta recuperação.
- Contatos e empresas requerem schema, RLS e testes de autorização. Retornos Auth, recuperação de senha e NUXT_PUBLIC_APP_URL precisam ser validados para a origem efetiva dessas rotas.

## Organização e responsabilidades

| Repositório | Estado de implementação | Atualização documental |
| --- | --- | --- |
| [fluxo-de-clientes](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes) | Fonte atual do site Nuxt, APIs e migration inicial. | [PR #7](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/pull/7) mesclada em ed5cdb0a1c6d68ef8fccde277ee097c5bf88a5ae; prevenção e inventário publicados. |
| [fluxo-de-clientes-database](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes-database) | main contém README atualizado; ainda não é a fonte executável de migrations. | [PR #1](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes-database/pull/1) mesclada em 248b9eb5895f9a0be5367efc1c7ef5fc1354fdfb, com responsabilidades e referência à fonte atual. |
| [fluxo-de-clientes-workers](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes-workers) | main contém README atualizado; sem serviço de filas/workers implementado. | [PR #1](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes-workers/pull/1) mesclada em 942e2204d9f19c5f398e9e6498f40eec1c84f030. |
| [fluxo-de-clientes-infra](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes-infra) | main contém README e procedimento de configuração, deploy e verificação do Netlify; infraestrutura executável ainda não versionada. | [PR #1](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes-infra/pull/1) mesclada em acfeac7fcd2dbeb91423b89925835b23470f15a2. |
| [fluxo-de-clientes-docs](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes-docs) | Índice de documentação e catálogo atualizados na main. | [PR #1](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes-docs/pull/1) mesclada em 2daa7752c8ad5b2bb826f49d1176983309d0b101. |
| [.github](https://github.com/Fluxo-de-Clientes/.github) | Catálogo e referências de governança atualizados na main. | [PR #1](https://github.com/Fluxo-de-Clientes/.github/pull/1) mesclada em b702f3a013ccf9203dd3068fc473f3fa2d3980c0. |

A PR documental do banco foi mesclada em 2 de outubro de 2026, às 22:06:07 de São Paulo. Após autorização do usuário para concluir, o agente mesclou a PR #7 e as quatro PRs complementares restantes, conferindo os heads exatos e a ausência de conflitos. O principal tinha CI e Deploy Preview aprovados; os repositórios exclusivamente documentais não possuem pipelines de teste. A autorização desta sessão não altera a regra geral de revisão/merge humano. A existência de repositório, domínio ou campo YAML não comprova serviço operacional.

## Código integrado e histórico

- PRs principais [#3](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/pull/3), [#4](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/pull/4), [#5](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/pull/5) e [#6](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/pull/6) integradas à main.
- A PR #6 foi mesclada em **2 de outubro de 2026, às 21:31:10**, São Paulo (2026-10-03T00:31:10Z). Inclui código Supabase, painel de canais, símbolo oficial e CTAs externos.
- O head da PR #6, 99f8f9ddc480e244e0180b075f074e702c50c0bf, teve [CI aprovado](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/actions/runs/37081824001). Esse build não validava variáveis de produção nem banco real.
- A correção histórica de Node 20 e a política de runtime estão em [BUILD-RUNTIME.md](BUILD-RUNTIME.md). Os [registros anteriores](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/blob/aef6f5932ed14d34fbbd7409fb109bbdf55f3b79/docs/PROJECT-STATUS.md) preservam as evidências dos PRs #3–#6 e a limitação local de empacotamento Nitro no Windows (EPERM readlink).
- Nesta atualização, npm test aprovou **9 testes**: 3 de dados/geometria e 6 de verificação de ambiente. git diff --check aprovado. Esses testes não validam Auth, gravação de contatos ou RLS.
- O head final da PR #7, 91f492e8a69f648ff56cab4a10da23ec76cbe67b, teve [CI aprovado](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/actions/runs/37086284774) e Deploy Preview aprovado. Após o merge, o [CI da main](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/actions/runs/37087047018), o log do Netlify e os testes HTTP confirmaram a publicação da prevenção.

## Próximas ações

1. Corrigir e testar a política de leitura de contatos antes de qualquer aplicação da migration; definir a transferência futura para o repositório de banco com fonte única e histórico preservado.
2. Configurar e validar demonstração, Auth e contatos em ambiente de teste antes de declará-los disponíveis em produção.
3. Identificar o repositório/processo de implantação de app.fluxodeclientes.com.br e registrar evidência no inventário.
4. Nas próximas alterações materiais, atualizar este documento com commit, runtime, HTTP e limites da validação. Não usar apenas ready como teste de funcionamento.
