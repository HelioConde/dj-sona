const arts = [
  { title: 'Kinetic', source: 'icon3.jpg', tone: 'cyan' },
  { title: 'Concussive', source: 'icon1.jpg', tone: 'magenta' },
  { title: 'Ethereal', source: 'icon2.jpg', tone: 'violet' },
];

export default function Wallpapers() {
  const base = import.meta.env.BASE_URL;
  return (
    <main id="conteudo" className="page-shell content-page">
      <div className="glass page-panel">
        <p className="eyebrow">Galeria</p>
        <h1>Artes das três formas</h1>
        <p>Explore as imagens disponíveis neste projeto. Elas são artes de referência; a resolução original pode não ser adequada para papel de parede em telas grandes.</p>
        <div className="content-cards gallery-grid">
          {arts.map(art => <article key={art.title} className={'info-card gallery-card tone-' + art.tone}>
            <img src={base + art.source} alt={'Arte da forma ' + art.title} loading="lazy" />
            <h2>{art.title}</h2>
            <a className="secondary-action" href={base + art.source} target="_blank" rel="noopener noreferrer" aria-label={'Abrir imagem ' + art.title + ' em tamanho original'}>Abrir imagem original</a>
          </article>)}
        </div>
      </div>
    </main>
  );
}