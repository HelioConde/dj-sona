import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import Nav from './Nav.jsx';
import Home from './Home.jsx';
import History from './History.jsx';
import Wallpapers from './Wallpapers.jsx';
import Movies from './Movies.jsx';
import './Global.css';
import './App.css';

function NotFound() {
  return <main className="page-shell content-page"><div className="glass page-panel"><p className="eyebrow">404</p><h1>Essa faixa não está na playlist.</h1><p>O endereço não existe. Volte para a experiência principal.</p><Link className="primary-action" to="/">Voltar ao início</Link></div></main>;
}

export default function App() {
  return (
    <HashRouter>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/historia" element={<History />} />
        <Route path="/wallpapers" element={<Wallpapers />} />
        <Route path="/videos" element={<Movies />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <footer className="site-footer">Projeto de fã não oficial · DJ Sona e League of Legends pertencem à Riot Games e seus respectivos titulares. <a href="https://github.com/HelioConde/dj-sona" target="_blank" rel="noopener noreferrer">Código no GitHub</a></footer>
    </HashRouter>
  );
}