import React from "react";
import ReactMarkdown from "react-markdown";

interface FeedbackQuestionCardProps {
  question: string;
  user_answer: string;
  feedback: string;
  score: number;
  index: number;
}

export default function FeedbackQuestionCard({
  question,
  user_answer,
  feedback,
  score,
  index,
}: FeedbackQuestionCardProps) {
  return (
    <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-purple-800 p-6 rounded-2xl shadow-2xl border-2 border-blue-900 transition-transform hover:scale-[1.02] flex flex-col gap-3 mb-8 animate-fade-in">
      <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
        <span className="inline-block bg-blue-300 text-blue-900 rounded-full px-3 py-1 text-xs font-bold mr-2 shadow">
          Q{index + 1}
        </span>
        {question}
      </h3>
      <div className="flex items-center gap-2 text-blue-100 mb-1">
        <span role="img" aria-label="user">
          🙋‍♂️
        </span>
        <span className="font-medium">Your Answer:</span>
        <span className="ml-1 prose prose-invert max-w-none">
          <ReactMarkdown>{user_answer}</ReactMarkdown>
        </span>
      </div>
      <div className="flex items-center gap-2 text-blue-100 mb-2">
        <span role="img" aria-label="feedback">
          💡
        </span>
        <span className="font-medium">Feedback:</span>
        <span className="ml-1 prose prose-invert max-w-none">
          <ReactMarkdown>{feedback}</ReactMarkdown>
        </span>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <span className="inline-block w-8 h-8 bg-green-300 text-green-900 rounded-full flex items-center justify-center font-extrabold text-base shadow">
          {score}
        </span>
        <span className="text-sm text-blue-200">/ 10</span>
      </div>
    </div>
  );
}
