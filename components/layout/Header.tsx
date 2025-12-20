"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { HiMenu, HiX } from "react-icons/hi";
import Button from "@/components/ui/Button";
import { isAdmin } from "@/lib/constants";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user } = useUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress;
  const userIsAdmin = isAdmin(userEmail);

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2">
            <Image
              src="/logo.jpg"
              alt="Logo"
              width={32}
              height={32}
              className="rounded-lg sm:w-10 sm:h-10"
            />
            <span className="font-heading font-bold text-lg sm:text-xl text-gray-900 hidden xs:block">
              Jbarasa
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Auth & CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 hidden sm:block">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button variant="ghost" size="sm" className="hidden sm:block">
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              {userIsAdmin ? (
                <Link href="/admin" className="hidden sm:block">
                  <Button variant="ghost" size="sm">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <div className="hidden sm:block relative group">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="cursor-default opacity-70"
                  >
                    Track Project
                  </Button>
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50">
                    Coming Soon
                  </span>
                </div>
              )}
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <a href="#contact" className="hidden sm:block">
              <Button size="sm">Start Chat</Button>
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 text-gray-600 hover:text-gray-900"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <HiX size={22} /> : <HiMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Absolute positioned overlay */}
        {isMenuOpen && (
          <nav className="md:hidden absolute left-0 right-0 top-full bg-white border-b border-gray-100 shadow-lg z-50">
            <div className="flex flex-col gap-1.5 sm:gap-2 px-3 sm:px-4 py-3 sm:py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-600 hover:text-gray-900 py-2 text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
              <SignedIn>
                {userIsAdmin ? (
                  <Link
                    href="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-600 hover:text-gray-900 py-2 text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <span className="text-gray-400 py-2 text-sm font-medium">
                    Track Project <span className="text-xs">(Coming Soon)</span>
                  </span>
                )}
              </SignedIn>
              <SignedOut>
                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  <SignInButton mode="modal">
                    <Button variant="ghost" size="sm" className="flex-1">
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button variant="primary" size="sm" className="flex-1">
                      Sign Up
                    </Button>
                  </SignUpButton>
                </div>
              </SignedOut>
              <a href="#contact" onClick={() => setIsMenuOpen(false)}>
                <Button size="sm" fullWidth className="mt-2">
                  Start Chat
                </Button>
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
