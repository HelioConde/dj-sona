import { forms, asset } from './data';

export default function Wallpapers() {
  return (
    <main id="conteudo" className="inner-page">
      <section className="page-intro"><p className="eyebrow">GALERIA VISUAL</p><h1>Artes das formas</h1><p>Uma pequena coleção das imagens presentes no projeto original. Abra uma arte para visualizá-la no tamanho disponível.</p></section>
      <section className="feature-grid">
        {forms.map((form) => (
          <article className="feature-card artwork-card" key={form.id} style={{ '--form-accent': form.accent }}>
            <a href={asset(form.image)} target="_blank" rel="noopener noreferrer" aria-label={'Abrir arte ' + form.name + ' em outra aba'}><img src={asset(form.image)} alt={'Arte da forma ' + form.name} loading="lazy" width="280" height="280" /></a>
            <div><h2>{form.name}</h2><p>{form.label}</p><a className="text-link" href={asset(form.image)} target="_blank" rel="noopener noreferrer">Abrir imagem ↗</a></div>
          </article>
        ))}
      </section>
    </main>
  );
}
