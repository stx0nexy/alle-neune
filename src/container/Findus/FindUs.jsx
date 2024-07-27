import React from "react";

import { SubHeading } from "../../components";
import { images } from "../../constants";

const FindUs = () => (
  <div className="app__bg app__wrapper section__padding" id="contact">
    <div className="app__wrapper_info">
      <SubHeading title="Contact" />
      <h1 className="headtext__cormorant" style={{ marginBottom: "3rem" }}>
        Finde uns
      </h1>
      <a
        href="https://www.google.com/maps/place/Burgker+Str.+4,+Freital,+Germany">
        <div className="app__wrapper-content">
          <p className="p__opensans">
            Burgker Str. 4, Freital, Germany
          </p>
        <p
          className="p__cormorant"
          style={{ color: "#DCCA87", margin: "2rem 0" }}
        >
          Öffnungszeiten
        </p>
        <p className="p__opensans">Mo - Fr: 11:30 - 21:00</p>
        <p className="p__opensans">Sa - So: 11:20 - 22:00</p>
      </div>
      </a>
      <a
        href="https://www.google.com/maps/place/Burgker+Str.+4,+Freital,+Germany">
      <button
        type="button"
        className="custom__button"
        style={{ marginTop: "2rem" }}
      >
        Besuchen Sie uns
      </button>
      </a>
    </div>
    <div className="app__wrapper_img">
      <img src={images.findus} alt="findus" />
    </div>
  </div>
);

export default FindUs;
