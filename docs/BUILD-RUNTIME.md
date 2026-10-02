# Build: diagnóstico e política de Node.js

Registro do incidente investigado em **02/10/2026**. Consulte o [status do projeto](PROJECT-STATUS.md) para distinguir a correção histórica da prevenção proposta e da versão publicada.

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

## Prevenção desta alteração

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

O projeto confirmado é [fluxodeclientes](https://app.netlify.com/projects/fluxodeclientes), conectado à `main`, com domínio [fluxodeclientes.com.br](https://fluxodeclientes.com.br). O deploy `6ac003151eb2525fa8185e5f` estava publicado, com estado `ready`, no commit `85856008c58062b3dc6d18ede3ae7e61378ad52e`, em 02/10/2026 às 16:17:14 de São Paulo.

A imagem enviada pelo usuário mostra Node **24.x** selecionado no painel, mas não comprova o patch efetivamente usado nem se a seleção foi salva. O runtime desse deploy não foi obtido na consulta de metadados.

Na [configuração de dependências do Netlify](https://docs.netlify.com/build/configure-builds/manage-dependencies/), arquivos de versão no diretório-base prevalecem sobre a seleção do painel. A [precedência documentada](https://docs.netlify.com/build/configure-builds/available-software-at-build-time/) é `.nvmrc`, `.node-version`, `NODE_VERSION` e, por último, painel. Neste projeto, `.nvmrc` fica junto de `package.json`, na raiz.

Assim, o novo pin será usado somente em builds que incluam esta alteração, com a raiz como diretório-base. Não foi feita mudança direta no painel nem publicação de produção por este trabalho. Depois da integração, confira no novo log Node 22.23.1, o commit implantado, o resultado do build e o estado publicado. Um CI aprovado não substitui essa verificação.

## Como validar uma mudança de runtime

Na raiz do projeto e com a versão de `.nvmrc` ativa:

```sh
node --version
npm --version
node -p "typeof Set.prototype.difference"
npm ci
npm run build
```

A consulta do método deve retornar `function`. Use uma cópia limpa ou o ambiente de CI para confirmar que o build não depende de arquivos locais. Preserve as dependências travadas, confira os avisos e o código de saída e associe cada resultado ao commit validado. Um bloqueio de rede ou falta de credenciais deve ser relatado como limitação de ambiente, não como falha do código.

Leia [`package.json`](../package.json) antes de executar verificações adicionais: nesta base não há scripts `test`, `lint` ou `typecheck`. Valide o comportamento afetado e registre exatamente o que foi executado, sem inventar aprovação de testes.

## Comunicação para o projeto

A situação consolidada fica em [PROJECT-STATUS.md](PROJECT-STATUS.md). README, governança e instruções de agentes apontam para ela. Os repositórios de documentação e da organização devem manter referências à fonte canônica, sem copiar estados que possam divergir.

O [agente BUILD ERROR RESEARCH](../.github/agents/build-error-research.agent.md) incorpora esse procedimento: primeiro evidências do commit e ambiente, depois a menor correção, validação e atualização do status.
