---
name: demo-form-privacy
description: 'Use when changing the demo request form, collecting contact data, configuring an external endpoint, handling consent, CORS, privacy, or integration errors.'
---
# Formulário e privacidade

## Estado atual
- O formulário é uma demonstração de interface; os campos e alterações do funil não são persistidos.
- O endpoint externo é opcional e vem de `NUXT_PUBLIC_DEMO_ENDPOINT`; `NUXT_PUBLIC_*` nunca é segredo.
- Sem endpoint ou URL de agendamento válida, a UI informa indisponibilidade e não envia dados nem simula sucesso.
- A integração real deve responder 2xx e `{ "success": true }`; ver `SITE/README.md` e `SITE/app/components/forms/DemoRequestDialog.vue`.

## Antes de integrar
1. Confirme autorização, finalidade, campos mínimos, destino, retenção e aviso de privacidade.
2. Mantenha credenciais no servidor da integração; não adicione backend ou persistência ao frontend por suposição.
3. Planeje validação server-side, proteção contra abuso, CORS restrito, limites e erros sem exposição de dados pessoais.
4. Trate timeout, respostas inválidas, falha de rede, carregamento, sucesso confirmado e indisponibilidade.
5. Não registre nomes, e-mails ou mensagens em logs de cliente; use dados fictícios nos testes.

## Validação
- Teste o formulário sem configuração e confirme que nenhum pedido é enviado.
- Teste sucesso apenas contra endpoint autorizado e erros sem transmitir dados a serviços de terceiros.
- Peça revisão humana para política legal, consentimento e retenção; não declare conformidade jurídica.