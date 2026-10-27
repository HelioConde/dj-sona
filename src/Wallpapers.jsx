import { Link } from 'react-router-dom'
import { FORMS } from './data'

export default function Wallpapers() {
  return (
    <main className="page-content">
      <span className="page-kicker">GALERIA VISUAL</span>
      <h1>ARTES DAS FORMAS</h1>
      <p className="page-lead">Reviva as três identidades de DJ Sona. As artes disponíveis aqui são os arquivos originais do projeto; não são wallpapers em alta resolução.</p>
      <div className="page-grid">
        {FORMS.map((form) => (
          <article className="info-card" key={form.id}>
            <img src={form.image} alt={`DJ Sona — arte ${form.title}`} loading="lazy" />
            <div className="info-card-body">
              <h2 style={{ color: form.color }}>{form.title}</h2>
              <p>{form.subtitle}</p>
              <a href={form.image} download={`dj-sona-${form.id}.jpg`}>Baixar arte ↓</a>
            </div>
          </article>
        ))}
      </div>
      <p className="disclaimer">Imagens pertencem aos respectivos titulares. Confira os direitos de uso antes de redistribuí-las.</p>
      <Link className="back-link" to="/">← Voltar à experiência</Link>
    </main>
  )
}
