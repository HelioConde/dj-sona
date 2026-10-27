import { useState } from 'react'

const clips = [
  { id: 'kinetic', label: 'Kinetic', file: 'DJ-Sona-Kinetic2.mp4' },
  { id: 'concussive', label: 'Concussive', file: 'DJ-Sona-Concussive2.mp4' },
  { id: 'ethereal', label: 'Ethereal', file: 'DJ-Sona-Ethereal2.mp4' },
  { id: 'concert', label: 'Concert', file: 'DJ-Sona-Concert.mp4' },
]

export default function Movies() {
  const [active, setActive] = useState(clips[0].id)
  const [loadVideo, setLoadVideo] = useState(false)
  const selected = clips.find((clip) => clip.id === active)

  function chooseClip(id) {
    setActive(id)
    setLoadVideo(false)
  }

  return (
    <main id="conteudo" className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">BIBLIOTECA DE MÍDIA</p>
        <h1>O espetáculo em movimento</h1>
        <p>Escolha uma das mídias do projeto. O vídeo é carregado somente após você solicitar a reprodução, para economizar dados.</p>
      </header>
      <section className="video-section" aria-label="Seletor de vídeos">
        <div className="clip-tabs" role="group" aria-label="Selecione um vídeo">
          {clips.map((clip) => (
            <button type="button" key={clip.id} className={'clip-button' + (active === clip.id ? ' is-selected' : '')}
              aria-pressed={active === clip.id} onClick={() => chooseClip(clip.id)}>
              {clip.label}
            </button>
          ))}
        </div>
        {loadVideo ? (
          <video key={selected.id} controls playsInline preload="metadata" className="feature-video"
            aria-label={'Vídeo DJ Sona ' + selected.label}>
            <source src={import.meta.env.BASE_URL + 'movie/' + selected.file} type="video/mp4" />
            Seu navegador não suporta vídeos HTML5.
          </video>
        ) : (
          <div className="video-placeholder">
            <span className="eyebrow">DJ SONA / {selected.label.toUpperCase()}</span>
            <button type="button" className="primary-button" onClick={() => setLoadVideo(true)}>
              Carregar vídeo {selected.label}
            </button>
            <p>Vídeo hospedado neste repositório. O consumo de dados começa ao carregar.</p>
          </div>
        )}
      </section>
    </main>
  )
}
