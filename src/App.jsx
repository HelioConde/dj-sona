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
      <div className="app-shell">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/historia" element={<History />} />
          <Route path="/wallpapers" element={<Wallpapers />} />
          <Route path="/videos" element={<Movies />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <footer className="site-footer">
          <span>Fan project independente · DJ Sona e League of Legends pertencem à Riot Games.</span>
          <a href="https://github.com/HelioConde/dj-sona" target="_blank" rel="noopener noreferrer">Feito por Hélio Conde</a>
        </footer>
      </div>
    </HashRouter>
  )
}
