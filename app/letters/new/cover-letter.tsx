"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import SignInNav from "@/components/custom/signin-nav";
import { BACKEND_URL } from "@/lib/consts";

export default function NewCoverLetterPage({ userId }: { userId: string }) {
  const [jobDescription, setJobDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [letterId, setLetterId] = useState("");
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      setError("Please enter a job description");
      return;
    }

    setError("");
    setIsGenerating(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/letters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          letter: { title: jobTitle, job_description: jobDescription },
          user_id: userId,
        }),
      });

      const data = await res.json();
      setLetterId(data.letter.id);
    } catch (err) {
      console.error("Error generating cover letter:", err);
      setError("Failed to generate cover letter. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SignInNav />

      <main className="flex-grow py-12">
        <div className="container max-w-3xl">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm mb-6 text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to dashboard
          </Link>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                Create a New Cover Letter
              </CardTitle>
              <CardDescription>
                Paste a job description to generate a tailored cover letter
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-4">
                <Input
                  placeholder="Job Title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>
              <div className="space-y-4">
                <Textarea
                  placeholder="Paste the job description here..."
                  rows={10}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="resize-none"
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              {letterId && (
                <Button variant="outline" asChild className="mr-4">
                  <Link href={`/letters/edit/${letterId}`}>
                    Edit Cover Letter
                  </Link>
                </Button>
              )}
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !jobDescription.trim()}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Cover Letter"
                )}
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">
              Tips for better results:
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="font-bold mr-2">•</span>
                <span>
                  Include the complete job description with all requirements and
                  qualifications
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">•</span>
                <span>
                  Make sure your profile is complete with your skills and
                  experience
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">•</span>
                <span>
                  Include the company name and job title for more personalized
                  results
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">•</span>
                <span>
                  After generation, use the AI chat to refine your cover letter
                  further
                </span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
