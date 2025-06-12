import { NextResponse } from 'next/server';
interface Feedback {
  interviewId: string;
  overallScore: number;
  summary: string;
  questionBreakdown: {
    question: string;
    userAnswer: string;
    feedback: string;
  }[];
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const feedback: Feedback = {
    interviewId: params.id,
    overallScore: 85,
    summary: 'Strong technical knowledge demonstrated. Some areas for improvement in system design explanations.',
    questionBreakdown: [
      {
        question: 'Explain the concept of React hooks and their advantages.',
        userAnswer: 'React hooks are functions that allow us to use state and lifecycle features in functional components. They eliminate the need for class components and make code more reusable.',
        feedback: 'Good explanation of hooks. Consider adding specific examples of commonly used hooks like useState and useEffect.'
      },
      {
        question: 'Design a scalable chat application system.',
        userAnswer: 'Would use WebSocket for real-time communication, Redis for message caching, and a database for message persistence.',
        feedback: 'Basic approach is correct. Could improve by discussing load balancing and handling offline messages.'
      }
    ]
  };

  return NextResponse.json(feedback);
}