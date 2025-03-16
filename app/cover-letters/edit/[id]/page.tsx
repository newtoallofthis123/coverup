'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, Download, MessageSquare, Save } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BACKEND_URL, PARSER_URL } from '@/lib/consts';
import { usePathname } from 'next/navigation';
import SignInNav from '@/components/custom/signin-nav';

export default function EditCoverLetterPage() {
  const [coverLetter, setCoverLetter] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [title, setTitle] = useState('Cover Letter');
  const [isSaving, setIsSaving] = useState(false);
  const pathname = usePathname();
  const id = pathname.split('/').pop();

  useEffect(() => {
    const fetchLetter = async () => {
      const res = await fetch(`${BACKEND_URL}/api/letters/${id}`);
      const data = await res.json();
      setCoverLetter(data.content);
      setJobDescription(data.job_description);
      setTitle(data.title);
    };

    fetchLetter();
  }, [id]);

  const handleSave = () => {
    setIsSaving(true);

    setTimeout(async () => {
      setIsSaving(false);
      const res = await fetch(`${BACKEND_URL}/api/letters/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          letter: {
            content: coverLetter,
            job_description: jobDescription,
          },
        }),
      });

      if (res.ok) {
        console.log('Cover letter saved');
      }
    }, 1000);
  };

  const handleDownload = async () => {
    const response = await fetch(`${PARSER_URL}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: coverLetter,
      }),
    });

    // get response as a application/pdf blob
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SignInNav />

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
                    className="min-h-[400px] text-base"
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <div className="flex gap-4">
                    <Button variant="outline">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <a href="/cover-letters/chat">Refine with AI</a>
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                      <Save className="mr-2 h-4 w-4" />
                      {isSaving ? 'Saving...' : 'Save & Continue'}
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
