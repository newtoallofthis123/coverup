import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  UserButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  SignUpButton,
  SignInButton,
} from "@clerk/nextjs";
import { DarkModeToggle } from "./dark-mode";

export default function SignInNav() {
  return (
    <header className="border-b">
      <div className="container flex items-center justify-between py-4">
        <Link href="/dashboard" className="text-2xl font-bold">
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
          <Link href="/dashboard" className="font-medium">
            Dashboard
          </Link>
          <Link href="/letters" className="font-medium">
            History
          </Link>
          <Link href="/profile" className="font-medium">
            Profile
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <DarkModeToggle />
          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <Button variant="ghost" size="icon">
              <UserButton />
            </Button>
            <SignOutButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
