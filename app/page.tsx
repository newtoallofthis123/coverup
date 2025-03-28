import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  FileText,
  MessageSquare,
  Upload,
  User,
} from "lucide-react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import SignInNav from "@/components/custom/signin-nav";

export default async function Home() {
  const user = await auth();
  const isLoggedIn = user ? true : false;

  return (
    <div className="flex flex-col min-h-screen">
      {isLoggedIn ? (
        <SignInNav />
      ) : (
        <header className="border-b dark:border-gray-700">
          <div className="container flex items-center justify-between py-4">
            <Link href="/" className="text-2xl font-bold">
              <Image
                src="/coverup.jpeg"
                className="dark:hidden"
                alt="CoverUp Logo"
                width={120}
                height={120}
              />
              <Image
                src="/coverup_dark.jpeg"
                className="dark:block hidden"
                alt="CoverUp Logo"
                width={120}
                height={120}
              />
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="font-medium text-gray-900 dark:text-gray-100"
              >
                Home
              </Link>
              <Link
                href="/pricing"
                className="font-medium text-gray-900 dark:text-gray-100"
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="font-medium text-gray-900 dark:text-gray-100"
              >
                About
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <SignedOut>
                <SignInButton />
                <SignUpButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </header>
      )}

      <section className="py-20 dark:black">
        <div className="container flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-gray-900 dark:text-gray-100">
            Craft Perfect Cover Letters{" "}
            <span className="text-primary dark:text-primary-light">
              in Seconds
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-10">
            AI-powered cover letters tailored to your resume and the job
            description. Stand out from the crowd and land your dream job.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="px-8 py-6 text-lg">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            20 free cover letters every month. No credit card required.
          </div>
          <div className="mt-16 w-full max-w-3xl rounded-lg border dark:border-gray-700 shadow-lg overflow-hidden">
            <iframe
              width="780"
              height="400"
              src="https://www.youtube-nocookie.com/embed/8oIuMrdy9CU?si=XFmbhLQRZP7g-mqU"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-gray-100">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <User className="h-10 w-10 text-primary dark:text-primary-light" />
                ),
                title: "Create an account",
                description:
                  "Sign up for free and get 20 cover letters per month.",
              },
              {
                icon: (
                  <Upload className="h-10 w-10 text-primary dark:text-primary-light" />
                ),
                title: "Upload your resume",
                description: "Add your details or upload your existing resume.",
              },
              {
                icon: (
                  <FileText className="h-10 w-10 text-primary dark:text-primary-light" />
                ),
                title: "Generate cover letter",
                description:
                  "Paste a job description and generate a tailored cover letter.",
              },
              {
                icon: (
                  <MessageSquare className="h-10 w-10 text-primary dark:text-primary-light" />
                ),
                title: "Refine with AI",
                description: "Chat with our AI to perfect your cover letter.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-lg border dark:border-gray-700 bg-white dark:bg-black"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-50">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-black">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-gray-100">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "CoverUp helped me land my dream job at a tech company. The AI-generated cover letter was perfect!",
                author: "Sarah J.",
                role: "Software Engineer",
              },
              {
                quote:
                  "I was struggling with writing cover letters until I found CoverUp. Now I can apply to multiple jobs in minutes.",
                author: "Michael T.",
                role: "Marketing Specialist",
              },
              {
                quote:
                  "The chat feature is amazing! It helped me refine my cover letter and make it sound more professional.",
                author: "Emily R.",
                role: "Product Manager",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="p-6 rounded-lg border bg-white dark:bg-black dark:border-gray-700"
              >
                <p className="text-gray-600 dark:text-gray-100 mb-4">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="font-semibold text-gray-900 dark:text-gray-100">
                  {testimonial.author}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {testimonial.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground dark:bg-black dark:text-white">
        <div className="container flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Craft Your Perfect Cover Letter?
          </h2>
          <p className="text-xl max-w-2xl mb-10 text-primary-foreground/90 dark:text-white">
            Join thousands of job seekers who have improved their job
            application success rate with CoverUp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="px-8">
                Sign up for free
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                size="lg"
                variant="outline"
                className="px-8 bg-white border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 dark:border-primary-foreground-dark dark:text-primary-foreground-dark dark:hover:bg-gray-800"
              >
                View pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 mt-auto dark:border-gray-700">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link
                href="/"
                className="text-xl font-bold text-gray-900 dark:text-gray-100"
              >
                CoverUp
              </Link>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                © 2025 NoobScience. All rights reserved.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
              <div>
                <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  Product
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/features"
                      className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pricing"
                      className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                    >
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  Company
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/about"
                      className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  Legal
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/privacy"
                      className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                    >
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                    >
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
