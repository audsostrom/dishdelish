"use server";
export async function getRecipeFromModel(inputs, data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/flax-community/t5-recipe-generation",
		{
			headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_KEY}` },
			method: "POST",
			body: JSON.stringify(data),
		}
	);

	const result = await response.json();
   const results = await result[0]['generated_text']
   const title = results.split('title: ')[1].split(' ingredients:')[0]
   const directions = results.split('ingredients: ')[1].split('directions: ')[1].split('. ')
   const ingredients = results.split(' ingredients: ')[1].split(' directions: ')[0]
   const parsedIngredients = parseIngredients(inputs, ingredients)
   console.log([title, parsedIngredients, directions])
   return [title, parsedIngredients, directions]

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