import { HashRouter, Route, Routes } from 'react-router-dom'
import Nav from './Nav'
import Home from './Home'
import History from './History'
import Wallpapers from './Wallpapers'
import Movies from './Movies'
import './Global.css'
import './App.css'

export default function App() {
  return (
    <HashRouter>
      <a className="skip-link" href="#conteudo" onClick={(event) => { event.preventDefault(); document.getElementById('conteudo')?.focus() }}>Pular para o conteúdo</a>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/historia" element={<History />} />
        <Route path="/wallpapers" element={<Wallpapers />} />
        <Route path="/videos" element={<Movies />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <footer className="site-footer">
        <span>DJ Sona · Experiência de fã, não oficial</span>
        <span>League of Legends e DJ Sona pertencem à Riot Games.</span>
      </footer>
    </HashRouter>
  )
}
