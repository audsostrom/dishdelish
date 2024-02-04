import React from "react";
import { Link } from "react-router-dom";
import BannerImageNew from "../assets/chef-ingredients.jpeg";
import "../styles/UsedSavedIngredients.css";

function UsedSavedIngredients() {
  return (
    <><><div className="use" style={{ backgroundImage: `url(${BannerImageNew})` }}>
    </div><div className="customTextNew">
        <p>Got Everything?</p>
      </div></><div className="customTexthome">
        <p>Home {'>'} Recipes</p>
      </div></>


  );
}

export default UsedSavedIngredients;
