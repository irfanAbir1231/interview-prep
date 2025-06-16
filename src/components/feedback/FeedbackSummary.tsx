import React from "react";
import ReactMarkdown from "react-markdown";

interface FeedbackSummaryProps {
  overallFeedback: string;
  overallScore: number;
}

const circleSize = 80;
const strokeWidth = 8;
const radius = (circleSize - strokeWidth) / 2;
const circumference = 2 * Math.PI * radius;

export default function FeedbackSummary({
  overallFeedback,
  overallScore,
}: FeedbackSummaryProps) {
  const progress = Math.max(0, Math.min(10, overallScore));
  const offset = circumference - (progress / 10) * circumference;

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 bg-gradient-to-br from-blue-100/80 to-purple-100/80 p-8 rounded-3xl shadow-2xl border-2 border-blue-200 mb-8 animate-fade-in">
      <div className="flex-shrink-0 flex flex-col items-center">
        <svg
          width={circleSize}
          height={circleSize}
          className="mb-2 drop-shadow-lg"
        >
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            stroke="#e0e7ff"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            stroke="#6366f1"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 0.6s cubic-bezier(.4,2,.6,1)",
            }}
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".3em"
            fontSize="1.5rem"
            className="fill-blue-700 font-bold"
          >
            {progress.toFixed(1)}
          </text>
        </svg>
        <span className="text-xs text-blue-600 font-semibold">Score / 10</span>
      </div>
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-blue-800 mb-3 flex items-center gap-2">
          <span role="img" aria-label="summary">
            📝
          </span>{" "}
          Overall Summary
        </h3>
        <div className="prose prose-blue max-w-none text-blue-800">
          <ReactMarkdown>{overallFeedback}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
