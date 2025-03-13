"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Download, MessageSquare, Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EditCoverLetterPage() {
  const router = useRouter();
  const [coverLetter, setCoverLetter] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [title, setTitle] = useState("Cover Letter");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // In a real app, you would fetch this from your API
    const savedCoverLetter = localStorage.getItem("generatedCoverLetter");
    const savedJobDescription = localStorage.getItem("jobDescription");

    if (savedCoverLetter) {
      setCoverLetter(savedCoverLetter);
    } else {
      // If no cover letter is found, redirect back to create
      router.push("/cover-letters/new");
    }

    if (savedJobDescription) {
      setJobDescription(savedJobDescription);

      // Try to extract a title from the job description
      const lines = savedJobDescription.split("\n");
      const potentialTitle = lines[0].trim();
      if (potentialTitle && potentialTitle.length < 50) {
        setTitle(potentialTitle);
      }
    }
  }, [router]);

  const handleSave = () => {
    setIsSaving(true);

    // In a real app, you would save to your database
    setTimeout(() => {
      setIsSaving(false);
      router.push("/cover-letters/chat");
    }, 1000);
  };

  const handleDownload = () => {
    // Create a blob with the cover letter text
    const blob = new Blob([coverLetter], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    // Create a link and trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
        <div className="container max-w-4xl">
          <Link
            href="/cover-letters/new"
            className="inline-flex items-center text-sm mb-6 text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to generator
          </Link>

          <div className="mb-6">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl font-bold border-none px-0 text-gray-900 focus-visible:ring-0"
              placeholder="Enter a title for your cover letter"
            />
          </div>

          <Tabs defaultValue="edit">
            <TabsList className="mb-6">
              <TabsTrigger value="edit">Edit Cover Letter</TabsTrigger>
              <TabsTrigger value="job">Job Description</TabsTrigger>
            </TabsList>

            <TabsContent value="edit">
              <Card>
                <CardHeader>
                  <CardTitle>Edit Your Cover Letter</CardTitle>
                  <CardDescription>
                    Make any changes to your generated cover letter
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="min-h-[400px] font-serif text-base"
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      onClick={() => router.push("/cover-letters/chat")}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Refine with AI
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                      <Save className="mr-2 h-4 w-4" />
                      {isSaving ? "Saving..." : "Save & Continue"}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="job">
              <Card>
                <CardHeader>
                  <CardTitle>Job Description</CardTitle>
                  <CardDescription>
                    The job description used to generate your cover letter
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="min-h-[400px]"
                    readOnly
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
