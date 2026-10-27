import { Link } from 'react-router-dom';
import { forms, asset } from './data';

export default function History() {
  return (
    <main id="conteudo" className="inner-page">
      <section className="page-intro"><p className="eyebrow">A IDENTIDADE DA MÚSICA</p><h1>A história da DJ Sona</h1><p>DJ Sona é uma temática musical de League of Legends que apresenta três estilos visuais distintos. Este projeto de fã celebra a mudança de energia entre suas formas.</p></section>
      <section className="feature-grid" aria-label="As três formas">
        {forms.map((form) => (
          <article className="feature-card" key={form.id} style={{ '--form-accent': form.accent }}>
            <img src={asset(form.image)} alt={'Arte da forma ' + form.name} loading="lazy" width="260" height="260" />
            <div><h2>{form.name}</h2><p>{form.description}</p></div>
          </article>
        ))}
      </section>
      <p className="section-outro"><Link to="/" className="text-link">Voltar ao palco e experimentar as três formas →</Link></p>
    </main>
  );
}
