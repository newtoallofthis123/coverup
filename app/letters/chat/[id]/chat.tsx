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
import { ArrowLeft, Send, Save, User, Bot } from "lucide-react";
import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import SignInNav from "@/components/custom/signin-nav";
import { Textarea } from "@/components/ui/textarea";
import { marked } from "marked";
import { BACKEND_URL } from "@/lib/consts";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chat({
  id,
  letter,
  apiKey,
  imageUrl,
}: {
  id: string;
  letter: any;
  apiKey: string;
  imageUrl: string;
}) {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "I'm your AI cover letter assistant. I can help you refine your cover letter, suggest improvements, or answer any questions you have about it. What would you like help with?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState(letter.content);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const systemPrompt = `You are a cover letter assistant.
You can only do three things:
1. Refine the cover letter
2. Add something to the cover letter
3. Answer questions about the cover letter

If the user asks you to add something, you can do so, but only based on the content of the cover letter.

When the user asks questions about the cover letter, do not make any edits to the cover letter and
respond to the user with the answer.

When changes are needed in the cover letter, generate a message to the user and also the
changed version of the cover letter in full.
Generate a message to the user and also the changed version of the cover letter in the following format:
--USER--
Message to the user
--LETTER--
The changed version of the cover letter
`;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);
    console.log(input);

    try {
      const context = `
        You are a professional cover letter assistant. Help the user refine their cover letter.

        Here is the current cover letter:
        ${coverLetter}

        User message: ${userMessage}
      `;

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      let fullResponse = "";
      console.log(context);

      const googleAi = createGoogleGenerativeAI({
        apiKey: apiKey,
      });

      const result = streamText({
        model: googleAi("gemini-2.0-flash-001"),
        prompt: context,
        system: systemPrompt,
      });
      let mode = "query";
      for await (let chunk of result.textStream) {
        console.log(chunk);

        if (chunk.includes("--LETTER--")) {
          fullResponse = chunk.split("--LETTER--")[1].trim();
          mode = "letter";
        } else {
          fullResponse += chunk;
        }

        if (fullResponse.includes("--USER--")) {
          fullResponse = fullResponse.replace("--USER--", "").trim();
        }

        if (mode === "query") {
          setMessages((prev) => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = {
              role: "assistant",
              content: fullResponse,
            };
            return newMessages;
          });
        } else if (mode === "letter") {
          setCoverLetter(fullResponse);
        }
      }
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

  const handleUpdateCoverLetter = async () => {
    // In a real app, you would save the updated cover letter to your database
    const res = await fetch(`${BACKEND_URL}/api/letters/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        letter: {
          content: coverLetter,
        },
      }),
    });

    if (res.ok) {
      console.log("Cover letter saved");
    }
    router.push("/letters/edit/" + id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SignInNav />

      <main className="flex-grow py-12">
        <div className="container">
          <Link
            href="/letters/edit"
            className="inline-flex items-center text-sm mb-6 text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to editor
          </Link>

          <div className="grid md:grid-cols-5 gap-6">
            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Your Cover Letter</CardTitle>
                  <CardDescription>
                    Current version of your cover letter
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="min-h-[500px] text-base"
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button onClick={handleUpdateCoverLetter}>
                    <Save className="mr-2 h-4 w-4" />
                    Save & Finish
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>Kolavari Bot</CardTitle>
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
                                <img src={imageUrl} className="h-5 w-5 mr-1" />
                                <span className="font-medium">You</span>
                              </>
                            ) : (
                              <>
                                <Bot className="h-5 w-5 mr-1" />
                                <span className="font-medium">Kolavari</span>
                              </>
                            )}
                          </div>
                          <div>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: marked(message.content),
                              }}
                            ></div>
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
