"use client";
import React from "react";
import { Briefcase, Code, Users, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const stats = [
  {
    label: "Interviews Completed",
    value: 12,
    icon: Briefcase,
    color: "text-blue-500",
  },
  {
    label: "Coding Challenges",
    value: 34,
    icon: Code,
    color: "text-purple-500",
  },
  {
    label: "Behavioral Sessions",
    value: 7,
    icon: Users,
    color: "text-pink-500",
  },
  {
    label: "Community Posts",
    value: 19,
    icon: MessageCircle,
    color: "text-green-500",
  },
];

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-7xl relative">
        <div className="flex justify-end items-center mb-10">
          {/* Avatar dropdown removed, now handled globally in layout */}
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 tracking-tight">
          Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border border-gray-100 hover:shadow-2xl transition-all group relative overflow-hidden"
            >
              <div
                className={`absolute -top-6 -right-6 opacity-10 text-8xl pointer-events-none select-none ${stat.color}`}
              >
                <stat.icon className="w-24 h-24" />
              </div>
              <div className={`mb-3 z-10 ${stat.color}`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1 z-10">
                {stat.value}
              </div>
              <div className="text-gray-500 text-base font-medium text-center z-10">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Recent Activity
            </h2>
            <ul className="divide-y divide-gray-100">
              <li className="py-4 flex items-center justify-between">
                <span className="text-gray-700 font-medium">
                  Completed Mock Interview
                </span>
                <span className="text-xs text-gray-400">2 hours ago</span>
              </li>
              <li className="py-4 flex items-center justify-between">
                <span className="text-gray-700 font-medium">
                  Solved Coding Challenge
                </span>
                <span className="text-xs text-gray-400">1 day ago</span>
              </li>
              <li className="py-4 flex items-center justify-between">
                <span className="text-gray-700 font-medium">
                  Joined Community Discussion
                </span>
                <span className="text-xs text-gray-400">3 days ago</span>
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 flex flex-col justify-between">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Quick Links
            </h2>
            <ul className="space-y-4">
              <li>
                <a
                  href="/practice"
                  className="flex items-center gap-2 text-blue-600 hover:underline font-medium transition-colors hover:text-blue-800"
                >
                  <Code className="w-5 h-5" /> Practice Coding
                </a>
              </li>
              <li>
                <a
                  href="/practice/mock"
                  className="flex items-center gap-2 text-blue-600 hover:underline font-medium transition-colors hover:text-blue-800"
                >
                  <Briefcase className="w-5 h-5" /> Mock Interviews
                </a>
              </li>
              <li>
                <a
                  href="/community/discussions"
                  className="flex items-center gap-2 text-blue-600 hover:underline font-medium transition-colors hover:text-blue-800"
                >
                  <MessageCircle className="w-5 h-5" /> Community Discussions
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
}
