# 🎧 DJ Sona — Três formas. Uma experiência.

Fan project não oficial em React e Vite inspirado em **DJ Sona, de League of Legends**. Uma experiência audiovisual com os vídeos e ícones do projeto original — Kinetic, Concussive e Ethereal — preservados.

## Ao vivo

**GitHub Pages (após publicar a branch principal):** https://helioconde.github.io/dj-sona/

Não há conta, API, backend nem banco de dados. O único dado salvo localmente é a última forma selecionada.

## Funcionalidades

- Seleção de Kinetic / Concussive / Ethereal por teclado, mouse ou toque
- Vídeo de fundo correspondente com controles de volume e áudio inicialmente desligado
- Modo de movimento reduzido com arte de fundo estática
- História, galeria de artes com download e galeria de vídeos
- Interface responsiva e acessível com estética neon original
- Rotas compatíveis com GitHub Pages usando `HashRouter`
- Testes básicos e publicação automatizada no GitHub Actions

## Rodar localmente

Requer Node.js 22+.

```bash
npm ci
npm run dev
npm run lint
npm run test
npm run build
npm run preview
```

## Publicar no GitHub Pages

1. Mescle a branch de modernização em `main`.
2. No repositório, em **Settings → Pages → Build and deployment**, selecione **GitHub Actions**.
3. O workflow `.github/workflows/pages.yml` compila o Vite e publica o `dist/` ao atualizar `main`.
4. Abra https://helioconde.github.io/dj-sona/ — páginas internas funcionam via `/#/historia`, `/#/wallpapers`, `/#/videos`.

**Importante:** o deploy antigo para Locaweb permanece disponível por acionamento manual, não é executado a cada push.

## Limitações atuais

O build agora copia apenas as artes e os três vídeos efetivamente utilizados e, quando o FFmpeg está instalado no ambiente, gera cópias H.264 otimizadas para a pasta `dist` sem alterar o acervo original em `public/`. Sem FFmpeg, funciona com os arquivos originais (maiores). A reprodução de vídeo e áudio pode variar conforme o navegador.

## Direitos

Este é um projeto de fã sem afiliação ou endosso da Riot Games. DJ Sona, League of Legends e as artes/mídias relacionadas pertencem aos seus respectivos titulares. Verifique as permissões antes de republicar ou distribuir arquivos.

Criado por [Hélio Conde](https://github.com/HelioConde).
