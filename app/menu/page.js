import Link from 'next/link';
import './menu.css';
import Image from 'next/image';
import yourImage from '../../assets/GetCooking.jpeg';


/**
 * @return {*} – Renders the Menu page, where users can either choose to
 * get recipes with Spoonacular or with AI.
 */
export default function Menu() {
	return (
		<div className="menu-container">
			<div className="custom-text-container">
				<div className="custom-text-title">We make cooking work for you.</div>
				<div className="custom-description">
            With DishDelish, just tell us what you have in your
				pantry, and we'll handle the rest.
				You can start your list of ingredients from scratch,
				or you can use your saved items from previous searches.
				</div>
				<div className="buttons-container">
					<Link href="/grab">
						<button className="primary-button">
							Grab Your Ingredients
						</button>
					</Link>
					<Link href="/recipe-transformer">
						<button className="secondary-button">
							Generate Recipes With AI &#10023;
						</button>
					</Link>
				</div>
			</div>
			<div className="menu-image-container">
				<Image unoptimized={true} src={yourImage} alt="Your Image" className="menu-image"/>
			</div>
		</div>
	);
}
