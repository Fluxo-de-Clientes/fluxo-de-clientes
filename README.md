# Fluxo de Clientes

Aplicação em Nuxt 4, Vue 3 e TypeScript para apresentar o Fluxo de Clientes e demonstrar a experiência de atendimento. A interface está em português e usa Nuxt UI, ícones Lucide e GSAP.

A página inicial apresenta um painel demonstrativo, um funil com contatos fictícios e um fluxo visual do contato à oportunidade. Os botões de demonstração abrem uma conversa local na aplicação.

O código atual é um protótipo de front-end: as conversas ficam no estado da sessão, sem backend ou persistência. Serviços descritos nos metadados do ecossistema não devem ser considerados implementados sem evidência no código e no ambiente correspondente.

## Comece pela situação do projeto

- [Status oficial do projeto](docs/PROJECT-STATUS.md): o que está integrado, em revisão, publicado e pendente.
- [Governança](docs/GITHUB-GOVERNANCE.md): regras para contribuição e atualização do status.
- [Diagnóstico e prevenção de erros de build](docs/BUILD-RUNTIME.md): causa do incidente com Node 20 e política de runtime.
- [Orientações para agentes](AGENTS.md) e [agente BUILD ERROR RESEARCH](.github/agents/build-error-research.agent.md).

## Identificação do Supabase

O projeto Supabase de referência é **fluxo-de-clientes**, da organização **quadrilha_calango**, com identificador **`bkhuyaivdvxjqybcglyo`** e banco **`postgres`**. Região: **São Paulo (`sa-east-1`)**.

Consulte o [registro de identificação do Supabase](docs/SUPABASE.md) e os [metadados em INTEGRATIONS.yaml](INTEGRATIONS.yaml) antes de trabalhar nessa integração. [Abrir o projeto no Supabase](https://supabase.com/dashboard/project/bkhuyaivdvxjqybcglyo).

Este registro contém somente identificação pública; a conexão da aplicação ao Supabase ainda não está implementada.

## Preparar o ambiente

Use **Node.js 22.23.1**, definido em [`.nvmrc`](.nvmrc), e npm. GitHub Actions e o próximo build do Netlify que incluir este arquivo usam a mesma versão. O campo `engines` aceita a família 22 a partir desse patch; `.npmrc` faz a instalação recusar versões fora da faixa.

Selecione essa versão no seu gerenciador de Node ou instale-a e confirme:

```sh
node --version
npm --version
npm ci
```

O projeto mantém `package-lock.json`. Use `npm ci` para reproduzir as dependências versionadas. Use `npm install` quando a tarefa exigir uma mudança intencional nas dependências e revise o lockfile resultante.

O servidor de desenvolvimento usa `http://localhost:3000` por padrão. A instalação executa `nuxt prepare` pelo script `postinstall`.

## Comandos

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Desenvolvimento em `http://localhost:3000`. |
| `npm run build` | Build de produção. |
| `npm run preview` | Prévia local do build de produção. |
| `npm run generate` | Geração estática, quando exigida pelo destino de entrega. |
| `npm test` | Validar os dados e a geometria do gráfico com o executor de testes do Node.js. |

Não há scripts `lint` ou `typecheck` nesta base. Confira `package.json` antes de executar ou declarar essas validações.

## Hospedagem e atualizações

O site confirmado está no [Netlify, projeto fluxodeclientes](https://app.netlify.com/projects/fluxodeclientes), com domínio [fluxodeclientes.com.br](https://fluxodeclientes.com.br). A versão efetivamente publicada e a data da última verificação ficam no status oficial.

Uma alteração em `.nvmrc` só afeta novos builds que contenham o arquivo. Ela tem precedência sobre a seleção de Node no painel do Netlify. Não é necessário alterar o painel para duplicar essa configuração. Confira o runtime nos logs do novo deploy antes de declarar a atualização publicada.

Para contribuir, siga [CONTRIBUTING](.github/CONTRIBUTING.md), abra um PR para `main`, execute as validações pertinentes e atualize o status junto com a mudança.

## Estrutura e documentação

- `app/pages/`: página inicial e rotas de conversa.
- `app/components/landing/`: painel, gráfico, funil e animação demonstrativa.
- `app/utils/contactTrend.ts`: dados ilustrativos e cálculo das curvas do gráfico.
- `app/composables/useVisualChats.ts`: estado transitório das conversas.
- [Refinamento do painel e da landing page](docs/DASHBOARD-PREMIUM.md): decisões, dados, comportamento responsivo, animações e validação.
- [Governança do GitHub](docs/GITHUB-GOVERNANCE.md): identificação do repositório e convenções de governança.
- [Orientações para contribuir](AGENTS.md): padrões e limites deste protótipo.
