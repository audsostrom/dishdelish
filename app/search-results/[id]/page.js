import Link from 'next/link';
import "./search-results.css";
import Image from 'next/image';
import { getSavedRecipes } from '../../db';
import { getPreferences } from '../../db';
import TuneIcon from '@mui/icons-material/Tune';

/**
 * The function `getData` fetches recipe data based on user preferences and ingredients using the
 * Spoonacular API.
 * @param {String} id - The `id` parameter in the `getData` function is used to identify a specific user for
 * whom we are fetching recipe data based on their ingredient preferences.
 * @returns The `getData` function is returning a Promise that resolves to the JSON response from the
 * Spoonacular API after fetching recipe data based on the user's ingredient preferences.
 */
async function getData(id) {
   "use server";
   const preferences = await getPreferences(id);
   const userIngredients = preferences['ingredients'].join(',')
   console.log('ingredients', userIngredients)
   const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?number=8&addRecipeInformation=true&includeIngredients=${userIngredients}&apiKey=${process.env.SPOON_KEY}`
   );
   
   if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
   }
   return res.json();
}



async function Results({ params }) {

   // (TO DO) uncomment this section during intregration + after demo
   /**
   let session = await auth();
   console.log(session.user);
   let userRecipes = await getSavedRecipes(session.user.email);
   console.log('my recipes', userRecipes);
   
    
   */
   let userRecipes = await getSavedRecipes('1234@gmail.com');
   console.log('params', params)
   const id = params['id'];

   const data = await getData(id);

  return (
   <div className='results-container'>
      <div className='banner'>
         <div className='header'>Here's What We Found For You</div>
         <Link href={{pathname: `/grab`,}}>
            <div className='go-back'>&#60; Need To Go Back?</div>
         </Link>
      </div>
      <div className='option-bar'>
         <Link href={{pathname: `/dietary/${id}`,}}>
            <div className='filter-wrapper'>
               <TuneIcon/>
               <div className='filter-text'>Filters</div>
            </div>
         </Link>
         
         <div className='showing-results'>Showing {data.results.length} Results</div>
      </div>
      <div className='recipe-cards-wrapper'>
         {
           data.results.map((item, i) => 
            // this redirects you to specific recipe
            <Link 
               key={'recipe' + i}
               href={{
                  pathname: `/recipe/`,
                  query: { id: item['id'], favorited: userRecipes.some(obj => obj.id === item['id']) },
               }}
             >
               <div className="recipe-card" key={i}>
               <Image alt='recipe-photo' className='card-image' width='200' height='200' src={item['image']}/>
               <div className='card-text'>
                  <div className='recipe-title'>{item['title']}</div>
                  <div className='time'>Time: {item['readyInMinutes']} minutes</div>
               </div>
               </div>
            </Link>
            )
         }
      </div>

   </div>
  );
}

export default Results;