import { useEffect, useRef, useState } from 'react';
import './Home.css';

const forms = [
  { id: 'kinetic', name: 'Kinetic', kind: 'Batidas em movimento', movie: 'movie/DJ-Sona-Kinetic2.mp4', image: 'icon3.jpg', color: 'cyan', description: 'Uma atmosfera pulsante e cheia de energia.' },
  { id: 'concussive', name: 'Concussive', kind: 'Ritmo intenso', movie: 'movie/DJ-Sona-Concussive2.mp4', image: 'icon1.jpg', color: 'magenta', description: 'Graves poderosos em uma ambientação vibrante.' },
  { id: 'ethereal', name: 'Ethereal', kind: 'Melodias etéreas', movie: 'movie/DJ-Sona-Ethereal2.mp4', image: 'icon2.jpg', color: 'violet', description: 'Sons envolventes e uma atmosfera mais leve.' },
];

export default function Home() {
  const [selected, setSelected] = useState('concussive');
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.2);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const videoRef = useRef(null);
  const form = forms.find(item => item.id === selected) || forms[1];
  const base = import.meta.env.BASE_URL;

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReducedMotion(query.matches);
    query.addEventListener('change', change);
    return () => query.removeEventListener('change', change);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = muted;
    video.volume = volume;
  }, [muted, volume, selected]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reducedMotion) { video.pause(); return; }
    video.play().catch(() => { /* Autoplay pode ser bloqueado; a arte continua visível. */ });
  }, [selected, reducedMotion]);

  const toggleSound = () => {
    setMuted(value => !value);
    if (!reducedMotion) videoRef.current?.play().catch(() => {});
  };

  return (
    <main id="conteudo" className={'home-stage theme-' + form.color}>
      <div className="stage-media" aria-hidden="true">
        <video key={form.id} ref={videoRef} src={base + form.movie} autoPlay={!reducedMotion} muted loop playsInline preload="metadata" className={reducedMotion ? 'stage-video reduce-motion' : 'stage-video'} />
        <div className="stage-shade" />
      </div>
      <section className="hero page-shell" aria-labelledby="hero-title">
        <p className="eyebrow">Uma experiência musical interativa</p>
        <h1 id="hero-title">Sinta a frequência de <span>DJ Sona</span></h1>
        <p className="hero-description">Três atmosferas, uma mesma energia. Escolha uma forma para mudar a experiência audiovisual.</p>
        <p className="now-playing" aria-live="polite"><span className="status-dot" /> Em destaque: <strong>{form.name}</strong> — {form.kind}</p>
        <div className="forms-grid" role="group" aria-label="Escolha uma forma de DJ Sona">
          {forms.map(item => <button type="button" key={item.id} onClick={() => setSelected(item.id)} aria-pressed={selected === item.id} className={'form-card ' + (selected === item.id ? 'selected ' : '') + 'form-' + item.color}>
            <img src={base + item.image} alt="" width="94" height="94" loading="lazy" />
            <span className="form-title">{item.name}</span>
            <span className="form-description">{item.description}</span>
            <span className="form-indicator">{selected === item.id ? 'Selecionada' : 'Selecionar forma'}</span>
          </button>)}
        </div>
        <div className="player-controls" aria-label="Controles de áudio">
          <button type="button" className="sound-button" aria-pressed={!muted} onClick={toggleSound}>{muted ? 'Ativar som' : 'Silenciar'}</button>
          <label htmlFor="volume-control">Volume</label>
          <input id="volume-control" aria-label="Volume" type="range" min="0" max="1" step="0.05" value={volume} onChange={event => setVolume(Number(event.target.value))} />
          <span className="volume-value">{Math.round(volume * 100)}%</span>
        </div>
        <p className="media-note">O vídeo começa sem som, conforme a política dos navegadores. {reducedMotion ? 'Movimento reduzido está ativo: o vídeo foi pausado.' : 'Você pode ativar o áudio pelo botão.'}</p>
      </section>
    </main>
  );
}