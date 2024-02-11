import { Double, Int32 } from "mongodb";
import mongoose, { Schema, models } from "mongoose";

// excluded weightwatcher smart points, gaps and wine pairings
const savedRecipeSchema = new Schema(
  {
    recipeId: {
      type: Int32,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    vegetarian: {
      type: Boolean,
    },
    vegan: {
      type: Boolean,
    },
    image: {
      type: String, // not required?
    },
    servings: {
      type: Int32,
    },
    readyInMinutes: {
      type: Int32,
    },
    license: {
      type: String,
    },
    sourceName: {
      type: String,
    },
    sourceUrl: {
      type: String,
    },
    spoonacularSourceUrl: {
      type: String,
    },
    healthScore: {
      type: Int32,
    },
    spoonacularScore: {
      type: Int32,
    },
    pricePerServing: {
      type: Double,
    },
    analyzedInstructions: {
      type: Array[Object],
    },
    cheap: {
      type: Boolean,
    },
    creditsText: {
      type: String,
    },
    cuisines: {
      type: [String],
    },
    dairyFree: {
      type: Boolean,
    },
    diets: {
      type: [String],
    },
    glutenFree: {
      type: Boolean,
    },
    ketogenic: {
      type: Boolean,
    },
    veryHealthy: {
      type: Boolean,
    },
    sustainable: {
      type: Boolean,
    },
    instructions: {
      type: String,
      required: true,
    },
    dishTypes: {
      type: [String],
    },
    extendedIngredients: {
      type: [Object],
    },
    summary: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const savedRecipe = models.savedRecipe || mongoose.model("savedRecipe", savedRecipeSchema);
export default savedRecipe;