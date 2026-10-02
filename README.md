# Fluxo de Clientes

Aplicação em Nuxt 4, Vue 3 e TypeScript para apresentar o Fluxo de Clientes e demonstrar a experiência de atendimento. A interface está em português e usa Nuxt UI, ícones Lucide e GSAP.

O código atual é um protótipo de front-end: as conversas ficam no estado da sessão, sem backend ou persistência. Serviços descritos nos metadados do ecossistema não devem ser considerados implementados sem evidência no código e no ambiente correspondente.

## Comece pela situação do projeto

- [Status oficial do projeto](docs/PROJECT-STATUS.md): o que está integrado, em revisão, publicado e pendente.
- [Governança](docs/GITHUB-GOVERNANCE.md): regras para contribuição e atualização do status.
- [Diagnóstico e prevenção de erros de build](docs/BUILD-RUNTIME.md): causa do incidente com Node 20 e política de runtime.
- [Orientações para agentes](AGENTS.md) e [agente BUILD ERROR RESEARCH](.github/agents/build-error-research.agent.md).

## Preparar o ambiente

Use **Node.js 22.23.1**, definido em [`.nvmrc`](.nvmrc), e npm. GitHub Actions e o próximo build do Netlify que incluir este arquivo usam a mesma versão. O campo `engines` aceita a família 22 a partir desse patch; `.npmrc` faz a instalação recusar versões fora da faixa.

Selecione essa versão no seu gerenciador de Node ou instale-a e confirme:

```sh
node --version
npm --version
npm ci
```

O projeto mantém `package-lock.json`. Use `npm ci` para reproduzir as dependências versionadas. Use `npm install` quando a tarefa exigir uma mudança intencional nas dependências e revise o lockfile resultante.

## Comandos

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Desenvolvimento em `http://localhost:3000`. |
| `npm run build` | Build de produção. |
| `npm run preview` | Prévia local do build de produção. |
| `npm run generate` | Geração estática, quando exigida pelo destino de entrega. |

Não há scripts `test`, `lint` ou `typecheck` nesta base. Confira `package.json` antes de executar ou declarar essas validações.

## Hospedagem e atualizações

O site confirmado está no [Netlify, projeto fluxodeclientes](https://app.netlify.com/projects/fluxodeclientes), com domínio [fluxodeclientes.com.br](https://fluxodeclientes.com.br). A versão efetivamente publicada e a data da última verificação ficam no status oficial.

Uma alteração em `.nvmrc` só afeta novos builds que contenham o arquivo. Ela tem precedência sobre a seleção de Node no painel do Netlify. Não é necessário alterar o painel para duplicar essa configuração. Confira o runtime nos logs do novo deploy antes de declarar a atualização publicada.

Para contribuir, siga [CONTRIBUTING](.github/CONTRIBUTING.md), abra um PR para `main`, execute as validações pertinentes e atualize o status junto com a mudança.
