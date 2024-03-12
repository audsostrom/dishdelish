// Import necessary dependencies and components
import Link from 'next/link';
import "./recipe.css";
import { createSavedRecipe } from '../db';
import Image from 'next/image';
import { Star, Favorite } from '@mui/icons-material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// uncomment only when you need to, this is some dummy data so we don't over-use credits

// https://icongr.am/fontawesome
// https://icongr.am/fontawesome/star.svg?size=128&color=currentColor
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
   console.log(data['analyzedInstructions'][0]['steps'], 'hi')
   console.log(data)
   const favorited = searchParams['favorited'] == 'true' ? true : false;
   
   let page = 1;

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

   function getSummary() {
      return {__html: data['summary']};
   }

   function getInstructions() {
      return {__html: data['instructions']};
   }

   function setPage(number) {
      page = number;
   }

   function getExperienceLevel(time) {
      if (time <= 45) {
         return 'beginner'
      } else if (time <= 120) {
         return 'intermediate'
      } else {
         return 'hard'
      }
   }

   var myArray = []
   for (var i = 0; i < (data['spoonacularScore'] / 20); i++) {
      myArray.push(i)
   }


  return (
   <div className='recipe-container'>
      <div className='top-row'>
         <div className='title'>Results &#62; {data['title']}</div>
            <form className='favorite-button' action={handleFavorite}>
               
               <div>Favorite</div>
               {!favorited && <button className='button' type="submit"><FavoriteBorderIcon style={{ width: '20', height: '20' }}/></button>}
               {favorited && <button className='button' type="submit"><Favorite style={{ width: '20', height: '20' }}/></button>}
            </form>

      </div>
      {/** has to be an action in order to use server-side functionality */}
      <div className='body'>
         <Image className="big-card-image" width='300' height='300' style={{objectFit: "contain"}} src={data['image']} alt="Big Card Image"/>
         <div>
         <div className='big-title'>{data['title']}</div>
            <div>
               {
                  myArray.map((diet, i) =>
                     <Star key={id}/>

                  )
               }
            </div>

            <div className='experience'>experience level: {getExperienceLevel(data['readyInMinutes'])}</div>
            <div className='diets'>
               <span>diets: </span>
               {
                  data['diets'].map((diet, i) =>
                     ((i == data['diets'].length - 1) ? <span key={id} >{diet}</span> : <span key={id}>{diet}, </span>)
                  )
               }
            </div>
            <div className='cuisines'>
               <span>cuisines: </span>
               {data['cuisines'].length == 0 && <span>n/a</span>}
               {
                  data['cuisines'].map((diet, i) =>
                     ((i == data['diets'].length - 1) ? <span key={id}>{diet}</span> : <span key={id}>{diet}, </span>)
                  )
               }
            </div>

         </div>

      </div>
      <hr></hr>
      <div className='lower-part'>
         <div className='options'>
            <div>Instructions</div>
            <div>Additonal Information</div>
         </div>
         {page == 1 && <div dangerouslySetInnerHTML={getInstructions()}></div>}
         {page == 2 && <div>Hello</div>}

      </div>
   </div>
  );
}

export default RecipeInfo;
