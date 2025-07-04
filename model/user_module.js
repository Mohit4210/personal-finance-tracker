import mongoose from "mongoose";

const authSchema = mongoose.Schema({
  username: { type: String,  unique: true },
  password: { type: String, required: true },
  email: { type: String, unique: true }
});

export const Authentication = mongoose.model("authentication", authSchema);