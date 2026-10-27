import { Link } from 'react-router-dom'
import { FORMS } from './data'

export default function History() {
  return (
    <main className="page-content">
      <span className="page-kicker">A HISTÓRIA POR TRÁS DA BATIDA</span>
      <h1>TRÊS FORMAS. UMA ARTISTA.</h1>
      <p className="page-lead">DJ Sona transforma cada apresentação em um universo próprio. O conceito original de League of Legends reúne três identidades visuais e musicais que podem ser alternadas durante a experiência.</p>
      <div className="page-grid">
        {FORMS.map((form) => (
          <article className="info-card" key={form.id}>
            <img src={form.image} alt={`Arte da forma ${form.title} de DJ Sona`} loading="lazy" />
            <div className="info-card-body">
              <h2 style={{ color: form.color }}>{form.title}</h2>
              <p>{form.description}</p>
              <Link to="/">Experimentar forma</Link>
            </div>
          </article>
        ))}
      </div>
      <p className="disclaimer">Este site é uma homenagem independente, não oficial, criada para demonstrar habilidades em desenvolvimento front-end.</p>
      <Link className="back-link" to="/">← Voltar à experiência</Link>
    </main>
  )
}
