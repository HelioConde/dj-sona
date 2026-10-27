import { Link } from 'react-router-dom'
import { FORMS } from './data'

export default function Movies() {
  return (
    <main className="page-content">
      <span className="page-kicker">VISUAIS EM MOVIMENTO</span>
      <h1>ASSISTA ÀS FORMAS</h1>
      <p className="page-lead">Os vídeos originais de cada forma, sem necessidade de cadastro ou banco de dados. Toque em reproduzir para carregar cada vídeo sob demanda.</p>
      <div className="page-grid">
        {FORMS.map((form) => (
          <article className="info-card" key={form.id}>
            <video controls playsInline preload="none" poster={form.image} aria-label={`Vídeo ${form.title}`}>
              <source src={form.video} type="video/mp4" />
              Seu navegador não consegue reproduzir este vídeo.
            </video>
            <div className="info-card-body">
              <h2 style={{ color: form.color }}>{form.title}</h2>
              <p>{form.description}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="disclaimer">Os arquivos de vídeo são grandes; seu carregamento depende da conexão. Os controles usam o reprodutor nativo do navegador.</p>
      <Link className="back-link" to="/">← Voltar à experiência</Link>
    </main>
  )
}
