# Fluxo de Clientes

Aplicação Nuxt 4 para captação de demonstrações e gestão inicial de contatos, com Supabase Auth, Postgres e políticas de Row Level Security.

## Requisitos

- Node.js 22
- npm
- Projeto Supabase configurado

## Configuração local

1. Instale as dependências:

   ```bash
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

## Funcionalidades disponíveis

- Formulário de demonstração com validação no navegador e no servidor. A confirmação aparece somente depois que o pedido é registrado.
- Login e recuperação de senha via Supabase Auth.
- Isolamento de dados por empresa, autorização no banco e escolha de empresa para usuários associados a mais de uma.
- Cadastro, consulta, busca e atualização de contatos, etapa, responsável, origem, próxima ação e histórico.
- A landing mantém números e telas de produto identificados como demonstrativos. Conversas da demonstração local continuam transitórias e não são o histórico operacional de contatos.

## Verificação

```bash
npm run build
```

As migrations e políticas podem ser validadas em um projeto Supabase local ou em ambiente de desenvolvimento antes de qualquer aplicação a produção. As chaves nunca devem ser versionadas.
