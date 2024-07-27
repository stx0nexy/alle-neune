import React from "react";
import { FiFacebook } from "react-icons/fi";

import { images } from "../../constants";
import "./Footer.css";

const Footer = () => (
  <div className="app__footerOverlay-img app__bg">
    <div className="app__footer section__padding">

      <div className="app__footer-links">
        <div className="app__footer-links_contact">
          <h1 className="app__footer-headtext">Kontaktieren Sie uns</h1>
          <p className="p__opensans">Burgker Str. 4, Freital, Deutschland</p>
          <p className="p__opensans">0351 6492118</p>
        </div>

        <div className="app__footer-links_logo">
          <img src={images.gericht} alt="footer_logo" />
          <p className="p__opensans">
            &quot;Der beste Weg, sich selbst zu finden, ist, sich im Dienst
            anderer zu verlieren.&quot;
          </p>
          <img
            src={images.spoon}
            className="spoon__img"
            style={{ marginTop: 15 }}
            alt="spoon_foto"
          />
          <div className="app__footer-links_icons">
          <a href="https://www.facebook.com/people/Kegelgaststätte-Alle-Neune/100055892773306/" target="_blank" rel="noopener noreferrer">
              <FiFacebook />
            </a>
          </div>
        </div>

        <div className="app__footer-links_work">
          <h1 className="app__footer-headtext">Öffnungszeiten</h1>
          <p className="p__opensans">Montag-Freitag:</p>
          <p className="p__opensans">11:30 - 21:00 Uhr</p>
          <p className="p__opensans">Samstag-Sonntag:</p>
          <p className="p__opensans">11:30 - 22:00 Uhr</p>
        </div>
      </div>
      <div className="footer__copyright">
        <p className="p__opensans">2024 Freital</p>
      </div>
    </div>
  </div>
);

export default Footer;
