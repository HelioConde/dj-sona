import { useState } from 'react';
const movies = [
  { id: 'kinetic', title: 'Kinetic', path: 'movie/DJ-Sona-Kinetic2.mp4' },
  { id: 'concussive', title: 'Concussive', path: 'movie/DJ-Sona-Concussive2.mp4' },
  { id: 'ethereal', title: 'Ethereal', path: 'movie/DJ-Sona-Ethereal2.mp4' },
  { id: 'concert', title: 'Concerto', path: 'movie/DJ-Sona-Concert.mp4' },
];

export default function Movies() {
  const [playing, setPlaying] = useState(null);
  const active = movies.find(item => item.id === playing);
  const base = import.meta.env.BASE_URL;
  return (
    <main id="conteudo" className="page-shell content-page">
      <div className="glass page-panel">
        <p className="eyebrow">Cinema musical</p>
        <h1>Vídeos de DJ Sona</h1>
        <p>Escolha qual vídeo assistir. O player só carrega o arquivo depois da sua escolha, para economizar dados móveis.</p>
        <div className="movie-buttons" role="group" aria-label="Escolher vídeo">
          {movies.map(item => <button key={item.id} type="button" className={'secondary-action ' + (playing === item.id ? 'chosen' : '')} aria-pressed={playing === item.id} onClick={() => setPlaying(item.id)}>{item.title}</button>)}
        </div>
        {active ? <div className="movie-player"><h2>{active.title}</h2><video key={active.id} controls playsInline preload="metadata" src={base + active.path}>Seu navegador não reproduz este vídeo.</video><a className="secondary-action" href={base + active.path} target="_blank" rel="noopener noreferrer">Abrir o vídeo em outra aba</a></div> : <p className="video-placeholder">Selecione uma das quatro opções para iniciar o player.</p>}
      </div>
    </main>
  );
}