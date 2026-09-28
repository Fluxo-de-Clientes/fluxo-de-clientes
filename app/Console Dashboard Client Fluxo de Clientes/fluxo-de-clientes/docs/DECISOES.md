# Decisões do MVP

- Aplicação de trabalho com navegação fixa, ações diretas e pouca ornamentação.
- Paleta e SVGs do kit oficial prevalecem sobre a landing. Logo compacto na sidebar para respeitar redução mínima.
- Fundo canvas, cartões brancos, bordas quentes e superfícies escuras pontuais para recomendações.
- Fonte Inter local, sem Google Fonts ou recursos remotos.
- Dados compartilhados por provider; seleção por organização em todas as áreas operacionais.
- Tabela TanStack v8 com referências estáveis para evitar renderizações recorrentes ao abrir detalhes.
- Funil movido por menu acessível; nenhuma biblioteca de drag-and-drop necessária.
- Primitives Radix para foco, Escape, modais, menus e switches; padrão de composição shadcn/ui adaptado à marca.
- Campanha simples com conteúdo textual seguro, revisão e persistência apenas de rascunhos.
- Automações visuais com gatilho, condição, espera, mensagem, tarefa, etapa e responsável. Sem execução.
- Domínios .example e registros estritamente ilustrativos. Nenhuma verificação DNS.
- Assistente por regras locais, sem inferência remota ou execução automática.
- Importação CSV em memória e validação antes da inclusão; nunca envia arquivos.
- Estado de erro global, skeletons de rota, vazios, filtros sem resultado, bloqueio visual de leitura, confirmação de reset e toasts.
- Testes cobrindo consistência do domínio, CSV, recuperação de armazenamento, mutações e interação com a tabela.
- Netlify preparada com fallback em netlify.toml e _redirects para a opção manual.
- Sem publicação, repositório remoto ou integrações nesta entrega.
