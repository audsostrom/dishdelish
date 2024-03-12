import Link from 'next/link';
import "./profile.css";
import Image from 'next/image';
import DefaultIcon from '../../assets/default-profile-icon.svg';
import PencilIcon from '../../assets/pencil-icon.svg';
import BannerImageNew from "../../assets/chef-ingredients.jpeg";
import TextField from '@mui/material/TextField';
import exampleResponse from '../../data/exampleResponse.json'
import { getSavedRecipes } from '../db';
import { signOut } from '../auth';
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
   // let session = await auth();
   // console.log(session.user);
   // let userRecipes = await getSavedRecipes(session.user.email);
   // console.log('my recipes', userRecipes);
   let userRecipes = await getSavedRecipes('1234@gmail.com');

   const data = await getData();
   // uncomment if you want to update the dummy example with whatever response you want
   /**
   let object = JSON.stringify(data);
   fs.writeFileSync('data/exampleResponse.json', object);
   */



  let page = 1;
  return (
   <div className='profile-container'>
      <div className='banner' style={{width: '100vw', height: '200px', position: 'relative'}}>
         <Image
            alt='banner'
            src={BannerImageNew}
            layout='fill'
            objectFit='cover'
         />
      </div>
      <div className='profile-header'>
         <Image height='200' width='200' src={DefaultIcon} alt="Default Icon"/>
         <Image className='pencil' height='50' width='50' src={PencilIcon} alt="Pencil Icon"/>
      </div>
      <div className='title'>Your Profile</div>
      <div className='options'>
         <div className='option' 
            action={ 
               async () => {
               'use server';
               page = 1;
            }}
         >
            Profile Settings
         </div>
         <div className='option' >
            Saved Recipes</div>
            <div className='option'>
            Your Reviews</div>
      </div>
      <hr></hr>
         {page === 1 && <div className='settings'>
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
         </div>}
         {page === 2 && <div className='savedRecipes'>
         {
           userRecipes.map((item, i) => 
            // this redirects you to specific recipe route with id and favorites in the search params
            <Link key={id} href={{
               pathname: `/recipe/`,
               query: { id: item['id'], favorited: userRecipes.some(obj => obj.id === item['id']) },
             }}>
               <div className="recipe-card" key={i}>
               <Image className="card-image" width='200' height='200' src={item['image']} alt="Card Image"/>
               <div className='card-text'>
                  <div>{item['title']}</div>
                  <div>Time: {item['readyInMinutes']} minutes</div>
               </div>
               </div>
            </Link>
            )
         }

         </div>}
         <form
               action={async () => {
               'use server';
               await signOut();
               }}
            >
               <button type="submit">Sign out</button>
            </form>

   </div>
  );
}

export default Profile;
