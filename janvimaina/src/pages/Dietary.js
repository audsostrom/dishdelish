import React from "react";
import { Link } from "react-router-dom";
import "../styles/Dietary.css";

function Dietary() {
  return (
    <div className="filter">
      <div id="search-bar">
        <input type="text" id="search-input" placeholder="Search..." />
        <select id="search-dropdown">
          <option value="diets">Diets</option>
          <option value="allergies">Allergies</option>
          <option value="time">Time</option>
        </select>
        <button id="search-button">Search</button>
      </div>
    </div>
  );
}

export default Dietary;
