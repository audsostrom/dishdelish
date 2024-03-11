import Link from 'next/link';
import './search-results.css';
import Image from 'next/image';
import {getSavedRecipes} from '../../db';
import {getPreferences} from '../../db';
import TuneIcon from '@mui/icons-material/Tune';

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
	console.log('ingredients', userIngredients);
	const res = await fetch(
		`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${userIngredients}&apiKey=${process.env.SPOON_KEY}`
	);

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data');
	}
	const response = await res.json();
	let ingredientResponse, ingredientPromise;
	for (let i = 0; i < response.length; i++) {
		ingredientPromise = await fetch(
			`https://api.spoonacular.com/recipes/${response[i]['id']}/information?apiKey=${process.env.SPOON_KEY}`
		);
		if (!ingredientPromise.ok) {
			// This will activate the closest `error.js` Error Boundary
			throw new Error('Failed to fetch data');
		}
		ingredientResponse = await ingredientPromise.json();
		console.log(i, ingredientResponse)
		response[i]['readyInMinutes'] = ingredientResponse['readyInMinutes'];
		response[i]['cuisines'] = ingredientResponse['cuisines'];
		response[i]['diets'] = ingredientResponse['diets'];
		response[i]['vegetarian'] = ingredientResponse['vegetarian'];
		response[i]['vegan'] = ingredientResponse['vegan'];
		response[i]['glutenFree'] = ingredientResponse['glutenFree'];
		response[i]['dairyFree'] = ingredientResponse['dairyFree'];

		// paleo, vegan, vegetarian, dairy allergies and whole 30 diets can't eat dairy
		if ((preferences['diets'].includes('paleo') || preferences['diets'].includes('vegan') || preferences['diets'].includes('vegetarian') || preferences['ingredients'].includes('whole 30') || preferences['intolerances'].includes('Dairy')) && ingredientResponse['dairyFree'] == false) {
			response.filter(item => item !== response[i]);	
			continue;	
		}
		// not vegan
		if (preferences['ingredients'].includes('vegan') && ingredientResponse['vegan'] == false) {
			response.filter(item => item !== response[i]);
			continue;
		}
		// not vegetarian
		if (preferences['ingredients'].includes('vegetarian') && ingredientResponse['vegetarian'] == false) {
			response.filter(item => item !== response[i]);
			continue;
		}
		// not gluten-free
		if (preferences['intolerances'].includes('Gluten') && ingredientResponse['glutenFree'] == false) {
			response.filter(item => item !== response[i]);
			continue;
		}
		// not dairy-free
		if (preferences['intolerances'].includes('Dairy') && ingredientResponse['dairyFree'] == false) {
			response.filter(item => item !== response[i]);
			continue;
		}
		// not diet compliant
		if (!preferences['diets'].some((elem)=> ingredientResponse['diets'].includes(elem))) {
			response.filter(item => item !== response[i]);
			continue;
		}


	}
	return response;
}

/**
 * @return {*} – Renders the Recipe Results page
 */
async function Results({params}) {
	// (TO DO) uncomment this section during intregration + after demo
	/**
   let session = await auth();
   console.log(session.user);
   let userRecipes = await getSavedRecipes(session.user.email);
   console.log('my recipes', userRecipes);


   */
	const userRecipes = await getSavedRecipes('1234@gmail.com');
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

		</div>
	);
}

export default Results;
