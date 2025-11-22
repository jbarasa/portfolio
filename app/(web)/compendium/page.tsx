"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Highlighter } from "@/components/ui/highlighter";
import {
  CalendarIcon,
  ClockIcon,
  TagIcon,
  ArrowRightIcon,
  SearchIcon,
} from "lucide-react";

type Post = {
  title: string;
  slug: string;
  excerpt: string;
  date: string; // ISO
  readingTime: string;
  tags: ("react" | "go" | "react-native" | "general")[];
};

// Temporary sample posts; replace with your real content source (MDX, CMS, etc.)
const POSTS: Post[] = [
  {
    title: "Managing State in React Without Overhead",
    slug: "managing-state-react-without-overhead",
    excerpt:
      "Practical patterns for state across components using Context, reducers, and lightweight stores.",
    date: "2025-06-04",
    readingTime: "6 min",
    tags: ["react"],
  },
  {
    title: "Golang Concurrency: From Goroutines to Pipelines",
    slug: "golang-concurrency-pipelines",
    excerpt:
      "A hands-on walkthrough building resilient concurrent workflows with channels and context.",
    date: "2025-05-12",
    readingTime: "8 min",
    tags: ["go"],
  },
  {
    title: "React Native Navigation: Clean Patterns That Scale",
    slug: "react-native-navigation-patterns",
    excerpt:
      "Organize stacks, tabs, and modals without creating navigation spaghetti in larger apps.",
    date: "2025-03-27",
    readingTime: "7 min",
    tags: ["react-native"],
  },
  {
    title: "API Contracts that Save Frontend Time",
    slug: "api-contracts-save-frontend-time",
    excerpt:
      "Designing clear JSON shapes, versioning rules, and error models for smoother integration.",
    date: "2025-02-10",
    readingTime: "5 min",
    tags: ["go", "react", "general"],
  },
];

const TAGS = [
  { key: "all", label: "All" },
  { key: "react", label: "React" },
  { key: "go", label: "Go" },
  { key: "react-native", label: "React Native" },
  { key: "general", label: "General" },
] as const;

export default function CompendiumPage() {
  const [q, setQ] = useState("");
  const [activeTag, setActiveTag] =
    useState<(typeof TAGS)[number]["key"]>("all");

  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase();
    return POSTS.filter((p) => {
      const matchesTag =
        activeTag === "all" ||
        p.tags.includes(activeTag as Post["tags"][number]);
      const matchesText =
        !text ||
        p.title.toLowerCase().includes(text) ||
        p.excerpt.toLowerCase().includes(text) ||
        p.tags.some((t) => t.includes(text as any));
      return matchesTag && matchesText;
    }).sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [q, activeTag]);

  return (
    <main
      className={cn(
        "mx-auto w-full max-w-6xl px-4 pt-10 pb-24 sm:px-8 md:pt-16",
      )}
    >
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col gap-5"
      >
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            Compendium
          </h1>
          <p className="mt-2 text-lg text-slate-600 md:text-xl dark:text-slate-300">
            <Highlighter>Articles, snippets, and notes</Highlighter> on React,
            Go, and React Native — focused on pragmatic solutions and patterns
            that scale.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {TAGS.map((t) => (
              <Button
                key={t.key}
                variant={activeTag === t.key ? "default" : "outline"}
                className={cn(
                  "rounded-full px-4 py-2 text-sm",
                  activeTag === t.key && "shadow-sm",
                )}
                onClick={() => setActiveTag(t.key)}
              >
                <TagIcon className="mr-2 h-4 w-4" /> {t.label}
              </Button>
            ))}
          </div>

          <div className="relative w-full sm:w-80">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search articles..."
              className="w-full rounded-2xl border border-slate-200/70 bg-white/70 py-2 pr-3 pl-9 text-sm shadow-sm outline-none placeholder:text-slate-400 focus:border-red-400 focus:ring-2 focus:ring-red-200 dark:border-slate-800/70 dark:bg-slate-900/60 dark:focus:border-red-300 dark:focus:ring-red-300/20"
            />
            <SearchIcon className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </motion.section>

      {/* Posts grid */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
        className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((post, idx) => (
          <motion.article
            key={post.slug}
            initial={{ y: 16, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.03 * idx }}
            className="group flex flex-col justify-between rounded-3xl border border-slate-200/70 bg-white/70 p-5 shadow-sm transition-all hover:shadow-md dark:border-slate-800/70 dark:bg-slate-900/60"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  {new Date(post.date).toLocaleDateString()}
                </span>
                <span className="inline-flex items-center gap-1">
                  <ClockIcon className="h-3.5 w-3.5" />
                  {post.readingTime}
                </span>
              </div>
              <h3 className="mt-2 text-lg font-semibold tracking-tight group-hover:text-red-500 dark:group-hover:text-red-300">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
                {post.excerpt}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-slate-200/70 bg-white/60 px-2 py-0.5 text-xs dark:border-slate-800/70 dark:bg-slate-900/50"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <Button asChild size="sm" variant="ghost" className="gap-1">
                <Link href={`/compendium/${post.slug}`}>
                  Read <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.article>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full rounded-3xl border border-slate-200/70 bg-white/60 p-8 text-center text-slate-600 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/50 dark:text-slate-300">
            No posts match your filters.
          </div>
        )}
      </motion.section>
    </main>
  );
}
