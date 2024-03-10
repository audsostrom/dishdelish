"use server";

/**
 * The function `getRecipeFromModel` sends a POST request to a Hugging Face model for recipe
 * generation, processes the response to extract recipe title, ingredients, and directions, and returns
 * them as an array.
 * @param {Array} inputs - All ingredients listed in string form
 * @param {Object} data - Object of inputs/ingredients to be given to the model
 * @returns {Array} - Returns an array containing the title of the recipe, parsed ingredients, and directions of the recipe.
 */
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
	console.log('result', result)
	const results = await result[0]['generated_text']
	const title = results.split('title: ')[1].split(' ingredients:')[0]
	const directions = results.split('ingredients: ')[1].split('directions: ')[1].split('. ')
	const ingredients = results.split(' ingredients: ')[1].split(' directions: ')[0]
	const parsedIngredients = parseIngredients(inputs, ingredients)
	console.log([title, parsedIngredients, directions])
	return [title, parsedIngredients, directions]

}

/**
 * The function `parseIngredients` takes an array of inputs and a string of ingredients, parses the
 * ingredients based on the inputs, and returns a modified list of ingredients.
 * @param inputs - 
 * @param ingredients - 
 * @returns The function `parseIngredients` is returning an array `returnVal` which contains the parsed
 * ingredients based on the inputs provided. The function splits the `ingredients` string based on the
 * input values in the `inputs` array and constructs a new array `returnVal` with the parsed
 * ingredients.
 */
function parseIngredients(inputs, ingredients) {
	const inputLength = inputs.length
	let returnVal = []
	let ingredients_list = ingredients.split(`${inputs[0]} `)
	returnVal.push(ingredients_list[0] + `${inputs[0]}`)
	for (let i = 1; i < inputLength; i++) {
		try {
			ingredients_list = ingredients_list[1].split(`${inputs[i]} `)
			if (ingredients_list.length == 1) {
				ingredients_list = ingredients_list[0].split(`${inputs[i]}, `)
				const index = ingredients_list[1].search(/\d/)
				ingredients_list[1] = ingredients_list[1].substring(index)
			}
		}
		catch (err) {
			console.log('Some error occured', err)
		}
		if (i == inputLength - 1 && ingredients_list.length == 1) {
			returnVal.push(ingredients_list[0])
		} else {
			returnVal.push(ingredients_list[0] + `${inputs[i]}`)
		}
	}
	return returnVal;
}