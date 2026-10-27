# DJ Sona — Política de responsividade por altura

O layout deve respeitar a **altura visível do navegador**, não a resolução total do monitor. Uma captura de 1366 × 768 pode ter apenas ~640 pixels CSS de área útil por causa do navegador e da barra do sistema.

- Desktop a partir de 901px e viewport acima de 580px: cabeçalho, palco, controles e rodapé são distribuídos no espaço de `100svh`. As páginas História, Artes e Vídeos usam cards e tipografia ajustados por altura.
- Desktop com até 720px de altura: compactar espaçamentos, título, miniaturas e legendas sem esconder controles.
- Tablet/mobile: permitir rolagem vertical natural para que o conteúdo permaneça acessível com zoom, teclado e fontes ampliadas.
- Se o texto aumentar além do espaço disponível no desktop, a seção interna pode rolar; jamais usar `overflow: hidden` para mascarar conteúdo.
- O vídeo de fundo cobre apenas a área do palco; botões permanecem no fluxo e não são posicionados sobre o rodapé.
- QA Playwright captura seis viewports e quatro rotas; verifica as posições reais dos controles/cards/links em telas desktop e ausência de overflow horizontal em todas.
