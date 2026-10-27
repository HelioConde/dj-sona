import { NavLink } from 'react-router-dom'
import './Nav.css'

const sections = [
  { to: '/', label: 'Início', end: true },
  { to: '/historia', label: 'História' },
  { to: '/wallpapers', label: 'Wallpapers' },
  { to: '/videos', label: 'Vídeos' },
]

export default function Nav() {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Navegação principal">
        <NavLink to="/" className="nav-brand" aria-label="DJ Sona — página inicial">
          <img src={import.meta.env.BASE_URL + 'icon-dj-sona.png'} alt="" width="44" height="44" />
          <span>DJ <strong>SONA</strong></span>
        </NavLink>
        <div className="nav-links">
          {sections.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => isActive ? 'nav-link is-active' : 'nav-link'}
            >
              {label}
            </NavLink>
          ))}
        </div>
        <a className="nav-github" href="https://github.com/HelioConde/dj-sona" target="_blank" rel="noopener noreferrer">
          GitHub <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  )
}
