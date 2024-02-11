// Import necessary dependencies and components
import Link from 'next/link';
import "./profile.css";
import Image from 'next/image';
import DefaultIcon from '../../assets/default-profile-icon.svg';
import PencilIcon from '../../assets/pencil-icon.svg';
import BannerImageNew from "../../assets/chef-ingredients.jpeg";
import TextField from '@mui/material/TextField';
import RecipeCard from '@/components/recipe-card/recipe-card';
import exampleResponse from '../../data/exampleResponse.json'
const fs = require('fs');
import { auth, signOut } from '../auth';

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


async function Profile() {
   let session = await auth();
   console.log(session.user);

   const data = await getData();
   console.log(data);
   // uncomment if you want to update the dummy example with whatever response you want
   /**
   let object = JSON.stringify(data);
   fs.writeFileSync('data/exampleResponse.json', object);
   */



  let page = 1;
  return (
   <div className='profile-container'>
      <div className='banner' style={{width: '100vw', height: '500px', position: 'relative'}}>
         <Image
            alt='banner'
            src={BannerImageNew}
            layout='fill'
            objectFit='cover'
         />
      </div>
      <div className='profile-header'>
         <Image height='200' width='200' src={DefaultIcon}/>
         <Image className='pencil' height='50' width='50' src={PencilIcon}/>
      </div>
      <div className='title'>Your Profile</div>
      <div className='options'>
         <div className='option' onClick={page = 2}>Profile Settings</div>
         <div className='option'>Saved Recipes</div>
         <div className='option'>Your Reviews</div>
      </div>
      <hr></hr>
         <div className='settings'>
            <div className='email'>
               <div>email</div>
               <TextField id="outlined-basic"/>
            </div>
            <div className='display-name'>
               <div>display name</div>
               <TextField id="outlined-basic"/>
            </div>
            <div className='password'>
               <div>change password</div>
               <TextField id="outlined-basic" label="enter new password" type="password" />
               <TextField id="outlined-basic" label="confirm password" type="password" />
            </div>
   
         </div>

   </div>
  );
}

export default Profile;
