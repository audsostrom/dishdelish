import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import savedRecipe from "@/models/savedRecipes";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};

export async function createUser(email, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    // create new user in database with no saved recipes to start
    await User.create({ email, password: hashedPassword, savedRecipes: [null] });
    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}

export async function getUser(email) {
  try {
    await connectMongoDB();
    // findOne() gives one document that matches the criteria
    const user = await User.findOne({email}, {email: 1, password: 1});
    // console.log("user: ", user);
    const returnVal = user === null ? null : user;
    return returnVal;
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while getting the user." },
      { status: 500 }
    );
  }
}

export async function getSavedRecipes(email) {
  try {
    await connectMongoDB();
    // findOne() gives one document that matches the criteria
    const user = await User.findOne({email}, {email: 1, password: 1, savedRecipes: 1});
    // console.log("user: ", user);
    if (user && user.savedRecipes.length > 0) {
      // get recipes from user that match up with the saved ids of their recipes
      const userRecipes = await savedRecipe.find({ recipeId: { $in: user.savedRecipes } }); //final query
      // console.log("user recipes: ", userRecipes);
      const returnVal = userRecipes === null ? null : userRecipes;
      return returnVal;
    }
    // otherwise no recipes to get :(
    return null;
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while getting the user's saved recipes." },
      { status: 500 }
    );
  }
}

export async function createSavedRecipe(userEmail, recipe, favorited) {

  // don't add a try here, for some reason it gives errors?
    await connectMongoDB();
    const user = await User.findOne({email: userEmail}, {email: 1, password: 1, savedRecipes: 1});
    // console.log(user, user['savedRecipes'])

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
      sourceUrl:  recipe['sourceUrl'],
      image: recipe['image'],
      summary: recipe['summary'],
      cuisines: recipe['cuisines'],
      dishTypes: recipe['dishTypes'],
      instructions: recipe['instructions'],
      diets: recipe['diets'],
      occasions: recipe['occassions'],
      analyzedInstructions: recipe['analyzedInstructions'],
      spoonacularScore: recipe['spoonacularScore'],
      spoonacularSourceUrl: recipe['spoonacularSourceUrl']
    };

    // don't need to add anything if it hasn't been favorited before
    if (favorited == false) {
      await savedRecipe.create(recipeDoc);
      await User.updateOne(
        { email : userEmail },
        { $push: { savedRecipes : recipe['id'] } }
      );
      // uncomment if these console logs if you need to verify
      // const afteruser = await User.findOne({email: userEmail}, {email: 1, password: 1, savedRecipes: 1});
      // console.log('yippee', afteruser);
      return NextResponse.json({ message: "New saved recipe created." }, { status: 201 });

    // (TO DO) add functionality for unsaving recipes
    } else {
      return NextResponse.json({ message: "No updates" }, { status: 200 });

  // no error-checking try-except, breaks everything?
  /**
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while creating the saved recipe." },
      { status: 500 }
    );
  }
   */
  }
}