"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { HiMail, HiRefresh } from "react-icons/hi";

function CheckEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "your email";

  return (
    <div className="w-full max-w-md">
      <div className="bg-white shadow-xl border border-gray-200 rounded-2xl p-8 text-center">
        {/* Email Icon */}
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <HiMail className="w-10 h-10 text-blue-600" />
        </div>

        <h1 className="font-heading text-2xl font-bold text-gray-900 mb-3">
          Check Your Email
        </h1>

        <p className="text-gray-600 mb-2">
          We&apos;ve sent a verification link to:
        </p>
        <p className="font-medium text-gray-900 mb-6 break-all">{email}</p>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-left">
          <h3 className="font-medium text-blue-900 mb-2">Next steps:</h3>
          <ol className="text-sm text-blue-800 space-y-2">
            <li className="flex gap-2">
              <span className="font-bold">1.</span>
              <span>Open your email inbox</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">2.</span>
              <span>
                Look for an email from <strong>Jbarasa</strong>
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">3.</span>
              <span>
                Click the <strong>&quot;Verify Email&quot;</strong> button
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">4.</span>
              <span>Sign in to your account</span>
            </li>
          </ol>
        </div>

        <div className="space-y-3">
          <Link
            href="/sign-in"
            className="inline-block w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            Go to Sign In
          </Link>

          <p className="text-sm text-gray-500">
            Didn&apos;t receive the email?{" "}
            <button className="text-blue-600 hover:underline inline-flex items-center gap-1">
              <HiRefresh className="w-4 h-4" />
              Resend
            </button>
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Make sure to check your spam folder if you don&apos;t see the email
            in your inbox.
          </p>
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="w-full max-w-md">
      <div className="bg-white shadow-xl border border-gray-200 rounded-2xl p-8 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse" />
        <div className="h-8 bg-gray-100 rounded w-3/4 mx-auto mb-3 animate-pulse" />
        <div className="h-4 bg-gray-100 rounded w-1/2 mx-auto animate-pulse" />
      </div>
    </div>
  );
}

export default function CheckEmailPage() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="p-4">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <Image
            src="/logo.jpg"
            alt="Jbarasa Logo"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="font-heading font-bold text-xl text-gray-900">
            Jbarasa
          </span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <Suspense fallback={<LoadingState />}>
          <CheckEmailContent />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Jbarasa. All rights reserved.
      </footer>
    </div>
  );
}
