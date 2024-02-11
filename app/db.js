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
    // const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
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
    console.log("user: ", user);
    const returnVal = user === null ? null : user;
    return returnVal;
  } catch (error) {
    console.log('huh', error);
  }
}

export async function getSavedRecipes(email) {
  try {
    await connectMongoDB();
    // findOne() gives one document that matches the criteria
    const user = await User.findOne({email}, {email: 1, password: 1, savedRecipes: 1});
    console.log("user: ", user);
    if (user && user.savedRecipes.length > 0) {
      // get recipes from user that match up with the saved ids of their recipes
      const userRecipes = await savedRecipe.find({ recipeId: { $in: user.savedRecipes } }); //final query
      console.log("user recipes: ", userRecipes);
      const returnVal = userRecipes === null ? null : userRecipes;
      return returnVal;
    }
    // otherwise no recipes to get :(
    return null;
  } catch (error) {
    console.log('huh', error);
  }
}