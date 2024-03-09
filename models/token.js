import { Timestamp } from "mongodb";
import mongoose, { Schema, models } from "mongoose";

const tokenSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    expirationDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Token = models.Token || mongoose.model("Token", tokenSchema);
export default Token;