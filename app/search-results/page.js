// Import necessary dependencies and components
import Link from 'next/link';
import "./search-results.css";
import Image from 'next/image';
import DefaultIcon from '../../assets/default-profile-icon.svg';
import PencilIcon from '../../assets/pencil-icon.svg';
import BannerImageNew from "../../assets/chef-ingredients.jpeg";
import TextField from '@mui/material/TextField';
import RecipeCard from '@/components/recipe-card/recipe-card';
import exampleResponse from '../../data/exampleResponse.json'
const fs = require('fs');
import { auth, signOut } from '../auth';
import { getSavedRecipes } from '../db';

// uncomment only when you need to, this is some dummy data so we don't over-use credits
async function getData() {
   /**
   const res= await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?number=2&addRecipeInformation=true&includeIngredients=tomato,cheese&apiKey=${process.env.SPOON_KEY}`
   );
  
   if (!res.ok) {
     // This will activate the closest `error.js` Error Boundary
     throw new Error('Failed to fetch data')
   }
  
   return res.json();
   */
  return exampleResponse;
}


async function Results() {
   // let session = await auth();
   // console.log(session.user);
   // let userRecipes = await getSavedRecipes(session.user.email);
   // console.log('my recipes', userRecipes);
   let userRecipes = await getSavedRecipes('1234@gmail.com');
   console.log('my recipes', userRecipes);

   const data = await getData();
   console.log(data);
   // uncomment if you want to update the dummy example with whatever response you want
   /**
   let object = JSON.stringify(data);
   fs.writeFileSync('data/exampleResponse.json', object);
   */


  return (
   <div className='results-container'>
      <div>Here's What We Found For You</div>
      <div>Showing Results</div>
      <div className='recipe-cards-wrapper'>
         {
           data.results.map((item, i) => 
            <div className="recipe-card" key={i}>
               <Image className="card-image" width='200' height='200' src={item['image']}/>
               <div className='card-text'>
                  <div>{item['title']}</div>
                  <div>Time: {item['readyInMinutes']} minutes</div>
               </div>
            </div>)
         }
      </div>

   </div>
  );
}

export default Results;
