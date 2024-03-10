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
		<div className="menu">
			<div className="customTextContainer">
				<span className="customTextnew">We make cooking work for you.</span>
				<div className="customDescription">
            With DishDelish, just tell us what you have in your
				pantry, and we'll handle the rest.
				You can start your list of ingredients from scratch,
				or you can use your saved items from previous searches.
				</div>
				<div className="buttonContainer">
					<Link href="/grab">
						<button className="roundedButton primaryButton">
							Grab Your Ingredients
						</button>
					</Link>
					<Link href="/recipe-transformer">
						<button className="roundedButton secondaryButton">
							AI Generate New Recipes
						</button>
					</Link>
				</div>
			</div>
			<div className="menuImageContainer">
				<Image unoptimized={true} src={yourImage} alt="Your Image" className="menuImage"/>
			</div>
		</div>
	);
}
