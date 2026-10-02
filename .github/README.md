# Organização Fluxo de Clientes

Este repositório representa o ponto de entrada da organização e a base documental para governança, templates e convenções operacionais.

## Objetivo

- centralizar a identidade da organização;
- manter regras de contribuição;
- documentar arquitetura e repositorios;
- apoiar agentes de IA com contexto compartilhado;
- reduzir ambiguidade em decisões técnicas.

## Referências

- [Status canônico do projeto](../docs/PROJECT-STATUS.md)
- [Governança do GitHub](../docs/GITHUB-GOVERNANCE.md)
- [Diagnóstico e prevenção de erros de build](../docs/BUILD-RUNTIME.md)
- [ROOT_PROJECT](../PROJECT.yaml)
- [REPOSITORY](../REPOSITORY.yaml)
- [INFRASTRUCTURE](../INFRASTRUCTURE.yaml)
- [INTEGRATIONS](../INTEGRATIONS.yaml)
- [DEPENDENCIES](../DEPENDENCIES.yaml)

## Regras da organização

1. Nenhum secret em código.
2. Sempre usar Pull Request para mudanças críticas.
3. Manter documentação sincronizada com infraestrutura.
4. Repositórios do produto devem seguir a convenção de prefixo `fluxo-de-clientes-*`.
5. O repositório principal do produto deve conter metadados de identidade para facilitar bootstrap de novos SaaS.
6. Atualizar o status canônico no mesmo PR de mudanças relevantes e distinguir trabalho em revisão, integrado e implantado.
7. Repositórios de documentação e governança devem referenciar a fonte canônica; metadados de arquitetura não substituem evidências do ambiente publicado.
