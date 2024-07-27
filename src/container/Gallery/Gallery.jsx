import React, { useRef } from "react";
import {
  BsFacebook,
  BsArrowLeftShort,
  BsArrowRightShort,
} from "react-icons/bs";

import { SubHeading } from "../../components";
import { images } from "../../constants";
import "./Gallery.css";

const galleryImages = [
  images.gallery01,
  images.gallery02,
  images.gallery03,
  images.gallery04,
];

const Gallery = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;

    if (direction === "left") {
      current.scrollLeft -= 300;
    } else {
      current.scrollLeft += 300;
    }
  };

  return (
    <div className="app__gallery flex__center">
      <div className="app__gallery-content">
        <SubHeading title="Facebook" />
        <h1 className="headtext__cormorant">Fotogallerie</h1>
        <p className="p__opensans" style={{ color: "#AAA", marginTop: "2rem" }}>
        Willkommen in unserer Fotogalerie! Hier können Sie die Atmosphäre unseres Restaurants erleben, 
        unsere einzigartigen Gerichte sehen und unvergessliche Momente aus unserem Alltag entdecken. 
        Für noch mehr Eindrücke besuchen Sie uns auf unserer Facebook-Seite!
        </p>
        <a href="https://www.facebook.com/people/Kegelgaststätte-Alle-Neune/100055892773306/">
        <button type="button" className="custom__button">
          Mehr sehen
        </button>
        </a>
      </div>

      <div className="app__gallery-images">
        <div className="app__gallery-images_container" ref={scrollRef}>
          {galleryImages.map((image, index) => (
            <div
              className="app__gallery-images_card flex__center"
              key={`gallery_image-${index + 1}`}
            >
              <a
                href="https://www.facebook.com/people/Kegelgaststätte-Alle-Neune/100055892773306/"
                target="_blank"
                rel="noopener noreferrer"
                key={`gallery_image-${index + 1}`}
                className="app__gallery-images_card flex__center"
              >
              <img src={image} alt="gallery" />
              <BsFacebook className="gallery__image-icon" />
              </a>
            </div>
          ))}
        </div>

        <div className="app__gallery-images_arrows">
          <BsArrowLeftShort
            className="gallery__arrow-icon"
            onClick={() => scroll("left")}
          />
          <BsArrowRightShort
            className="gallery__arrow-icon"
            onClick={() => scroll("Right")}
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
