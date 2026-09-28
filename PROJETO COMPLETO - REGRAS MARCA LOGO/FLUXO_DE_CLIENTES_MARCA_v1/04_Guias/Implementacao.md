# FLUXO DE CLIENTES
# Implementação do kit de marca

**Versão 1.0 · 24 de setembro de 2026**  
**Status:** instruções preparadas para incorporação; nenhum deploy é declarado por este documento.

Use este guia para colocar os arquivos do kit em um site, app, documento ou perfil. As cores e as composições oficiais estão no Manual de identidade visual que acompanha a entrega.

## 1. Escolha rápida

1. Escolha a composição: nome, símbolo ou assinatura com ambos.
2. Escolha a cor pelo fundo: original no claro; reversa ou branca no escuro.
3. Use SVG onde houver suporte. Use PNG nas plataformas que pedirem uma imagem.
4. Redimensione mantendo a proporção e confira a peça no tamanho final.

Para site, comece por `assinatura-horizontal-original.svg`. Para avatar ou app, use a composição pronta com o símbolo. Para e-mail, use o PNG de assinatura. Não extraia imagens da prancha de apresentação.

## 2. Pastas no repositório

O repositório já mantém sua referência visual em `docs/design/referencia-visual-canonica/`. A integração proposta adiciona o conjunto abaixo:

```text
docs/design/referencia-visual-canonica/marca/
├── README.md
├── Catalogo_da_Marca.html
├── 01_Logotipos/
├── 02_Simbolo/
├── 03_Aplicacoes/
├── 04_Guias/
│   ├── Manual_de_Identidade.md
│   ├── Implementacao.md
│   └── Guia_Oficial_da_Marca.pdf
└── 05_Favicon_Preservado/

site/assets/brand/
├── assinatura-horizontal-original.svg
├── assinatura-horizontal-reverso.svg
├── logotipo-horizontal-original.svg
└── simbolo-original.svg
```

Os caminhos de marca acima são novos destinos propostos. O acervo completo fica junto à documentação. A pasta pública recebe somente os arquivos necessários às páginas.

O build atual, em `scripts/build-public-site.sh`, já copia `site/` inteira para `_site/site/`. Por isso os ativos de `site/assets/brand/` passam a responder em `/site/assets/brand/`. Colocar os arquivos apenas em `docs/` não os publica.

## 3. Imagem no site

Exemplo de assinatura em uma página:

```html
<img
  class="marca"
  src="/site/assets/brand/assinatura-horizontal-original.svg"
  alt="Fluxo de Clientes"
>
```

```css
.marca {
  display: block;
  width: 280px;
  max-width: 100%;
  height: auto;
}
```

Para a assinatura horizontal, use no mínimo 240 px de largura. Defina a largura pelo espaço disponível e pelos limites do manual. Para reservar espaço durante o carregamento, acrescente os atributos `width` e `height` na proporção exata indicada pelo SVG ou PNG escolhido. Não use dimensões de outra composição.

Quando a marca for um link para a página inicial:

```html
<a href="/" aria-label="Fluxo de Clientes, página inicial">
  <img
    class="marca"
    src="/site/assets/brand/assinatura-horizontal-original.svg"
    alt=""
  >
</a>
```

O nome acessível está no link, por isso a imagem recebe `alt=""`. Se o nome da marca já aparecer ao lado como texto, o símbolo também pode usar `alt=""`. Para uma marca isolada sem outro nome acessível, use `alt="Fluxo de Clientes"`.

Em fundo escuro, troque o arquivo pela variante `reverso` ou `branco`. Não tente corrigir uma variante inadequada com filtros CSS, opacidade ou inversão de cor.

## 4. Onde integrar no site atual

| Local | Ação de integração |
| --- | --- |
| `site/index.html` | Aplicar a assinatura no cabeçalho e no rodapé, mantendo a navegação existente |
| `fale-agora.html` | Aplicar a assinatura de forma compatível com a rota de contato |
| Páginas de suporte e institucionais | Usar a mesma variante e proporção adotadas nos demais cabeçalhos |
| `index.html` | Definir a aplicação do nome e avatar no hub de acordo com a composição escolhida |
| `site/site.css` e `styles/legal.css` | Ajustar o espaço da imagem sem deformação e sem duplicar o nome visualmente |

O endereço `app.fluxodeclientes.com.br` pertence a um ambiente separado deste repositório. Seus ativos devem ser integrados no projeto do app; copiar o kit para o site público não altera o app.

## 5. Favicon: manter como está

Preserve as cópias existentes:

```text
favicon.png
site/favicon.png
docs/design/referencia-visual-canonica/assets/favicon.png
```

Preserve também esta referência:

