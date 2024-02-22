import React from "react";
import BannerImageNew from "../../assets/chef-ingredients.jpeg";
import "./saved-ingredients.css";

function UsedSavedIngredients() {
  return (
    <div>
      <div className="use" style=
      {{ backgroundImage: `url(${BannerImageNew})` }}></div>
      <div className="customTextNew">
        <p>Got Everything?</p>
      </div>
      <div className="customTexthome">
        <p>Home {'>'} Recipes</p>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link to="/filter">
        <button className="filterButton">Filters</button>
        </Link>
      </div>
    </div>
  );
}

export default UsedSavedIngredients;
