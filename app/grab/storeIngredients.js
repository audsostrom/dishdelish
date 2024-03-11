'use server';
import {redirect} from 'next/navigation';
import {savePreferences} from '../db';

/**
 * The function `storeIngredients` saves ingredients preferences and redirects to a dietary page based
 * on the response.
 * @param {Array} ingredients - An array of ingredients that need to be stored.
 */
export async function storeIngredients(ingredients) {
	console.log('hi', ingredients);
	const response = await savePreferences(ingredients);
	redirect(`/dietary/${response['_id'].toString()}`);
}
