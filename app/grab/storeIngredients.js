"use server"

import {cookies} from 'next/headers';
import { redirect } from 'next/navigation';

export async function storeIngredients(ingredients) {
   console.log('in function')
   // use sessionStorage.getItem("ingredients") to get your array
   cookies().set('ingredients', ingredients);
   // change to saved-ingredients later during integration
   console.log('ah poop', cookies().get('ingredients'))
   redirect('/search-results');
 }