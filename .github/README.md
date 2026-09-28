# Equipe de agentes e skills

Personalizações compartilhadas do workspace Fluxo de Clientes. Os agentes são especialistas invocáveis no VS Code; as skills fornecem procedimentos reutilizáveis e podem ser carregadas sob demanda.

## Agentes

| Agente                                                                    | Responsabilidade                                        | Use quando                                                          |
| ------------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------- |
| [Product Architect](agents/product-architect.agent.md)                    | Escopo, requisitos, arquitetura e critérios de aceite   | A demanda estiver ambígua, cruzar áreas ou tocar arquitetura futura |
| [Nuxt Engineer](agents/nuxt-engineer.agent.md)                            | Implementação Vue, Nuxt, TypeScript e Tailwind          | Criar ou corrigir páginas, componentes e comportamento              |
| [Brand & Accessibility Designer](agents/brand-accessibility.agent.md)     | Identidade, interface responsiva e acessibilidade       | Revisar ou construir experiência visual e interação                 |
| [Content & SEO Strategist](agents/content-seo.agent.md)                   | Conteúdo comercial pt-BR, metadados e busca             | Ajustar copy, hierarquia, CTA ou SEO                                |
| [Privacy & Integrations Specialist](agents/privacy-integrations.agent.md) | Formulário, dados pessoais e integrações externas       | Conectar serviços ou revisar fluxos de demonstração                 |
| [Quality Engineer](agents/quality-engineer.agent.md)                      | Testes, regressão, acessibilidade automatizável e build | Definir ou executar validação antes de entregar                     |

## Skills

| Skill                                                                | Procedimento                                |
| -------------------------------------------------------------------- | ------------------------------------------- |
| [project-context](skills/project-context/SKILL.md)                   | Estrutura, limites e comandos do projeto    |
| [brand-identity](skills/brand-identity/SKILL.md)                     | Uso correto do kit e tokens oficiais        |
| [responsive-accessibility](skills/responsive-accessibility/SKILL.md) | Revisão responsiva, teclado e semântica     |
| [ptbr-content-seo](skills/ptbr-content-seo/SKILL.md)                 | Copy comercial e SEO em português do Brasil |
| [demo-form-privacy](skills/demo-form-privacy/SKILL.md)               | Integração segura de formulário e dados     |
| [quality-gates](skills/quality-gates/SKILL.md)                       | Seleção de testes, lint, typecheck e build  |

## Fluxo sugerido

1. Use Product Architect para decompor uma demanda ampla e definir aceite.
2. Acione somente os especialistas necessários; para uma tarefa local, trabalhe direto com o agente correspondente.
3. Implemente na fonte canônica `SITE/`, preserve os limites de produto e rode os gates relevantes.
4. Encerre com resumo, validações realmente executadas e pendências explícitas.

## Limite do produto atual

O escopo implementado é uma landing page Nuxt. O dashboard e os serviços de dados citados em `docs/ARQUITETURA.md` são planos separados, não funcionalidades já disponíveis. A interface contém exemplos fictícios e não persiste os dados do funil.
