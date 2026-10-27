# Design System — DJ Sona

## Intenção visual
Manter o DNA de uma fan page musical: fundo escuro, luz neon e as três formas Kinetic (ciano), Concussive (rosa) e Ethereal (violeta). Redesenho dos componentes sem descaracterizar a experiência original.

## Tokens
- Superfície: `--bg`, `--surface`, `--surface-2`
- Texto: `--text`, `--muted`
- Separadores e foco: `--line`, `:focus-visible` (contorno de 3px)
- Cores musicais: `--cyan`, `--magenta`, `--violet`
- Espaçamento: `--space-1` até `--space-6`
- Arredondamento: `--radius`
- Tipografia: Bebas Neue local (títulos) e system-ui (textos)

## Padrões de componentes
- `NavLink` sinaliza página ativa; menu mobile com `aria-expanded`.
- Cartão das formas é `button` com `aria-pressed`, suporta clique, toque, Tab, Enter e Espaço.
- Áudio inicia silencioso e exige interação explícita.
- Vídeo de fundo respeita `prefers-reduced-motion: reduce`; textos continuam legíveis quando o vídeo está indisponível.
- Vídeos da galeria carregam somente por escolha do visitante.
- Links externos usam `rel="noopener noreferrer"`.
- Grade responsiva em 1440, 768 e 375px, com alvos de toque de 44px.

## Referências e Image to Code
O design mantém os arquivos visuais já existentes em `public/` para preservar a essência e não substituir materiais por imagens não autorizadas. As antigas áreas vazias passaram a conter componentes com layout próprio, usando tokens e mesma linguagem visual da Home.

## QA
`npx playwright test` gera capturas completas e verifica navegação, erros JS, overflow horizontal, controles, redução de movimento e player. Executar após `npm run build` e instalação de `@playwright/test`; os resultados de CI são publicados nos artefatos da execução.