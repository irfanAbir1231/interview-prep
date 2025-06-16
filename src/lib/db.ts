import mongoose from "mongoose";

let conn: typeof mongoose | null = null;

export async function connectMongo() {
  if (conn) return conn;
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI not set");
  conn = await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB || "interview-prep",
  });
  return conn;
}
