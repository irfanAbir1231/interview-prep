import { NextResponse } from "next/server";
import { connectMongo } from "@/src/lib/db";
import mongoose, { Schema, model, models } from "mongoose";

import { cookies } from "next/headers";
import { auth } from "@clerk/nextjs/server";

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

export async function GET(request: Request) {
  try {
    await connectMongo();
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userObjId = userId;
    const interviewsCompleted = await InterviewModel.countDocuments({
      user_id: userObjId,
      status: "Completed",
    });
    const recentActivities = await InterviewModel.find({
      user_id: userObjId,
      status: "Completed",
    })
      .sort({ created_at: -1 })
      .limit(3)
      .lean();
    return NextResponse.json({
      interviewsCompleted,
      codingChallenges: 0,
      behavioralSessions: 0,
      communityPosts: 0,
      recentInterviews: recentActivities.map((activity) => ({
        id: activity._id,
        jobTitle: activity.job_title,
        date: activity.created_at,
      })),
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
