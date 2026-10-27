# DJ Sona — Experiência interativa

Homenagem **não oficial** à DJ Sona, de League of Legends. Preserva as três formas musicais (Kinetic, Concussive e Ethereal) e os vídeos que já existiam no projeto.

## Funcionalidades
- Página inicial com seleção acessível das três formas, vídeo de fundo, áudio opt-in e preferência de movimento reduzido.
- História: apresentação editorial das formas.
- Wallpapers: galeria com as três pequenas imagens disponíveis no projeto.
- Vídeos: biblioteca com carregamento sob demanda.
- Navegação via HashRouter, sem servidor, API, PHP ou banco de dados.
- Interface responsiva para mobile, tablet e desktop.

## Executar localmente

```bash
npm ci
npm run dev
npm run lint
npm run build
npm run preview
```

## GitHub Pages

O Vite usa `base: '/dj-sona/'` ao compilar no GitHub Actions. As rotas `#/historia`, `#/wallpapers` e `#/videos` funcionam em atualização direta, sem fallback de servidor.

O workflow `.github/workflows/pages.yml` faz lint, build, testes no Chromium e deploy no Pages quando houver push na `main`. Configure **Settings → Pages → Build and deployment → GitHub Actions**. URL esperada após publicação: https://helioconde.github.io/dj-sona/

Em pull requests, o workflow testa, mas não publica. Capturas e `qa-report.json` ficam nos artefatos `dj-sona-visual-qa`.

Para QA local depois de `npm ci`:

```bash
npm install --no-save playwright@1.56.1
npx playwright install chromium
npm run build
npm run preview -- --port 4173
# em outro terminal:
QA_URL=http://127.0.0.1:4173/ node tests/visual.mjs
```

## Design
Ver `docs/DESIGN_SYSTEM.md`. Tokens de foco, espaçamento, estados, responsividade e guidelines de acessibilidade estão documentados.

## Créditos
Projeto experimental criado por Hélio Conde. DJ Sona e League of Legends são marcas/obras da Riot Games e titulares. Não existe vínculo oficial ou integração com contas de jogo. Confira direitos de uso antes de republicar os arquivos audiovisuais.
