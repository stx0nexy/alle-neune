import React from "react";
import { SubHeading } from "../../components";

import { images } from "../../constants";
import "./Header.css";

const Header = () => (
  <div className="app__header app__wrapper section__padding" id="home">
    <div className="app__wrapper_info">
      <SubHeading title="Genießen Sie köstliches Essen und spannende Kegelbahn-Spiele im Herzen Deutschlands!" />
      <h1 className="app__header-h1">Kegelgaststätte</h1>
      <h1 className="app__header-h1">Alle Neune</h1>
      <p className="p__opensans" style={{ margin: "2rem 0" }}>
          Liebe Gäste!
          Wir haben für Sie täglich ab 11:30 Uhr
          und bleiben bis 21:00 Uhr in der Woche oder bis 22:00 Uhr am Freitag und Samstag geöffnet.
          (Küchenschluss - 20:00 Uhr)
          Unsere Gaststätte bietet Ihnen gutbürgerliche deutsche Küche und einige russische Spezialitäten.
      </p>
      
      <button type="button" className="custom__button">
        <a href="#menu">
          Explore Menu
        </a>
      </button>
    </div>

    <div className="app__wrapper_img">
      <img src={images.welcome} alt="header img" />
    </div>
  </div>
);

export default Header;
