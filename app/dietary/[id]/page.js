"use client";

import React, { useState } from "react";
import "./dietary.css";
import { updateDiet } from "./updateDiet";
import { useParams } from 'next/navigation'

function Dietary() {
  // State variables to track selected checkboxes
  const [intolerances, setIntolerances] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Intolerances");
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedDiets, setSelectedDiets] = useState([]);

  const params = useParams()
  console.log(params)
  const id = params['id'];

  // Function to handle checkbox change for intolerances
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setIntolerances([...intolerances, value]);
    } else {
      setIntolerances(intolerances.filter((item) => item !== value));
    }
  };

  // Function to handle checkbox change for cuisines
  const handleCuisineCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCuisines([...selectedCuisines, value]);
    } else {
      setSelectedCuisines(selectedCuisines.filter((item) => item !== value));
    }
  };

  // Function to handle checkbox change for diets
  const handleDietCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedDiets([...selectedDiets, value]);
    } else {
      setSelectedDiets(selectedDiets.filter((item) => item !== value));
    }
  };

  const generateDropdownOptions = () => {
    if (selectedOption === "Intolerances") {
      // Allergy options
      const allergies = [
        "Dairy", "Egg", "Gluten", "Grains",
        "Peanuts", "Seafood", "Sesame", "Shellfish",
        "Soy", "Sulfite", "Tree Nut", "Wheat"
      ];

      return (
        <div className="dropdown">
          <div className="dropdown-content">
            {allergies.map((allergy) => (
              <div key={allergy} className="checkbox">
                <input
                  type="checkbox"
                  value={allergy}
                  onChange={handleCheckboxChange}
                  checked={intolerances.includes(allergy)}
                />
                <label>{allergy}</label>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (selectedOption === "Cuisine") {
      // Cuisine options
      const cuisines = ["Any","African", "American", "Asian", "British", "Cajun", "Caribbean", "Chinese", "Eastern European", "French", "German", "Greek", "Indian", "Irish", "Italian", "Jewish", "Japenese", "Korean", "Latin American", "Mexican", "Middle Eastern", "Nordic", "Southern", "Spanish", "Thai"];

      return (
        <div className="dropdown">
          <div className="dropdown-content">
            {cuisines.map((cuisine) => (
              <div key={cuisine} className="checkbox">
                <input
                  type="checkbox"
                  value={cuisine}
                  onChange={handleCuisineCheckboxChange}
                  checked={selectedCuisines.includes(cuisine)}
                />
                <label>{cuisine}</label>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (selectedOption === "Diet") {
      // Diet options
      const diets = ["Any", "Lacto Vegeterian", "Ovo Vegeterian", "Playo", "Pesceterian", "Primal", "Vegan", "Vegeterian", "Keto", "Whole 30"];

      return (
        <div className="dropdown">
          <div className="dropdown-content">
            {diets.map((diet) => (
              <div key={diet} className="checkbox">
                <input
                  type="checkbox"
                  value={diet}
                  onChange={handleDietCheckboxChange}
                  checked={selectedDiets.includes(diet)}
                />
                <label>{diet}</label>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="newPage">
        <div className="search">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="options">
          <select onChange={(e) => setSelectedOption(e.target.value)}>
            <option value="Any">Any</option>
            <option value="Cuisine">Cuisine</option>
            <option value="Diet">Diet</option>
            <option value="Intolerances">Intolerances</option>
            <option value="Time">Time</option>
          </select>
        </div>
        <div className="filter">
          <button onClick={() => updateDiet(id, intolerances, selectedDiets, selectedCuisines)}>Search</button>
        </div>
      </div>

      <div className="checkbox-container">
        {generateDropdownOptions()}
      </div>
    </div>
  );
}

export default Dietary;
