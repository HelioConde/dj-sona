# Design System — DJ Sona

## Identidade
Experiência musical de fã inspirada nas três formas de DJ Sona. Preservar a troca de vídeo e as imagens originais. Evitar substituir as artes por imagens genéricas.

## Tokens
Definidos em `src/Global.css`: `--background`, `--surface`, `--surface-border`, `--text`, `--muted`, `--cyan`, `--pink`, `--green`, `--space-1` até `--space-12` e `--radius`.

## UI e acessibilidade
- Navegação responsiva com estados ativos e link para saltar ao conteúdo.
- Escolha de forma em botões semânticos com `aria-pressed`.
- Foco visível no teclado; contraste de texto claro em superfícies escuras.
- Respeito a `prefers-reduced-motion`: vídeo decorativo de fundo não é executado.
- Áudio inicia silencioso; o usuário escolhe ativar.
- Layout em grade com 3 colunas no desktop, 1 coluna em páginas internas no celular.

## GitHub Pages
Vite configura `base=/dj-sona/` somente no build da Action de Pages. A navegação usa `HashRouter` para evitar erro 404 ao atualizar as páginas internas.

## Pendências de revisão manual
Verificar licenças/direitos dos vídeos e artes, comportamento do autoplay no Safari e screenshots reais em dispositivos móveis.
