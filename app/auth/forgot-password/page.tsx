"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HiMail, HiArrowLeft } from "react-icons/hi";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-gray-50 to-gray-100">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Reset your password
            </h1>
            <p className="text-gray-600">
              Enter your email and we&apos;ll send you a reset link
            </p>
          </div>

          <div className="bg-white shadow-xl border border-gray-200 rounded-2xl p-6 sm:p-8">
            {success ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HiMail className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Check your email
                </h2>
                <p className="text-gray-600 mb-6">
                  We&apos;ve sent a password reset link to{" "}
                  <strong>{email}</strong>
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-left mb-6">
                  <p className="text-sm text-blue-800">
                    Click the link in the email to reset your password. If you
                    don&apos;t see it, check your spam folder.
                  </p>
                </div>
                <Link
                  href="/sign-in"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <HiArrowLeft size={18} />
                  Back to Sign In
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <HiMail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>

                <div className="text-center">
                  <Link
                    href="/sign-in"
                    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    <HiArrowLeft size={16} />
                    Back to Sign In
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
