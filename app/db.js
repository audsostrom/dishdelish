import User from '@/models/user';
import {NextResponse} from 'next/server';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import savedRecipe from '@/models/savedRecipes';
import Preference from '@/models/preference';
import crypto from 'crypto';
import Token from '@/models/token';


/**
 * The function connects to a MongoDB database
 * using the MONGODB_URI from the environment variables.
 */
export const connectMongoDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log('Connected to MongoDB');
	} catch (error) {
		console.log('Error connecting to MongoDB: ', error);
	}
};


/**
 * This function creates a new user in MongoDB with a hashed password and an
 * initial empty list of saved recipes.
 * @param {String} email -  Email address of the user that is being registered.
 * @param {String} password - Password that the user provides when registering.
 * This password is hashed with bcrypt before being stored for security.
 * @return {NextResponse} – Represents the operation's success (201 or 500).
 */
export async function createUser(email, password) {
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		await connectMongoDB();
		// create new user in database with no saved recipes to start
		await User.create({
			email,
			password: hashedPassword,
			savedRecipes: [],
			savedIngredients: [],
		});
		return NextResponse.json(
			{message: 'User registered.'},
			{status: 201}
		);
	} catch (error) {
		return NextResponse.json(
			{message: 'An error occurred while registering the user.'},
			{status: 500}
		);
	}
}

/**
 * The function retrieves a user's email and password from MongoDB.
 * @param {String} email - Used for getting user from the database.
 * @return {User} - Return either the user object with only the `email` and
 * `password` fields (if found in the database), or `null` if no user with the
 * specified email is found.
 *
 * If an error occurs during the process, a NextResponse with an
 * error message and status code 500 is returned.
 */
export async function getUser(email) {
	try {
		await connectMongoDB();
		// findOne() gives one document that matches the criteria
		const user = await User.findOne(
			{email},
			{email: 1, password: 1}
		);
		const returnVal = user === null ? null : user;
		return returnVal;
	} catch (error) {
		return NextResponse.json(
			{message: 'An error occurred while getting the user.'},
			{status: 500}
		);
	}
}

/**
 * The function `getUserIngredients` retrieves saved ingredients
 * for a user based on their email from MongoDB.
 * @param {String} email - specifies the user (used to query docs)
 * @return {Object} – Returns either the saved ingredients array of
 * a user with the provided email or `null` if no user is found.
 *
 * If an error occurs during the process, a JSON
 * response with an error message is returned with a status code of 500.
 */
export async function getUserIngredients(email) {
	try {
		await connectMongoDB();
		// findOne() gives one document that matches the criteria
		const user = await User.findOne(
			{email},
			{email: 1, savedIngredients: 1}
		);
		console.log(user);
		const returnVal = user === null ? null : user['savedIngredients'];
		return returnVal;
	} catch (error) {
		return NextResponse.json(
			{message: 'An error occurred while getting the saved ingredients.'},
			{status: 500}
		);
	}
}


/**
 * The function `saveIngredients` saves a user's ingredients in MongoDB.
 * @param {String} email - specifies the user (used to query docs)
 * @param {Array} ingredients - Ingredients is an array that contains
 * the list of ingredients that the user wants to save.
 * @return {Object} The `saveIngredients` function is returning a JSON
 * response with a success message if the operation was successful,
 * and an error message if an error occurred.
 */
export async function saveIngredients(email, ingredients) {
	try {
		await connectMongoDB();
		// findOne() gives one document that matches the criteria
		await User.updateOne(
			{email: email},
			{$set: {savedIngredients: ingredients}}
		);
		return NextResponse.json(
			{message: 'Successfully updated saved ingredients.'},
			{status: 200}
		);
	} catch (error) {
		return NextResponse.json(
			{message: 'An error occurred while getting the user.'},
			{status: 500}
		);
	}
}

/**
 * The function generates a reset token for a user's email
 * address and stores it in the database for password reset purposes.
 * @param {String} email - Who the reset token will be emailed to
 * @return {String} - String that was generated as the token
 */
