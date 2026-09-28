# Instruções do projeto

## Fonte e escopo
- O site comercial em produção é o projeto Nuxt de `SITE/`. Edite `SITE/app/` e `SITE/public/`; não mantenha uma segunda implementação na raiz.
- `SITE/index.html`, `SITE/_nuxt/`, `SITE/.output/` e cópias de assets na raiz de `SITE/` são saídas geradas. Não edite nem versione essas cópias.
- `docs/ARQUITETURA.md` descreve intenções futuras. Dashboard separado, Supabase e APIs comerciais não estão implementados pelo site atual; não os apresente como existentes.
- O kit extraído em `PROJETO COMPLETO - REGRAS MARCA LOGO/FLUXO_DE_CLIENTES_MARCA_v1/` é a referência normativa da marca. Para a aplicação, consulte também `SITE/docs/identity.md`.

## Regras de produto
- Escreva a interface em português do Brasil e mantenha o tom comercial claro para pequenas e médias empresas.
- Trate contatos, métricas, funil e sugestões de IA como demonstrações fictícias. Não invente resultados, clientes, integrações ou persistência.
- O formulário só deve enviar dados quando houver endpoint externo configurado e fluxo autorizado. Nunca coloque segredos no frontend; sem configuração, não simule envio ou sucesso.
- Preserve os arquivos oficiais de marca sem redesenhar, recolorir ou recortar. Use os tokens de `SITE/app/assets/css/main.css` e os assets públicos existentes.
- Prefira mudanças pequenas, acessíveis e consistentes com Nuxt 4, Vue 3, TypeScript estrito e Tailwind CSS 4. Não adicione dependências sem necessidade comprovada.

## Segurança
- Nunca commitar credenciais. Toda configuração sensível deve entrar apenas por variável de ambiente ou secret manager.
- Mantenha `.env` e variantes locais fora do Git; versionar somente `.env.example` com placeholders fictícios e sem valores reais.
- Em CI/CD, leia segredos de GitHub Secrets, Netlify Environment Variables ou secret manager aprovado; nunca os registre em código ou logs.

## Trabalho e validação
- Consulte os agentes e skills em `.github/README.md` quando a tarefa exigir uma especialidade; carregue apenas os que forem pertinentes.
- Execute comandos do app a partir de `SITE/`. Priorize um teste focado; para mudanças abrangentes use `pnpm typecheck`, `pnpm lint`, `pnpm test` e `pnpm build` conforme aplicável.
- Não declare testes como aprovados se não foram executados. A suíte de navegador usa Playwright e pode exigir `pnpm test:install` na primeira execução.