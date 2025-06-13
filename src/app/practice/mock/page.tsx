import Link from "next/link";

export default function MockInterviewPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100 py-12 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
          Mock Interview
        </h1>
        <p className="text-gray-600 mb-8">
          Practice real interview questions in a timed, realistic environment.
          Sharpen your skills and boost your confidence before the real thing.
        </p>
        <Link
          href="/practice/mock/start"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md"
        >
          Start Mock Interview
        </Link>
      </div>
    </div>
  );
}
