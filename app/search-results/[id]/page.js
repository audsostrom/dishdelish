import Link from 'next/link';
import './search-results.css';
import Image from 'next/image';
import {getSavedRecipes} from '../../db';
import {getPreferences} from '../../db';
import TuneIcon from '@mui/icons-material/Tune';
import {auth} from '@/app/auth';

/**
 * The function `getData` fetches recipe data based on user
 * preferences and ingredients using Spoonacular
 * @param {String} id - The `id` parameter in the `getData` function
 * is used to identify a specific user for whom we are fetching recipe
 * data based on their ingredient preferences.
 * @return {Promise} – Returns a Promise that resolves to the
 * JSON response from the Spoonacular API after
 * fetching recipe data based on the user's ingredient preferences.
 */
async function getData(id) {
	'use server';
	const preferences = await getPreferences(id);
	const userIngredients = preferences['ingredients'].join(',+');
	console.log( userIngredients)
	// console.log('hi', preferences['diets'], preferences['intolerances']);

	// eslint-disable-next-line max-len
	const res = await fetch(
		`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${userIngredients}&number=5&&apiKey=${process.env.SPOON_KEY}`,
	);
	console.log(res)

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data');
	}
	let response = await res.json();
	let ingredientResponse;
	let ingredientPromise;
	let ingredientAisles;
	let ingredientNames;
	// only do extra stuff if necessary
	// console.log(preferences['diets'], preferences['diets'] != [], preferences['intolerances'], preferences['intolerances'] != [])
	if (!((preferences['diets'] == []) && (preferences['intolerances'] == []))) {
		for (let i = 0; i < response.length; i++) {
			console.log(response[i]['id'], 'yo');
			// eslint-disable-next-line max-len
			ingredientPromise = await fetch(
				`https://api.spoonacular.com/recipes/${response[i]['id']}/information?ranking=2&apiKey=${process.env.SPOON_KEY}`,
			);
			if (!ingredientPromise.ok) {
				// This will activate the closest `error.js` Error Boundary
				throw new Error('Failed to fetch data');
			}
			ingredientResponse = await ingredientPromise.json();
			ingredientAisles = ingredientResponse['extendedIngredients'].map((a) =>
				a['aisle']?.toLowerCase(),
			);
			ingredientNames = ingredientResponse['extendedIngredients'].map((a) =>
				a['name']?.toLowerCase(),
			);
			// console.log(ingredientAisles, 'aisles')
			response[i]['readyInMinutes'] = ingredientResponse['readyInMinutes'];
			response[i]['cuisines'] = ingredientResponse['cuisines'];
			response[i]['diets'] = ingredientResponse['diets'];
			response[i]['vegetarian'] = ingredientResponse['vegetarian'];
			response[i]['vegan'] = ingredientResponse['vegan'];
			response[i]['glutenFree'] = ingredientResponse['glutenFree'];
			response[i]['dairyFree'] = ingredientResponse['dairyFree'];
	
			// paleo, vegan, vegetarian, dairy allergies and whole 30 can't eat dairy
			if (
				(preferences['diets'].includes('paleo') ||
			  preferences['diets'].includes('vegan') ||
			  preferences['diets'].includes('vegetarian') ||
			  preferences['ingredients'].includes('whole 30') ||
			  preferences['intolerances'].includes('Dairy')) &&
			ingredientResponse['dairyFree'] == false
			) {
				response = response.filter((item) => item != response[i]);
				i--;
				continue;
			}
			// not vegan
			if (
				preferences['diets'].includes('vegan') &&
			ingredientResponse['vegan'] == false
			) {
				response = response.filter((item) => item != response[i]);
				i--;
				continue;
			}
			// not vegetarian
			if (
				preferences['diets'].includes('vegetarian') &&
			ingredientResponse['vegetarian'] == false
			) {
				console.log('filtering out', i);
				response = response.filter((item) => item != response[i]);
				i--;
				continue;
			}
			// not gluten-free
			if (
				preferences['intolerances'].includes('Gluten') &&
			ingredientResponse['glutenFree'] == false
			) {
				response = response.filter((item) => item != response[i]);
				i--;
				continue;
			}
			// not dairy-free
			if (
				preferences['intolerances'].includes('Dairy') &&
			ingredientResponse['dairyFree'] == false
			) {
				response = response.filter((item) => item != response[i]);
				i--;
				continue;
			}
			// no fish if you're allergic to shell fish or fish
			if (
				(preferences['intolerances'].includes('Seafood') ||
			  preferences['intolerances'].includes('shellfish')) &&
			(ingredientAisles.includes('seafood') ||
			  ingredientAisles.includes('fish'))
			) {
				response = response.filter((item) => item != response[i]);
				i--;
				continue;
			}
			// no peanuts if you're allergic to shell fish or fish
			if (
				preferences['intolerances'].includes('Peanuts') &&
			(ingredientNames.some((str) => str.includes('nut')) ||
			  ingredientAisles.some((str) => str.includes('nut')))
			) {
				response = response.filter((item) => item != response[i]);
				i--;
				console.log(response, 'hi');
				continue;
			}
			// no alcohol if you don't like it
			if (
				preferences['intolerances'].includes('Alcohol') &&
			ingredientAisles.includes('alcohol')
			) {
				response = response.filter((item) => item != response[i]);
				continue;
			}
			// not diet compliant
			if (
				preferences['diets'].some((elem) =>
					ingredientResponse['diets'].includes(elem),
				)
			) {
				response = response.filter((item) => item != response[i]);
				i--;
				console.log('poop');
				continue;
			}
			// doesn't match cuisines
			if (
				ingredientResponse['cuisines'] != [] && preferences['cuisine'].some(
					(elem) => ingredientResponse['cuisines'].includes(elem),
				)
			) {
				response = response.filter((item) => item != response[i]);
				i--;
				console.log('poop');
				continue;
			}
		}

	}
	// console.log(response, 'response');
	return response;
}

