"use client";

import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Simple Header */}
      <div className="bg-indigo-700 text-white p-4">
        <div className="max-w-md mx-auto flex items-center">
          <Link href="/" className="flex items-center">
            <ArrowLeft size={20} className="mr-2" />
            <span className="font-bold text-lg">Back to Home</span>
          </Link>
        </div>
      </div>

      {/* Clerk Sign Up Component centered */}
      <div className="flex-1 flex items-center justify-center p-4">
        <SignUp path="/auth/sign-up" routing="path" signInUrl="/auth/sign-in" />
      </div>
    </div>
  );
} 