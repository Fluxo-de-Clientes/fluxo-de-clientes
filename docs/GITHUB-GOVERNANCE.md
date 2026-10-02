# Governança do GitHub — Fluxo de Clientes

## Objetivo

Este documento define a estrutura mínima de governança para a organização do produto Fluxo de Clientes. A ideia é deixar a organização legível para humanos e agentes, reduzir ambiguidade e proteger branches, produção e acesso de escrita.

## Identificação canônica

- Repositório principal: `Fluxo-de-Clientes/fluxo-de-clientes` (`owner/repo`).
- URL HTTPS: `https://github.com/Fluxo-de-Clientes/fluxo-de-clientes`.
- URL Git: `https://github.com/Fluxo-de-Clientes/fluxo-de-clientes.git`.
- Em instruções, automações e PRs, use sempre o nome completo `owner/repo`; não infira o proprietário pelo nome do produto nem selecione forks ou cópias históricas sem confirmação explícita.
- Preserve o slug do repositório em minúsculas e kebab-case: `fluxo-de-clientes`.

## 1. Propriedades recomendadas

Acesse o painel do GitHub em:

- Sua foto da conta
- Organizations
- Fluxo-de-Clientes
- Settings
- Repositories
- Custom properties

### Propriedades obrigatórias

| PROPERTY NAME | TYPE | DESCRIPTION | ALLOWED VALUES | REQUIRED | WHY |
|---|---|---|---|---|---|
| product | String | Produto principal ao qual o repositório pertence | `fluxo-de-clientes` | Yes | Identifica o produto |
| component | String | Papel do repositório dentro do produto | `site`, `app`, `api`, `database`, `workers`, `infra`, `docs`, `org` | Yes | Define o papel técnico |
| criticality | Single select | Nível de criticidade | `low`, `medium`, `high`, `critical` | Yes | Aumenta regras de proteção |
| environment | Single select | Ambiente principal do repositório | `development`, `staging`, `production` | Yes | Diferencia produção e suporte |
| deploy_target | String | Destino de deploy | `netlify`, `saas-vps`, `workers-vps`, `supabase`, `gitbook`, `github-actions` | Yes | Define a infraestrutura alvo |
| agent_access | String | Nível de acesso para agentes | `read-only`, `read-write`, `restricted` | Yes | Controla o que os agentes podem alterar |

### Regras de configuração

- Use valores curtos e padronizados.
- Prefira `Single select` quando o conjunto de valores for pequeno e conhecido.
- `Allow repository actors to set this property`: marcar como `No` para manter controle centralizado na organização.
- `Require this property for all repositories`: marcar como `Yes` para garantir padronização.

## 2. Repositórios esperados

Esta tabela define os papéis e destinos previstos para os repositórios. Ela não comprova que serviços, permissões ou ambientes estejam ativos. O destino do repositório principal foi atualizado para Netlify após consulta ao deploy publicado; os demais destinos continuam sendo referências de arquitetura até verificação específica.

| Repository | product | component | environment | criticality | deploy_target | agent_access |
|---|---|---|---|---|---|---|
| fluxo-de-clientes | fluxo-de-clientes | app | production | high | netlify | read-write |
| fluxo-de-clientes-database | fluxo-de-clientes | database | production | critical | supabase | read-write |
| fluxo-de-clientes-workers | fluxo-de-clientes | workers | production | critical | workers-vps | read-write |
| fluxo-de-clientes-infra | fluxo-de-clientes | infra | production | critical | github-actions | read-write |
| fluxo-de-clientes-docs | fluxo-de-clientes | docs | production | medium | gitbook | read-write |
| .github | fluxo-de-clientes | org | production | high | github-actions | read-write |

O [status canônico do projeto](PROJECT-STATUS.md) registra a infraestrutura observada, os commits e as evidências. Placeholders de `INFRASTRUCTURE.yaml`, URLs em `PROJECT.yaml` e valores de propriedades recomendadas não devem ser apresentados como implantação confirmada. Esta documentação também não comprova que as propriedades e proteções sugeridas abaixo já estejam configuradas no GitHub.

