# Mídias, créditos e publicação — DJ Sona

Este é um fan project não oficial. **DJ Sona, League of Legends e os materiais visuais e sonoros associados pertencem à Riot Games e aos respectivos titulares**. A manutenção do repositório não concede licenças nem direitos de redistribuição.

## Inventário

- `public/movie/`: oito MP4 originais presentes no projeto (aprox. 400 MB no total). São mantidos intactos para preservação e referência.
- `public/icon1.jpg`, `icon2.jpg`, `icon3.jpg`: artes das três formas, usadas como miniaturas/poster.
- `public/icon-dj-sona.png`: identidade visual do projeto.
- `public/font/`: fontes e respectivos arquivos de licença; confira licença individual antes de redistribuir.

## Versões publicadas

O GitHub Actions executa `npm run build:pages`, convertendo somente Kinetic2, Concussive2 e Ethereal2 com FFmpeg (H.264 + AAC, MP4 otimizado para web). Os arquivos convertidos são temporários e publicados apenas no artefato do GitHub Pages. Os originais **não são editados, apagados ou convertidos dentro do repositório**.

O Vite inicialmente copia os oito vídeos para `dist/`. A etapa de otimização valida as três versões e então troca o diretório de publicação para manter somente os três arquivos usados nas páginas. Se a conversão falhar, o workflow falha — não publica vídeos parciais.

## Direitos e decisões pendentes

Antes de uma redistribuição mais ampla, verifique os termos de uso atuais da Riot Games e as permissões específicas de cada vídeo, áudio e imagem, inclusive a possibilidade de música ou imagens de terceiros. Não afirmar que o projeto é oficial. Se uma mídia não puder ser distribuída, substituí-la por um recurso autorizado.
