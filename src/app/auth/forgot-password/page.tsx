"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // In a real implementation, this would call a reset password API
      // For demo purposes, we'll simulate a successful request after a short delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set reset sent to true to show success message
      setResetSent(true);
    } catch (err) {
      setError("We couldn't process your request. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  if (resetSent) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Header/Nav */}
        <div className="bg-indigo-700 text-white p-4">
          <div className="max-w-md mx-auto flex items-center">
            <Link href="/auth/sign-in" className="flex items-center">
              <ArrowLeft size={20} className="mr-2" />
              <span className="font-bold text-lg">Back to Sign In</span>
            </Link>
          </div>
        </div>

        {/* Success Message */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Check Your Email</h2>
            <p className="text-gray-600 mb-6">
              We've sent a password reset link to <strong>{email}</strong>. Click the link in the email to reset your password.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              If you don't see the email, check your spam folder or{" "}
              <button 
                onClick={() => setResetSent(false)}
                className="text-indigo-600 hover:text-indigo-500"
              >
                try again
              </button>.
            </p>
            <Link
              href="/auth/sign-in"
              className="inline-block w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header/Nav */}
      <div className="bg-indigo-700 text-white p-4">
        <div className="max-w-md mx-auto flex items-center">
          <Link href="/auth/sign-in" className="flex items-center">
            <ArrowLeft size={20} className="mr-2" />
            <span className="font-bold text-lg">Back to Sign In</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Reset your password</h1>
            <p className="text-gray-600 mt-1">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          {/* Reset Password Form */}
          <form onSubmit={handleResetRequest} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 flex justify-center items-center rounded-lg font-medium ${
                isLoading
                  ? "bg-indigo-400 text-white cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending Email...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          {/* Sign in and Sign up links */}
          <div className="mt-6 text-center text-gray-600">
            <div className="mb-2">
              <span>Remember your password? </span>
              <Link href="/auth/sign-in" className="text-indigo-600 hover:text-indigo-500 font-medium">
                Sign in
              </Link>
            </div>
            <div>
              <span>Don't have an account? </span>
              <Link href="/auth/sign-up" className="text-indigo-600 hover:text-indigo-500 font-medium">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 