export async function makeResetToken(email) {
	try {
		await connectMongoDB();
		// findOne() gives one document that matches the criteria
		const user = await User.findOne({email});
		const tokenString = crypto.randomBytes(32).toString('hex');
		await Token.create({
			token: tokenString,
			userId: user._id,
			email: email,
			type: 'password-reset',
			expireAt: new Date(Date.now() + 1000 * 60 * 20),
		});
		return tokenString;
	} catch (error) {
		return NextResponse.json(
			{message: 'An error occurred while making a reset token.'},
			{status: 500}
		);
	}
}

/**
 * This function resets a user's password by updating it in the database
 * after hashing the new password.
 * @param {String} email - Tells us which user to update.
 * @param {String} password - Password to be hashed, and later stored.
 * @return {NextResponse} – Represents the operation's success (200 or 500).
 */
export async function resetPassword(email, password) {
	try {
		await connectMongoDB();
		const hashedPassword = await bcrypt.hash(password, 10);

		await User.updateOne(
			{email: email},
			{$set: {password: hashedPassword}}
		);
		return NextResponse.json(
			{message: 'Successfully updated password.'},
			{status: 200}
		);
	} catch (error) {
		return NextResponse.json(
			{message: 'An error occurred while updating the password'},
			{status: 500}
		);
	}
}

/**
 * This function retrieves a token document from MongoDB.
 * @param {String} tokenString - Used for fetching the specific token
 * and its associated user.
 * @return {Object} The function `getToken` is returning either
 * the token document found  that matches the provided `tokenString`,
 * or `null` if no matching document is found.
 *
 * If an error occurs during the process, null is returned
 */
export async function getToken(tokenString) {
	try {
		await connectMongoDB();
		// findOne() gives one document that matches the criteria
		const tokenDoc = await Token.findOne(
			{token: tokenString},
			{_id: 0, email: 1, token: 1, expireAt: 1}
		);
		const returnVal = tokenDoc === null ? null : tokenDoc;
		return returnVal;
	} catch (error) {
		return null;
	}
}

/**
 * This function retrieves a user's saved recipes from MongoDB.
 * @param {String} email - For getting the user.
 * @return {Array} The function `getSavedRecipes` is returning either
 * an array of user recipes that match the saved recipe IDs or
 * `null` if there are no saved recipes for the user.
 *
 * If an error occurs during the process, it will return a NextResponse
 * with an error message and a status code of 500.
 */
export async function getSavedRecipes(email) {
	try {
		await connectMongoDB();
		// findOne() gives one document that matches the criteria
		const user = await User.findOne(
			{email},
			{email: 1, password: 1, savedRecipes: 1}
		);
		if (user && user.savedRecipes.length > 0) {
			// get recipes from user that match up with the saved ids of their recipes
			const userRecipes = await savedRecipe.find(
				{recipeId: {$in: user.savedRecipes}}
			); // final query
			const returnVal = userRecipes === null ? [] : userRecipes;
			return returnVal;
		}
		// otherwise no recipes to get :(
		return [];
	} catch (error) {
		return NextResponse.json(
			{message: 'An error occurred while getting the user\'s saved recipes.'},
			{status: 500}
		);
	}
}

/**
 * The function adds to a user's collection of saved recipes in MongoDB
 * @param {String} userEmail - Email address of the user.
 * @param {Object} recipe - Contains the details about the recipe being saved.
 * @param {Boolean} favorited - Whether the recipe is being favorited or not.
 * @return {NextResponse} – Represents the operation's success (201 or 500).
 */
