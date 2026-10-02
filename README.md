# Fluxo de Clientes

Protótipo de uma plataforma para organizar marketing, atendimento e dados. A página inicial apresenta um painel demonstrativo, um funil com contatos fictícios e um fluxo visual do contato à oportunidade. Os botões de demonstração abrem uma conversa local na aplicação.

O projeto usa **Nuxt 4, Vue 3, TypeScript, Nuxt UI e GSAP**. As conversas ficam no estado da sessão, sem backend, banco de dados ou persistência.

## Desenvolvimento

Use Node.js 22, a versão configurada no CI. Instale as dependências e inicie o servidor local:

```bash
npm install
npm run dev
```

O servidor de desenvolvimento usa `http://localhost:3000` por padrão. A instalação executa `nuxt prepare` pelo script `postinstall`.

## Comandos disponíveis

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Iniciar o servidor de desenvolvimento. |
| `npm run build` | Gerar o build de produção. |
| `npm run preview` | Servir localmente o build de produção já gerado. |
| `npm run generate` | Executar a geração estática do Nuxt. |
| `npm test` | Validar os dados e a geometria do gráfico com o executor de testes do Node.js. |

## Estrutura e documentação

- `app/pages/`: página inicial e rotas de conversa.
- `app/components/landing/`: painel, gráfico, funil e animação demonstrativa.
- `app/utils/contactTrend.ts`: dados ilustrativos e cálculo das curvas do gráfico.
- `app/composables/useVisualChats.ts`: estado transitório das conversas.
- [Refinamento do painel e da landing page](docs/DASHBOARD-PREMIUM.md): decisões, dados, comportamento responsivo, animações e validação.
- [Governança do GitHub](docs/GITHUB-GOVERNANCE.md): identificação do repositório e convenções de governança.
- [Orientações para contribuir](AGENTS.md): padrões e limites deste protótipo.
