const arts = [
  { name: 'Kinetic', file: 'icon3.jpg', className: 'kinetic-border' },
  { name: 'Concussive', file: 'icon1.jpg', className: 'concussive-border' },
  { name: 'Ethereal', file: 'icon2.jpg', className: 'ethereal-border' },
]

export default function Wallpapers() {
  return (
    <main id="conteudo" className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">GALERIA VISUAL</p>
        <h1>Wallpapers & artes</h1>
        <p>Explore as imagens das três formas presentes no repositório. Os arquivos disponíveis são pequenas artes de perfil, não wallpapers em alta resolução.</p>
      </header>
      <section className="feature-grid gallery-grid" aria-label="Galeria de artes">
        {arts.map((art) => (
          <article className={'feature-card gallery-card ' + art.className} key={art.name}>
            <div className="gallery-preview">
              <img src={import.meta.env.BASE_URL + art.file} alt={'Arte de DJ Sona ' + art.name}
                width="180" height="180" loading="lazy" />
            </div>
            <h2>{art.name}</h2>
            <a className="text-link" href={import.meta.env.BASE_URL + art.file} download>
              Salvar imagem original
            </a>
          </article>
        ))}
      </section>
    </main>
  )
}
