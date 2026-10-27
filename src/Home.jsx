import { useEffect, useRef, useState } from 'react'
import { FORMS } from './data'
import './Home.css'

function getSavedForm() {
  try {
    const saved = localStorage.getItem('dj-sona-form')
    return FORMS.some((form) => form.id === saved) ? saved : 'concussive'
  } catch {
    return 'concussive'
  }
}

export default function Home() {
  const [formId, setFormId] = useState(getSavedForm)
  const [soundOn, setSoundOn] = useState(false)
  const [volume, setVolume] = useState(0.25)
  const [playbackError, setPlaybackError] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const videoRef = useRef(null)
  const currentForm = FORMS.find((form) => form.id === formId) || FORMS[1]

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(mq.matches)
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    try { localStorage.setItem('dj-sona-form', formId) } catch { /* storage pode ser bloqueado */ }
    setPlaybackError(false)
  }, [formId])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = !soundOn
    video.volume = volume
  }, [soundOn, volume, formId])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (reduceMotion) {
      video.pause()
    } else {
      video.play().catch(() => { /* navegadores podem exigir gesto do usuário */ })
    }
  }, [formId, reduceMotion])

  const toggleSound = () => {
    const next = !soundOn
    const video = videoRef.current
    if (video) {
      video.muted = !next
      video.volume = volume
      if (next && !reduceMotion) video.play().catch(() => {})
    }
    setSoundOn(next)
  }

  return (
    <main className="experience" style={{ '--form-color': currentForm.color, '--scene-image': `url("${currentForm.image}")` }}>
      <div className="scene-background" aria-hidden="true">
        {!reduceMotion && (
          <video key={formId} ref={videoRef} autoPlay muted={!soundOn} loop playsInline
            preload="metadata" poster={currentForm.image} src={currentForm.video}
            onError={() => setPlaybackError(true)} />
        )}
        <div className="scene-overlay" />
      </div>
      <section className="experience-content" aria-label="Experiência DJ Sona">
        <div className="intro">
          <span className="eyebrow"><span className="live-dot" /> EXPERIÊNCIA INTERATIVA</span>
          <h1>FEEL THE <em>BEAT.</em></h1>
          <p>Uma artista. Três universos sonoros. Escolha uma forma e transforme a atmosfera.</p>
        </div>

        <div className="stage">
          <p className="stage-caption">AGORA TOCANDO <span className="stage-separator">/</span> <strong>{currentForm.title.toUpperCase()}</strong></p>
          <div className="equalizer" aria-hidden="true">
            {Array.from({ length: 18 }, (_, index) => <i key={index} style={{ '--bar-index': index, height: `${10 + (index * 7) % 26}px` }} />)}
          </div>
          <h2>{currentForm.subtitle}</h2>
          <p className="stage-description">{currentForm.description}</p>
        </div>

        <div className="experience-controls">
          <fieldset className="form-picker">
            <legend>ESCOLHA SUA FORMA</legend>
            <div className="form-options">
              {FORMS.map((form) => (
                <button key={form.id} className={`form-option${formId === form.id ? ' selected' : ''}`}
                  style={{ '--item-color': form.color }} type="button" aria-pressed={formId === form.id}
                  onClick={() => setFormId(form.id)}>
                  <img src={form.image} alt="" width="68" height="68" />
                  <span>{form.title}</span>
                  <span className="form-indicator" aria-hidden="true" />
                </button>
              ))}
            </div>
          </fieldset>
          <div className="audio-panel" aria-label="Controles de áudio">
            <button type="button" className="audio-button" onClick={toggleSound} aria-pressed={soundOn}>
              <span aria-hidden="true">{soundOn ? '◖))' : '◖×'}</span> {soundOn ? 'Silenciar' : 'Ativar som'}
            </button>
            <label htmlFor="volume">VOLUME</label>
            <input id="volume" type="range" min="0" max="1" step="0.05" value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
              aria-label="Volume da experiência" />
          </div>
        </div>
        <p className="media-note" role={playbackError ? 'status' : undefined}>
          {playbackError ? 'O vídeo não pôde ser carregado. A arte da forma continua disponível.' :
            reduceMotion ? 'Movimento reduzido: vídeos de fundo pausados para seu conforto.' :
              'O som começa desligado por padrão. Ative quando quiser ouvir.'}
        </p>
      </section>
    </main>
  )
}
