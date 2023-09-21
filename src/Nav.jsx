import "./Nav.css";
import Icon from "/icon-dj-sona.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons"; // Importe os ícones desejados

function Nav() {
  return (
    <>
      <nav>
        <div className="navMain">
          <div>
            <img src={Icon} className="icon" alt="" />
          </div>
          <div>Inicio</div>
          <div>Historia</div>
          <div>Wallpapers</div>
          <div>Videos</div>
        </div>
        <div className="rede">
          <a href="https://www.linkedin.com/in/helioconde/"  target="_blank">
            <FontAwesomeIcon icon={faLinkedin} className="icon" />
          </a>
          <a href="https://github.com/HelioConde/"  target="_blank">
            <FontAwesomeIcon icon={faGithub} className="icon" />
          </a>
          <a href="http://facebook.com/alchemyflames" target="_blank">
            <FontAwesomeIcon icon={faFacebook} className="icon" />
          </a>
          <a>
            <FontAwesomeIcon icon={faInstagram} className="icon" />
          </a>
        </div>
      </nav>
    </>
  );
}

export default Nav;