function calculatePercentage(usedIngredientCount, missedIngredientCount) {
	return Math.floor(((usedIngredientCount / (missedIngredientCount + usedIngredientCount)) * 100))
}

/**
 * @return {*} – Renders the Recipe Results page
 */
async function Results({params}) {
	const session = await auth();
	console.log('user', session?.user);
	const userRecipes = session?.user ?
		await getSavedRecipes(session.user.email) :
		[];
	console.log('my recipes', userRecipes);
	const id = params['id'];

	const data = await getData(id);

	return (
		<div className="results-container">
			<div className="banner">
				<div className="header">Here's What We Found For You</div>
				<Link href={{pathname: `/grab`}}>
					<div className="go-back">&#60; Need To Go Back?</div>
				</Link>
			</div>
			<div className="option-bar">
				<Link href={{pathname: `/dietary/${id}`}}>
					<div className="filter-wrapper">
						<TuneIcon />
						<div className="filter-text">Filters</div>
					</div>
				</Link>

				<div className="showing-results">Showing {data.length} Results</div>
			</div>
			{data.length == 0 ? (
				<div className="nothing-found">
          No recipes found! Try with more or different ingredients, or with
          different filters.
				</div>
			) : (
				<div className="recipe-cards-wrapper">
					{data.sort((item1, item2) => calculatePercentage(item2['usedIngredientCount'], item2['missedIngredientCount']) - calculatePercentage(item1['usedIngredientCount'], item1['missedIngredientCount'])).map((item, i) => (
						// this redirects you to specific recipe
						<Link
							key={'recipe' + i}
							href={{
								pathname: `/recipe/`,
								query: {
									id: item['id'],
									favorited: userRecipes.some((obj) => obj.id === item['id']),
								},
							}}
						>
							<div className="recipe-card" key={i}>
								<Image
									alt="recipe-photo"
									className="card-image"
									width="200"
									height="200"
									src={item['image']}
								/>
								<div className="card-text">
									<div className="recipe-title">
										{item['title'].length > 43 ?
											item['title'].slice(0, 42) + '...' :
											item['title']}
									</div>
									<div className="match-percent">
										{calculatePercentage(item['usedIngredientCount'], item['missedIngredientCount'])}%
										Match!
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			)}
		</div>
	);
}

export default Results;
