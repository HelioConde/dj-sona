export default function History() {
  return (
    <main id="conteudo" tabIndex={-1} className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">SOBRE A EXPERIÊNCIA</p>
        <h1>Três formas, uma só DJ</h1>
        <p>DJ Sona é uma skin de League of Legends que combina música e identidade visual. Esta fan page destaca suas três atmosferas sem substituir a experiência original do jogo.</p>
      </header>
      <section className="feature-grid" aria-label="As três formas">
        <article className="feature-card kinetic-border">
          <img src={import.meta.env.BASE_URL + 'icon3.jpg'} alt="Arte da forma Kinetic" width="112" height="112" loading="lazy" />
          <h2>Kinetic</h2>
          <p>Azul elétrico, pulsos de luz e uma sensação de movimento constante.</p>
        </article>
        <article className="feature-card concussive-border">
          <img src={import.meta.env.BASE_URL + 'icon1.jpg'} alt="Arte da forma Concussive" width="112" height="112" loading="lazy" />
          <h2>Concussive</h2>
          <p>Vermelho intenso e uma ambientação que valoriza o impacto de cada batida.</p>
        </article>
        <article className="feature-card ethereal-border">
          <img src={import.meta.env.BASE_URL + 'icon2.jpg'} alt="Arte da forma Ethereal" width="112" height="112" loading="lazy" />
          <h2>Ethereal</h2>
          <p>Verde luminoso e uma atmosfera mais contemplativa e espacial.</p>
        </article>
      </section>
      <div className="info-panel">
        <h2>Explore do seu jeito</h2>
        <p>Na página inicial, alterne entre as três formas, controle o volume e desative a animação sempre que preferir. Em Vídeos, você encontra as mídias incluídas neste projeto.</p>
        <a className="text-link" href="#/">Voltar à experiência musical</a>
      </div>
    </main>
  )
}