export async function createSavedRecipe(userEmail, recipe, favorited) {
	await connectMongoDB();

	// transfer over your data for we can store it mongodb appropriately
	const recipeDoc = {
		vegetarian: recipe['vegetarian'],
		vegan: recipe['vegan'],
		glutenFree: recipe['glutenFree'],
		dairyFree: recipe['dairyFree'],
		veryHealthy: recipe['veryHealthy'],
		cheap: recipe['veryHealthy'],
		sustainable: recipe['sustainable'],
		healthScore: recipe['healthScore'],
		creditsText: recipe['creditsText'],
		sourceName: recipe['sourceName'],
		pricePerServing: recipe['pricePerServing'],
		recipeId: recipe['id'],
		title: recipe['title'],
		readyInMinutes: recipe['readyInMinutes'],
		servings: recipe['servings'],
		sourceUrl: recipe['sourceUrl'],
		image: recipe['image'],
		summary: recipe['summary'],
		cuisines: recipe['cuisines'],
		dishTypes: recipe['dishTypes'],
		instructions: recipe['instructions'],
		diets: recipe['diets'],
		occasions: recipe['occassions'],
		analyzedInstructions: recipe['analyzedInstructions'],
		spoonacularScore: recipe['spoonacularScore'],
		spoonacularSourceUrl: recipe['spoonacularSourceUrl'],
	};
	// don't need to add anything if it hasn't been favorited before
	if (favorited == false) {
		const existingRecipe = await savedRecipe.findOne({recipeId: recipe['id']});
		if (!existingRecipe) {
			await savedRecipe.create(recipeDoc);
		}
		await User.updateOne(
			{email: userEmail},
			{$push: {savedRecipes: recipe['id']}}
		);
		return NextResponse.json(
			{message: 'New saved recipe created.'},
			{status: 201}
		);
		// (TO DO) add functionality for unsaving recipes
	} else {
		await User.updateOne(
			{email: userEmail},
			{$pull: {savedRecipes: recipe['id']}}
		);
		return NextResponse.json({message: 'Removed saved recipe'}, {status: 200});
	}
}

/**
 * The function saves user preferences, such as ingredients, diets, cuisine, and
 * intolerances in MongoDB.
 * @param {Array} ingredients - What ingredients a user has.
 * @return {Object} - Returns the `preference` object created in the database.
 */
export async function savePreferences(ingredients) {
	try {
		await connectMongoDB();
		// create new user in database with no saved recipes to start
		const preference = await Preference.create({
			ingredients: ingredients,
			diets: [],
			diets: [],
			cuisine: [],
			intolerances: [],
		});
		console.log(preference._id.toString());
		return preference;
	} catch (error) {
		return NextResponse.json(
			{message: 'An error occurred while registering the user.'},
			{status: 500}
		);
	}
}

/**
 * The function `updatePreferences` updates user preferences in MongoDB.
 * @param {String} id - Represents the unique identifier of the preference
 * document that you want to update in the database.
 * @param {Array} diets - What diets that user wants
 * @param {Array} intolerances - What allergies the user has
 * @param {Array} cuisines - What cuisines the user wants
 * @return {Object} The function `updatePreferences` is returning
 * the updated preference object if the update was successful,
 * or `null` if no preference was found with the provided id.
 *
 * If an error occurs during the update process, a NextResponse with an
 * error message and status code 500 is returned.
 */
export async function updatePreferences(id, diets, intolerances, cuisines) {
	try {
		await connectMongoDB();
		// findOne() gives one document that matches the criteria
		const preference = await Preference.updateOne({_id: id},
			{$set: {diets: diets, cuisine: cuisines, intolerances: intolerances}}
		);
		console.log('preference', preference);
		const returnVal = preference === null ? null : preference;

		return returnVal;
	} catch (error) {
		return NextResponse.json(
			{message: 'An error occurred while getting the person\'s p.'},
			{status: 500}
		);
	}
}

/**
 * The function `getPreferences` retrieves user preferences from MongoDB
 * @param {String} id - Specifies the unique identifier of the preference
 * document that you want to retrieve from the database.
 * @return {Object} - The preference document if found,
 * or `null` if no matching document is found.
 */
export async function getPreferences(id) {
	try {
		await connectMongoDB();
		const preference = await Preference.findOne(
			{_id: id},
			{ingredients: 1, diets: 1, cuisine: 1, intolerances: 1}
		);
		const returnVal = preference === null ? null : preference;
		return returnVal;
	} catch (error) {
		return NextResponse.json(
			{message: 'An error occurred while getting the person\'s preferences.'},
			{status: 500}
		);
	}
}
