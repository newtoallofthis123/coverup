"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import {
  FileText,
  Plus,
  Search,
  MoreHorizontal,
  Download,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignInNav from "@/components/custom/signin-nav";

type CoverLetter = {
  id: string;
  title: string;
  job_description: string;
  content: string;
  inserted_at: string;
};

export default function CoverLettersPage({ letters }: { letters: any }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [coverLetters, setCoverLetters] = useState<CoverLetter[]>(letters);

  const filteredCoverLetters = coverLetters.filter((letter) =>
    letter.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this cover letter?")) {
      setCoverLetters((prev) => prev.filter((letter) => letter.id !== id));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SignInNav />

      <main className="flex-grow py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Cover Letters</h1>
              <p className="text-gray-600">
                Manage and organize your cover letters
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link href="/letters/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Cover Letter
                </Button>
              </Link>
            </div>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search cover letters..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {filteredCoverLetters.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  No cover letters found
                </h3>
                <p className="text-gray-500 mb-6 text-center">
                  {searchQuery
                    ? "No cover letters match your search. Try a different query."
                    : "You haven't created any cover letters yet."}
                </p>
                {!searchQuery && (
                  <Link href="/letters/new">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create your first cover letter
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCoverLetters.map((letter) => (
                <Card key={letter.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="mb-2 leading-5">
                          {letter.title}
                        </CardTitle>
                        <CardDescription>
                          {letter.job_description.slice(0, 100)}...
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(letter.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-500 space-y-1">
                      <div className="flex justify-between">
                        <span>Created:</span>
                        <span>{formatDate(letter.inserted_at)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href={`/letters/edit/${letter.id}`}
                      className="w-full"
                    >
                      <Button variant="outline" className="w-full">
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
