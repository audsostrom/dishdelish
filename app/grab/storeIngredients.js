'use server';
import {redirect} from 'next/navigation';
import {saveIngredients, savePreferences} from '../db';
import {auth} from '../auth';

/**
 * The function `storeIngredients` saves ingredients preferences
 * and redirects to a dietary page based on the response.
 * @param {Array} ingredients - An array of ingredients to store.
 */
export async function storeIngredients(ingredients) {
	const response = await savePreferences(ingredients);
	const session = await auth();
	if (session?.user?.email) {
		saveIngredients(session?.user?.email, ingredients);
	}
	redirect(`/dietary/${response['_id'].toString()}`);
}
