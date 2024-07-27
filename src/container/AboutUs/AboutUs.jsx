import React from "react";

import { images } from "../../constants";
import "./AboutUs.css";

const AboutUs = () => (
  <div
    className="app__aboutus app__bg flex__center section__padding"
    id="about"
  >
    <div className="app__aboutus-content flex__center">
      <div className="app__aboutus-content_about">
        <h1 className="headtext__cormorant">Über uns</h1>
        <img src={images.spoon} alt="about_spoon" className="spoon__img" />
        <p className="p__opensans">
          Am Wochenende gestalten wir gerne Ihre Feier (Geburtstag, Jubiläum, Jugendweihe
          und Konfirmation, Schuleinführung, betriebliche Feiern usw...) für bis zu 50 Personen.
          Genießen Sie den Abend/Tag sorgenlos mit Ihren Gästen in einer lockeren
          Atmosphäre bei leckerem Essen und Trinken.
        </p>
      </div>

      <div className="app__aboutus-content_knife flex__center">
        <img src={images.knife} alt="about_knife" />
      </div>

      <div className="app__aboutus-content_history">
        <h1 className="headtext__cormorant">Über Kegelbahnen</h1>
        <img src={images.spoon} alt="about_spoon" className="spoon__img" />
        <p className="p__opensans">
          Dazu können Sie auch die Kegelbahnen buchen, was für Ihre Gäste auch zu einem Highlight wird.
          (Gebühr 10,00€/Std./Bahn)
          Bedingung ist, dass Sie reservieren, Sportschuhe und gute Laune mitbringen!
        </p>
      </div>
    </div>
  </div>
);

export default AboutUs;
