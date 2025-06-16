import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { auth } from "@clerk/nextjs/server";
import { connectMongo } from "@/src/lib/db";
import mongoose, { Schema, model, models } from "mongoose";

const InterviewSchema = new Schema({
  user_id: {
    type: String,
    ref: "User",
    required: true,
  },
  job_title: String,
  job_description: String,
  tech_expertise: String,
  years_experience: Number,
  status: { type: String, default: "In Progress" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
const InterviewModel = models.Interview || model("Interview", InterviewSchema);

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongo();
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const awaitedParams = await params;
    const interviewId = new mongoose.Types.ObjectId(awaitedParams.id);
    console.log("Querying interview:", { _id: interviewId });
    const interview = await InterviewModel.findById(interviewId).lean();
    console.log("Found interview:", interview);
    if (!interview) {
      return NextResponse.json(
        { message: "Interview not found" },
        { status: 404 }
      );
    }
    if (interview.user_id !== userId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
    return NextResponse.json({ jobTitle: interview.job_title });
  } catch (error) {
    console.error("Error fetching interview details:", error);
    return NextResponse.json(
      { error: "Failed to fetch interview details" },
      { status: 500 }
    );
  }
}