```html
<link rel="icon" type="image/png" href="/favicon.png">
```

A pasta `05_Favicon_Preservado` contém o PNG original de conferência. O SHA-256 esperado é:

```text
8998ddec71dda58027306507a519719beffa6258929a284c496a3f10b31c986a
```

O símbolo novo serve às aplicações de marca previstas no kit. Ele não substitui o favicon por efeito desta entrega.

## 6. E-mail, redes, app e impressão

**E-mail:** use PNG. Quando o editor solicitar uma URL, hospede a imagem em um endereço HTTPS público e estável. Mantenha nome, cargo, telefone e links como texto editável fora da imagem. Envie uma mensagem de teste para conferir tamanho, legibilidade e carregamento.

**Redes sociais:** use os PNG da pasta de aplicações. Confira a área visível do avatar depois do recorte circular e a posição da marca na capa pelo celular. Não acrescente molduras que reduzam o símbolo.

**App:** use os arquivos fornecidos como base visual. Gere os tamanhos e as configurações exigidos pelo projeto de destino a partir da matriz, preservando as margens da composição. Não desenhe uma segunda máscara arredondada dentro de uma máscara já aplicada pelo sistema.

**Impressão:** envie o SVG ou outro vetor de produção fornecido, junto da indicação de cor. Em impressão de uma tinta, use preto ou branco. Peça uma prova antes da produção final; a conversão de cor e o acabamento dependem do processo e do suporte.

## 7. Incorporar a norma canônica

Para adotar o kit no repositório:

1. Adicione o manual, este guia e o acervo em `docs/design/referencia-visual-canonica/marca/`.
2. Inclua um link para o manual no índice da referência visual.
3. Atualize os trechos de `05-tipografia.md`, `11-imagens-e-identidade.md` e `19-nao-fazer.md` conforme o adendo do manual. A nova regra cobre os ativos gráficos entregues; fonte UI e favicon continuam preservados.
4. Copie para `site/assets/brand/` somente os arquivos escolhidos para uso público.
5. Aplique-os nas páginas desejadas e confira as composições em telas estreitas e largas.
6. Registre a adoção em `PROJECT_STATE.md` e no registro correspondente em `docs/updates/`, distinguindo acervo disponível, aplicação implementada e publicação efetiva.

Não marque a identidade como aplicada em produção apenas por adicionar os arquivos ao repositório. Esse estado exige que as páginas publicadas carreguem os ativos corretos.

## 8. Conferência antes de usar

- O arquivo corresponde à composição e ao fundo escolhidos.
- O nome inteiro e as aberturas do símbolo estão legíveis.
- A imagem mantém sua proporção e não toca textos, bordas ou ícones vizinhos.
- PNG está nítido no tamanho real e SVG abre sem depender de fontes externas.
- Nome acessível e link funcionam quando a marca integra a navegação.
- O favicon continua sendo o PNG original.
- Na publicação web, cada imagem carrega pelo endereço final previsto.

Guarde uma cópia deste kit como matriz de reprodução. Evite editar e redistribuir cópias intermediárias sem atualizar sua versão e seu nome.

## 9. Arquivos para começar

| Uso | Arquivo dentro do kit | Exibição sugerida |
| --- | --- | --- |
| Site claro | `01_Logotipos/assinatura-horizontal-original.svg` | 280 px ou mais |
| Site escuro | `01_Logotipos/assinatura-horizontal-reverso.svg` | 280 px ou mais |
| App | `03_Aplicacoes/app/icone-app-original-1024px.png` | Fonte de exportação para a plataforma |
| PWA | `03_Aplicacoes/app/manifest-exemplo.json` | Adaptar os caminhos ao app |
| Perfil social | `03_Aplicacoes/redes/avatar-original-1024px.png` | Enviar o PNG inteiro |
| Assinatura | `03_Aplicacoes/assinatura/assinatura-email-original-600px.png` | 300 × 100 px |
| Impressão | `03_Aplicacoes/impressao/Logos_vetoriais.pdf` | Selecionar composição com o fornecedor |

As capas sociais são exportações prontas nos tamanhos indicados no nome/arquivo, sem garantia de recorte igual em todos os dispositivos. Confirme a prévia da plataforma. O arquivo de assinatura HTML é um modelo local; substitua os campos entre colchetes e o endereço da imagem antes de copiar para um cliente de e-mail. A imagem isolada também pode ser inserida diretamente pelo editor.

Copie a pasta completa deste kit para o destino canônico, renomeando a pasta raiz para `marca`. Copie as matrizes selecionadas para `site/assets/brand` com seus nomes originais. A entrega inclui os arquivos e a documentação; não altera o repositório remoto automaticamente.
