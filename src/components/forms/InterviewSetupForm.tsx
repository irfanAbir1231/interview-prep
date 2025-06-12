"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";


export function InterviewSetupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    techExpertise: "",
    yearsOfExperience: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In a real app, we'd create an interview session here
    const mockInterviewId = "123-abc";
    router.push(`/interview/${mockInterviewId}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <label htmlFor="jobTitle" className="block text-sm font-medium">
          Job Title
        </label>
        <input
          type="text"
          id="jobTitle"
          value={formData.jobTitle}
          onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
          className="w-full rounded-md border border-gray-300 px-4 py-2"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="jobDescription" className="block text-sm font-medium">
          Job Description
        </label>
        <textarea
          id="jobDescription"
          value={formData.jobDescription}
          onChange={(e) =>
            setFormData({ ...formData, jobDescription: e.target.value })
          }
          rows={4}
          className="w-full rounded-md border border-gray-300 px-4 py-2"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="techExpertise" className="block text-sm font-medium">
          Tech Expertise
        </label>
        <input
          type="text"
          id="techExpertise"
          value={formData.techExpertise}
          onChange={(e) =>
            setFormData({ ...formData, techExpertise: e.target.value })
          }
          className="w-full rounded-md border border-gray-300 px-4 py-2"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="yearsOfExperience" className="block text-sm font-medium">
          Years of Experience
        </label>
        <input
          type="number"
          id="yearsOfExperience"
          value={formData.yearsOfExperience}
          onChange={(e) =>
            setFormData({ ...formData, yearsOfExperience: e.target.value })
          }
          min="0"
          max="50"
          className="w-full rounded-md border border-gray-300 px-4 py-2"
          required
        />
      </div>

      <Button type="submit" size="lg" className="w-full">
        Start Interview
      </Button>
    </form>
  );
}