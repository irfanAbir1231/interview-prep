import React from "react";

function CodingChallengeCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/40 flex flex-col gap-2 transition-transform duration-200 hover:scale-105 hover:shadow-2xl hover:bg-white/50">
      <h2 className="text-lg font-bold text-gray-900 drop-shadow-sm">
        {title}
      </h2>
      <p className="text-gray-700 text-sm flex-1">{description}</p>
      <button className="mt-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all text-sm font-semibold self-start focus:outline-none focus:ring-2 focus:ring-blue-400">
        Solve
      </button>
    </div>
  );
}

export default function CodingChallengesPage() {
  // Placeholder data
  const challenges = [
    {
      title: "Two Sum",
      description: "Find two numbers that add up to a target.",
    },
    {
      title: "Reverse Linked List",
      description: "Reverse a singly linked list.",
    },
    {
      title: "Valid Parentheses",
      description: "Check if parentheses are valid.",
    },
    { title: "Merge Intervals", description: "Merge overlapping intervals." },
    { title: "LRU Cache", description: "Design and implement an LRU cache." },
    {
      title: "Binary Search",
      description: "Implement binary search on a sorted array.",
    },
  ];

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-blue-950 to-indigo-900 px-4 py-10">
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg mb-3">
          Coding Challenges
        </h1>
        <p className="text-gray-200 text-lg max-w-2xl mx-auto drop-shadow-sm">
          Sharpen your skills with real interview questions. Pick a challenge
          and start coding!
        </p>
      </header>
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {challenges.map((c, i) => (
            <CodingChallengeCard
              key={i}
              title={c.title}
              description={c.description}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
