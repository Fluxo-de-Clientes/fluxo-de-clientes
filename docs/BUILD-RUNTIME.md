# Build: diagnóstico e política de Node.js

Registro dos incidentes investigados em **02/10/2026**. A produção foi recuperada no deploy `6ac054636c298e1572a7da39`, com Node 22.23.1 e npm 10.9.8 confirmados no log. Consulte o [status do projeto](PROJECT-STATUS.md) para a versão publicada, os testes HTTP e os limites funcionais.

## O que falhou e por quê

O [build 37031519464](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/actions/runs/37031519464/job/110919246247), do commit `5f7b31ad14cdc0ab7b8309dce20bdfb6404c27d1`, executou Node.js **20.20.2**, npm **10.8.2** e terminou com:

```text
TypeError: trustedFunctions.difference is not a function
```

O workflow daquele commit selecionava Node 20. A instalação já emitia avisos `EBADENGINE`: Nuxt 4.5.2 e dependências do build exigiam versões mais recentes de Node. Em `postcss-merge-longhand@8.0.4`, arquivo `src/lib/unresolved.js`, `trustedFunctions` é um `Set`, e o pacote chama `trustedFunctions.difference(...)`.

A dependência entra pela cadeia registrada no lockfile:

```text
@nuxt/vite-builder@4.5.2
└── cssnano@8.0.10
    └── cssnano-preset-default@8.0.10
        └── postcss-merge-longhand@8.0.4
```

