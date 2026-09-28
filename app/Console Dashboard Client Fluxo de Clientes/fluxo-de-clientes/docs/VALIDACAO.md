# Registro de validação

Data: 28 de setembro de 2026. Ambiente: Windows, Node 22.23.1, npm 10, navegador Chromium integrado. Aplicação servida localmente por Vite e, na conferência final, pelo build de produção em http://127.0.0.1:4173.

## Qualidade

- `npm run lint`: aprovado, sem avisos.
- `npm run typecheck`: aprovado em modo estrito.
- `npm test`: 21 testes em três arquivos.
- `npm run build`: aprovado, gera `dist` com divisão de código por rotas.
- Nenhum aviso crítico na compilação. Os maiores arquivos JavaScript são inferiores a 500 kB antes da compressão.
- Os testes de interação têm limite de 20 segundos para acomodar máquinas de desenvolvimento com recursos concorrentes; nenhum temporizador artificial foi inserido na aplicação.

## Cobertura automatizada

- CSV: cabeçalhos obrigatórios, delimitadores, aspas, quebras de linha, validação e limites.
- Relações entre dados mockados, organização, períodos e somas do gráfico.
- Preferências e rascunhos inválidos no armazenamento local.
- Cadastro, mudanças de etapa e responsável, proteção visual de leitura e escopo de organização.
- Sincronização de domínio com saúde da organização e restauração da demonstração.
- Abertura de detalhe, nota interna, mudança de etapa, busca vazia e recuperação da tabela.

## Navegação e responsividade

As 12 telas foram abertas e tiveram seu título e a largura do documento conferidos nos quatro tamanhos. Os resultados medidos estão em `qa-rotas.json`.

| Largura | Rotas verificadas | Overflow horizontal da página |
| --- | --- | --- |
| 1440 px | 12/12 | Não |
| 1280 px | 12/12 | Não |
| 768 px | 12/12 | Não |
| 390 px | 12/12 | Não |

Tabelas, configurações e kanban podem ter rolagem horizontal intencional dentro de suas áreas. A barra lateral foi ajustada para quebrar rótulos longos sem rolagem horizontal. O drawer móvel mantém acesso à navegação, e o contexto do atendimento continua disponível abaixo da conversa.

O redirecionamento de `/` para `/visao-geral`, a página 404 e seu retorno também foram verificados. Acesso direto às rotas internas funcionou no preview Vite. O fallback Netlify foi conferido nos arquivos; a execução na hospedagem deverá ser verificada após uma publicação autorizada.

## Interações conferidas no navegador

- Criar contato fictício, pesquisar, abrir detalhes, mudar responsável e etapa e salvar nota.
- Mover oportunidade pelo menu do funil e conferir a contagem.
- Responder localmente, concluir e reabrir conversa.
- Criar campanha nas seis etapas, salvar, recarregar, retomar e editar o rascunho.
- Pausar e editar automação, acrescentar bloco e salvar.
- Trocar organização e verificar os registros do contexto.
- Marcar notificação como lida e pesquisar pela busca global.
- Importar o CSV fictício fornecido: duas linhas válidas, prévia e inclusão na tabela.
- Alterar cenário de domínio e verificar o novo estado.
- Ativar o modo de leitura e confirmar que o cadastro fica desabilitado.
- Explorar carregando, vazio, erro, sem permissão, sucesso e atenção.
- Alterar o período dos indicadores e conferir os valores.
- Abrir navegação móvel e manter as ações do atendimento acessíveis.
- Fechar diálogo pelo teclado com Escape.

Na varredura das 48 combinações de rota e tamanho, o console do build não registrou erros ou avisos.

## Marca e revisão de arquivos

- Os três SVGs de `public/brand` são idênticos byte a byte às matrizes oficiais, por SHA-256.
- Favicon original preservado: `8998ddec71dda58027306507a519719beffa6258929a284c496a3f10b31c986a`.
- Nenhum arquivo `.env*` no projeto.
- Revisão de padrões em arquivos do projeto, excluindo dependências: nenhuma credencial aparente, chave privada ou token encontrado.
- Sem `import.meta.env`, `dangerouslySetInnerHTML`, chamadas de API externa ou SDK de provedor na aplicação.
- Recursos de interface são locais. E-mails e domínios de demonstração usam `.example`.
- CI com permissão de leitura e verificações; sem etapa de deploy.

## Limites desta validação

Esta conferência não é uma certificação formal WCAG, auditoria de segurança nem teste de infraestrutura real. Não houve execução em Safari, Firefox, aparelho físico, leitor de tela ou conta Netlify. Acessibilidade foi revista por estrutura semântica, rótulos, foco visível, Escape, primitives Radix, resumos de gráficos e dimensões responsivas.

A aplicação é uma demonstração de front-end. Autenticação, isolamento seguro por organização, entrega de mensagens, consultas DNS, execução de automações e análise por modelo de IA não existem nesta versão. O README descreve persistência, indicadores ilustrativos e evolução segura.
