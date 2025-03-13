"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export default function NewCoverLetterPage() {
  const router = useRouter();
  const [jobDescription, setJobDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      setError("Please enter a job description");
      return;
    }

    setError("");
    setIsGenerating(true);

    try {
      // In a real app, you would use your API key and proper error handling
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `Create a professional cover letter for the following job description, highlighting my skills and experience: ${jobDescription}`,
        system:
          "You are a professional cover letter writer. Create a compelling, tailored cover letter that matches the job description.",
      });

      // Store the generated cover letter and job description
      // In a real app, you would save this to your database
      localStorage.setItem("generatedCoverLetter", text);
      localStorage.setItem("jobDescription", jobDescription);

      // Navigate to the edit page
      router.push("/cover-letters/edit");
    } catch (err) {
      console.error("Error generating cover letter:", err);
      setError("Failed to generate cover letter. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-bold">
            CoverCraft
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="font-medium">
              Dashboard
            </Link>
            <Link href="/cover-letters" className="font-medium">
              My Cover Letters
            </Link>
            <Link href="/profile" className="font-medium">
              Profile
            </Link>
          </nav>
        </div>
      </header>

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
            <ul className="space-y-2 text-gray-600">
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
