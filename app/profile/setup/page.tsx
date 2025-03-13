"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload, FileText } from "lucide-react";

export default function ProfileSetupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    phone: "",
    address: "",
    summary: "",
    skills: "",
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, you would upload the resume and save the profile data
    console.log("Profile data:", formData);
    console.log("Resume file:", resumeFile);

    // Redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-bold">
            CoverCraft
          </Link>
        </div>
      </header>

      <main className="flex-grow py-12">
        <div className="container max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Set up your profile</h1>
            <p className="text-gray-600">
              Add your resume details to help us generate better cover letters
              for you.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Add your basic contact information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="title">Professional Title</Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="Software Engineer"
                        value={formData.title}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="(123) 456-7890"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Location</Label>
                      <Input
                        id="address"
                        name="address"
                        placeholder="City, State"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Professional Summary</CardTitle>
                  <CardDescription>
                    Tell us about your professional background
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Textarea
                        id="summary"
                        name="summary"
                        placeholder="Write a brief summary of your professional experience and goals..."
                        rows={4}
                        value={formData.summary}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="skills">Skills</Label>
                      <Textarea
                        id="skills"
                        name="skills"
                        placeholder="List your key skills, separated by commas..."
                        rows={3}
                        value={formData.skills}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upload Resume</CardTitle>
                  <CardDescription>
                    Upload your existing resume to automatically fill in your
                    details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    {resumeFile ? (
                      <div className="space-y-2">
                        <FileText className="h-10 w-10 text-primary mx-auto" />
                        <p className="font-medium">{resumeFile.name}</p>
                        <p className="text-sm text-gray-500">
                          {(resumeFile.size / 1024).toFixed(2)} KB
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setResumeFile(null)}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="h-10 w-10 text-gray-400 mx-auto" />
                        <div>
                          <p className="text-sm text-gray-600 mb-1">
                            Drag and drop your resume, or
                          </p>
                          <label htmlFor="resume-upload">
                            <Button variant="outline" size="sm" type="button">
                              Browse files
                            </Button>
                            <Input
                              id="resume-upload"
                              type="file"
                              accept=".pdf,.doc,.docx"
                              className="hidden"
                              onChange={handleFileChange}
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">
                          Supports PDF, DOC, DOCX up to 5MB
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end space-x-4">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => router.push("/")}
                >
                  Skip for now
                </Button>
                <Button type="submit">Save and continue</Button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
