# Fluxo de Clientes — console SaaS demonstrativo

Aplicação React real, com navegação, formulários, dados tipados e operações locais. A experiência reúne marketing, contatos, atendimento, funil, campanhas, automações e análise em uma interface em português do Brasil.

**Este console é uma demonstração com dados fictícios e operações locais no navegador. Não possui integrações com serviços externos.**

## Começar

Requisitos: Node.js **22.22.2 ou superior na família 22**, npm e um navegador atual. Também são compatíveis Node 24 a partir de 24.15.0 e Node 26 ou superior, conforme a faixa `^22.22.2 || ^24.15.0 || >=26.0.0` do projeto. Netlify e CI usam Node 22. Não é necessário criar conta, configurar variável de ambiente ou obter chave de serviço.

Na pasta que contém este README:

```sh
npm ci
npm run dev
```

Abra o endereço exibido no terminal, normalmente [http://127.0.0.1:5173](http://127.0.0.1:5173). Na cópia entregue, as dependências já estão instaladas. O arquivo ZIP de código-fonte não inclui dependências; execute `npm ci` após extrair.

A instalação inicial baixa bibliotecas do registro npm. Depois da instalação, o aplicativo funciona sem APIs ou recursos remotos. Fontes, ícones, logotipos e dados são locais. O código compilado deve ser servido por HTTP; não abra `dist/index.html` com duplo clique.

## Stack

- React 19.3 estável e TypeScript estrito.
- Vite 8.3 estável; Tailwind CSS 4 com `@tailwindcss/vite`.
- React Router 7 e carregamento sob demanda das rotas.
- Componentes em código seguindo a composição shadcn/ui: Button/CVA/Slot e primitives Radix para diálogos, menus e switches, com tema próprio.
- Lucide React, Recharts, TanStack Table **8**.
- React Hook Form, Zod 3 e resolvers; date-fns.
- Sonner; Vitest, Testing Library e ESLint.
- Inter variável empacotada localmente.

A versão 8 do TanStack Table é intencional e corresponde à API empregada na tabela. As versões resolvidas ficam em `package-lock.json`; use `npm ci` para reproduzi-las.

## Scripts

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Desenvolvimento e atualização local |
| `npm run typecheck` | Verificação TypeScript estrita |
| `npm run lint` | ESLint, sem avisos permitidos |
| `npm test` | Testes de domínio, estado e interação |
| `npm run test:watch` | Testes durante desenvolvimento |
| `npm run build` | Typecheck e compilação em `dist/` |
| `npm run preview` | Servir o build, normalmente em `http://127.0.0.1:4173` |

Para conferir o build:

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run preview
```

## Rotas

| Rota | Conteúdo |
| --- | --- |
| `/` | Redireciona para a visão geral |
| `/visao-geral` | Indicadores, evolução, funil, ações, atividades, saúde e uso |
| `/clientes` | Empresas, filtros, criação e detalhes |
| `/contatos` | Tabela, busca, filtros, seleção, cadastro, importação e histórico |
| `/atendimento` | Conversas, respostas locais, responsáveis, prioridades e tarefas |
| `/funil` | Sete etapas e movimentação por menu acessível |
| `/campanhas` | Lista, indicadores, filtros, cópia, pausa e retomada de rascunhos |
| `/campanhas/nova` | Objetivo, público, assunto, conteúdo, revisão e agendamento |
| `/automacoes` | Ativação, pausa e construtor de blocos editáveis |
| `/analises` | Conversão, canais, responsáveis, campanhas e sinais |
| `/dominios` | Autenticação, checklist e cenários de verificação |
| `/assistente` | Recomendações, justificativas e revisão humana |
| `/configuracoes` | Organização, equipe, permissões, preferências e uso |
| Qualquer outra | Página 404 com retorno |

Detalhes de contatos usam `/contatos?contato=ID`. Rascunhos podem ser retomados em `/campanhas/nova?rascunho=ID`. Seções de configurações usam a query `secao`.

## Como explorar

1. Crie um contato fictício pelo botão “Novo contato”. Ele entra na etapa Entrada.
2. Abra Contatos, pesquise pelo nome, ajuste responsável e etapa e adicione uma nota.
3. Confira a mesma oportunidade no funil. Use o menu do cartão para mover a etapa por teclado ou mouse.
4. No atendimento, responda localmente, conclua/reabra uma conversa e defina o próximo passo.
5. Crie uma campanha em seis etapas. Salve o rascunho e retome pelo menu na lista.
6. Pause uma automação, edite seus blocos e volte para conferir a alteração.
7. Troque de organização na barra superior; a visualização passa a filtrar os registros por `organizationId`.
8. Em Configurações → Equipe e permissões, teste o modo de leitura.
9. Em Configurações → Dados demonstrativos, explore os estados de carregamento, vazio, erro, permissão, sucesso e atenção, ou restaure a demonstração.

## CSV local

Baixe o modelo pelo modal de importação ou use `public/modelo-contatos.csv`.

Colunas obrigatórias: `nome,empresa,email,telefone`. A coluna `origem` é opcional. Aceita vírgula ou ponto e vírgula, BOM UTF-8, aspas escapadas e quebras de linha em campos entre aspas. Limites: **1 MB e 500 registros**.

A prévia mostra até cinco linhas. Linhas inválidas bloqueiam a importação até a correção. Duplicidades de e-mail são ignoradas dentro da organização selecionada. A leitura acontece no navegador; não há upload ou processamento em servidor. Use somente dados fictícios.

## Dados e persistência

O cenário inicial contém três organizações, 69 contatos, 27 conversas, campanhas e cinco fluxos por organização. A data de referência é **28 de setembro de 2026**; os números servem à demonstração.

- Estado operacional compartilhado: contatos, conversas, campanhas, automações, organizações, domínios, atividades, membros, catálogo de campos e revisões de insights.
- Preferências visuais e rascunhos ficam em `localStorage`, com prefixo `fc-`.
- Contatos e conversas não são persistidos; recarregar reinicia esses dados.
- Rascunhos das três organizações de exemplo são recuperáveis. Para uma organização criada temporariamente, o rascunho fica somente na sessão, conforme o aviso da interface.
- Agendamentos, pausas e mensagens são simulações; não executam tarefas em segundo plano.
- A restauração exige confirmação e limpa os rascunhos e as alterações locais; preferências visuais permanecem.
- O catálogo de campos personalizados é configurável nesta versão; o preenchimento desses campos no cadastro de contatos ainda não integra o MVP.

As contagens de contatos, etapas e uso refletem o estado local. Gráficos de contatos usam o período selecionado. Tempos médios, comparações de campanhas, taxas de passagem entre etapas e motivos de perda são cenários ilustrativos e estão sinalizados. Sem um histórico real, esses indicadores não devem fundamentar decisões reais.

A alternância por `organizationId` é uma experiência de interface. **Não representa isolamento seguro de dados ou autenticação.** Todos os mocks ficam no bundle público.

## Organização do código

```text
src/
  app/                 # Router, provider, estado e tratamento de erro
  components/
    charts/            # Gráfico carregado sob demanda
    contacts/          # Cadastro e painel de contato
    layout/            # Sidebar, topbar, busca e notificações
    ui/                # Botão e primitives acessíveis
  features/            # Telas de cada área do produto
  data/mock/           # Dados fictícios relacionados
  hooks/               # Estado de sessão auxiliar
  lib/                 # CSV, métricas, formatação e preferências
  types/               # Tipos do domínio
  styles/              # Tokens, tema e responsividade
public/
  brand/               # Matrizes SVG oficiais
  favicon.png          # Favicon original, preservado
  modelo-contatos.csv  # Exemplo fictício
tests/                 # Testes unitários e de interação
docs/brand/            # Manual e guia de implementação fornecidos
```

O workflow de CI do dashboard fica na raiz do repositório, em `.github/workflows/dashboard-ci.yml`, e executa as verificações nesta subpasta, sem publicação.

## Identidade e acessibilidade

Paleta canônica: laranja `#F0440B`, preto `#090909`, papel `#F4EADB`, canvas `#F8F4EC`, branco. O manual oficial prevalece sobre a imagem da landing.

A sidebar usa `logotipo-compacto-reverso.svg` a 180 px; o modo compacto usa `simbolo-original.svg` a 38 px. A prévia de e-mail usa a assinatura original a 240 px. Matrizes sem deformação, filtros ou recriação. O favicon foi copiado integralmente:

```text
SHA-256: 8998ddec71dda58027306507a519719beffa6258929a284c496a3f10b31c986a
```

A biblioteca adicional de SVGs foi analisada. Seus tons e símbolo anterior diferem da norma atual, por isso os logotipos vêm do kit oficial e os elementos operacionais são componentes React e ícones Lucide. A imagem `image-1790577287772.jpg` citada no prompt não foi localizada; os limites demonstrativos foram definidos a partir dos requisitos escritos.

A interface inclui foco visível, landmarks, atalho para o conteúdo, rótulos, avisos textuais, menus e diálogos com gerenciamento de foco, resumo textual dos gráficos, scroll acessível de tabelas e suporte a redução de movimento. As ações do funil são por menu; não há dependência de arrastar e soltar.

## Publicar manualmente na Netlify

A entrega não executa esta etapa.

1. Gere `npm run build`.
2. Na interface da Netlify, escolha a opção de adicionar/importar um projeto por publicação manual.
3. Envie a pasta **`dist`** completa.
4. O arquivo `_redirects` incluído no build encaminha URLs internas para `index.html`.
5. Confira `/contatos`, `/funil` e a rota 404 por acesso direto.

O ZIP do build pode ser extraído para obter essa pasta. Para configuração e cabeçalhos completos, prefira o fluxo por repositório abaixo.

## Publicar por GitHub + Netlify

1. Use o repositório existente [familia-calango-br/fluxo-de-clientes](https://github.com/familia-calango-br/fluxo-de-clientes), mantendo este console na subpasta `app/Console Dashboard Client Fluxo de Clientes/fluxo-de-clientes`. Não inclua `node_modules`, `dist`, caches ou dados reais.
2. Na Netlify, importe esse repositório usando a integração da sua conta.
3. Base directory: `app/Console Dashboard Client Fluxo de Clientes/fluxo-de-clientes`.
4. Build command: `npm run build`.
5. Publish directory: `dist`.
6. O `netlify.toml` configura Node 22, fallback SPA e cabeçalhos de segurança.
7. Não configure variáveis de ambiente para este MVP.
8. Após publicar, verifique navegação direta, recarga das rotas e console do navegador.

A configuração segue a [documentação oficial do Vite na Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/). O workflow `.github/workflows/dashboard-ci.yml`, na raiz do repositório, executa instalação, lint, typecheck, testes e build nesta subpasta. Ele **não publica** e não contém tokens ou segredos.

## Segurança e integrações futuras

Não há `.env`, uso de `import.meta.env`, credenciais, SDKs de provedores, chamadas HTTP a APIs externas, `dangerouslySetInnerHTML`, envio de e-mail, autenticação real ou backend simulado.

O código não pede chaves. As sugestões do assistente são regras locais e sempre dependem de revisão da equipe. Os registros DNS são exemplos sem validade operacional.

A fronteira futura deve ser:

```text
Console React
    ↓
Backend / Edge Function autenticada
    ↓
Provedor de dados, e-mail ou IA
```

Uma evolução segura começa por autenticação e autorização no servidor, isolamento por organização, validação de entrada e trilha de auditoria. Depois podem ser integrados armazenamento, um provedor de e-mail e um serviço de IA. Segredos devem ficar apenas na infraestrutura privada. Variáveis com prefixo `VITE_` são públicas no bundle; nunca devem conter segredos, conforme a [documentação do Vite](https://vite.dev/guide/env-and-mode).

Se for escolhido um serviço de dados como Supabase, o desenho deve incluir políticas de acesso no servidor e testes de isolamento. Essa decisão e qualquer conexão real exigem uma etapa separada; nenhum SDK foi instalado nesta entrega.

## Checklist antes de enviar ao GitHub

- [ ] Executar `npm ci`, lint, typecheck, testes e build.
- [ ] Confirmar ausência de `.env*`, tokens e credenciais.
- [ ] Manter apenas contatos, empresas e conversas fictícios.
- [ ] Conferir `.gitignore`; não versionar dependências e artefatos de teste.
- [ ] Confirmar que o favicon e os SVGs não foram alterados.
- [ ] Testar a recarga de rotas na hospedagem escolhida.
- [ ] Revisar o conteúdo antes de autorizar publicação.

Consulte também `docs/VALIDACAO.md` para os resultados registrados nesta entrega.
