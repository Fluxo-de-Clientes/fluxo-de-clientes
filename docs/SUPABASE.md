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

O projeto Supabase existe, mas a aplicação deste repositório continua usando conversas transitórias em sessão: sua conexão ao banco ainda não foi implementada. Os campos `enabled` e `environment` já existentes em `INTEGRATIONS.yaml` pertencem ao inventário; não comprovam uma conexão ativa do código nem constituem autorização para modificar o banco.

Esta atualização registra a identificação e não altera tabelas, dados, autenticação, políticas, funções ou infraestrutura do Supabase.
