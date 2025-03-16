import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileText, Plus, User } from "lucide-react";
import SignInNav from "@/components/custom/signin-nav";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { BACKEND_URL } from "@/lib/consts";

type Letter = {
  id: number;
  title: string;
  inserted_at: string;
};

export default async function DashboardPage() {
  const user = await currentUser();
  const totalCoverLetters = 20;

  if (!user) {
    redirect("/sign-in");
  }

  const res = await fetch(`${BACKEND_URL}/api/dashboard/${user.id}`, {
    method: "GET",
  });

  const data = await res.json();

  const usedCoverLetters = data.count;
  const letters: Letter[] = data.letters;
  const hasResume = data.has_resume;

  if (!hasResume) {
    redirect("/profile");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SignInNav />

      <main className="flex-grow py-12">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back {user.firstName ?? user.username}!
            </h1>
            <p className="text-gray-600">
              Create and manage your cover letters
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Usage</CardTitle>
                <CardDescription>
                  Your monthly cover letter usage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress
                    value={(usedCoverLetters / totalCoverLetters) * 100}
                  />
                  <div className="flex justify-between text-sm">
                    <span>{usedCoverLetters} used</span>
                    <span>
                      {totalCoverLetters - usedCoverLetters} remaining
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Upgrade to Premium
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Recent Cover Letters</CardTitle>
                <CardDescription>
                  Your recently created cover letters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {letters.map((letter, index) => (
                    <div key={index} className="flex items-start">
                      <FileText className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                      <div>
                        <p className="font-medium">{letter.title}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(letter.inserted_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/cover-letters" className="w-full">
                  <Button variant="outline" className="w-full">
                    View all
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Profile Completion</CardTitle>
                <CardDescription>
                  Complete your profile for better results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress value={75} />
                  <div className="text-sm">
                    <p className="font-medium">75% complete</p>
                    <p className="text-gray-500">
                      Add your work experience to complete your profile
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/profile" className="w-full">
                  <Button variant="outline" className="w-full">
                    Complete profile
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Create a Cover Letter</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Link href="/cover-letters/new" className="block">
                <Card className="h-full hover:border-primary/50 transition-colors">
                  <CardContent className="flex flex-col items-center justify-center h-full py-12">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Plus className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">
                      New Cover Letter
                    </h3>
                    <p className="text-sm text-gray-500 text-center">
                      Create a new cover letter from a job description
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/templates" className="block">
                <Card className="h-full hover:border-primary/50 transition-colors">
                  <CardContent className="flex flex-col items-center justify-center h-full py-12">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">Templates</h3>
                    <p className="text-sm text-gray-500 text-center">
                      Choose from our professional templates
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/profile" className="block">
                <Card className="h-full hover:border-primary/50 transition-colors">
                  <CardContent className="flex flex-col items-center justify-center h-full py-12">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">
                      Update Profile
                    </h3>
                    <p className="text-sm text-gray-500 text-center">
                      Update your resume details for better results
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
