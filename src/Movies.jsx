import { forms, asset } from './data';

export default function Movies() {
  return (
    <main id="conteudo" className="inner-page">
      <section className="page-intro"><p className="eyebrow">SOM E MOVIMENTO</p><h1>Vídeos das formas</h1><p>Explore a ambientação de cada forma. Os vídeos só começam quando você escolhe reproduzir.</p></section>
      <section className="feature-grid">
        {forms.map((form) => (
          <article className="feature-card movie-card" key={form.id} style={{ '--form-accent': form.accent }}>
            <video controls playsInline preload="none" poster={asset(form.image)} aria-label={'Vídeo da forma ' + form.name}>
              <source src={asset(form.video)} type="video/mp4" />
              Seu navegador não suporta vídeos.
            </video>
            <div><h2>{form.name}</h2><p>{form.label}</p></div>
          </article>
        ))}
      </section>
    </main>
  );
}
