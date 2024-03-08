"use server";
import {cookies} from 'next/headers';
import { redirect } from 'next/navigation';
import { savePreferences } from '../db';

export async function storeIngredients(ingredients) {
   console.log('in function')
   const response = await savePreferences(ingredients);
   redirect(`/dietary/${response['_id'].toString()}`);
}