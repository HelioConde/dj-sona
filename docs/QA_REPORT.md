# Plano de validação — DJ Sona

## Alterações verificáveis no código
- Rotas padronizadas com `HashRouter`, compatível com hospedagem estática de projeto.
- Páginas História, Wallpapers e Vídeos não estão mais vazias.
- Seleção de formas via botão acessível, sem eventos exclusivos de mouse.
- Áudio mudo por padrão, controle de volume e suporte a movimento reduzido.
- Layout e tokens globais com contraste e indicadores de foco.
- Workflow GitHub Actions com build, lint, Playwright e deploy de `dist/`.
- Workflow FTP antigo removido para não exigir credenciais HOST/USER/PASS.

## Verificação automatizada
Os testes em `tests/site.spec.mjs` cobrem três viewports (375, 768, 1440) e capturam quatro rotas. O workflow faz upload das capturas e relatórios.

**Estado:** código preparado; execução do Playwright, resultado de build e publicação devem ser confirmados nos jobs do GitHub Actions. Este arquivo não afirma aprovação antecipada.

## GitHub Pages
Em Settings → Pages, configurar **Source: GitHub Actions**. O workflow publica ao receber push em `main`. A aplicação usa caminhos relativos e rotas `#/...`, sem backend nem banco de dados.

## Observação de recursos
Os vídeos MP4 originais são grandes, e downloads dependem da rede do visitante. A página de vídeos não inicia downloads até o usuário escolher a mídia. O uso das artes e dos vídeos continua sujeito aos direitos dos titulares.