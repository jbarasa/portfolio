"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

function VerifiedContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success") === "true";
  const error = searchParams.get("error") === "true";

  // Determine status based on URL params
  const status = success ? "success" : error ? "error" : "loading";

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Verifying your email...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-gray-50 to-gray-100">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-xl border border-gray-200 rounded-2xl p-8 text-center">
            {status === "success" ? (
              <>
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <HiCheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h1 className="font-heading text-2xl font-bold text-gray-900 mb-3">
                  Email Verified!
                </h1>
                <p className="text-gray-600 mb-6">
                  Your email has been successfully verified. You can now sign in
                  to your account and start tracking your projects.
                </p>
                <Link
                  href="/sign-in"
                  className="inline-block w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                >
                  Sign In to Your Account
                </Link>
              </>
            ) : (
              <>
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <HiXCircle className="w-12 h-12 text-red-600" />
                </div>
                <h1 className="font-heading text-2xl font-bold text-gray-900 mb-3">
                  Verification Failed
                </h1>
                <p className="text-gray-600 mb-6">
                  We couldn&apos;t verify your email. The link may have expired
                  or already been used. Please try signing up again or contact
                  support.
                </p>
                <div className="space-y-3">
                  <Link
                    href="/sign-up"
                    className="inline-block w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                  >
                    Sign Up Again
                  </Link>
                  <Link
                    href="/"
                    className="inline-block w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                  >
                    Go to Homepage
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Jbarasa. All rights reserved.
      </footer>
    </div>
  );
}

export default function EmailVerifiedPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <VerifiedContent />
    </Suspense>
  );
}
