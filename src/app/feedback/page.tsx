"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FeedbackSummary from "@/src/components/feedback/FeedbackSummary";
import FeedbackQuestionCard from "@/src/components/feedback/FeedbackQuestionCard";
import { useAuth } from "@/src/lib/contexts/AuthContext";

interface QuestionFeedbackItem {
  question: string;
  user_answer: string;
  feedback: string;
  score: number;
}

interface FeedbackData {
  overallFeedback: string | null;
  overallScore: number | null;
  feedbackResults: QuestionFeedbackItem[];
  jobTitle?: string;
}

export default function FeedbackPage() {
  const router = useRouter();
  const [feedbackData, setFeedbackData] = useState<FeedbackData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const avatarUrl =
    user?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.name || "User"
    )}`;
  const displayName = user?.name || "User";
  const jobTitle = (feedbackData as any)?.jobTitle || "Job Title";

  useEffect(() => {
    const loadFeedback = () => {
      console.log("Attempting to load feedback...");
      const storedFeedback = sessionStorage.getItem("interviewFeedback");
      if (storedFeedback) {
        console.log("Found stored feedback in sessionStorage.");
        try {
          const parsedData = JSON.parse(storedFeedback);
          setFeedbackData(parsedData);
          console.log("Successfully parsed and set feedback data:", parsedData);
        } catch (e) {
          console.error("Error parsing stored feedback:", e);
          setError("Failed to load feedback data. Check console for details.");
        }
      } else {
        console.log("No feedback data found in sessionStorage.");
        setError("No feedback data found. Please complete an interview first.");
      }
      setLoading(false); // Always set loading to false after attempting to load
      console.log("Loading state set to false.");
    };

    loadFeedback();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col items-center justify-center px-4">
        <p>Generating feedback...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col items-center justify-center px-4">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!feedbackData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col items-center justify-center px-4">
        <p>No feedback data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col items-center px-0 py-8">
      <div className="w-full max-w-4xl mx-auto bg-white/90 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6 tracking-tight drop-shadow">
          Interview Feedback
        </h1>
        {feedbackData.overallFeedback && feedbackData.overallScore !== null && (
          <FeedbackSummary
            overallFeedback={feedbackData.overallFeedback}
            overallScore={feedbackData.overallScore}
          />
        )}
        <div className="mb-8">
          {feedbackData.feedbackResults.map((item, idx) => (
            <FeedbackQuestionCard key={idx} index={idx} {...item} />
          ))}
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition-colors"
            onClick={() => router.push("/dashboard")}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
