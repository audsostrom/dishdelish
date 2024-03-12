import './recipe.css';
import {createSavedRecipe} from '../db';
import {auth} from '../auth';
import Image from 'next/image';
import {Star, Favorite} from '@mui/icons-material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {redirect} from 'next/navigation';

/**
 * The function `getData` fetches recipe information from the Spoonacular API using the provided recipe
 * ID.
 * @param recipeId - The `recipeId` parameter is the unique identifier of a recipe.
 * @return {Promise} The `getData` function is returning a Promise that resolves to the JSON data fetched from
 * the Spoonacular API for the specified `recipeId`. If the fetch operation is successful, the function
 * returns the JSON data. If there is an error during the fetch operation (when `res.ok` is false), the
 * function throws an error with the message 'Failed to fetch data'.
 */
async function getData(recipeId) {
	const res = await fetch(
		`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.SPOON_KEY}`,
	);

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data');
	}
	return res.json();
}

/**
 * @param {Object} searchParams - contains the search queries
 * (i.e. whether or not a recipe has been favorited)
 * @return {*} – Renders the Profile page
 */
export default async function RecipeInfo({searchParams}) {
	const session = await auth();
	console.log(searchParams['id']);
	const data = await getData(searchParams['id']);
	const favorited = searchParams['favorited'] == 'true' ? true : false;

	const page = 1;

	/**
   * Used to save a recipe as a favorite for a specific user.
   */
	const handleFavorite = async () => {
		'use server';
		console.log('user email', session);
		if (session?.user?.email) {
			createSavedRecipe(session?.user?.email, data, favorited);
			redirect(`/recipe?id=${searchParams['id']}&favorited=${!favorited}`);
		} else {
			redirect('/login');
		}
	};

	/**
   * The function getInstructions returns the instructions stored in the data object as HTML.
   * @return An object with a property named `__html` containing the value of `data['instructions']`.
   */
	function getInstructions() {
		return {__html: data['instructions']};
	}

	/**
   * The function `getExperienceLevel` determines a recipes's experience level
   * based on the amount of time it takes to make it
   * @param {Number} time - Time it takes to make a recipe in minutes
   * @return {String} - Either 'beginner', 'medium', or 'hard'
   */
	function getExperienceLevel(time) {
		if (time <= 45) {
			return 'beginner';
		} else if (time <= 120) {
			return 'intermediate';
		} else {
			return 'hard';
		}
	}

	const myArray = [];
	for (let i = 0; i < data['spoonacularScore'] / 20; i++) {
		myArray.push(i);
	}

	return (
		<div className="recipe-container">
			<div className="top-row">
				<div className="title">Results &#62; {data['title']}</div>
				<form className="favorite-button" action={handleFavorite}>
					<div style={{fontSize: '18px'}}>Favorite</div>
					{!favorited && (
						<button className="button" type="submit">
							<FavoriteBorderIcon style={{width: '20', height: '20'}} />
						</button>
					)}
					{favorited && (
						<button className="button" type="submit">
							<Favorite style={{width: '20', height: '20'}} />
						</button>
					)}
				</form>
			</div>
			{/** has to be an action in order to use server-side functionality */}
			<div className="body">
				<Image
					alt="recipe-photo"
					className="big-card-image"
					width="300"
					height="300"
					style={{objectFit: 'contain'}}
					src={data['image']}
				/>
				<div>
					<div className="big-title">{data['title']}</div>
					<div>
						{myArray.map((i) => (
							<Star key={'star' + i} />
						))}
					</div>

					<div className="experience">
            experience level: {getExperienceLevel(data['readyInMinutes'])}
					</div>
					<div className="diets">
						<span>diets: </span>
						{data['diets'].map((diet, i) =>
							i == data['diets'].length - 1 ? (
								<span key={'diet' + i}>{diet}</span>
							) : (
								<span key={'diet' + i}>{diet}, </span>
							),
						)}
					</div>
					<div className="cuisines">
						<span>cuisines: </span>
						{data['cuisines'].length == 0 && <span>n/a</span>}
						{data['cuisines'].map((diet, i) =>
							i == data['diets'].length - 1 ? (
								<span key={'cuisine' + i}>{diet}</span>
							) : (
								<span key={'cuisine' + i}>{diet}, </span>
							),
						)}
					</div>
				</div>
			</div>
			<hr></hr>
			<div className="lower-part">
				<div className="options">
					<div>Instructions</div>
					<div>Additonal Information</div>
				</div>
				<div dangerouslySetInnerHTML={getInstructions()}></div>
			</div>
		</div>
	);
}
