<div align="center">
  <h1>🎧 DJ Sona — Experiência interativa</h1>
  <p><strong>Fan project em React inspirado nas três formas musicais de DJ Sona, de League of Legends.</strong></p>
  <p><img alt="React" src="https://img.shields.io/badge/React-18-149ECA?logo=react&logoColor=white"> <img alt="Vite" src="https://img.shields.io/badge/Vite-4-646CFF?logo=vite&logoColor=white"> <img alt="Status" src="https://img.shields.io/badge/status-projeto%20experimental-64748b"></p>
</div>

## O que o projeto apresenta

Uma interface temática com **vídeo de fundo, seleção de formas e controles de áudio**. Em vez de um site estático, o usuário pode mudar a ambientação visual entre as formas de DJ Sona e navegar pelas seções de conteúdo.

O código inclui:

| Tela | Rota |
| --- | --- |
| Experiência principal e seleção de formas | `/` |
| História | `/historia` |
| Wallpapers | `/wallpapers` |
| Vídeos | `/videos` |

Na página principal, as opções **Kinetic, Concussive e Ethereal** alteram o vídeo de fundo. Os arquivos estão em `public/movie/` e as artes em `public/`.

## Executar localmente

```bash
git clone https://github.com/HelioConde/dj-sona.git
cd dj-sona
npm install
npm run dev
```

O Vite informa o endereço local. Scripts disponíveis:

```bash
npm run build
npm run preview
npm run lint
```

**Atenção técnica:** `src/Home.jsx` importa componentes Font Awesome. Se a dependência não estiver instalada no ambiente, o build poderá falhar; confirme e instale as bibliotecas necessárias antes de executar. Este README não afirma que os builds foram validados nesta revisão.

## Estrutura

```text
src/
  App.jsx       Rotas e composição da aplicação
  Home.jsx      Escolha de formas e mídia
  History.jsx   História
  Wallpapers.jsx
  Movies.jsx
  Nav.jsx       Navegação
public/
  movie/        Vídeos
  icon*.jpg     Artes das formas
```

## Estado e direitos

**Projeto experimental e não oficial** de interface/fan page, sem integração com conta Riot nem recursos de jogo. Compatibilidade com áudio automático pode variar entre navegadores.

DJ Sona, League of Legends e os recursos associados pertencem à Riot Games e aos respectivos titulares. Confira direitos de uso antes de republicar vídeos ou artes.

Desenvolvido por [Hélio Conde](https://github.com/HelioConde).
