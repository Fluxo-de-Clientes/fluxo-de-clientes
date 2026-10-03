# Identificação do Supabase — Fluxo de Clientes

Referência de identificação para a equipe e os agentes que trabalham no repositório `Fluxo-de-Clientes/fluxo-de-clientes`.

## Projeto de referência

| Campo | Identificação verificada |
| --- | --- |
| Organização | `quadrilha_calango` |
| ID da organização | `pornhctkinrizofmghmk` |
| Nome do projeto | `fluxo-de-clientes` |
| ID / project ref | `bkhuyaivdvxjqybcglyo` |
| Nome do banco PostgreSQL | `postgres` |
| Região | `sa-east-1` — São Paulo |
| URL pública da API | `https://bkhuyaivdvxjqybcglyo.supabase.co` |
| Painel do projeto | [Abrir no Supabase](https://supabase.com/dashboard/project/bkhuyaivdvxjqybcglyo) |
| Última verificação | 2 de outubro de 2026 |

Os nomes e IDs foram consultados diretamente na integração conectada do Supabase. A URL foi retornada pela consulta de URL do projeto. O nome do banco foi confirmado por uma consulta somente de leitura: `select current_database();`.

## Como usar esta referência

- Use o **project ref `bkhuyaivdvxjqybcglyo`** para identificar o destino. O nome do projeto e o nome genérico do banco, `postgres`, não bastam para distinguir ambientes.
- Confira também a organização `quadrilha_calango` ao selecionar o projeto no painel ou em uma ferramenta.
- Os mesmos identificadores estão em [INTEGRATIONS.yaml](../INTEGRATIONS.yaml). O [README](../README.md) torna a referência visível para a equipe, e [AGENTS.md](../AGENTS.md) orienta sua consulta pelos agentes.
- Se houver uma troca autorizada de projeto ou organização, atualize esses registros juntos e renove a data de verificação. Em caso de divergência com a conexão disponível, confirme o destino antes de alterar recursos.

## Escopo deste registro

Este documento e o inventário contêm apenas nomes, identificadores, região e URLs públicas. Nenhuma chave de API, chave `anon`, `service_role`, token, senha, string de conexão ou arquivo `.env` foi incluído. Os identificadores não concedem acesso ao banco.

O código de autenticação, contatos e captação de demonstrações foi integrado pela [PR #6](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/pull/6), no commit `aef6f5932ed14d34fbbd7409fb109bbdf55f3b79`. As conversas demonstrativas continuam transitórias em sessão e separadas do histórico operacional.

## Estado verificado em 2 de outubro de 2026

- Projeto `ACTIVE_HEALTHY`; consulta somente de leitura retornou nenhuma migration aplicada e nenhuma tabela no schema `public`.
- A migration versionada está em [`supabase/migrations/20261002190000_initial_product_schema.sql`](../supabase/migrations/20261002190000_initial_product_schema.sql). O repositório `fluxo-de-clientes-database` ainda não contém uma cópia operacional nem controla sua aplicação.
- `NUXT_PUBLIC_SUPABASE_URL` e `NUXT_PUBLIC_SUPABASE_KEY` são necessárias para inicializar o cliente Nuxt, inclusive na landing. Foram configuradas no Netlify para produção; o resultado do deploy e da verificação HTTP está no [status canônico](PROJECT-STATUS.md).
- A API de demonstrações também exige `NUXT_SUPABASE_SECRET_KEY`, exclusivamente no servidor, e a tabela `demo_requests`. A configuração pública não habilita esse fluxo por si só.
- Contatos e empresas dependem do schema, das políticas RLS e da validação de autenticação. Retornos do Supabase Auth e recuperação de senha ainda precisam ser verificados para a origem que hospeda essas rotas.

Antes de aplicar a migration, revisar a política `Members can view permitted contacts`: as condições de responsável/criador devem exigir vínculo atual com a organização para impedir acesso após remoção de um membro. Não houve aplicação de SQL nesta atualização.

Os campos `enabled` e `environment` do inventário identificam a integração prevista; não comprovam a disponibilidade operacional de todos os fluxos. O estado consolidado e as evidências ficam em [PROJECT-STATUS.md](PROJECT-STATUS.md).
