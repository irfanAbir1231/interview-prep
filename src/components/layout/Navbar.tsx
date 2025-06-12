"use client";

import Link from "next/link";
import { Button } from "../ui/Button";

export function Navbar() {
  return (
    <nav className="border-b border-gray-200 py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          InterviewPrep.ai
        </Link>

        <div className="flex items-center space-x-8">
          <Link href="/features" className="hover:text-gray-600">
            Features
          </Link>
          <Link href="/about" className="hover:text-gray-600">
            About Us
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost">Login</Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    </nav>
  );
}