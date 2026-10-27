import { NavLink } from 'react-router-dom';

const base = import.meta.env.BASE_URL;
const menu = [
  { href: '/', label: 'Início', end: true },
  { href: '/historia', label: 'História' },
  { href: '/wallpapers', label: 'Wallpapers' },
  { href: '/videos', label: 'Vídeos' },
];

export default function Nav() {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Navegação principal">
        <NavLink className="brand" to="/" aria-label="DJ Sona — voltar ao início">
          <img src={base + 'icon-dj-sona.png'} alt="" width="44" height="44" />
          <span>DJ <strong>SONA</strong></span>
        </NavLink>
        <div className="nav-links">
          {menu.map((item) => (
            <NavLink key={item.href} end={item.end} to={item.href} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              {item.label}
            </NavLink>
          ))}
        </div>
        <a className="nav-profile" href="https://github.com/HelioConde" target="_blank" rel="noopener noreferrer" aria-label="GitHub de Hélio Conde (nova aba)">GitHub ↗</a>
      </nav>
    </header>
  );
}
