import mongoose from "mongoose";
const { Schema } = mongoose;

const tokenSchema = new Schema({
  token: String,
  phone: String,
  isAuth: Boolean,
});

export const Token = mongoose.model("Token", tokenSchema);
