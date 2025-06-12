export type Interview = {
  id: string;
  jobTitle: string;
  date: string;
  status: 'Completed' | 'In Progress';
};

export type Feedback = {
  interviewId: string;
  overallScore: number;
  summary: string;
  questionBreakdown: Array<{
    question: string;
    userAnswer: string;
    feedback: string;
  }>;
};