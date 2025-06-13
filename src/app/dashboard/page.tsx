import React from "react";

const stats = [
  { label: "Interviews Completed", value: 12 },
  { label: "Coding Challenges", value: 34 },
  { label: "Behavioral Sessions", value: 7 },
  { label: "Community Posts", value: 19 },
];

export default function DashboardPage() {
  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl shadow p-6 flex flex-col items-center border border-gray-100 hover:shadow-lg transition-shadow"
          >
            <div className="text-2xl font-semibold text-blue-600 mb-2">
              {stat.value}
            </div>
            <div className="text-gray-500 text-sm text-center">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Recent Activity
          </h2>
          <ul className="divide-y divide-gray-100">
            <li className="py-3 flex items-center justify-between">
              <span className="text-gray-600">Completed Mock Interview</span>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </li>
            <li className="py-3 flex items-center justify-between">
              <span className="text-gray-600">Solved Coding Challenge</span>
              <span className="text-xs text-gray-400">1 day ago</span>
            </li>
            <li className="py-3 flex items-center justify-between">
              <span className="text-gray-600">Joined Community Discussion</span>
              <span className="text-xs text-gray-400">3 days ago</span>
            </li>
          </ul>
        </div>
        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Quick Links
          </h2>
          <ul className="space-y-3">
            <li>
              <a
                href="/practice"
                className="text-blue-600 hover:underline font-medium"
              >
                Practice Coding
              </a>
            </li>
            <li>
              <a
                href="/practice/mock"
                className="text-blue-600 hover:underline font-medium"
              >
                Mock Interviews
              </a>
            </li>
            <li>
              <a
                href="/community/discussions"
                className="text-blue-600 hover:underline font-medium"
              >
                Community Discussions
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
