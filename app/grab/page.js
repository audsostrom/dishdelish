/* React from "react";
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
*/

/*import React, { useState } from "react";
import { Link } from "react-router-dom";
import BannerImageNew from "../assets/chef-ingredients.jpeg";
import "../styles/Grab.css";
import SearchableDropdown from "../components/SearchableDropdown";
import { ingredients } from "../components/SearchableDropdown/src/data/ingredients";

function Grab() {
  const [value, setValue] = useState("Search Ingredients");

  return (
    <>
      <div className="grab" style={{ backgroundImage: `url(${BannerImageNew})` }}>
      </div>
      <div className="customTextNew">
        <p>Got Everything?</p>
      </div>
      <div className="customTexthome">
        <p>Home {'>'} Recipes</p>
        <SearchableDropdown
          options={ingredients}
          label="name"
          id="id"
          selectedVal={value}
          handleChange={(val) => setValue(val)}
        />
      </div>
    </>
  );
}

export default Grab;
*/

// In "Grab.js"
'use client';
import { useState } from "react";
import BannerImageNew from "../../assets/chef-ingredients.jpeg";
import { ingredients } from "@/data/ingredients";
import "./grab.css";
import SearchableDropdown from "../../components/searchable-dropdown/searchable-dropdown";

function Grab() {
  const [value, setValue] = useState("Search Ingredients");

  return (
    <>
      <div className="grab" style={{ backgroundImage: `url(${BannerImageNew.src})` }}>
      </div>
      <div className="customTextNew">
        <p>Got Everything?</p>
      </div>
      <div className="customTexthome">
        <p>Home {'>'} Recipes</p>
        <SearchableDropdown
          options={ingredients}
          label="name"
          id="id"
          selectedVal={value}
          handleChange={(val) => setValue(val)}
        />
      </div>
    </>
  );
}

export default Grab;
