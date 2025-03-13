"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Send, Download, Save, User, Bot } from "lucide-react";
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [title, setTitle] = useState("Cover Letter");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // In a real app, you would fetch this from your API
    const savedCoverLetter = localStorage.getItem("generatedCoverLetter");

    if (savedCoverLetter) {
      setCoverLetter(savedCoverLetter);

      // Add initial system message
      setMessages([
        {
          role: "assistant",
          content:
            "I'm your AI cover letter assistant. I can help you refine your cover letter, suggest improvements, or answer any questions you have about it. What would you like help with?",
        },
      ]);
    } else {
      // If no cover letter is found, redirect back to create
      router.push("/cover-letters/new");
    }
  }, [router]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");

    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    setIsLoading(true);

    try {
      // Prepare the context for the AI
      const context = `
        You are a professional cover letter assistant. Help the user refine their cover letter.
        
        Here is the current cover letter:
        ${coverLetter}
        
        User message: ${userMessage}
      `;

      // Create a temporary message for streaming
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      // Stream the response
      let fullResponse = "";

      const result = streamText({
        model: openai("gpt-4o"),
        prompt: context,
        onChunk: ({ chunk }) => {
          if (chunk.type === "text-delta") {
            //@ts-ignore
            fullResponse += chunk.text;

            // Update the last message with the streaming content
            setMessages((prev) => {
              const newMessages = [...prev];
              newMessages[newMessages.length - 1] = {
                role: "assistant",
                content: fullResponse,
              };
              return newMessages;
            });
          }
        },
      });

      await result.text;
    } catch (error) {
      console.error("Error sending message:", error);

      // Add error message
      setMessages((prev) => [
        ...prev.slice(0, -1), // Remove the temporary message
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleUpdateCoverLetter = () => {
    // In a real app, you would save the updated cover letter to your database
    router.push("/cover-letters");
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
            CoverUp
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
            href="/cover-letters/edit"
            className="inline-flex items-center text-sm mb-6 text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to editor
          </Link>

          <div className="grid md:grid-cols-5 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Your Cover Letter</CardTitle>
                  <CardDescription>
                    Current version of your cover letter
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-md max-h-[500px] overflow-y-auto font-serif text-sm">
                    {coverLetter.split("\n").map((paragraph, index) => (
                      <p key={index} className="mb-3">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button onClick={handleUpdateCoverLetter}>
                    <Save className="mr-2 h-4 w-4" />
                    Save & Finish
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="md:col-span-3">
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>AI Assistant</CardTitle>
                  <CardDescription>
                    Chat with our AI to refine your cover letter
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow overflow-hidden">
                  <div className="space-y-4 h-[500px] overflow-y-auto pr-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`
                            max-w-[80%] rounded-lg p-3
                            ${
                              message.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-gray-100 text-gray-900"
                            }
                          `}
                        >
                          <div className="flex items-center mb-1">
                            {message.role === "user" ? (
                              <>
                                <span className="font-medium">You</span>
                                <User className="h-3 w-3 ml-1" />
                              </>
                            ) : (
                              <>
                                <span className="font-medium">
                                  AI Assistant
                                </span>
                                <Bot className="h-3 w-3 ml-1" />
                              </>
                            )}
                          </div>
                          <div>
                            {message.content.split("\n").map((line, i) => (
                              <p key={i} className={i > 0 ? "mt-2" : ""}>
                                {line}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex w-full items-center space-x-2">
                    <Input
                      placeholder="Ask for suggestions or improvements..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={isLoading}
                    />
                    <Button
                      size="icon"
                      onClick={handleSendMessage}
                      disabled={isLoading || !input.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
