# 🎧 DJ Sona — Três formas. Uma experiência.

Fan project **não oficial**, inspirado em DJ Sona, de League of Legends. O conceito original permanece: um palco com vídeo de fundo, neon e três identidades — Kinetic, Concussive e Ethereal.

## Site publicado

https://helioconde.github.io/dj-sona/

É uma aplicação estática React + Vite com `HashRouter`, **sem API, login, banco de dados nem backend**. A última forma selecionada é guardada apenas no navegador.

## Usar localmente

Node.js 22+:

```bash
npm ci
npm run dev
npm run lint
npm run test
npm run build
npm run preview
```

O modo desenvolvimento usa vídeos originais de `public/movie/`. Para simular exatamente a publicação, instale FFmpeg e FFprobe e execute:

```bash
npm run build:pages
npm run media:check
npm run preview
```

## Funcionalidades

- Troca de forma por mouse, teclado ou toque.
- Som desativado por padrão; controle de volume.
- Respeito a movimento reduzido e fallback visual.
- Páginas História, Artes e Vídeos.
- URLs estáticas funcionando no GitHub Pages.
- Capturas com Playwright em desktop, tablet e mobile durante os PRs.

## Publicação

O workflow `.github/workflows/pages.yml` publica automaticamente após um push ou merge na `main` pelo **GitHub Actions** (Settings → Pages → Build and deployment → GitHub Actions).

A compilação do Pages transcodifica somente os três MP4 realmente utilizados e remove os demais do artefato publicado. O relatório de tamanho fica em `dist/media-report.json` e é arquivado no CI. A mídia original permanece em `public/movie/`.

A publicação antiga via FTP é manual e separada.

## Estrutura

- `src/` — componentes, páginas, dados e estilos.
- `public/` — mídias originais (não alterar sem revisão dos direitos).
- `scripts/optimize-media.mjs` — otimização FFmpeg e validação de duração/tamanho.
- `scripts/check-media.mjs` — verifica o resultado do build.
- `scripts/visual-qa.mjs` — capturas de tela e checagens com Playwright.
- `docs/DESIGN_SYSTEM.md` — padrões visuais.
- `docs/ASSETS_AND_RIGHTS.md` — inventário, créditos e limitações.

**Observação:** remover os antigos builds versionados diminui a árvore de arquivos atual, mas não apaga binários do histórico Git. Uma redução do histórico requer uma migração especial, não realizada nesta atualização.

## Direitos

DJ Sona, League of Legends e materiais associados pertencem à Riot Games e aos respectivos titulares. Este projeto não é endossado pela Riot Games. Confira termos e direitos antes de republicar imagens e sons.

Desenvolvido por [Hélio Conde](https://github.com/HelioConde).

## Controles de acessibilidade adicionais

O palco inclui **Pausar/Reproduzir** para o vídeo de fundo, independentemente de som e volume. Ao ativar movimento reduzido nas configurações do dispositivo, o site mostra a arte estática e desativa a reprodução automática; essa condição é testada pelo Playwright. Os controles funcionam por toque e teclado.
