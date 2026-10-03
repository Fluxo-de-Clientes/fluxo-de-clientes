# Matriz de repositórios — Fluxo de Clientes

## Visão geral

| Repository | Descrição | Tipo | Deploy | Criticidade | Acesso de agente |
|---|---|---|---|---|---|
| fluxo-de-clientes | Aplicação principal do SaaS | Código | saas-vps | high | read-write |
| fluxo-de-clientes-database | Schema, migrations e policies | Banco / código | supabase | critical | read-write |
| fluxo-de-clientes-workers | Processamento assíncrono e automações | Código / infra | workers-vps | critical | read-write |
| fluxo-de-clientes-infra | Configuração de infraestrutura e scripts | Infraestrutura | github-actions | critical | read-write |
| fluxo-de-clientes-docs | Documentação do produto e arquitetura | Documentação | gitbook | medium | read-write |
| .github | Governança, templates e políticas | Automação | github-actions | high | read-write |

## Dependências

| Repositório | Depende de |
|---|---|
| fluxo-de-clientes | fluxo-de-clientes-database, fluxo-de-clientes-infra |
| fluxo-de-clientes-workers | fluxo-de-clientes-database, Redis, integrações externas |
| fluxo-de-clientes-infra | VPS principal, VPS de workers, GitHub Actions |
| fluxo-de-clientes-docs | GitBook, arquitetura e README de produto |
| .github | Organização e políticas de repositórios |

## Política de modificação

- Qualquer mudança em produção deve passar por PR.
- Alterações em banco e infraestrutura precisam revisão extra.
- Alterações de documentação podem ser revisadas com menos rigidez, mas devem permanecer em sincronia com código e infra.
