import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Nav.css';

const entries = [
  { to: '/', label: 'Início', end: true },
  { to: '/historia', label: 'História' },
  { to: '/wallpapers', label: 'Wallpapers' },
  { to: '/videos', label: 'Vídeos' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="nav-inner">
        <Link to="/" className="brand" onClick={close} aria-label="DJ Sona, voltar ao início">
          <img src={import.meta.env.BASE_URL + 'icon-dj-sona.png'} width="45" height="45" alt="" />
          <span>DJ <strong>SONA</strong></span>
        </Link>
        <button type="button" className="menu-toggle" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(value => !value)}>{open ? 'Fechar menu' : 'Abrir menu'}</button>
        <nav id="primary-navigation" className={open ? 'primary-nav open' : 'primary-nav'} aria-label="Navegação principal">
          {entries.map(entry => (
            <NavLink key={entry.to} to={entry.to} end={entry.end} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={close}>{entry.label}</NavLink>
          ))}
        </nav>
        <div className="social-links">
          <a href="https://github.com/HelioConde" target="_blank" rel="noopener noreferrer" aria-label="Perfil do Hélio no GitHub">GitHub</a>
          <a href="https://www.instagram.com/conde.helio/" target="_blank" rel="noopener noreferrer" aria-label="Perfil do Hélio no Instagram">Instagram</a>
        </div>
      </div>
      <span className="sr-only" aria-live="polite">Página atual: {entries.find(e => e.to === location.pathname)?.label || 'Não encontrada'}</span>
    </header>
  );
}