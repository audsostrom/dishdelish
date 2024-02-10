import mongoose, { Schema, models } from "mongoose";

const savedRecipeSchema = new Schema(
  {
    recipeId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
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
      type: Object,
    },
    cheap: {
      type: Boolean,
    },
    creditsText: {
      type: Boolean,
    },
    cuisines: {
      type: [String],
    },
    dairyFree: {
      type: Boolean,
    },
    diets: {
      type: 
  },
  { timestamps: true }
);

const savedRecipe = models.savedRecipe || mongoose.model("savedRecipe", savedRecipeSchema);
export default savedRecipe;