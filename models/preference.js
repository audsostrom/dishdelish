import mongoose, { Schema, models } from "mongoose";

const preferenceSchema = new Schema(
  {
    ingredients: {
      type: [String],
      required: true,
    },
    diets: {
      type: [String],
    },
    cuisine: {
      type: [String],
    },
    intolerances: {
      type: [String],
    }
  },
  { timestamps: true }
);

const Preference = models.Preference || mongoose.model("Preference", preferenceSchema);
export default Preference;