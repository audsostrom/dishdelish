"use server";
import {cookies} from 'next/headers';
import { redirect } from 'next/navigation';
import { savePreferences } from '../db';

export async function storeIngredients(ingredients) {
   console.log('in function')
   /** old way */
   // cookies().set('ingredients', ingredients, { maxAge: 30*24*60*60*1000 });
   // console.log('ah poop', cookies().get('ingredients'))
   const response = await savePreferences(ingredients);
   redirect(`/dietary/${response.toString()}`);
}