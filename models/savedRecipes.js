import mongoose, { Schema, models } from "mongoose";


// excluded weightwatcher smart points, gaps and wine pairings
const savedRecipeSchema = new Schema(
  {
    recipeId: {
      type: Number,
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
      type: Number,
    },
    readyInMinutes: {
      type: Number,
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
      type: Number,
    },
    spoonacularScore: {
      type: Number,
    },
    pricePerServing: {
      type: Number,
    },
    analyzedInstructions: {
      type: Array,
    },
    cheap: {
      type: Boolean,
    },
    creditsText: {
      type: String,
    },
    cuisines: {
      type: Array,
    },
    dairyFree: {
      type: Boolean,
    },
    diets: {
      type: Array,
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
      type: Array,
    },
    extendedIngredients: {
      type: Array,
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