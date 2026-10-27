const base = import.meta.env.BASE_URL;
const arts = [
  { name: 'Cinética', image: 'icon3.jpg' },
  { name: 'Concussiva', image: 'icon1.jpg' },
  { name: 'Etérea', image: 'icon2.jpg' },
];
export default function Wallpapers() {
  return (
    <main id="conteudo" className="page-shell">
      <p className="eyebrow">Galeria</p>
      <h1>Artes das formas</h1>
      <p>Uma pequena galeria usando as artes disponíveis neste projeto. As imagens não são wallpapers em alta resolução.</p>
      <div className="info-grid gallery-grid">
        {arts.map((art) => <article key={art.name}><img src={base + art.image} alt={'Arte da forma ' + art.name} loading="lazy" /><h2>{art.name}</h2></article>)}
      </div>
    </main>
  );
}
