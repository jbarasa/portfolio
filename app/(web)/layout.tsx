import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ReactLenis from "lenis/react";
import Image from "next/image";
import Link from "next/link";
import {
  FaDiscord,
  FaGithub,
  FaLinkedinIn,
  FaReddit,
  FaSquareXTwitter,
} from "react-icons/fa6";

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ReactLenis root />
      {children}
      <footer
        aria-label="Site footer"
        className="relative w-full overflow-hidden border-t border-gray-200 bg-linear-to-b from-gray-50/60 to-white/40 px-6 py-12 sm:px-8 md:px-32 dark:border-slate-800 dark:from-slate-900/60 dark:to-slate-900/40"
      >
        {/* subtle top wave */}
        <svg
          className="pointer-events-none absolute top-0 left-0 w-full -translate-y-8 transform opacity-40 dark:opacity-20"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,64 C120,24 360,8 720,40 C1080,72 1320,40 1440,24 L1440,120 L0,120 Z"
            fill="currentColor"
            className="text-white dark:text-slate-900/80"
            fillOpacity="1"
          />
        </svg>

        <div className="relative z-10">
          {/* Top Section: Brand + Social */}
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
            {/* Brand */}
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2",
                  "cursor-pointer",
                )}
              >
                <Image
                  className="h-14 w-14 rounded-full object-cover transition-transform group-hover:scale-105"
                  src="/logo.jpg"
                  alt="Logo"
                  width={100}
                  height={100}
                />
                <div>
                  <h3 className="text-start text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    <span className="text-red-500">J</span>BARASA
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    Full-Stack Engineer • Go • React • React Native
                  </p>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white p-2 text-gray-700 shadow-sm transition-transform hover:scale-105 dark:bg-slate-800 dark:text-white"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>

              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white p-2 text-blue-600 shadow-sm transition-transform hover:scale-105 dark:bg-slate-800 dark:text-white"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={20} />
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white p-2 text-sky-500 shadow-sm transition-transform hover:scale-105 dark:bg-slate-800 dark:text-white"
                aria-label="X"
              >
                <FaSquareXTwitter size={20} />
              </a>

              <a
                href="https://www.reddit.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white p-2 text-orange-500 shadow-sm transition-transform hover:scale-105 dark:bg-slate-800 dark:text-white"
                aria-label="Reddit"
              >
                <FaReddit size={20} />
              </a>

              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white p-2 text-violet-600 shadow-sm transition-transform hover:scale-105 dark:bg-slate-800 dark:text-white"
                aria-label="Discord"
              >
                <FaDiscord size={20} />
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="my-8 border-t border-gray-100 dark:border-slate-800"></div>

          {/* Middle Section: Navigation + CTA */}
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            {/* Navigation Links */}
            <nav
              aria-label="footer navigation"
              className="flex flex-wrap items-center justify-center gap-6"
            >
              <Link
                href="/"
                className="text-gray-600 transition-colors hover:text-cyan-600 dark:text-gray-300 dark:hover:text-cyan-400"
              >
                Home
              </Link>
              <Link
                href="/projects"
                className="text-gray-600 transition-colors hover:text-cyan-600 dark:text-gray-300 dark:hover:text-cyan-400"
              >
                Projects
              </Link>
              <Link
                href="/about"
                className="text-gray-600 transition-colors hover:text-cyan-600 dark:text-gray-300 dark:hover:text-cyan-400"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 transition-colors hover:text-cyan-600 dark:text-gray-300 dark:hover:text-cyan-400"
              >
                Contact
              </Link>
              <Link
                href="/privacy"
                className="text-gray-600 transition-colors hover:text-cyan-600 dark:text-gray-300 dark:hover:text-cyan-400"
              >
                Privacy Policy
              </Link>
            </nav>

            {/* CTA Button */}
            <Button className="inline-flex items-center gap-2 rounded-full bg-cyan-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600">
              Hire Me
            </Button>
          </div>

          {/* Divider */}
          <div className="my-8 border-t border-gray-100 dark:border-slate-800"></div>

          {/* Bottom Section: Copyright + Tagline */}
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Joseph Olunga Barasa. Available
              for remote and contract work.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Focused on quality • Open to collaboration • Always learning •
              Driven by engineering
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
