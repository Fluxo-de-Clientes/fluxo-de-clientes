# Proteção de branches

## Branch principal

A branch `main` deve ser protegida em todos os repositórios do produto.

## Checklist de proteção

- [ ] Require a pull request before merging
- [ ] Require approvals: `1`
- [ ] Dismiss stale reviews on new commits
- [ ] Require status checks to pass before merging
- [ ] Require branches to be up to date before merging
- [ ] Do not allow force pushes
- [ ] Do not allow deletions
- [ ] Restrict who can push to matching branches

## Repositórios prioritários

Aplicar regras mais rígidas em:

- fluxo-de-clientes-database
- fluxo-de-clientes-workers
- fluxo-de-clientes-infra

## Caminho no GitHub

- Repositório
- Settings
- Branches
- Add rule
- Pattern: `main`
