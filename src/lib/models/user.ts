import { connectMongo } from "../db";
import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  _id: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  title: String,
  location: String,
  bio: String,
  avatar: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

UserSchema.pre("save", function (next) {
  this.updated_at = new Date();
  next();
});

const UserModel = models.User || model("User", UserSchema);

export async function createUser(userData) {
  await connectMongo();
  const user = new UserModel({ ...userData, _id: userData.id });
  await user.save();
  const obj = user.toObject();
  return obj;
}

export async function getUserByEmail(email) {
  await connectMongo();
  return UserModel.findOne({ email }).lean();
}

export async function getUserById(id: string) {
  await connectMongo();
  return UserModel.findById(id).lean();
}

export async function updateUser(id: string, userData) {
  await connectMongo();
  const update = { ...userData, updated_at: new Date() };
  return UserModel.findByIdAndUpdate(id, update, {
    new: true,
  }).lean();
}
