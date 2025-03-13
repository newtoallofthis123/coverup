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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, FileText, Plus, Save, Upload } from "lucide-react";

type WorkExperience = {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
};

type Education = {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  description: string;
};

export default function ProfilePage() {
  const router = useRouter();

  // Mock data - in a real app, you would fetch this from your API
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "John Doe",
    title: "Software Engineer",
    phone: "(123) 456-7890",
    email: "john.doe@example.com",
    address: "San Francisco, CA",
    summary:
      "Experienced software engineer with a passion for building user-friendly applications. Skilled in JavaScript, React, and Node.js.",
  });

  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "Tech Company Inc.",
      startDate: "2022-01",
      endDate: "Present",
      description:
        "Led the development of the company's main product. Implemented new features and improved performance.",
    },
    {
      id: "2",
      title: "Frontend Developer",
      company: "Startup XYZ",
      startDate: "2019-06",
      endDate: "2021-12",
      description:
        "Developed and maintained the company's web application. Collaborated with designers and backend developers.",
    },
  ]);

  const [education, setEducation] = useState<Education[]>([
    {
      id: "1",
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Technology",
      startDate: "2015-09",
      endDate: "2019-05",
      description:
        "Graduated with honors. Focused on web development and software engineering.",
    },
  ]);

  const [skills, setSkills] = useState(
    "JavaScript, React, Node.js, HTML, CSS, TypeScript, Git, Agile, UI/UX Design",
  );

  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handlePersonalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSkills(e.target.value);
  };

  const handleWorkExperienceChange = (
    id: string,
    field: keyof WorkExperience,
    value: string,
  ) => {
    setWorkExperience((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  const handleEducationChange = (
    id: string,
    field: keyof Education,
    value: string,
  ) => {
    setEducation((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  const handleAddWorkExperience = () => {
    const newId = Date.now().toString();
    setWorkExperience((prev) => [
      ...prev,
      {
        id: newId,
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const handleAddEducation = () => {
    const newId = Date.now().toString();
    setEducation((prev) => [
      ...prev,
      {
        id: newId,
        degree: "",
        institution: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const handleRemoveWorkExperience = (id: string) => {
    setWorkExperience((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRemoveEducation = (id: string) => {
    setEducation((prev) => prev.filter((item) => item.id !== id));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSave = () => {
    // In a real app, you would save the profile data to your API
    console.log("Saving profile data:", {
      personalInfo,
      workExperience,
      education,
      skills,
    });

    // Show success message or redirect
    alert("Profile saved successfully!");
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
            href="/dashboard"
            className="inline-flex items-center text-sm mb-6 text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to dashboard
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
            <p className="text-gray-600">
              Manage your resume details to improve your cover letters
            </p>
          </div>

          <Tabs defaultValue="personal">
            <TabsList className="mb-8">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="experience">Work Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="resume">Resume</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your basic contact information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={personalInfo.fullName}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="title">Professional Title</Label>
                      <Input
                        id="title"
                        name="title"
                        value={personalInfo.title}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={personalInfo.email}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={personalInfo.phone}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="address">Location</Label>
                      <Input
                        id="address"
                        name="address"
                        value={personalInfo.address}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Textarea
                        id="summary"
                        name="summary"
                        rows={4}
                        value={personalInfo.summary}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="experience">
              <Card>
                <CardHeader>
                  <CardTitle>Work Experience</CardTitle>
                  <CardDescription>
                    Add your work history to improve your cover letters
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {workExperience.map((job, index) => (
                      <div key={job.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-semibold">
                            Experience #{index + 1}
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveWorkExperience(job.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor={`job-title-${job.id}`}>
                              Job Title
                            </Label>
                            <Input
                              id={`job-title-${job.id}`}
                              value={job.title}
                              onChange={(e) =>
                                handleWorkExperienceChange(
                                  job.id,
                                  "title",
                                  e.target.value,
                                )
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`company-${job.id}`}>Company</Label>
                            <Input
                              id={`company-${job.id}`}
                              value={job.company}
                              onChange={(e) =>
                                handleWorkExperienceChange(
                                  job.id,
                                  "company",
                                  e.target.value,
                                )
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`start-date-${job.id}`}>
                              Start Date
                            </Label>
                            <Input
                              id={`start-date-${job.id}`}
                              type="month"
                              value={job.startDate}
                              onChange={(e) =>
                                handleWorkExperienceChange(
                                  job.id,
                                  "startDate",
                                  e.target.value,
                                )
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`end-date-${job.id}`}>
                              End Date
                            </Label>
                            <Input
                              id={`end-date-${job.id}`}
                              type="month"
                              value={job.endDate}
                              placeholder="Present"
                              onChange={(e) =>
                                handleWorkExperienceChange(
                                  job.id,
                                  "endDate",
                                  e.target.value,
                                )
                              }
                            />
                          </div>

                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor={`description-${job.id}`}>
                              Description
                            </Label>
                            <Textarea
                              id={`description-${job.id}`}
                              rows={3}
                              value={job.description}
                              onChange={(e) =>
                                handleWorkExperienceChange(
                                  job.id,
                                  "description",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button
                      variant="outline"
                      onClick={handleAddWorkExperience}
                      className="w-full"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Work Experience
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="education">
              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                  <CardDescription>
                    Add your educational background
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {education.map((edu, index) => (
                      <div key={edu.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-semibold">
                            Education #{index + 1}
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveEducation(edu.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                            <Input
                              id={`degree-${edu.id}`}
                              value={edu.degree}
                              onChange={(e) =>
                                handleEducationChange(
                                  edu.id,
                                  "degree",
                                  e.target.value,
                                )
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`institution-${edu.id}`}>
                              Institution
                            </Label>
                            <Input
                              id={`institution-${edu.id}`}
                              value={edu.institution}
                              onChange={(e) =>
                                handleEducationChange(
                                  edu.id,
                                  "institution",
                                  e.target.value,
                                )
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`edu-start-date-${edu.id}`}>
                              Start Date
                            </Label>
                            <Input
                              id={`edu-start-date-${edu.id}`}
                              type="month"
                              value={edu.startDate}
                              onChange={(e) =>
                                handleEducationChange(
                                  edu.id,
                                  "startDate",
                                  e.target.value,
                                )
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`edu-end-date-${edu.id}`}>
                              End Date
                            </Label>
                            <Input
                              id={`edu-end-date-${edu.id}`}
                              type="month"
                              value={edu.endDate}
                              onChange={(e) =>
                                handleEducationChange(
                                  edu.id,
                                  "endDate",
                                  e.target.value,
                                )
                              }
                            />
                          </div>

                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor={`edu-description-${edu.id}`}>
                              Description
                            </Label>
                            <Textarea
                              id={`edu-description-${edu.id}`}
                              rows={3}
                              value={edu.description}
                              onChange={(e) =>
                                handleEducationChange(
                                  edu.id,
                                  "description",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button
                      variant="outline"
                      onClick={handleAddEducation}
                      className="w-full"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Education
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="skills">
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                  <CardDescription>
                    Add your skills and competencies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="skills">Skills</Label>
                      <Textarea
                        id="skills"
                        rows={5}
                        value={skills}
                        onChange={handleSkillsChange}
                        placeholder="List your skills, separated by commas (e.g., JavaScript, React, Node.js)"
                      />
                      <p className="text-sm text-gray-500">
                        Separate each skill with a comma. These skills will be
                        used to match you with job descriptions.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="resume">
              <Card>
                <CardHeader>
                  <CardTitle>Resume</CardTitle>
                  <CardDescription>
                    Upload your resume to automatically fill in your profile
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
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

                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                      <h3 className="font-medium text-yellow-800 mb-2">
                        How resume parsing works
                      </h3>
                      <p className="text-sm text-yellow-700">
                        When you upload your resume, our AI will automatically
                        extract your work experience, education, skills, and
                        personal information. You can then review and edit this
                        information before saving it to your profile.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave} disabled={!resumeFile}>
                    <Save className="mr-2 h-4 w-4" />
                    Parse Resume
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
