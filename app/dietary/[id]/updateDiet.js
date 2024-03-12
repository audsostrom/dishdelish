'use server';
import {redirect} from 'next/navigation';
import {updatePreferences} from '@/app/db';

/**
 * The `updateDiet` function updates user preferences for diets, intolerances,
 * and cuisines and then redirects to the search results page.
 * @param {String} id - Specifies preference docs
 * @param {Array} diets - Dietary preferences or
 * restrictions (i.e. vegetarian, gluten-free).
 * @param {Array} intolerances - Intolerances refer
 * to specific dietary restrictions or sensitivities that a
 * person may have towards certain foods (i.e. seafood).
 * @param {Array} cuisines - Refers to the types or styles of food
 * associated with a specific culture or region.
 */
export async function updateDiet(id, diets, intolerances, cuisines) {
	console.log('in update diet function', id, diets, intolerances, cuisines);
	await updatePreferences(id, diets, intolerances, cuisines);
	redirect(`/search-results/${id}`);
}
