import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assets/cuttingbanana.png";
import "./home.css";

function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainer">
        <div className="beigeBox">
          <p>Discover Your Next Dish</p>
          <span className="customText">Trying to save some cash or use the food you have already? DishDelish brings the power to your pantry by fetching recipes with ONLY the ingrediants you have on-hand!</span>
          <br />
          <br />
          <Link to="/menu">
            <button>GET TO COOKING</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
