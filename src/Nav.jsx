import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { asset } from './data';

const sections = [
  { to: '/', label: 'Início' },
  { to: '/historia', label: 'História' },
  { to: '/wallpapers', label: 'Wallpapers' },
  { to: '/videos', label: 'Vídeos' }
];

export default function Nav() {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  return (
    <header className="site-header">
      <nav className="navigation" aria-label="Navegação principal">
        <NavLink to="/" className="brand" aria-label="DJ Sona — início" onClick={() => setExpanded(false)}>
          <img src={asset('icon-dj-sona.png')} alt="" width="48" height="48" />
          <span>DJ <strong>Sona</strong></span>
        </NavLink>
        <button className="menu-toggle" type="button" aria-label={expanded ? 'Fechar menu' : 'Abrir menu'} aria-expanded={expanded} aria-controls="nav-links" onClick={() => setExpanded((current) => !current)}>
          <span aria-hidden="true">{expanded ? '✕' : '☰'}</span>
        </button>
        <div id="nav-links" className={'nav-links' + (expanded ? ' is-open' : '')}>
          {sections.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} aria-current={location.pathname === item.to ? 'page' : undefined} className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} onClick={() => setExpanded(false)}>
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="social-links" aria-label="Redes sociais">
          <a href="https://github.com/HelioConde" target="_blank" rel="noopener noreferrer" aria-label="GitHub de Hélio">GitHub ↗</a>
        </div>
      </nav>
    </header>
  );
}
