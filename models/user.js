import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    savedRecipes: {
      type: [Number],
      required: true,
    },
    savedIngredients: {
      type: [String],
    }
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;