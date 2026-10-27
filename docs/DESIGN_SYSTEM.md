# DJ Sona — Design System

## Princípio central

Preservar a essência: palco escuro, luzes neon, vídeos como cenário e três formas musicais selecionáveis. O conteúdo aparece sobre a mídia, sem competir com ela. Não substituir a experiência por um dashboard genérico.

## Tokens

- Fundo base: `#080916`
- Superfície: `#131526`
- Texto principal: `#f7f5ff`
- Texto secundário: `#d5cde5`
- Foco visível: `#b8dcff`
- Kinetic: `#51dbff` (ciano)
- Concussive: `#ff638d` (rosa/vermelho)
- Ethereal: `#72f5b2` (verde)
- Raios: 9px (botões), 14px (seletores), 18px (cartões)
- Espaçamento: 8 / 12 / 16 / 20 / 24 / 32 / 48 px
- Tipografia de apresentação: Bebas Neue original do projeto, com fallback Impact
- Interface: Segoe UI / Arial / sistema

## Acessibilidade

- Seleção de forma em `button` com `aria-pressed`, não eventos exclusivos de mouse.
- Indicador selecionado por borda, texto e marcador, não apenas cor.
- Links com foco visível e `rel="noopener noreferrer"` em alvos externos.
- Em `prefers-reduced-motion: reduce`, esconder vídeo do palco e manter arte estática.
- Áudio inicia silenciado; o visitante ativa conscientemente.
- Página responsiva sem depender de alturas absolutas.

## Performance e hospedagem

- `preload="none"` para vídeos da galeria; `preload="metadata"` apenas no palco.
- Imagens na galeria com `loading="lazy"`.
- Roteamento via hash para evitar 404 em refresh do GitHub Pages.
- URLs calculadas por `import.meta.env.BASE_URL`.
- Build Pages usa FFmpeg H.264/AAC para preparar três MP4 otimizados com `npm run build:pages`, mantendo os originais no Git e publicando somente as versões reduzidas.
- Testes Playwright cobrem largura 390 / 768 / 1440, navegação e seleção de forma.

## Evolução — controles de movimento e teclado
- O player permite **Pausar/Retomar** explicitamente, sem alterar o estado de som. É ideal para usuários com sensibilidade a animações.
- Quem habilita redução de movimento pelo sistema continua vendo a arte estática, sem vídeo autoplay e sem controle de pausa desnecessário.
- Setas horizontais sobre os botões de seleção movem o foco e selecionam a forma de maneira circular.
- Layout de áudio usa duas colunas em telas estreitas, mantendo alvo de toque e foco visível.
- Playwright cobre a seleção pelas setas e as resoluções desktop/short/mobile existentes.

## Regressão de interação — pausa e áudio

O controle de áudio não pode reativar o vídeo quando o usuário pausou o palco. A lógica de `toggleSound` verifica `videoPaused`; o Playwright exerce a sequência **Pausar movimento → Ativar som → manter o elemento de vídeo pausado → Retomar movimento** também em mobile de 390px, com uma captura adicional.
