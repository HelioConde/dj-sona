import { Link } from 'react-router-dom';

export default function History() {
  return (
    <main id="conteudo" className="page-shell content-page">
      <div className="glass page-panel">
        <p className="eyebrow">Universo musical</p>
        <h1>Três formas. Uma DJ Sona.</h1>
        <p>DJ Sona é uma skin de League of Legends que apresenta três identidades musicais. Esta página de fã transforma essa ideia em uma experiência de cores, imagens e vídeos que você pode explorar no navegador.</p>
        <div className="content-cards">
          <article className="info-card"><span className="color-line cyan" /><h2>Kinetic</h2><p>Uma identidade dinâmica, iluminada por tons de azul e energia eletrônica.</p></article>
          <article className="info-card"><span className="color-line magenta" /><h2>Concussive</h2><p>Uma ambientação intensa, marcada por contraste e pulsações fortes.</p></article>
          <article className="info-card"><span className="color-line violet" /><h2>Ethereal</h2><p>Uma atmosfera imersiva e leve, com cores frias e tons etéreos.</p></article>
        </div>
        <p>O projeto não é oficial e não se conecta à conta, ao cliente ou às APIs de League of Legends.</p>
        <Link className="primary-action" to="/">Experimentar as três formas</Link>
      </div>
    </main>
  );
}