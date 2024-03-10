"use client";
import './recipe-transformer.css';
import { getRecipeFromModel } from './model-handler';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import { CircularProgress } from '@mui/material';
import hgLogo from '../../assets/hf-logo.svg'
import Image from 'next/image';


export default function Transformer() {
   const [recipe, setRecipe] = useState([]);
   const [value, setValue] = useState("");
   let pending = true;

   /** Nested function for handling state updates based on API requests */
   async function getResults(inputs_original) {
      pending = true;
      let inputs;
      let newstring;
      if (inputs_original.split(', ').length > 1) {
         inputs = inputs_original.split(',');
         newstring = inputs_original;
      }
      else {
         inputs = inputs_original.split(',')
         newstring = inputs_original.replaceAll(",", ", ")
      }
      console.log('new', newstring)

      const results = await getRecipeFromModel(inputs, {"inputs": newstring});
      console.log(results)
      pending = false;
      setRecipe(results)
   }

  return (
    <div className="transformer-container">
         <div className='article-title'>Generate New Recipes</div>
         <div className='body-content'>
         <div className='left-side'>
            <textarea placeholder="Type 2-10 ingredients here (make sure it's comma separated!)" className="ingredient-input" data-pattern="/^([a-z0-9\s]+,)*([a-z0-9\s]+){1}$/i" value={value} onChange={e => setValue(e.target.value)} type="text"/>
            <button className="submit-button" onClick={() => getResults(value)}>Submit!</button>
            <div className='instructions'>Ensure your ingredients are inputted correctly, or else you might get unintended results.</div>
            <div className='credits'>
               <span>Powered by Hugging Face!</span>
               <Image alt='HuggingFace Logo' className='hg-logo' height='40' width='40' src={hgLogo}/>
            </div>
         </div>
        <div className='right-side'>
        {(recipe.length == 0) && (
            <div className='waiting-box'>
               <div className='waiting'><i>Awaiting Your Input</i></div>
               <Stack sx={{ color: '#1E5EFF' }} direction="row" justifyContent="center" alignItems="center">
                  <CircularProgress size="3rem" color="inherit"/>
               </Stack>

            </div>
         )}
         <div className='recipe-title'>{recipe[0]?.toUpperCase()}</div>
         {recipe[1] && <div className='section-header'>Ingredients:</div>}
         {
            recipe[1]?.map((item, i) => 
            // this redirects you to specific recipe
               <div className="ingredient" key={i}>
                  <div>{i+1}. {item}</div>
               </div>
            )
         }
         {recipe[2] && <div className='section-header'>Directions:</div>}
         {
            recipe[2]?.map((item, i) => 
            // this redirects you to specific recipe
               <div className="ingredient" key={i}>
                  <div>{i+1}. {item}</div>
               </div>
            )
         }
        </div>

         </div>
    </div>
  );
}

