"use server";

import {cookies} from 'next/headers';
import { redirect } from 'next/navigation';

export async function storeIngredients(ingredients) {
   console.log('in function')
   /** old way */
   // cookies().set('ingredients', ingredients, { maxAge: 30*24*60*60*1000 });
   // console.log('ah poop', cookies().get('ingredients'))

   redirect('/search-results/${}');
}