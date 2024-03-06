
import './settings.css';
import Link from 'next/link';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import { getSavedRecipes } from '../../db';
import { signOut } from '../../auth';
import LogoutIcon from '@mui/icons-material/Logout';

export async function Settings() {
   // let session = await auth();
// console.log(session.user);
// let userRecipes = await getSavedRecipes(session.user.email);
// console.log('my recipes', userRecipes);
let userRecipes = await getSavedRecipes('1234@gmail.com');
console.log(userRecipes)
  return (
   <div className='settings-container'>
         <div className='subtitle'>Settings</div>
         <div className='settings'>
            <div className='email'>
               <div className="profile-label">email</div>
               <TextField className='field-wrapper'/>
            </div>
            <div className='display-name'>
               <div className="profile-label">display name</div>
               <TextField className='field-wrapper'/>
            </div>
            <div className='password'>
               <div className="profile-label">change password</div>
               <TextField style={{marginRight: '2vw'}} className="password-field" label="enter new password" type="password" />
               <TextField className="password-field" label="confirm password" type="password" />
            </div>
         </div>
         <div className='subtitle'>Saved Recipes</div>
         <div className='savedRecipes'>
         {
            userRecipes.map((item, i) => 
            // this redirects you to specific recipe route with id and favorites in the search params
            <Link href={{
               pathname: `/recipe/`,
               query: { id: item['recipeId'], favorited: userRecipes.some(obj => obj.id === item['id']) },
            }}>
               <div className="recipe-card" key={i}>
               <Image className="card-image" width='200' height='200' src={item['image']}/>
               <div className='card-text'>
                  <div className="recipe-title">{item['title']}</div>
                  <div className='time'>Time: {item['readyInMinutes']} minutes</div>
               </div>
               </div>
            </Link>
            )
         }
      </div>
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

