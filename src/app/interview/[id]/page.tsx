"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// Mock interview questions
const mockQuestions = [
  "Tell me about your experience with React and Next.js.",
  "How do you handle state management in large applications?",
  "Explain the concept of server-side rendering and its benefits.",
  "How do you approach testing in your applications?",
  "What's your experience with TypeScript?",
];

type InterviewState = "idle" | "asking" | "listening" | "finished";

export default function InterviewPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [interviewState, setInterviewState] = useState<InterviewState>("idle");
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");

  // Initialize webcam
  useEffect(() => {
    async function setupWebcam() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        setError("Camera access denied. Please check your permissions.");
      }
    }
    setupWebcam();
  }, []);

  // Handle text-to-speech for questions
  useEffect(() => {
    if (interviewState === "asking" && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(
        mockQuestions[currentQuestionIndex]
      );
      window.speechSynthesis.speak(utterance);

      utterance.onend = () => {
        setInterviewState("listening");
      };
    }
  }, [interviewState, currentQuestionIndex]);

  // Handle speech recognition
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      setError("Speech recognition is not supported in your browser.");
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: unknown) => (result as SpeechRecognitionResult)[0])
        .map((result) => result.transcript)
        .join("");
      setTranscript(transcript);
    };

    recognition.onend = () => {
      if (currentQuestionIndex < mockQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setInterviewState("asking");
      } else {
        setInterviewState("finished");
        router.push("/feedback/123-abc");
      }
    };

    recognition.start();
    setInterviewState("listening");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Interview Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Technical Interview Session
            </h1>
            <span className="text-sm font-medium text-gray-500">
              Question {currentQuestionIndex + 1} of {mockQuestions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / mockQuestions.length) * 100
                }%`,
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - AI Agent */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-full aspect-video rounded-2xl shadow-lg flex items-center justify-center">
              <div className="text-center">
                <span className="text-white text-xl font-medium">
                  AI Interviewer
                </span>
                <div className="mt-2">
                  {interviewState === "asking" && (
                    <div className="flex items-center justify-center space-x-2">
                      <div
                        className="w-2 h-2 bg-white rounded-full animate-bounce"
                        style={{ animationDelay: "0s" }}
                      />
                      <div
                        className="w-2 h-2 bg-white rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="w-2 h-2 bg-white rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Current Question:
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {mockQuestions[currentQuestionIndex]}
              </p>
            </div>
          </div>

          {/* Right Column - User */}
          <div className="space-y-6">
            {error ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
                <div className="flex items-center">
                  <svg
                    className="h-6 w-6 text-red-500 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            ) : (
              <>
                <div className="relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full aspect-video rounded-2xl bg-black shadow-lg"
                  />
                  {interviewState === "listening" && (
                    <div className="absolute top-4 right-4 flex items-center space-x-2 bg-black bg-opacity-50 rounded-full px-4 py-2">
                      <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-white text-sm font-medium">
                        Recording
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() =>
                      interviewState === "idle" && setInterviewState("asking")
                    }
                    disabled={interviewState !== "idle"}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      interviewState === "idle"
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Start Interview
                  </button>
                  <button
                    onClick={startListening}
                    disabled={
                      interviewState !== "listening" ||
                      currentQuestionIndex >= mockQuestions.length
                    }
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      interviewState === "listening"
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Start Recording
                  </button>
                </div>
                {transcript && (
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Your Answer:
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {transcript}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
