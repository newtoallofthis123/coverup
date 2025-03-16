import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton, SignOutButton } from "@clerk/nextjs";

export default function SignInNav() {
  return (
    <header className="border-b">
      <div className="container flex items-center justify-between py-4">
        <Link href="/dashboard" className="text-2xl font-bold">
          <Image
            src="/coverup.jpeg"
            alt="CoverUp Logo"
            width={120}
            height={120}
          />
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/dashboard" className="font-medium">
            Dashboard
          </Link>
          <Link href="/cover-letters" className="font-medium">
            History
          </Link>
          <Link href="/profile" className="font-medium">
            Profile
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <UserButton />
          </Button>
          <SignOutButton />
        </div>
      </div>
    </header>
  );
}
