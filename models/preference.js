import mongoose, { Schema, models } from "mongoose";

const preferenceSchema = new Schema(
  {
    ingredients: {
      type: [String],
      required: true,
    },
    diets: {
      type: [String],
      required: true,
    },
    cuisine: {
      type: [String],
      required: true,
    },
    intolerances: {
      type: [String],
      required: true,
    }
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;