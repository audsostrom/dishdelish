import Link from 'next/link';
import { redirect } from 'next/navigation';
import './recipe-transformer.css';

async function query(data) {
   "use server";
	const response = await fetch(
		"https://api-inference.huggingface.co/models/flax-community/t5-recipe-generation",
		{
			headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_KEY}` },
			method: "POST",
			body: JSON.stringify(data),
		}
	);

	const result = await response.json();
	return result;
}

function parseIngredients(inputs, ingredients) {
   const inputLength = inputs.length
   let returnVal = []
   let ingredients_list = ingredients.split(`${inputs[0]} `)
   returnVal.push(ingredients_list[0] + `${inputs[0]}`)
   for (let i = 1; i < inputLength; i++) {
      ingredients_list = ingredients_list[1].split(`${inputs[i]} `)
      if (i == inputLength - 1) {
         returnVal.push(ingredients_list[0])
      } else {
         returnVal.push(ingredients_list[0] + `${inputs[i]}`)
      }
   }
   return returnVal;

}

export default async function Transformer() {
   const inputs = ['provolone cheese', 'bacon', 'spinach', 'onion']
   let results = await query({"inputs": "provolone cheese, bacon, spinach, onion"})
   console.log(results)
   const title = results[0]['generated_text'].split('title: ')[1].split(' ingredients:')[0]
   const directions = results[0]['generated_text'].split('ingredients: ')[1].split('directions: ')[1].split('. ')
   const ingredients = results[0]['generated_text'].split(' ingredients: ')[1].split(' directions: ')[0]
   console.log(title)
   console.log(directions)
   console.log(ingredients)

   const myResults = parseIngredients(inputs, ingredients)
   console.log('hey', myResults)

  return (
    <div className="transformer-container">
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
  );
}
