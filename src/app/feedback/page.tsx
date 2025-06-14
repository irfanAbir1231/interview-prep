"use client";
import React from "react";
import { useRouter } from "next/navigation";

const mockFeedback = {
  strengths: [
    "Strong understanding of React and Next.js",
    "Good knowledge of TypeScript",
    "Clear explanation of server-side rendering",
  ],
  improvements: [
    "Practice more on state management patterns",
    "Improve testing strategies for large-scale apps",
  ],
};

export default function FeedbackPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Interview Feedback
        </h1>
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            You did well in:
          </h2>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            {mockFeedback.strengths.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-red-700 mb-2">
            You should prepare more on:
          </h2>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            {mockFeedback.improvements.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
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
