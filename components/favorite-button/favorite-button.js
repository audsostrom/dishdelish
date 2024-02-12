"use client";
import { createSavedRecipe } from "pages/db";

async function starRecipe(recipe, favorited) {
   console.log(favorited)
   if (favorited == false) {
      createSavedRecipe('1234@gmail.com', recipe);
      
   }
}

export function Favorite({recipe, favorited}) {
   const isFavorited = favorited == 'true' ? true : false; 
   return (
      <div>
         <button onClick={() => starRecipe(recipe, isFavorited)}>Hello</button>
      </div>
   );
 }