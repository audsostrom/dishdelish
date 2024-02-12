
import RecipePicture from '../../assets/pineapple.jpg';
import Image from 'next/image';

function RecipeCard() {

   const info = {
      name: 'Ratatouille',
      stars: 4,
      time: '20 minutes',
   }

   return (
     <div className="recipe-card-container">
       <Image width='290' height='290' src={RecipePicture}></Image>
       <div className="description">
         <div className="recipe-name">{info['name']}</div>
         <div className="recipe-time">{info['time']}</div>
         <div className="reviews">{info['stars']}</div>
       </div>

     </div>
   );
 }
 
 export default RecipeCard;