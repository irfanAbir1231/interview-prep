import { NextResponse, NextRequest } from "next/server";
import { openDb } from "@/src/lib/db";
import { cookies } from "next/headers";
import { getAuthUser } from "@/src/lib/auth";

// Define an explicit interface for the context object
// This leaves no ambiguity for the TypeScript compiler.
interface IContext {
  params: {
    id: string;
  };
}

// In the function signature, we will accept the entire context object
// instead of destructuring it.
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getAuthUser(cookies());

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Access the id from the resolved params object
    const interviewId = id;
    const db = await openDb();

    // Fetch overall feedback for the interview
    const overallFeedback = await db.get(
      `SELECT overall_feedback, overall_score FROM feedbacks WHERE interview_id = ?`,
      interviewId
    );

    // Fetch individual question feedback
    const questionFeedbacks = await db.all(
      `SELECT question, feedback, score FROM question_feedbacks WHERE interview_id = ? ORDER BY id ASC`,
      interviewId
    );

    if (!overallFeedback && questionFeedbacks.length === 0) {
      return NextResponse.json(
        { message: "Feedback not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      overallFeedback: overallFeedback
        ? overallFeedback.overall_feedback
        : null,
      overallScore: overallFeedback ? overallFeedback.overall_score : null,
      feedbackResults: questionFeedbacks.map((qf: any) => ({
        question: qf.question,
        feedback: qf.feedback,
        score: qf.score,
      })),
    });
  } catch (error) {
    console.error("Error fetching feedback details:", error);
    return NextResponse.json(
      { error: "Failed to fetch feedback details" },
      { status: 500 }
    );
  }
}
