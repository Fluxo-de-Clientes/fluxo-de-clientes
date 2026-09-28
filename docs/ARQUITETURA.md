# Arquitetura — Fluxo de Clientes

## Escopo atual

O produto é um sistema comercial multi-tenant. O **Tenant 1** é a primeira empresa cliente configurada neste fluxo.

O repositório contém duas aplicações publicadas separadamente na Netlify:

- `SITE/`: site comercial público.
- `app/Console Dashboard Client Fluxo de Clientes/fluxo-de-clientes/`: dashboard do cliente, com autenticação e onboarding.

As duas aplicações permanecem no mesmo repositório, com builds e bases de publicação independentes.

## Fluxo comercial planejado

1. O usuário acessa o site comercial.
2. Autentica-se pelo Supabase.
3. Entra no dashboard e conclui o onboarding.
4. O Stripe processa o pagamento.
5. Um evento confirmado do Stripe inicia o provisionamento.
6. A automação cria ou ativa o tenant correspondente no hub SaaS.
7. O usuário acessa os recursos liberados para seu tenant.

O pagamento confirmado pelo Stripe é a condição para provisionar o tenant. Um retorno de checkout no navegador não libera acesso sozinho.

## Hub SaaS e redes privadas

### KVM4 — hub SaaS multi-tenant

A KVM4 é o hub privado onde roda o SaaS multi-tenant. Ela atende todas as empresas e centraliza os serviços de negócio. O hub não é uma interface para clientes finais; o acesso acontece por meio do dashboard e de APIs autorizadas.

O endereço conhecido do SaaS é `app.fluxodeclientes.com.br`. A exposição definitiva, o proxy e os registros DNS serão cadastrados quando a lista de domínios estiver fechada.

### KVM2 — workers

A KVM2 é a rede privada de workers, com Redis, n8n e agente runtime. Esses serviços executam automações e processamento de bastidores. Não devem ser expostos diretamente ao navegador.

Endereços, portas e rotas privadas da VPN ficam fora do repositório. A comunicação pública deve passar por API ou proxy autenticado, com TLS, autorização por tenant, limites e logs sem dados sensíveis.

## Fronteiras de comunicação

``text
Usuário
  ↓
Site comercial (Netlify)
  ↓ autenticação / entrada
Supabase Auth
  ↓ sessão e identidade
Dashboard do cliente (Netlify)
  ↓ API autenticada por tenant
Hub SaaS multi-tenant (KVM4)
  ↓ jobs e eventos
Workers (KVM2: Redis + n8n + agente runtime)

Stripe ── evento confirmado ──> provisionamento ──> Tenant 1
``

O dashboard não acessa Redis, n8n ou o agente runtime diretamente. O hub valida identidade, tenant e permissões no servidor.

## Supabase

Será usado um projeto Supabase separado para o Fluxo de Clientes. Nesta etapa, o Supabase é a autoridade de autenticação do site e do dashboard. Tabelas de tenants, RLS, callbacks do Stripe e provisionamento automatizado serão implementados em etapas próprias.

Regras obrigatórias:

- nunca expor `service_role` ou secret key no frontend;
- ativar RLS em toda tabela exposta;
- usar `app_metadata` ou tabelas protegidas para autorização por tenant;
- não usar `user_metadata` para decisões de autorização;
- manter URLs, chaves e endpoints privados nas variáveis da plataforma;
- testar o isolamento do Tenant 1 antes de liberar qualquer segundo tenant.

## Estado e próximos limites

Este documento registra a arquitetura-alvo e o alinhamento de produto. Não afirma que autenticação, Stripe, provisionamento ou comunicação com as VPNs já estejam implementados.

Antes de ligar qualquer integração, registrar domínio e subdomínios, endpoint público autenticado do hub KVM4, projeto Supabase e ambientes, eventos Stripe com assinatura verificada, contrato de API, estratégia de isolamento de tenants e observabilidade dos jobs da KVM2.

## Frontend
Nuxt + TypeScript.

## Site comercial
Hospedagem preferencial: Netlify.

## Dados
Supabase exclusivo deste produto.

## Dashboard
Aplicação separada em `app.fluxodeclientes.com.br`.

## Regra
Não compartilhar banco ou variáveis sensíveis com Fluxo Atento.
