import { InterviewSetupForm } from "../../../components/forms/InterviewSetupForm";

export default function NewInterviewPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-8">
        Set Up Your Mock Interview
      </h1>
      <InterviewSetupForm />
    </div>
  );
}