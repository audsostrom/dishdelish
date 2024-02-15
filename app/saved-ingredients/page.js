import React from "react";
import BannerImageNew from "../../assets/chef-ingredients.jpeg";
import "./saved-ingredients.css";

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
