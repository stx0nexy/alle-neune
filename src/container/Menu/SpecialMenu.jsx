import React, { useState, useEffect } from "react";
import { SubHeading, MenuItem } from "../../components";
import "./SpecialMenu.css";

const SpecialMenu = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState({});
  const [showAllCategories, setShowAllCategories] = useState(false);

  useEffect(() => {
    // Fetch categories
    fetch("https://localhost:5222/api/catalog/categories?api-version=1.0")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        // Fetch items for each category
        data.forEach((category) => {
          fetch(`https://localhost:5222/api/catalog/items/type/all/category/${category.id}?PageSize=35&PageIndex=0&api-version=1.0`)
            .then((response) => response.json())
            .then((itemsData) => {
              setItems((prevItems) => ({
                ...prevItems,
                [category.id]: itemsData.data, // Use data property
              }));
            });
        });
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleToggleCategories = () => {
    setShowAllCategories((prev) => !prev);
  };

  return (
    <div className="app__specialMenu flex__center section__padding" id="menu">
      <div className="app__specialMenu-title">
        <SubHeading title="Menu That Fits You Palatte" />
        <h1 className="headtext__cormorant">unsere Speisekarte</h1>
      </div>
      <div className="app__specialMenu-menu">
        {categories.slice(0, showAllCategories ? categories.length : 2).map((category) => (
          <div key={category.id} className="app__specialMenu-menu_category flex__center">
            <p className="app__specialMenu-menu_heading">{category.title}</p>
            <div className="app__specialMenu_menu_items">
              {items[category.id]?.map((item, index) => (
                <MenuItem
                  key={item.title + index}
                  title={item.title}
                  price={item.price}
                  tags={item.description} // Assume subtitle as tags for MenuItem
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: "15px" }}>
        <button type="button" className="custom__button" onClick={handleToggleCategories}>
          {showAllCategories ? 'Weniger anzeigen' : 'Mehr anzeigen'}
        </button>
      </div>
    </div>
  );
};

export default SpecialMenu;
