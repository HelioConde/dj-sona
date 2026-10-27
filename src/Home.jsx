import { useEffect, useRef, useState } from 'react'
import './Home.css'

const forms = [
  { id: 'kinetic', name: 'Kinetic', subtitle: 'O pulso da energia', icon: 'icon3.jpg', movie: 'DJ-Sona-Kinetic2.mp4' },
  { id: 'concussive', name: 'Concussive', subtitle: 'A força da batida', icon: 'icon1.jpg', movie: 'DJ-Sona-Concussive2.mp4' },
  { id: 'ethereal', name: 'Ethereal', subtitle: 'A harmonia do espaço', icon: 'icon2.jpg', movie: 'DJ-Sona-Ethereal2.mp4' },
]

export default function Home() {
  const [active, setActive] = useState('concussive')
  const [muted, setMuted] = useState(true)
  const [volume, setVolume] = useState(0.2)
  const [motionEnabled, setMotionEnabled] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef(null)
  const selected = forms.find((form) => form.id === active)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.volume = volume
    video.muted = muted
    video.play().catch(() => {
      // Navegadores podem bloquear reprodução automática; a interface continua utilizável.
    })
  }, [active, muted, volume, motionEnabled])

  const chooseForm = (formId) => {
    setActive(formId)
    setVideoError(false)
  }

  return (
    <main id="conteudo" tabIndex={-1} className={'home theme-' + active}>
      {motionEnabled && !videoError && (
        <video
          key={active}
          ref={videoRef}
          className="home-video"
          aria-hidden="true"
          autoPlay
          muted={muted}
          playsInline
          loop
          preload="metadata"
          onError={() => setVideoError(true)}
        >
          <source src={import.meta.env.BASE_URL + 'movie/' + selected.movie} type="video/mp4" />
        </video>
      )}
      <div className="home-shade" aria-hidden="true" />
      <div className="home-content">
        <p className="eyebrow">UMA EXPERIÊNCIA MUSICAL</p>
        <h1>ESCOLHA SUA <span>FREQUÊNCIA</span></h1>
        <p className="home-intro">Três formas. Três atmosferas. Uma única DJ Sona. Selecione sua energia e explore esta homenagem interativa.</p>
        <div className="forms" role="group" aria-label="Selecione a forma de DJ Sona">
          {forms.map((form) => (
            <button
              key={form.id}
              type="button"
              className={'form-card form-' + form.id + (active === form.id ? ' is-selected' : '')}
              aria-pressed={active === form.id}
              onClick={() => chooseForm(form.id)}
              aria-label={'Selecionar ' + form.name}
            >
              <img src={import.meta.env.BASE_URL + form.icon} alt="" width="104" height="104" />
              <strong>{form.name}</strong>
              <span>{form.subtitle}</span>
            </button>
          ))}
        </div>
        <p className="form-status" aria-live="polite">Agora tocando: <strong>{selected.name}</strong></p>
        <div className="player-controls" aria-label="Controles da experiência">
          <button
            className="control-button"
            type="button"
            aria-pressed={!muted}
            onClick={() => setMuted((value) => !value)}
          >
            {muted ? 'Ativar áudio' : 'Silenciar áudio'}
          </button>
          <label className="volume-control">
            <span>Volume</span>
            <input type="range" min="0" max="1" step="0.05" value={volume}
              aria-label="Volume do vídeo" onChange={(event) => setVolume(Number(event.target.value))} />
          </label>
          <button className="control-button" type="button"
            aria-pressed={motionEnabled}
            onClick={() => setMotionEnabled((value) => !value)}
          >
            {motionEnabled ? 'Desativar movimento' : 'Ativar vídeo'}
          </button>
        </div>
        <p className="home-note">O áudio começa desligado. Respeitamos sua preferência de movimento reduzido.</p>
        {videoError && <p className="home-note" role="status">O vídeo não pôde ser carregado. Você ainda pode explorar as formas.</p>}
      </div>
    </main>
  )
}
