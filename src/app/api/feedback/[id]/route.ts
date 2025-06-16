import { NextRequest, NextResponse } from "next/server";
import { connectMongo } from "@/src/lib/db";
import { cookies } from "next/headers";
import { auth } from "@clerk/nextjs/server";
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

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongo();
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { id } = await context.params;
    const feedback = await FeedbackModel.findOne({ interviewId: id }).lean();
    if (!feedback) {
      return NextResponse.json(
        { message: "Feedback not found" },
        { status: 404 }
      );
    }
    if (feedback.userId !== userId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
    return NextResponse.json({
      overallFeedback: feedback.overallFeedback ?? null,
      overallScore: feedback.overallScore ?? null,
      feedbackResults:
        feedback.feedbackResults?.map((qf) => ({
          question: qf.question,
          feedback: qf.feedback,
          score: qf.score,
        })) ?? [],
    });
  } catch (error) {
    console.error("Error fetching feedback details:", error);
    return NextResponse.json(
      { error: "Failed to fetch feedback details" },
      { status: 500 }
    );
  }
}
