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
- A pasta `public/movie` ainda tem mídia pesada: otimização/transcodificação é uma etapa futura, sem apagar os originais.
