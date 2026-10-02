# Organização Fluxo de Clientes

Este repositório representa o ponto de entrada da organização e a base documental para governança, templates e convenções operacionais.

## Objetivo

- centralizar a identidade da organização;
- manter regras de contribuição;
- documentar arquitetura e repositorios;
- apoiar agentes de IA com contexto compartilhado;
- reduzir ambiguidade em decisões técnicas.

## Referências

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
