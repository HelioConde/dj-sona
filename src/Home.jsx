import { useEffect, useRef, useState } from 'react';
import { forms, asset } from './data';
import './Home.css';

const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Home() {
  const [selected, setSelected] = useState('concussive');
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.2);
  const [reduceMotion, setReduceMotion] = useState(prefersReducedMotion);
  const [playing, setPlaying] = useState(!prefersReducedMotion());
  const [mediaError, setMediaError] = useState(false);
  const videoRef = useRef(null);
  const active = forms.find((form) => form.id === selected) || forms[1];

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      setReduceMotion(query.matches);
      if (query.matches) setPlaying(false);
    };
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    setMediaError(false);
    if (!video) return;
    video.volume = volume;
    if (playing) video.play().catch(() => setPlaying(false));
    else video.pause();
  }, [selected, playing, volume]);

  function changeForm(id) {
    setSelected(id);
  }

  function toggleSound() {
    setMuted((previous) => !previous);
    if (!playing) setPlaying(true);
  }

  function togglePlayback() {
    setPlaying((previous) => !previous);
  }

  return (
    <main id="conteudo" className="experience" style={{ '--active-color': active.accent }}>
      <div className="video-background" aria-hidden="true">
        <div className="ambient-glow" />
        <video key={selected} ref={videoRef} src={asset(active.video)} poster={asset(active.image)} autoPlay={playing && !reduceMotion} muted={muted} loop playsInline preload="metadata" onError={() => setMediaError(true)} />
        <div className="video-shade" />
      </div>
      <section className="experience-content" aria-labelledby="experience-title">
        <p className="eyebrow">UMA EXPERIÊNCIA MUSICAL</p>
        <h1 id="experience-title">Sinta a energia da <span>DJ Sona</span></h1>
        <p className="hero-description">Três formas. Três atmosferas. Escolha uma das energias e transforme o palco.</p>
        <div className="form-selector" role="group" aria-label="Selecionar forma musical">
          {forms.map((form) => (
            <button key={form.id} type="button" className={'form-button' + (selected === form.id ? ' is-selected' : '')} style={{ '--form-accent': form.accent }} aria-pressed={selected === form.id} aria-label={'Selecionar ' + form.name} onClick={() => changeForm(form.id)}>
              <img src={asset(form.image)} alt="" width="92" height="92" />
              <span className="form-name">{form.name}</span>
              <span className="form-label">{form.label}</span>
            </button>
          ))}
        </div>
        <div className="now-playing" aria-live="polite">
          <span className="live-indicator" aria-hidden="true" />
          <div><strong>{active.name}</strong><p>{active.description}</p></div>
        </div>
        {mediaError && <p className="media-notice" role="status">Não foi possível carregar o vídeo. A seleção de formas continua disponível.</p>}
        <div className="media-controls" role="group" aria-label="Controles da experiência">
          <button type="button" onClick={togglePlayback} aria-label={playing ? 'Pausar vídeo' : 'Reproduzir vídeo'}>{playing ? 'Ⅱ Pausar' : '▶ Reproduzir'}</button>
          <button type="button" onClick={toggleSound} aria-label={muted ? 'Ativar som' : 'Silenciar'}>{muted ? '♪ Ativar som' : '♪ Silenciar'}</button>
          <label htmlFor="video-volume">Volume</label>
          <input id="video-volume" aria-label="Volume do vídeo" type="range" min="0" max="1" step="0.05" value={volume} onChange={(event) => setVolume(Number(event.target.value))} />
        </div>
        {reduceMotion && <p className="motion-note">Movimento reduzido ativado: o vídeo não inicia automaticamente.</p>}
      </section>
    </main>
  );
}
