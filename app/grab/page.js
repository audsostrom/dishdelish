'use client';
import { useState } from "react";
import BannerImageNew from "../../assets/chef-ingredients.jpeg";
import { ingredients } from "@/data/ingredients";
import "./grab.css";
import SearchableDropdown from "../../components/searchable-dropdown/searchable-dropdown";
import { storeIngredients } from "./storeIngredients";

function Grab() {
  const [value, setValue] = useState("Search Ingredients");
  console.log('value', value)
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
        <button className="primaryButton" onClick={() => storeIngredients(value)}>Submit</button>

      </div>
      
    </>
  );
}

export default Grab;
