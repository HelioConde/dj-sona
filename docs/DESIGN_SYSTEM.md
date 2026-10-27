# DJ Sona — Design System

## Identidade preservada
Experiência noturna e musical com vídeo de fundo e seleção das três formas **Kinetic**, **Concussive** e **Ethereal**. Cores por forma (azul, vermelho-rosa e verde), cartões redondos com imagens originais, tipografia expressiva Bebas Neue.

## Taste Skill: tokens e consistência
Tokens centralizados em `src/Global.css`: `--space-1` a `--space-8`, `--radius-sm/md/lg`, `--surface`, `--muted`, `--border`. Títulos em Bebas Neue; UI legível em fonte de sistema. Estilo global de foco visível e áreas clicáveis de pelo menos 44px.

## Web Design Guidelines: comportamento
- Botões semânticos com `aria-pressed` para a escolha de forma.
- Navegação com `NavLink` e `aria-current`, menu mobile acessível.
- A seção principal aceita atalho de pular conteúdo.
- Em `prefers-reduced-motion: reduce`, o vídeo não inicia automaticamente; o usuário ainda pode reproduzi-lo conscientemente.
- Controles independentes para reprodução, som e volume.
- Áudio desligado ao entrar para respeitar políticas dos navegadores.

## Image to Code e Awesome Design
Reestruturação de componentes sobre as mídias originais. Layout em grid responsivo, hierarquia visual mais clara, painéis translúcidos, acentos em 3 cores e fallback quando o vídeo não carregar. Mantém a essência DJ Sona, sem trocar assets históricos por imagens genéricas.

## GitHub Pages
`GITHUB_PAGES=true npm run build` configura `base: /dj-sona/`. Rotas via `HashRouter`, evitando 404 no reload. Nenhum backend, credencial, login ou banco de dados. O workflow reduz os vídeos selecionados para diminuir transferência em dispositivos móveis.

## Qualidade e limites
`npm run lint` e `npm run build`; auditoria Playwright multi-viewport em `tests/playwright-audit.mjs`. É um site de fã; mídia e personagens associados à Riot Games não são de propriedade deste repositório.
