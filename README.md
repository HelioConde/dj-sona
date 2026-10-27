# 🎧 DJ Sona — Fan page musical interativa

Experiência de fã, não oficial, inspirada nas **três formas de DJ Sona** de League of Legends: Kinetic, Concussive e Ethereal.

## O que funciona

- Três formas com vídeo de fundo, botão de seleção e identidade visual neon.
- Som desligado por padrão, ativação voluntária e controle de volume.
- Seções História, Wallpapers e Vídeos com navegação por teclado e toque.
- Vídeos sob demanda, respeito ao movimento reduzido e layout responsivo.
- GitHub Pages sem PHP, MySQL, API ou banco de dados: toda interação acontece no navegador.
- Testes com Playwright e capturas nos tamanhos 375, 768 e 1440 pixels.

## Rodar localmente

```bash
npm ci
npm run dev
npm run lint
npm run build
```

Para testes de navegador:

```bash
npm install --no-save @playwright/test@1.56.1
npx playwright install chromium
npx playwright test
```

## Deploy

O workflow `.github/workflows/pages.yml` executa QA e, quando aprovado em `main`, publica `dist/`. Ative **Settings → Pages → Build and deployment → Source: GitHub Actions**. Endereço previsto: https://helioconde.github.io/dj-sona/

A navegação usa URLs como `/#/historia`, permitindo abrir e atualizar páginas internas sem precisar de redirecionamentos de servidor. O build Vite usa `base: './'` para preservar os caminhos sob `/dj-sona/`.

Consulte [Design System](docs/DESIGN_SYSTEM.md) e [Plano de QA](docs/QA_REPORT.md).

## Créditos e direitos

Projeto de fã, sem afiliação à Riot Games. DJ Sona, League of Legends, imagens e vídeos pertencem à Riot Games e/ou aos respectivos titulares. Confira permissão de uso antes de redistribuir o conteúdo.