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

    const SpeechRecognition =
      (window as any).webkitSpeechRecognition;
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
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - AI Agent */}
        <div className="space-y-6">
          <div className="bg-gray-200 w-full aspect-video rounded-lg flex items-center justify-center">
            <span className="text-gray-600">AI Interviewer</span>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Current Question:</h2>
            <p>{mockQuestions[currentQuestionIndex]}</p>
          </div>
        </div>

        {/* Right Column - User */}
        <div className="space-y-6">
          {error ? (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full aspect-video rounded-lg bg-black"
              />
              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    interviewState === "idle" && setInterviewState("asking")
                  }
                  disabled={interviewState !== "idle"}
                >
                  Start Interview
                </button>
                <button
                  onClick={startListening}
                  disabled={
                    interviewState !== "listening" || currentQuestionIndex >= mockQuestions.length
                  }
                >
                  Start Recording
                </button>
                {interviewState === "listening" && (
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                )}
              </div>
              {transcript && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Your Answer:</h3>
                  <p>{transcript}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}