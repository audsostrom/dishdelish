import React from "react";
import { Link } from "react-router-dom";
import BannerImageNew from "../assets/chef-ingredients.jpeg";
import "../styles/Grab.css";


import SearchableDropdown from "../components/SearchableDropdown";
import { ingredients } from "../components/SearchableDropdown/src/data/ingredients";
//import "..../components/SearchableDropdown/styles.css";
import { useState } from "react";

const [value, setValue] = useState("Search Ingredients");

function Grab() {
  return (
    <><><div className="grab" style={{ backgroundImage: `url(${BannerImageNew})` }}>
    </div><div className="customTextNew">
        <p>Got Everything?</p>
      </div></><div className="customTexthome">
        <p>Home {'>'} Recipes</p>
        <SearchableDropdown
            options={ingredients}
            label="name"
            id="id"
            selectedVal={value}
            handleChange={(val) => setValue(val)}
        />
      </div></>

  );
}


export default Grab;
