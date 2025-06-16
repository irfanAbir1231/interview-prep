import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectMongo } from "@/src/lib/db";
import mongoose from "mongoose";
import InterviewModel from "@/src/lib/models/interview";

export async function POST(request: Request) {
  try {
    await connectMongo();
    const { userId } = await auth();
    console.log("Auth userId:", userId, "Type:", typeof userId);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { jobTitle, jobDescription, techExpertise, yearsOfExperience } =
      await request.json();
    if (!jobTitle) {
      return NextResponse.json(
        { error: "Job title is required" },
        { status: 400 }
      );
    } // Ensure userId is a string
    const interview = await InterviewModel.create({
      user_id: String(userId),
      job_title: jobTitle,
      job_description: jobDescription,
      tech_expertise: techExpertise,
      years_experience: yearsOfExperience,
      status: "In Progress",
    });
    return NextResponse.json({ interviewId: interview._id });
  } catch (error) {
    console.error("Error creating interview:", error);
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        {
          error: "Invalid data provided",
          details: (error as mongoose.Error.ValidationError).errors,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create interview" },
      { status: 500 }
    );
  }
}
