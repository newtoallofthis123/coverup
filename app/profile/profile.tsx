"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
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

import { PARSER_URL } from "@/lib/consts";
import SignInNav from "@/components/custom/signin-nav";
import Loading from "../loading";
import { toast } from "sonner";

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
  description?: string;
};

type Project = {
  id: string;
  name: string;
  description: string;
};

type Achievement = {
  id: string;
  name: string;
  description: string;
};

type Social = {
  id: string;
  platform: string;
  url: string;
};

type Other = {
  Hobbies?: string;
  Languages?: string;
};

export default function ProfilePage({
  user,
  data,
  url,
  method,
}: {
  user: string;
  data: any;
  url: string;
  method: string;
}) {
  const [loading, setLoading] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    summary: "",
  });
  const [social, setSocial] = useState<Social[]>([]);
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [other, setOther] = useState<Other>({ Hobbies: "", Languages: "" });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const userId = user;

  useEffect(() => {
    if (data !== undefined) {
      parseData(data);
    } else {
      console.log("No data found");
    }
  }, [data]);

  function parseData(data: any) {
    setPersonalInfo({
      firstName: data.first_name || "",
      lastName: data.last_name || "",
      email: data.email || "",
      phone: data.phone || "",
      summary: data.summary || "",
    });

    setSocial(
      Object.entries(data.social || {}).map(([platform, url], index) => ({
        id: `${index + 1}`,
        platform,
        url: String(url),
      })),
    );

    data.work = data.work.replace(/\n/g, "\\n");
    data.education = data.education.replace(/\n/g, "\\n");
    data.achievements = data.achievements.replace(/\n/g, "\\n");
    data.projects = data.projects.replace(/\n/g, "\\n");

    const works = JSON.parse(data.work || "[]");
    const educs = JSON.parse(data.education || "[]");
    const achis = JSON.parse(data.achievements || "[]");
    const projs = JSON.parse(data.projects || "[]");
    const others = JSON.parse(data.other || "{}");

    setWorkExperience(works);

    setEducation(educs);

    setSkills(data.skills || "");
    setProjects(projs);
    setAchievements(achis);

    setOther(others || { Hobbies: "", Languages: "" });
  }

  const handlePersonalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (
    id: string,
    field: keyof Social,
    value: string,
  ) => {
    setSocial((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
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

  const handleProjectChange = (
    id: string,
    field: keyof Project,
    value: string,
  ) => {
    setProjects((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  const handleAchievementChange = (
    id: string,
    field: keyof Achievement,
    value: string,
  ) => {
    setAchievements((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  const handleOtherChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOther((prev) => ({ ...prev, [name]: value }));
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
      { id: newId, degree: "", institution: "", startDate: "", endDate: "" },
    ]);
  };

  const handleAddProject = () => {
    const newId = Date.now().toString();
    setProjects((prev) => [...prev, { id: newId, name: "", description: "" }]);
  };

  const handleAddAchievement = () => {
    const newId = Date.now().toString();
    setAchievements((prev) => [
      ...prev,
      { id: newId, name: "", description: "" },
    ]);
  };

  const handleRemoveWorkExperience = (id: string) => {
    setWorkExperience((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRemoveEducation = (id: string) => {
    setEducation((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRemoveProject = (id: string) => {
    setProjects((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRemoveAchievement = (id: string) => {
    setAchievements((prev) => prev.filter((item) => item.id !== id));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleResumeUpload = async () => {
    if (!resumeFile) {
      toast.error("Unable to upload file", {
        description: "Please select a valid file to upload",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", resumeFile);

    setLoading(true);

    const res = await fetch(`${PARSER_URL}/parse`, {
      method: "POST",
      body: formData,
    }).catch((err) => {
      console.log(err);
      toast("Error parsing resume");
      setLoading(false);
    });
    if (!res) {
      return;
    }
    const data = await res.json();
    try {
      const json_data = JSON.parse(data["data"]);
      console.log(json_data);
      parseData(json_data);
      setLoading(false);
      toast("Loaded in data from resume");
    } catch (e) {
      console.log(e);
      setLoading(false);
      toast("Failed to load data from resume");
      return;
    }
  };

  const handleAddSocial = () => {
    const newId = Date.now().toString();
    setSocial((prev) => [...prev, { id: newId, platform: "", url: "" }]);
  };

  const handleRemoveSocial = (id: string) => {
    setSocial((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSave = async () => {
    const profileData = {
      first_name: personalInfo.firstName,
      last_name: personalInfo.lastName,
      email: personalInfo.email,
      phone: personalInfo.phone,
      summary: personalInfo.summary,
      social: Object.fromEntries(
        social.map((item) => [item.platform, item.url]),
      ),
      work: JSON.stringify(workExperience),
      education: JSON.stringify(education),
      skills: skills,
      projects: JSON.stringify(projects),
      achievements: JSON.stringify(achievements),
      other: JSON.stringify(other),
    };

    console.log("Profile", workExperience, education, projects, achievements);

    const res = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        resume: profileData,
      }),
    });

    const resp = await res.json();
    console.log("Response:", resp);
    if (res.ok) {
      toast.success("Profile saved!", {
        description: "Your profile has been saved succesfully!",
      });
    } else {
      console.error("Failed to save profile:", resp);
      toast.error("Unable to save profile!", {
        description: "Please report the console errors to the developer",
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SignInNav />

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
              <TabsTrigger value="social">Social Media</TabsTrigger>
              <TabsTrigger value="experience">Work Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
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
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={personalInfo.firstName}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={personalInfo.lastName}
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

            <TabsContent value="social">
              <Card>
                <CardHeader>
                  <CardTitle>Social Media</CardTitle>
                  <CardDescription>
                    Add your social media profiles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {social.map((profile, index) => (
                      <div key={profile.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-semibold">
                            Profile #{index + 1}
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveSocial(profile.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor={`platform-${profile.id}`}>
                              Platform
                            </Label>
                            <Input
                              id={`platform-${profile.id}`}
                              value={profile.platform}
                              onChange={(e) =>
                                handleSocialChange(
                                  profile.id,
                                  "platform",
                                  e.target.value,
                                )
                              }
                              placeholder="e.g., LinkedIn, GitHub"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`url-${profile.id}`}>URL</Label>
                            <Input
                              id={`url-${profile.id}`}
                              value={profile.url}
                              onChange={(e) =>
                                handleSocialChange(
                                  profile.id,
                                  "url",
                                  e.target.value,
                                )
                              }
                              placeholder="https://"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={handleAddSocial}
                      className="w-full"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Social Profile
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

            <TabsContent value="experience">
              <Card>
                <CardHeader>
                  <CardTitle>Work Experience</CardTitle>
                  <CardDescription>Add your work history</CardDescription>
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
                              value={job.description}
                              onChange={(e) =>
                                handleWorkExperienceChange(
                                  job.id,
                                  "description",
                                  e.target.value,
                                )
                              }
                              placeholder="Describe your responsibilities and achievements in this role"
                              rows={4}
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
                        placeholder="List your skills, separated by commas"
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

            <TabsContent value="projects">
              <Card>
                <CardHeader>
                  <CardTitle>Projects</CardTitle>
                  <CardDescription>Add your notable projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {projects.map((proj, index) => (
                      <div key={proj.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-semibold">
                            Project #{index + 1}
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveProject(proj.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`project-name-${proj.id}`}>
                            Project Name
                          </Label>
                          <Input
                            id={`project-name-${proj.id}`}
                            value={proj.name}
                            onChange={(e) =>
                              handleProjectChange(
                                proj.id,
                                "name",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`project-desc-${proj.id}`}>
                            Description
                          </Label>
                          <Textarea
                            id={`project-desc-${proj.id}`}
                            rows={3}
                            value={proj.description}
                            onChange={(e) =>
                              handleProjectChange(
                                proj.id,
                                "description",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={handleAddProject}
                      className="w-full"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Project
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

            <TabsContent value="achievements">
              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>
                    Add your notable achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {achievements.map((ach, index) => (
                      <div key={ach.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-semibold">
                            Achievement #{index + 1}
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveAchievement(ach.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`ach-name-${ach.id}`}>
                            Achievement Name
                          </Label>
                          <Input
                            id={`ach-name-${ach.id}`}
                            value={ach.name}
                            onChange={(e) =>
                              handleAchievementChange(
                                ach.id,
                                "name",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`ach-desc-${ach.id}`}>
                            Description
                          </Label>
                          <Textarea
                            id={`ach-desc-${ach.id}`}
                            rows={3}
                            value={ach.description}
                            onChange={(e) =>
                              handleAchievementChange(
                                ach.id,
                                "description",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={handleAddAchievement}
                      className="w-full"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Achievement
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

            <TabsContent value="other">
              <Card>
                <CardHeader>
                  <CardTitle>Other Information</CardTitle>
                  <CardDescription>Add hobbies and languages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="Hobbies">Hobbies</Label>
                      <Textarea
                        id="Hobbies"
                        name="Hobbies"
                        rows={3}
                        value={other.Hobbies || ""}
                        onChange={handleOtherChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="Languages">Languages</Label>
                      <Textarea
                        id="Languages"
                        name="Languages"
                        rows={3}
                        value={other.Languages || ""}
                        onChange={handleOtherChange}
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

            <TabsContent value="resume">
              <Card>
                <CardHeader>
                  <CardTitle>Resume</CardTitle>
                  <CardDescription>Upload your resume</CardDescription>
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
                              <Button
                                variant="outline"
                                size="sm"
                                type="button"
                                onClick={() =>
                                  document
                                    .getElementById("resume-upload")
                                    ?.click()
                                }
                              >
                                Browse files
                              </Button>
                              <Input
                                id="resume-upload"
                                type="file"
                                accept=".pdf,.doc,.docx,.txt"
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
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleResumeUpload} disabled={!resumeFile}>
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
