"use server";
import { redirect } from 'next/navigation';
import { savePreferences } from '../db';

export async function storeIngredients(ingredients) {
	const response = await savePreferences(ingredients);
	redirect(`/dietary/${response['_id'].toString()}`);
}