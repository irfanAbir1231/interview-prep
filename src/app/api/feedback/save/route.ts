import { NextResponse } from "next/server";
import { connectMongo } from "@/src/lib/db";
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import mongoose, { Schema, model, models } from "mongoose";

const FeedbackSchema = new Schema({
  interviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Interview",
    required: true,
  },
  userId: { type: String, ref: "User", required: true },
  jobTitle: String,
  overallFeedback: String,
  overallScore: Number,
  feedbackResults: [
    {
      question: String,
      userAnswer: String,
      feedback: String,
      score: Number,
    },
  ],
  created_at: { type: Date, default: Date.now },
});
const FeedbackModel = models.Feedback || model("Feedback", FeedbackSchema);

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

export async function POST(request: Request) {
  try {
    await connectMongo();
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { interviewId, feedbackResults, jobTitle } = await request.json();
    if (!interviewId || !feedbackResults) {
      return NextResponse.json(
        { error: "Interview ID and feedback results are required" },
        { status: 400 }
      );
    }
    const totalScore = feedbackResults.reduce(
      (sum, item) => sum + item.score,
      0
    );
    const overallScore =
      feedbackResults.length > 0
        ? Math.round(totalScore / feedbackResults.length)
        : 0;
    const summary = feedbackResults.map((item) => item.feedback).join("\n\n");
    const feedbackDoc = await FeedbackModel.create({
      interviewId,
      userId: userId,
      jobTitle,
      overallFeedback: summary,
      overallScore,
      feedbackResults,
    });
    await InterviewModel.findByIdAndUpdate(interviewId, {
      status: "Completed",
      job_title: jobTitle,
    });
    return NextResponse.json({ feedbackId: feedbackDoc._id });
  } catch (error) {
    console.error("Error saving feedback:", error);
    return NextResponse.json(
      { error: "Failed to save feedback" },
      { status: 500 }
    );
  }
}
