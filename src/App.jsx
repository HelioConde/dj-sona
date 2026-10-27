import './Global.css';
import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import History from './History';
import Wallpapers from './Wallpapers';
import Movies from './Movies';

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
        <Route path="*" element={<section id="conteudo" className="page-shell"><h1>Página não encontrada</h1><p>Use o menu para continuar explorando as formas de DJ Sona.</p></section>} />
      </Routes>
    </HashRouter>
  );
}
