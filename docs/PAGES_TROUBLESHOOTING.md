# Correção de publicação no GitHub Pages — DJ Sona

Se aparecerem `GET /src/main.jsx 404` ou `%BASE_URL%icon-dj-sona.png`, o GitHub Pages está servindo o HTML fonte do Vite, em vez do `dist/index.html` gerado pela compilação.

## Corrigir a origem da publicação (necessário)
1. Acesse https://github.com/HelioConde/dj-sona/settings/pages
2. Em **Build and deployment → Source**, escolha **GitHub Actions**, não **Deploy from a branch**.
3. Em **Actions**, abra **Build and publish DJ Sona (GitHub Pages)** e execute **Run workflow** na branch `main` (ou aguarde o próximo push).
4. Confirme que o workflow terminou com sucesso, inclusive a etapa **Check the live HTML does not expose Vite source paths**.
5. Abra https://helioconde.github.io/dj-sona/ com recarga forçada (`Ctrl+Shift+R`).

A opção **GitHub Actions** requer acesso de administrador ao repositório. O token automático do GitHub Actions retornou erro **403 Resource not accessible by integration** ao tentar alterar essa configuração; por isso o ajuste deve ser realizado na interface.

## Verificação técnica
- Arquivos de desenvolvimento: `/src/main.jsx` e `%BASE_URL%icon-dj-sona.png` são aceitáveis apenas no `index.html` fonte antes da compilação.
- O build Vite transforma esses caminhos e gera arquivos em `/dj-sona/assets/`.
- `vite.config.js` deve manter `base: '/dj-sona/'`.
- A navegação usa `HashRouter`, pois o GitHub Pages não oferece fallback SPA.
- O workflow falha quando detecta HTML não compilado no build ou no site publicado.
