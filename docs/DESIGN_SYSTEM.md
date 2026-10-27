# DJ Sona — Design system (2026-10-27)

## Identidade
Manter a essência DJ Sona: cenário noturno, luzes neon e alternância entre **Kinetic (ciano)**, **Concussive (vermelho)** e **Ethereal (verde)**. Priorizar contraste e hierarquia em vez de grandes manchas luminosas.

## Taste Skill — tokens
Tokens definidos em `src/Global.css`: `--space-1/2/3/4/6/8/12`, `--radius-sm/lg`, `--surface`, `--surface-raised`, `--border`, `--focus`, `--text-muted`, `--pink` e `--cyan`. Espaçamentos equivalem a 4, 8, 12, 16, 24, 32 e 48 px.

## Componentes
- Barra de navegação: quatro rotas com indicação de página ativa, sem dependência de servidor.
- Cards de formas: botões reais; `aria-pressed` indica seleção.
- Vídeos: carregamento sob demanda na biblioteca; vídeo inicial silencioso; opção de reduzir movimento.
- Links externos: `rel="noopener noreferrer"`.
- Footer: identificação do caráter não oficial do projeto.

## Web Design Guidelines
- Tamanho de controles >= 44 px, foco visível de 3 px e link para pular navegação.
- `prefers-reduced-motion` suspende o vídeo de fundo inicialmente, com escolha explícita para ativá-lo.
- Imagens com alt apropriado; imagens decorativas com alt vazio.
- Layout adaptável: cards de três colunas em desktop e uma coluna nas páginas internas mobile.

## Image to Code
Referências visuais originais: `public/icon1.jpg`, `public/icon2.jpg`, `public/icon3.jpg` e vídeos de `public/movie/`. Redesenho implementado com cards consistentes, superfícies escuras e contornos das três formas. Não foram criados recursos artísticos que não existem no projeto.

## QA
Workflow `.github/workflows/pages.yml` executa lint, build, testes reais em Chromium e captura screenshots em 390x844, 768x1024 e 1440x900. Verificar relatório e imagens anexadas à execução, antes de aprovar aparência final.
