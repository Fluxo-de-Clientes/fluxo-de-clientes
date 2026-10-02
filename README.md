# Fluxo de Clientes

Aplicação Nuxt 4 para captação de demonstrações e gestão inicial de contatos, com Supabase Auth, Postgres e políticas de Row Level Security.

A página inicial apresenta um painel demonstrativo, um funil com contatos fictícios e um fluxo visual do contato à oportunidade. O projeto usa **Nuxt 4, Vue 3, TypeScript, Nuxt UI e GSAP**. As conversas da demonstração local ficam no estado da sessão.

## Comece pela situação do projeto

- [Status oficial do projeto](docs/PROJECT-STATUS.md): o que está integrado, em revisão, publicado e pendente.
- [Governança](docs/GITHUB-GOVERNANCE.md): regras para contribuição e atualização do status.
- [Diagnóstico e prevenção de erros de build](docs/BUILD-RUNTIME.md): causa do incidente com Node 20 e política de runtime.
- [Orientações para agentes](AGENTS.md) e [agente BUILD ERROR RESEARCH](.github/agents/build-error-research.agent.md).

## Identificação do Supabase

O projeto Supabase de referência é **fluxo-de-clientes**, da organização **quadrilha_calango**, com identificador **`bkhuyaivdvxjqybcglyo`** e banco **`postgres`**. Região: **São Paulo (`sa-east-1`)**.

Consulte o [registro de identificação do Supabase](docs/SUPABASE.md) e os [metadados em INTEGRATIONS.yaml](INTEGRATIONS.yaml) antes de trabalhar nessa integração. [Abrir o projeto no Supabase](https://supabase.com/dashboard/project/bkhuyaivdvxjqybcglyo).

Este registro contém somente identificação pública; a conexão da aplicação depende das variáveis de ambiente e da migration descritas abaixo.

## Preparar o ambiente

Use **Node.js 22.23.1**, definido em [`.nvmrc`](.nvmrc), e npm. GitHub Actions e o próximo build do Netlify que incluir este arquivo usam a mesma versão. O campo `engines` aceita a família 22 a partir desse patch; `.npmrc` faz a instalação recusar versões fora da faixa.

Selecione essa versão no seu gerenciador de Node ou instale-a antes de configurar a aplicação. Os fluxos integrados dependem de um projeto Supabase configurado.

## Configuração local

1. Confirme o runtime e instale as dependências versionadas:

   ```bash
   node --version
   npm --version
   npm ci
   ```

2. Copie `.env.example` para `.env` e configure:

   - `NUXT_PUBLIC_SUPABASE_URL`: URL pública do projeto Supabase.
   - `NUXT_PUBLIC_SUPABASE_KEY`: publishable key (ou chave `anon` legada); é pública e não substitui RLS.
   - `NUXT_SUPABASE_SECRET_KEY`: chave secreta Supabase, somente no servidor. Não use o prefixo `NUXT_PUBLIC_`.
   - `NUXT_PUBLIC_APP_URL`: origem da aplicação, usada nos links de recuperação de senha.

3. Aplique a migration versionada ao projeto autorizado usando a Supabase CLI:

   ```bash
   supabase link --project-ref bkhuyaivdvxjqybcglyo
   supabase db push
   ```

   A migration cria a captação de demonstrações, empresas, membros, etapas, contatos, atividades e políticas RLS. Este repositório não executa nem publica migrations automaticamente.

4. Configure no Supabase Auth as URLs de retorno `http://localhost:3000/auth/callback` e a URL de produção correspondente. Crie o primeiro usuário pelo fluxo administrativo do Supabase; após entrar, ele poderá configurar a empresa e será o administrador inicial.

5. Inicie o servidor:

   ```bash
   npm run dev
   ```

Antes de publicar, configure a política aprovada de privacidade e retenção, os endereços de produção permitidos no Supabase Auth e o canal de acompanhamento/aviso dos pedidos comerciais. Convites e administração de membros ainda não fazem parte desta entrega; o primeiro usuário é provisionado pelo Supabase.

O projeto mantém `package-lock.json`. Use `npm ci` para reproduzir as dependências versionadas. Use `npm install` quando a tarefa exigir uma mudança intencional nas dependências e revise o lockfile resultante.

O servidor de desenvolvimento usa `http://localhost:3000` por padrão. A instalação executa `nuxt prepare` pelo script `postinstall`.

## Funcionalidades disponíveis

- Formulário de demonstração com validação no navegador e no servidor. A confirmação aparece somente depois que o pedido é registrado.
- Login e recuperação de senha via Supabase Auth.
- Isolamento de dados por empresa, autorização no banco e escolha de empresa para usuários associados a mais de uma.
- Cadastro, consulta, busca e atualização de contatos, etapa, responsável, origem, próxima ação e histórico.
- A landing mantém números e telas de produto identificados como demonstrativos. Conversas da demonstração local continuam transitórias e não são o histórico operacional de contatos.

## Verificação

```bash
npm test
npm run build
```

As migrations e políticas podem ser validadas em um projeto Supabase local ou em ambiente de desenvolvimento antes de qualquer aplicação a produção. As chaves nunca devem ser versionadas.

## Comandos disponíveis

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

- `app/pages/`: página inicial, demonstração, autenticação, gestão de contatos e rotas de conversa.
- `app/components/landing/`: painel, gráfico, funil e animação demonstrativa.
- `app/utils/contactTrend.ts`: dados ilustrativos e cálculo das curvas do gráfico.
- `app/composables/useVisualChats.ts`: estado transitório das conversas.
- [Refinamento do painel e da landing page](docs/DASHBOARD-PREMIUM.md): decisões, dados, comportamento responsivo, animações e validação.
- [Governança do GitHub](docs/GITHUB-GOVERNANCE.md): identificação do repositório e convenções de governança.
- [Orientações para contribuir](AGENTS.md): padrões e limites da aplicação.