Node 20 não fornece essa operação nativa. Os novos métodos de `Set` foram incorporados ao [Node 22 com a atualização do V8](https://nodejs.org/en/blog/announcements/v22-release-announce). Portanto, o sintoma foi causado pelo runtime incompatível, não por um conflito demonstrado entre Nuxt e Nuxt UI.

Não foi necessário atualizar `@nuxt/ui` de 4.11.2 para 4.15.0, remover o lockfile, adicionar polyfill ou alterar o código da interface.

## Correção já integrada

O commit [65f2ecb4](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/commit/65f2ecb4d333a9da79d9446b27e5092aed71f2c1) mudou o CI para Node 22. Essa correção já está na `main`. O [CI 37045837461](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/actions/runs/37045837461) foi aprovado para a `main` em `85856008c58062b3dc6d18ede3ae7e61378ad52e`.

A execução antiga permanece vermelha como histórico. Ela não indica que a versão atual continua com a mesma falha; repetir o workflow do commit antigo reutiliza sua configuração antiga.

## Prevenção integrada pelo PR #5

O [PR #5](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/pull/5) foi integrado à `main` no merge [`7a90f4c`](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/commit/7a90f4c239ca793ee3d8eb7d938a59cd8bcfcb52). O [PR #6](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/pull/6) preservou essa política na resolução dos conflitos e foi integrado no commit [`aef6f59`](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/commit/aef6f5932ed14d34fbbd7409fb109bbdf55f3b79). O [status do projeto](PROJECT-STATUS.md) reúne as evidências atuais e as referências históricas; os resultados do CI pertencem ao commit indicado em cada execução.

| Arquivo | Regra |
| --- | --- |
| [`.nvmrc`](../.nvmrc) | Versão de referência: **22.23.1**. |
| [`package.json`](../package.json) | `engines.node: ^22.23.1`, permitindo a família 22 a partir desse patch. |
| [`package-lock.json`](../package-lock.json) | Mesmo requisito nos metadados da raiz, sem atualizar as versões das dependências. |
| [`.npmrc`](../.npmrc) | `engine-strict=true`: instalação recusa runtime incompatível em vez de prosseguir com avisos. |
| [CI](../.github/workflows/ci.yml) | `actions/setup-node` lê `.nvmrc` e registra Node/npm antes da instalação e do build. |

22.23.1 é a versão presente no ambiente de validação e atende aos requisitos do lockfile inspecionado, incluindo o requisito transitivo `^22.22.2 || >=24.15.0` de `jsdoc-type-pratt-parser`. A escolha padroniza a família 22; não significa que toda versão de Node 24 seja incompatível. Para adotar outra família, revise a política e valide a árvore completa primeiro.

O pin precisa de manutenção: ao atualizar Node, ajuste `.nvmrc`, revise `engines` em `package.json` e na raiz do lockfile e valide a mudança em PR. Não use `--force` ou desative `engine-strict` para esconder incompatibilidades.

## Relação com o Netlify

O projeto confirmado é [fluxodeclientes](https://app.netlify.com/projects/fluxodeclientes), conectado à `main`, com domínio [fluxodeclientes.com.br](https://fluxodeclientes.com.br). O [deploy `6ac054636c298e1572a7da39`](https://app.netlify.com/projects/fluxodeclientes/deploys/6ac054636c298e1572a7da39) publicou o commit `aef6f5932ed14d34fbbd7409fb109bbdf55f3b79` em 02/10/2026 às 22:04:14 de São Paulo. O log confirma Node **22.23.1**, npm **10.9.8** e build completo; a função usa `nodejs22.x`.

Na [configuração de dependências do Netlify](https://docs.netlify.com/build/configure-builds/manage-dependencies/), arquivos de versão no diretório-base prevalecem sobre a seleção do painel. A [precedência documentada](https://docs.netlify.com/build/configure-builds/available-software-at-build-time/) é `.nvmrc`, `.node-version`, `NODE_VERSION` e, por último, painel. Neste projeto, `.nvmrc` fica junto de `package.json`, na raiz.

O pin do PR #5 está integrado e foi utilizado nesse deploy. Para cada nova publicação, confira novamente runtime, commit, build e resposta HTTP real. Um CI aprovado não substitui essa verificação.

## Incidente de configuração Supabase

O build da PR #6 passou, mas a produção respondeu HTTP 500 porque `NUXT_PUBLIC_SUPABASE_KEY` não estava configurada no Netlify. O plugin SSR cria o cliente antes de renderizar qualquer página, e o módulo instalado apenas avisa durante o build sobre a chave ausente.

A recuperação configurou `NUXT_PUBLIC_SUPABASE_URL` e `NUXT_PUBLIC_SUPABASE_KEY` em Production e refez o build da mesma main pelo Git vinculado. As duas variáveis públicas usam All scopes, pois o plano atual não aceitou escopos granulares. A leitura de confirmação do provedor deve mostrar as variáveis; a mensagem de sucesso de uma ferramenta, isoladamente, não comprova persistência.

Uma tentativa de upload local em ZIP falhou na leitura da versão de `.nvmrc`; repetir o build diretamente do Git eliminou esse problema de transporte sem alterar o runtime versionado. Para o site já vinculado, usar `netlify deploy --trigger --prod --site 2ea03f45-ba43-41a6-84c7-41a7f117c980` e verificar o deploy criado.

A prevenção foi integrada à `main` pela [PR #7](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/pull/7), no commit [`ed5cdb0`](https://github.com/Fluxo-de-Clientes/fluxo-de-clientes/commit/ed5cdb0a1c6d68ef8fccde277ee097c5bf88a5ae). O hook `prebuild` executa [check-deploy-env.mjs](../scripts/check-deploy-env.mjs) e falha em Netlify/Production se URL ou chave pública estiverem vazias, sem imprimir valores. Builds de CI/local/preview não são bloqueados por essa verificação; a disponibilidade dessas páginas depende de sua própria configuração e de teste HTTP. A recuperação histórica descrita acima usou `aef6f59`, antes dessa prevenção; a publicação de commits posteriores deve ser confirmada no [status do projeto](PROJECT-STATUS.md).

Após publicar, verificar `/`, `/entrar`, `/demonstracao`, a marca e os links para o aplicativo. HTTP 200 na página de formulário não comprova gravação de pedidos, assim como HTTP 200 em `/login` não comprova autenticação completa. O estado do schema e as configurações pendentes estão no [status](PROJECT-STATUS.md).

## Como validar uma mudança de runtime

Na raiz do projeto e com a versão de `.nvmrc` ativa:

```sh
node --version
npm --version
node -p "typeof Set.prototype.difference"
npm ci
npm test
npm run build
```

A consulta do método deve retornar `function`. Use uma cópia limpa ou o ambiente de CI para confirmar que o build não depende de arquivos locais. Preserve as dependências travadas, confira os avisos e o código de saída e associe cada resultado ao commit validado. Um bloqueio de rede ou falta de credenciais deve ser relatado como limitação de ambiente, não como falha do código.

O script `npm test` valida dados/geometria do gráfico e a prevenção de build sem ambiente, com o executor de testes do Node.js; sua aprovação não valida autenticação, contatos ou políticas do banco. Leia [`package.json`](../package.json) antes de executar verificações adicionais: nesta base não há scripts `lint` ou `typecheck`. Registre exatamente o que foi executado.

## Comunicação para o projeto

A situação consolidada fica em [PROJECT-STATUS.md](PROJECT-STATUS.md). README, governança e instruções de agentes apontam para ela. Os repositórios de documentação e da organização devem manter referências à fonte canônica, sem copiar estados que possam divergir.

O [agente BUILD ERROR RESEARCH](../.github/agents/build-error-research.agent.md) incorpora esse procedimento: primeiro evidências do commit e ambiente, depois a menor correção, validação e atualização do status.
