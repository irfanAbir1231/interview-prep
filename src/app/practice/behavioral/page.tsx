"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// Dummy data for behavioral questions
const questions = [
  {
    id: 1,
    question: "Tell me about a time you faced a challenge at work.",
    hint: "Focus on STAR: Situation, Task, Action, Result.",
  },
  {
    id: 2,
    question: "Describe a situation where you showed leadership.",
    hint: "Highlight initiative and impact.",
  },
  {
    id: 3,
    question: "How do you handle tight deadlines?",
    hint: "Mention prioritization and communication.",
  },
];

// Inline QuestionCard component (could be moved to components/ui if reused)
function QuestionCard({ question, hint }: { question: string; hint: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white/80 border border-gray-200 rounded-2xl shadow-md p-6 mb-6 transition-all hover:shadow-xl focus-within:ring-2 focus-within:ring-blue-400 outline-none"
      tabIndex={0}
      aria-label={question}
    >
      <div className="text-lg font-semibold text-gray-900 mb-2">{question}</div>
      <div className="text-sm text-gray-500">{hint}</div>
    </motion.div>
  );
}

export default function BehavioralQuestionsPage() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 py-12 px-4">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 drop-shadow-sm">
          Behavioral Questions
        </h1>
        <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto">
          Practice answering common behavioral interview questions. Click a card
          to focus, use hints to structure your answers.
        </p>
        <section aria-label="Behavioral Questions List">
          {questions.map((q) => (
            <div key={q.id} onClick={() => setActive(q.id)}>
              <QuestionCard question={q.question} hint={q.hint} />
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
