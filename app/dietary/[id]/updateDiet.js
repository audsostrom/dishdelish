"use server";
import { redirect } from 'next/navigation';
import { updatePreferences } from '@/app/db';

export async function updateDiet(id, diets, intolerances, cuisines) {
	console.log('in update diet function', id, diets, intolerances, cuisines)
	const response = await updatePreferences(id, diets, intolerances, cuisines);
	redirect(`/search-results/${id}`);
}