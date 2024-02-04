// Import necessary dependencies and components
import Link from 'next/link';
import MenuItem from '../../components/menu-item/menu-item';
import "./menu.css";

// Import your image file
import yourImage from "../../assets/GetCooking.png";


function Menu() {
  return (
    <div className="menu">
      <div className="menuContent">
        <div className="customTextContainer">
          <span className="customTextnew">We make cooking work for you. </span>
          <br />
          <br />
          <div className="customDescription">
            With DishDelish, just tell us what you have in your pantry, and we'll handle the rest. You can start your list of ingredients from scratch, or you can use your saved items from previous searches.
          </div>
          
          {/* Add the buttons here */}
          <div className="buttonContainer">
            <Link href="/grab">
            <button className="roundedButton primaryButton">Grab Your Ingredients</button>
            </Link>
            <Link href="/use">
            <button className="roundedButton secondaryButton">Use Saved Items</button>
            </Link>
          </div>
        </div>
        <div className="menuImageContainer">
          <img src={yourImage} alt="Your Image" className="menuImage" />
        </div>
      </div>
    </div>
  );
}

export default Menu;
