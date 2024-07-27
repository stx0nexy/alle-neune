import React from "react";

import "./MenuItem.css";

const MenuItem = ({ title, price, tags }) => {
  const formattedPrice = parseFloat(price).toFixed(2); // Форматируем цену до двух знаков после запятой

  return (
    <div className="app__menuitem">
      <div className="app__menuitem-head">
        <div className="app__menuitem-name">
          <p className="p__cormorant" style={{ color: "#DCCA87" }}>
            {title}
          </p>
        </div>

        <div className="app__menuitem-dash" />

        {formattedPrice !== '0.00' && ( // Проверяем, что цена не равна 0.00
          <div className="app__menuitem-price">
            <p className="p__cormorant">€{formattedPrice}</p> {/* Добавили значок евро перед ценой */}
          </div>
        )}
      </div>
      <div className="app__menuitem-sub">
        <p className="p__opensans" style={{ color: "#AAA" }}>
          {tags}
        </p>
      </div>
    </div>
  );
};

export default MenuItem;
