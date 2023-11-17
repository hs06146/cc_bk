import mongoose from "mongoose";
const { Schema } = mongoose;

const ogSchema = new Schema({
  title: String,
  description: String,
  image: String,
});

const userSchema = new Schema({
  name: String,
  email: String,
  personal: String,
  prefer: String,
  pwd: String,
  phone: String,
  og: ogSchema,
});

export const User = mongoose.model("User", userSchema);
