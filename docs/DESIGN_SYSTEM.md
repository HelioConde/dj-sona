# DJ Sona — Design System 2026
## Essência preservada
Atmosfera musical futurista e as três formas Kinetic (ciano), Concussive (rosa) e Ethereal (verde). As imagens e os vídeos originais continuam no projeto.
## Taste Skill — Tokens
- Spacing: 4, 8, 12, 16, 24, 32 e 48px via `--space-*`.
- Containers: 1200px para cabeçalho e rodapé; 1100px para páginas internas.
- Contraste: texto claro em superfícies escuras; roxo/rosa/ciano como acentos, nunca como texto principal de baixa legibilidade.
- Estados: `:focus-visible`, `:hover`, `aria-pressed`, `aria-current`.
## Web Design Guidelines
HTML semântico, botão em vez de evento no mouse, nav com links consistentes, labels de volume, mídia com opção de pausar e suporte a `prefers-reduced-motion`.
## Awesome Design e Image to Code
Manter arte e vídeo como protagonistas; cartões compactos com cor associada à forma; UI de reprodução flutuante e responsiva.
## GitHub Pages
React/Vite com `HashRouter` e `base: "/dj-sona/"`. Não há backend, login ou banco. Áudio só é ativado por gesto do usuário.
## QA
Playwright testa seleção de formas, navegação e overflow de 390px a 1600px. Capturas sob `visual-qa/` são artefatos de GitHub Actions.