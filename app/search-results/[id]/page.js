import Link from 'next/link';
import './search-results.css';
import Image from 'next/image';
import {getSavedRecipes} from '../../db';
import {getPreferences} from '../../db';
import TuneIcon from '@mui/icons-material/Tune';
import { auth } from '@/app/auth';

/**
 * The function `getData` fetches recipe data based on user preferences and ingredients using the
 * Spoonacular API.
 * @param {String} id - The `id` parameter in the `getData` function is used to identify a specific user for
 * whom we are fetching recipe data based on their ingredient preferences.
 * @return {Promise} The `getData` function is returning a Promise that resolves to the JSON response from the
 * Spoonacular API after fetching recipe data based on the user's ingredient preferences.
 */
async function getData(id) {
	'use server';
	const preferences = await getPreferences(id);
	const userIngredients = preferences['ingredients'].join(',+');
	// const userCuisines = preferences['diets'].join(',');
	// const userIntolerances = preferences['intolerances'].join(',');
	const res = await fetch(
		`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${userIngredients}&number=1&&apiKey=${process.env.SPOON_KEY}`
	);

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data');
	}
	let response = await res.json();
	let ingredientResponse, ingredientPromise, ingredientAisles, ingredientNames;
	for (let i = 0; i < response.length; i++) {
		ingredientPromise = await fetch(
			`https://api.spoonacular.com/recipes/${response[i]['id']}/information?apiKey=${process.env.SPOON_KEY}`
		);
		if (!ingredientPromise.ok) {
			// This will activate the closest `error.js` Error Boundary
			throw new Error('Failed to fetch data');
		}
		ingredientResponse = await ingredientPromise.json();
		// console.log(i, ingredientResponse['extendedIngredients'], typeof ingredientResponse['extendedIngredients']);
		ingredientAisles = ingredientResponse['extendedIngredients'].map(a => a['aisle']?.toLowerCase());
		ingredientNames = ingredientResponse['extendedIngredients'].map(a => a['name']?.toLowerCase());
		// console.log(ingredientAisles, 'aisles')
		response[i]['readyInMinutes'] = ingredientResponse['readyInMinutes'];
		response[i]['cuisines'] = ingredientResponse['cuisines'];
		response[i]['diets'] = ingredientResponse['diets'];
		response[i]['vegetarian'] = ingredientResponse['vegetarian'];
		response[i]['vegan'] = ingredientResponse['vegan'];
		response[i]['glutenFree'] = ingredientResponse['glutenFree'];
		response[i]['dairyFree'] = ingredientResponse['dairyFree'];

		// paleo, vegan, vegetarian, dairy allergies and whole 30 diets can't eat dairy
		if ((preferences['diets'].includes('paleo') || preferences['diets'].includes('vegan') || preferences['diets'].includes('vegetarian') || preferences['ingredients'].includes('whole 30') || preferences['intolerances'].includes('Dairy')) && ingredientResponse['dairyFree'] == false) {
			response = response.filter(item => item != response[i]);	
			continue;	
		}
		// not vegan
		if (preferences['ingredients'].includes('vegan') && ingredientResponse['vegan'] == false) {
			response = response.filter(item => item != response[i]);
			continue;
		}
		// not vegetarian
		if (preferences['ingredients'].includes('vegetarian') && ingredientResponse['vegetarian'] == false) {
			response = response.filter(item => item != response[i]);
			continue;
		}
		// not gluten-free
		if (preferences['intolerances'].includes('Gluten') && ingredientResponse['glutenFree'] == false) {
			response = response.filter(item => item != response[i]);
			continue;
		}
		// not dairy-free
		if (preferences['intolerances'].includes('Dairy') && ingredientResponse['dairyFree'] == false) {
			response = response.filter(item => item != response[i]);
			continue;
		}
		// no fish if you're allergic to shell fish or fish
		if ((preferences['intolerances'].includes('Seafood') || preferences['intolerances'].includes('shellfish') ) && (ingredientAisles.includes('seafood') ||  ingredientAisles.includes('fish'))) {
			response = response.filter(item => item != response[i]);
			continue;
		}
		// no peanuts if you're allergic to shell fish or fish
		console.log(ingredientNames.includes('nut'), ingredientAisles.some((str) => str.includes('nut')))
		if (preferences['intolerances'].includes('Peanuts') && (ingredientNames.some((str) => str.includes('nut')) ||  ingredientAisles.some((str) => str.includes('nut')))) {
			response = response.filter(item => item != response[i]);
			console.log(response, 'hi');
			continue;
		}
		// no alcohol if you don't like it
		if (preferences['intolerances'].includes('Alcohol') && (ingredientAisles.includes('alcohol'))) {
			response = response.filter(item => item != response[i]);
			continue;
		}
		// not diet compliant
		if (!preferences['diets'].some((elem)=> ingredientResponse['diets'].includes(elem))) {
			response = response.filter(item => item != response[i]);
			continue;
		}
		// doesn't match cuisines
		if (ingredientResponse['cuisines'] != [] && !preferences['cuisine'].some((elem)=> ingredientResponse['cuisines'].includes(elem))) {
			response = response.filter(item => item != response[i]);
			continue;
		}

	}
	return response;
}

/**
 * @return {*} – Renders the Recipe Results page
 */
async function Results({params}) {

   let session = await auth();
   console.log(session.user);
   let userRecipes = session.user ? await getSavedRecipes(session.user.email) : [];
   console.log('my recipes', userRecipes);

	console.log('params', params);
	const id = params['id'];

	const data = await getData(id);

	return (
		<div className='results-container'>
			<div className='banner'>
				<div className='header'>Here's What We Found For You</div>
				<Link href={{pathname: `/grab`}}>
					<div className='go-back'>&#60; Need To Go Back?</div>
				</Link>
			</div>
			<div className='option-bar'>
				<Link href={{pathname: `/dietary/${id}`}}>
					<div className='filter-wrapper'>
						<TuneIcon/>
						<div className='filter-text'>Filters</div>
					</div>
				</Link>

				<div className='showing-results'>Showing {data.length} Results</div>
			</div>
			{
				data.length == 0 ? 
				<div>No recipes found! Try with more or different ingredients, or with different ingredients.</div>
				:
				<div className='recipe-cards-wrapper'>
				{
					data.map((item, i) =>
					// this redirects you to specific recipe
						<Link
							key={'recipe' + i}
							href={{
								pathname: `/recipe/`,
								query: {id: item['id'], favorited: userRecipes.some((obj) => obj.id === item['id'])},
							}}
						>
							<div className="recipe-card" key={i}>
								<Image alt='recipe-photo' className='card-image' width='200' height='200' src={item['image']}/>
								<div className='card-text'>
									<div className='recipe-title'>{(item['title'].length > 43) ? item['title'].slice(0, 42) + '...' : item['title']}</div>
									<div className='time'>Time: {item['readyInMinutes']} minutes</div>
								</div>
							</div>
						</Link>
					)
				}
			</div>
			}

		</div>
	);
}

export default Results;
