import { useEffect, useRef, useState } from 'react';

const base = import.meta.env.BASE_URL;
const modes = [
  { id: 'kinetic', name: 'Cinética', english: 'Kinetic', detail: 'Ritmo e movimento', image: 'icon3.jpg', video: 'DJ-Sona-Kinetic2.mp4', color: 'cyan' },
  { id: 'concussive', name: 'Concussiva', english: 'Concussive', detail: 'Energia e impacto', image: 'icon1.jpg', video: 'DJ-Sona-Concussive2.mp4', color: 'magenta' },
  { id: 'ethereal', name: 'Etérea', english: 'Ethereal', detail: 'Atmosfera e harmonia', image: 'icon2.jpg', video: 'DJ-Sona-Ethereal2.mp4', color: 'green' },
];

export default function Home() {
  const [activeId, setActiveId] = useState('concussive');
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.2);
  const [reducedMotion, setReducedMotion] = useState(false);
  const player = useRef(null);
  const active = modes.find((mode) => mode.id === activeId);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);

  useEffect(() => {
    if (!player.current) return;
    player.current.volume = volume;
    player.current.muted = muted;
  }, [activeId, muted, volume, reducedMotion]);

  return (
    <main id="conteudo" className={'experience mode-' + active.color}>
      {!reducedMotion && (
        <video key={active.id} ref={player} className="video-backdrop" autoPlay loop muted playsInline preload="metadata" poster={base + active.image} aria-hidden="true">
          <source src={base + 'movie/' + active.video} type="video/mp4" />
        </video>
      )}
      <div className="backdrop-overlay" aria-hidden="true" />
      <div className="hero-content">
        <p className="eyebrow">Uma experiência musical interativa</p>
        <h1>Três formas. <span>Uma energia.</span></h1>
        <p className="hero-intro">Explore as diferentes vibrações de DJ Sona, alterne a atmosfera e descubra os efeitos de cada forma.</p>
        <p className="current-form" aria-live="polite">Agora: <strong>{active.name}</strong> — {active.detail}</p>
        <div className="form-selector" role="group" aria-label="Escolha uma forma de DJ Sona">
          {modes.map((mode) => (
            <button type="button" key={mode.id} className={'form-choice ' + mode.color + (activeId === mode.id ? ' selected' : '')} onClick={() => setActiveId(mode.id)} aria-pressed={activeId === mode.id}>
              <img src={base + mode.image} alt="" width="108" height="108" />
              <strong>{mode.name}</strong>
              <span>{mode.english}</span>
            </button>
          ))}
        </div>
        <div className="audio-panel" aria-label="Controles de áudio">
          {reducedMotion ? <p>Vídeo desativado pela preferência de movimento reduzido.</p> : (
            <>
              <button type="button" onClick={() => setMuted(!muted)} aria-pressed={!muted} aria-label={muted ? 'Ativar áudio' : 'Silenciar áudio'}>{muted ? 'Ativar som' : 'Silenciar'}</button>
              <label htmlFor="volume">Volume</label>
              <input id="volume" type="range" min="0" max="1" step="0.05" value={volume} onChange={(event) => setVolume(Number(event.target.value))} aria-valuetext={Math.round(volume * 100) + ' por cento'} />
            </>
          )}
        </div>
      </div>
      <p className="fan-note">Projeto de fã não oficial · Reprodução com som depende da permissão do navegador.</p>
    </main>
  );
}
