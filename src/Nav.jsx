import { NavLink } from 'react-router-dom'
import './Nav.css'

const links = [
  { to: '/', label: 'Início', end: true },
  { to: '/historia', label: 'História' },
  { to: '/wallpapers', label: 'Artes' },
  { to: '/videos', label: 'Vídeos' },
]

export default function Nav() {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Navegação principal">
        <NavLink to="/" className="brand" aria-label="DJ Sona — início">
          <img src={`${import.meta.env.BASE_URL}icon-dj-sona.png`} width="46" height="46" alt="" />
          <span className="brand-type">DJ <strong>SONA</strong><small>EXPERIENCE</small></span>
        </NavLink>
        <div className="nav-links">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              {link.label}
            </NavLink>
          ))}
        </div>
        <a className="nav-github" href="https://github.com/HelioConde/dj-sona" target="_blank" rel="noopener noreferrer" aria-label="Ver código do DJ Sona no GitHub">
          GitHub <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  )
}
