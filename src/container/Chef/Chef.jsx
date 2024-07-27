import React from "react";

import { SubHeading } from "../../components";
import { images } from "../../constants";
import "./Chef.css";

const Chef = () => (
  <div className="app__bg app__wrapper section__padding">
    <div className="app__wrapper_img app__wrapper_img-reverse">
      <img src={images.chef} alt="chef" />
    </div>

    <div className="app__wrapper_info">
      <SubHeading title="Wort des Schöpfers" />
      <h1 className="headtext__cormorant">Woran wir glauben</h1>

      <div className="app__chef-content">
        <div className="app__chef-content_quote">
          <img src={images.quote} alt="quote" />
          <p className="p__opensans">
            Unser Restaurant ist mehr als nur ein Ort zum Essen.
          </p>
        </div>
        <p className="p__opensans">
          Es ist ein Ort der Begegnung und des Genusses.
          Hier verschmelzen Tradition und Innovation in jedem Gericht. Kommen Sie vorbei und lassen
          Sie sich von unserer Leidenschaft für Kulinarik und Gastfreundschaft verzaubern.
        </p>
      </div>

      <div className="app__chef-sign">
        <p>Natalja Potschuev</p>
        <p className="p__opensans">Gründerin</p>
      </div>
    </div>
  </div>
);

export default Chef;