## 3. Regras de proteção de branch

Acesse:

- Repositório
- Settings
- Branches
- Add branch protection rule

### Regra base para `main`

- Require a pull request before merging
- Require approvals: `1`
- Dismiss stale pull request approvals when new commits are pushed
- Require status checks to pass before merging
- Require branches to be up to date before merging
- Do not allow force pushes
- Do not allow deletions

### Repositórios críticos

Para `fluxo-de-clientes-database`, `fluxo-de-clientes-workers`, `fluxo-de-clientes-infra`:

- aplicar proteção mais rígida;
- exigir check de CI;
- validar changes em produção somente via PR.

## 4. Environments

Acesse:

- Repositório
- Settings
- Environments

Crie pelo menos:

- `production`
- `staging` (quando necessário)

Use `required reviewers` para produção, especialmente em `infra` e `database`.

## 5. Secrets e variables

### Estratégia recomendada

- Repository secrets: para configuração específica do repositório
- Organization secrets: para valores compartilhados entre vários repositórios
- Environment secrets: para dados sensíveis de `production`
- Variables: para valores não secretos e reutilizáveis

### Exemplos

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NETLIFY_SITE_ID`
- `VPS_SSH_KEY`
- `REDIS_HOST`
- `OPENAI_API_KEY`
- `GA4_MEASUREMENT_ID`

Nunca comitar valores reais em código. Sempre registrar no GitHub Secrets ou Variables.

## 6. Checklist de implementação

- [ ] Criar as custom properties na organização
- [ ] Atribuir aos repositórios
- [ ] Configurar regra de branch para `main`
- [ ] Criar `production` e `staging`
- [ ] Validar reviewers da produção
- [ ] Registrar secrets no nível correto
- [ ] Configurar workflows de CI
- [ ] Revisar permissões de agentes
- [ ] Validar documentação e readme de cada repositório

## 7. Próximo passo prático

Consulte o [status do projeto](PROJECT-STATUS.md) para conhecer o código integrado, os PRs em revisão, a implantação confirmada e as próximas ações. O diagnóstico e a prevenção do incidente de build estão em [BUILD-RUNTIME.md](BUILD-RUNTIME.md).

## 8. Status do projeto e comunicação de mudanças

- A fonte canônica do estado consolidado é `Fluxo-de-Clientes/fluxo-de-clientes/docs/PROJECT-STATUS.md`.
- Atualize o status no mesmo PR que altera comportamento relevante, build, dependências, infraestrutura ou condições de entrega. Registre data, repositório, branch ou commit, ambiente, mudança, validações, limitações e próximo passo.
- Distinga trabalho **proposto**, **em desenvolvimento**, **em revisão**, **integrado à main** e **implantado**. Um PR aberto, um build aprovado ou a seleção de uma versão no painel do provedor não comprovam implantação.
- Associe cada resultado ao commit e à execução verificados. Não apresente testes de uma branch, de um commit anterior ou com ajustes temporários como validação de outra configuração.
- Para incidentes de build, registre sintoma, causa comprovada, correção, prevenção e links de evidência. Atualizações de dependências devem responder a uma necessidade demonstrada; confira primeiro runtime, lockfile e ambiente de execução.
- Mantenha referências à fonte canônica nos repositórios de documentação e governança da organização. Documentos de cada componente devem tratar seu escopo e apontar para o status geral, sem duplicar versões independentes dele.
- Use PRs e documentos vinculados para comunicar mudanças em todo o projeto. Atualize os pontos de entrada quando uma fonte canônica for criada ou movida.
- Não inclua credenciais, dados pessoais de clientes ou logs com tokens nos registros. Documentação descreve permissões e acessos existentes; não os concede.
- Após integração e implantação, atualize os respectivos estados com evidências. Se a execução ou o runtime efetivo não puderem ser consultados, registre essa limitação explicitamente.
