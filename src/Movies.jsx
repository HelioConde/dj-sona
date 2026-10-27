const base = import.meta.env.BASE_URL;
const videos = [
  { name: 'Cinética', video: 'DJ-Sona-Kinetic2.mp4' },
  { name: 'Concussiva', video: 'DJ-Sona-Concussive2.mp4' },
  { name: 'Etérea', video: 'DJ-Sona-Ethereal2.mp4' },
];
export default function Movies() {
  return (
    <main id="conteudo" className="page-shell">
      <p className="eyebrow">Experiências visuais</p>
      <h1>Vídeos</h1>
      <p>Assista às três ambientações. Os vídeos nesta página usam controles nativos e não iniciam automaticamente.</p>
      <div className="info-grid video-grid">
        {videos.map((item) => <article key={item.name}><video controls preload="none" playsInline aria-label={'Vídeo da forma ' + item.name}><source src={base + 'movie/' + item.video} type="video/mp4" />Seu navegador não suporta vídeo HTML5.</video><h2>{item.name}</h2></article>)}
      </div>
    </main>
  );
}
