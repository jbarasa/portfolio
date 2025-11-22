"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ReactNode } from "react";

// --- Data & Types ---

type TechItem = {
  title: string;
  link: string;
  image: string;
  why: ReactNode;
  how: ReactNode;
  secondaryImage?: string; // For sections with two logos like Mobile/DB
};

const techData: TechItem[] = [
  {
    title: "Golang",
    link: "https://go.dev",
    image: "/about/go.png",
    why: (
      <p className="text-sm text-gray-600 dark:text-gray-300">
        I use Go to build fast, reliable and highly concurrent backend systems.
        Its simplicity and performance make it ideal for APIs, microservices and
        distributed architectures.
      </p>
    ),
    how: (
      <p className="text-sm text-gray-600 dark:text-gray-300">
        I primarily work with{" "}
        <span className="font-semibold text-cyan-600 dark:text-cyan-400">
          Fiber
        </span>{" "}
        for high-performance REST APIs, clean routing and simple middleware.
        Echo comes in for modular projects requiring structured handlers and
        advanced request handling patterns.
      </p>
    ),
  },
  {
    title: "React",
    link: "https://react.dev/",
    image: "/about/react.png",
    why: (
      <p className="text-sm text-gray-600 dark:text-gray-300">
        React gives me complete control over UI architecture. I use{" "}
        <span className="font-semibold text-cyan-600 dark:text-cyan-400">
          Next.js
        </span>{" "}
        for SEO-focused applications and server-driven rendering, and{" "}
        <span className="font-semibold text-cyan-600 dark:text-cyan-400">
          React Router
        </span>{" "}
        for fast SPAs with client-side transitions.
      </p>
    ),
    how: (
      <p className="text-sm text-gray-600 dark:text-gray-300">
        With{" "}
        <span className="font-semibold text-cyan-600 dark:text-cyan-400">
          Next.js
        </span>
        , I leverage its routing, server components, API routes and optimized
        rendering pipeline. For{" "}
        <span className="font-semibold text-cyan-600 dark:text-cyan-400">
          React Router
        </span>
        , I design reusable components, handle state cleanly and build fluid SPA
        user experiences.
      </p>
    ),
  },
];

// Special sections for Mobile and DB which have slightly different structures
// We can keep them separate or try to fit them in, but for unique UI, custom components often work best.

// --- Components ---

const Card = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5 }}
    className={`group relative overflow-hidden rounded-3xl bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:bg-gray-800/50 dark:backdrop-blur-sm ${className}`}
  >
    <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-cyan-100/50 blur-3xl transition-all group-hover:bg-cyan-200/50 dark:bg-cyan-900/20 dark:group-hover:bg-cyan-800/20" />
    <div className="relative z-10">{children}</div>
  </motion.div>
);

const SectionLabel = ({ children }: { children: ReactNode }) => (
  <div className="mb-2 inline-block rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold tracking-wider text-cyan-700 uppercase dark:bg-cyan-900/30 dark:text-cyan-300">
    {children}
  </div>
);

export default function TechStack() {
  return (
    <section className="relative overflow-hidden bg-cyan-50/20 px-4 py-16 sm:px-8 md:px-24 md:py-32 dark:bg-gray-900">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 -z-10 h-full w-full opacity-30">
        <svg
          className="h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0 0 L100 0 L100 100 L0 100 Z" fill="url(#grid-pattern)" />
          <defs>
            <pattern
              id="grid-pattern"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-gray-200 dark:text-gray-800"
              />
            </pattern>
          </defs>
        </svg>
      </div>

      {/* Header - Kept exactly as requested */}
      <div className="mx-auto mb-16 max-w-fit rounded-4xl bg-gray-200 px-4 py-2 md:px-8 dark:bg-gray-700">
        <h2 className="text-lg font-extrabold md:text-2xl">My Coding Stack</h2>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
        {/* Standard Tech Cards */}
        {techData.map((tech, index) => (
          <Card key={index}>
            <div className="mb-6 flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-gray-50 p-2 shadow-sm dark:bg-gray-700">
                <Image
                  src={tech.image}
                  alt={`${tech.title} Logo`}
                  fill
                  className="object-contain p-1"
                />
              </div>
              <Link href={tech.link} target="_blank" className="group/link">
                <h3 className="text-xl font-bold text-gray-900 transition-colors group-hover/link:text-cyan-600 dark:text-white">
                  {tech.title}
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  View Documentation →
                </span>
              </Link>
            </div>

            <div className="space-y-4">
              <div>
                <SectionLabel>Why</SectionLabel>
                {tech.why}
              </div>
              <div>
                <SectionLabel>How</SectionLabel>
                {tech.how}
              </div>
            </div>
          </Card>
        ))}

        {/* Mobile Development Card - Spans 2 cols on large screens if needed, or fits in grid */}
        <Card className="md:col-span-2 lg:col-span-1">
          <div className="mb-6 flex items-center gap-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-gray-50 shadow-sm dark:bg-gray-700">
              <Image
                src="/about/r-native.png"
                alt="React Native"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Mobile Dev
              </h3>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Cross-platform Engineering
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  React Native
                </h4>
                <Link
                  href="https://reactnative.dev/"
                  target="_blank"
                  className="text-xs text-cyan-600 hover:underline dark:text-cyan-400"
                >
                  View Documentation →
                </Link>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                My choice for mobile apps that demand smooth UX, modern UI
                patterns and full access to native APIs using one shared
                codebase. Ideal for fast, scalable product development.
              </p>
            </div>
          </div>
        </Card>

        {/* Databases Card */}
        <Card className="md:col-span-2 lg:col-span-1">
          <div className="mb-6 flex items-center gap-4">
            <div className="relative h-23 w-23 shrink-0 overflow-hidden rounded-2xl bg-gray-50 shadow-sm dark:bg-gray-700">
              <Image
                src="/about/postgres.jpg"
                alt="PostgreSQL"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Databases
              </h3>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Structured Data & Reliability
              </span>
            </div>
          </div>

          <div className="rounded-2xl bg-gray-50 p-4 dark:bg-gray-700/30">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-gray-900 dark:text-white">
                  PostgreSQL
                </h4>
              </div>
              <Link
                href="https://www.postgresql.org/"
                target="_blank"
                className="text-xs text-cyan-600 hover:underline dark:text-cyan-400"
              >
                View Docs →
              </Link>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              My primary database for all production systems. I use PostgreSQL
              for its strict consistency, strong indexing, JSON support and
              seamless integration with Go using SQLC.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}
