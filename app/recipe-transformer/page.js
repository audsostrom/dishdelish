"use client";
import Link from 'next/link';
import { redirect } from 'next/navigation';
import './recipe-transformer.css';
import { getRecipeFromModel } from './model-handler';
import { useState } from 'react';



export default function Transformer() {
   const inputs = ['provolone cheese', 'bacon', 'spinach', 'onion'];
   const params = {"inputs": "provolone cheese, bacon, spinach, onion"};
   const [recipe, setRecipe] = useState([]);
   console.log(recipe)
   async function getResults(inputs, params) {
   const results = await getRecipeFromModel(inputs, params);
   console.log(results)
   setRecipe(results)
}

   /**
    * 
      
      <div>Title:</div>
      <div>{title}</div>
      <div>Ingredients:</div>
      {
         myResults.map((item, i) => 
         // this redirects you to specific recipe
            <div className="ingredient" key={i}>
               <div>{i+1}. {item}</div>
            </div>
         )
      }
      <div>Directions:</div>
      {
         directions.map((item, i) => 
         // this redirects you to specific recipe
            <div className="step" key={i}>
               <div>{i+1}. {item}</div>
            </div>
         )
      }
    </div>
    */

  return (
    <div className="transformer-container">
        <button className="button" onClick={() => getResults(inputs, params)}>Submit!</button>
        {
         recipe[1]?.map((item, i) => 
         // this redirects you to specific recipe
            <div className="ingredient" key={i}>
               <div>{i+1}. {item}</div>
            </div>
         )
        }
    </div>
  );
}

/**
 *         <div>
        {recipe?.map((category, i) => {
                return <div key={i}>
                    <h1>Section</h1>
                    {recipe[i]?.map((item, j) => {
                        return <span key={index}>item</span>
                    })}
                </div>
         })}
        </div>
 */
