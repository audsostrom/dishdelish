// Import necessary dependencies and components
import Link from 'next/link';
import "./recipe.css";
import { createSavedRecipe } from '../db';

// uncomment only when you need to, this is some dummy data so we don't over-use credits
async function getData(recipeId) {
   const res = await fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.SPOON_KEY}`
   );
  
   if (!res.ok) {
     // This will activate the closest `error.js` Error Boundary
     throw new Error('Failed to fetch data');
   }
   return res.json();
}


// searchParams: gives recipes id and whether or not it's been favorited already
async function RecipeInfo({searchParams}) {
   console.log(searchParams['id']);
   const data = await getData(searchParams['id']);
   const favorited = searchParams['favorited'] == 'true' ? true : false; 

   // (TO DO): uncomment when everything integrated
   /**
   let session = await auth();
   console.log(session.user);
   let userRecipes = await getSavedRecipes(session.user.email);
   console.log('my recipes', userRecipes);
   */
   const email = '1234@gmail.com'; // change later, just to make demo quick

   // very critical to use server here!
   const handleFavorite = async () => {
      "use server";
      createSavedRecipe(email, data, favorited);
    };



  return (
   <div className='recipe-container'>
      <div>{data['title']}</div>
      {/** has to be an action in order to use server-side functionality */}
      <form action={handleFavorite}>
         <button type="submit">Favorite</button>
      </form>
   </div>
  );
}

export default RecipeInfo;
