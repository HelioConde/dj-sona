# Dependências e segurança — DJ Sona

A publicação do DJ Sona usa React/Vite, com dependências de produção e desenvolvimento distintas.

## Auditoria automática

O workflow `.github/workflows/dependency-audit.yml` executa a cada segunda-feira e quando manifestos/lockfile ou a própria auditoria mudam. Ele gera:

- `audit-all.json`: dependências de produção e ferramentas de desenvolvimento.
- `audit-production.json`: apenas dependências de produção, usadas para avaliar exposição no bundle.
- `audit-report.md`: resumo por severidade com nomes de pacotes, faixas afetadas e indicação de atualização.

As informações são anexadas como artefatos do workflow. Vulnerabilidades identificadas por `npm audit` não implicam comprometimento automático. Avaliar se o pacote é executado no navegador ou somente no CI antes de priorizar.

## Remediação

1. Priorizar alertas críticos/altos de produção; avaliar os de desenvolvimento.
2. Atualizar dependências diretas para versões suportadas, sem `npm audit fix --force` cego.
3. Regerar `package-lock.json`; abrir PR com relatório e explicação de breaking changes.
4. Executar lint, testes Node, Vite, FFmpeg/transcodificação, Playwright e GitHub Pages.
5. Atualizar [issue #13](https://github.com/HelioConde/dj-sona/issues/13) quando os riscos forem triados.

Não armazenar tokens ou credenciais nos assets públicos. Este workflow não cria banco de dados nem requer backend.

## Modernização Vite/ESLint (27/10/2026)

- Vite 4 foi substituído por Vite 7.3.7, que continua recebendo patches de segurança.
- `@vitejs/plugin-react` migrou para 5.2; configurações de Vite e caminho `/dj-sona/` foram preservados.
- ESLint 8 foi substituído por ESLint 9 e `eslint.config.js` (flat config) com regras equivalentes de JSX automático, React Hooks e React Refresh. A configuração `.eslintrc.cjs` foi removida.
- As dependências têm lockfile regenerado pelo npm 10 no CI. O relatório de auditoria do GitHub Actions permite verificar o que ainda requer correção antes do merge.
- Os testes devem verificar React 18, tipografia neon, três formas, pausas, som, navegação, screenshots e vídeo otimizado do Pages; jamais tratar `npm audit` isolado como prova de segurança completa.
