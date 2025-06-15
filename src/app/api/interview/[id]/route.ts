import { openDb } from "@/src/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getAuthUser } from "@/src/lib/auth";

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

    const interviewId = id;
    const db = await openDb();
    const interview = await db.get(
      `SELECT job_title FROM interviews WHERE id = ? AND user_id = ?`,
      interviewId,
      user.id
    );

    if (!interview) {
      return NextResponse.json(
        { message: "Interview not found" },
        { status: 404 }
      );
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
