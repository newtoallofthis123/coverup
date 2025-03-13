import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-bold">
            CoverCraft
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="font-medium">
              Home
            </Link>
            <Link href="/pricing" className="font-medium">
              Pricing
            </Link>
            <Link href="/about" className="font-medium">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Pricing Section */}
      <section className="py-20 flex-grow">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that's right for you and start crafting perfect
              cover letters today.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="border rounded-lg overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-2">Free</h2>
                <p className="text-gray-600 mb-6">
                  Perfect for occasional job seekers
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <Link href="/signup">
                  <Button className="w-full" variant="outline">
                    Get Started
                  </Button>
                </Link>
              </div>
              <div className="border-t p-8">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>20 cover letters per month</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Basic AI chat refinement</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Resume storage</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Export as PDF</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Premium Tier */}
            <div className="border rounded-lg overflow-hidden bg-primary/5 border-primary/20 relative">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 rounded-bl-lg text-sm font-medium">
                Popular
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-2">Premium</h2>
                <p className="text-gray-600 mb-6">For active job seekers</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$12</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <Link href="/signup?plan=premium">
                  <Button className="w-full">Get Premium</Button>
                </Link>
              </div>
              <div className="border-t p-8">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>
                      <strong>80 cover letters</strong> per month
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>
                      <strong>Advanced</strong> AI chat refinement
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Multiple resume profiles</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Export as PDF, Word, or TXT</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Cover letter templates</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Priority support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-6">
              Frequently Asked Questions
            </h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
              {[
                {
                  question: "Can I cancel my subscription anytime?",
                  answer:
                    "Yes, you can cancel your subscription at any time. Your premium features will remain active until the end of your billing period.",
                },
                {
                  question:
                    "What happens if I use all my monthly cover letters?",
                  answer:
                    "Once you've used all your monthly cover letters, you'll need to wait until the next billing cycle or upgrade to the Premium plan for more.",
                },
                {
                  question: "Can I download my cover letters?",
                  answer:
                    "Yes, all plans allow you to download your cover letters. Free users can download as PDF, while Premium users can download as PDF, Word, or TXT.",
                },
                {
                  question: "Is my data secure?",
                  answer:
                    "We take data security seriously. Your resume data and cover letters are encrypted and never shared with third parties.",
                },
              ].map((faq, index) => (
                <div key={index} className="p-6 rounded-lg border">
                  <h4 className="font-semibold mb-2">{faq.question}</h4>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link href="/" className="text-xl font-bold">
                CoverCraft
              </Link>
              <p className="text-gray-500 mt-2">
                © 2025 CoverCraft. All rights reserved.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
              <div>
                <h3 className="font-semibold mb-3">Product</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/features"
                      className="text-gray-500 hover:text-gray-900"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pricing"
                      className="text-gray-500 hover:text-gray-900"
                    >
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/about"
                      className="text-gray-500 hover:text-gray-900"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-gray-500 hover:text-gray-900"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/privacy"
                      className="text-gray-500 hover:text-gray-900"
                    >
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-gray-500 hover:text-gray-900"
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
