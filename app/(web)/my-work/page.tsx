"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Highlighter } from "@/components/ui/highlighter";
import {
  SearchIcon,
  TagIcon,
  GithubIcon,
  ExternalLinkIcon,
  ArrowRightIcon,
} from "lucide-react";

type Tech = "react" | "go" | "react-native";

type Project = {
  title: string;
  summary: string;
  stack: Tech[];
  links?: {
    github?: string;
    demo?: string;
  };
};

const PROJECTS: Project[] = [
  {
    title: "NGO Communications Portal",
    summary:
      "A lightweight content and announcements portal enabling teams to publish updates and resources quickly.",
    stack: ["react", "go"],
    links: { github: "#", demo: "#" },
  },
  {
    title: "Youth Programs Mobile App",
    summary:
      "React Native app for events, resources, and check-ins with offline-friendly flows.",
    stack: ["react-native"],
    links: { github: "#" },
  },
  {
    title: "School Newsletter CMS",
    summary:
      "Simple editor + delivery pipeline for weekly newsletters with role-based access.",
    stack: ["react", "go"],
    links: { github: "#", demo: "#" },
  },
  {
    title: "Form-to-Email Microservice",
    summary:
      "Small Go service to accept JSON submissions and forward them to email with validation and rate limits.",
    stack: ["go"],
    links: { github: "#" },
  },
  {
    title: "Analytics Dashboard",
    summary:
      "React dashboard with charts and role-based widgets for content and engagement insights.",
    stack: ["react"],
    links: { github: "#" },
  },
  {
    title: "Content Sync CLI",
    summary:
      "Go CLI to sync assets and data across environments with safety checks and logs.",
    stack: ["go"],
    links: { github: "#" },
  },
];

const TAGS = [
  { key: "all", label: "All" },
  { key: "react", label: "React" },
  { key: "go", label: "Go" },
  { key: "react-native", label: "React Native" },
] as const;

export default function MyWorkPage() {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<(typeof TAGS)[number]["key"]>("all");

  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      const byTag = tag === "all" || p.stack.includes(tag as Tech);
      const byText =
        !text ||
        p.title.toLowerCase().includes(text) ||
        p.summary.toLowerCase().includes(text) ||
        p.stack.some((t) => t.includes(text as any));
      return byTag && byText;
    });
  }, [q, tag]);

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
            My Work
          </h1>
          <p className="relative mt-2 text-lg text-slate-600 md:text-xl dark:text-slate-300">
            <Highlighter>Selected projects</Highlighter> in React, React Native,
            and Golang. Built for reliability, clarity, and practical impact.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {TAGS.map((t) => (
              <Button
                key={t.key}
                variant={tag === t.key ? "default" : "outline"}
                className={cn(
                  "rounded-full px-4 py-2 text-sm",
                  tag === t.key && "shadow-sm",
                )}
                onClick={() => setTag(t.key)}
              >
                <TagIcon className="mr-2 h-4 w-4" /> {t.label}
              </Button>
            ))}
          </div>

          <div className="relative w-full sm:w-80">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search projects..."
              className="w-full rounded-2xl border border-slate-200/70 bg-white/70 py-2 pr-3 pl-9 text-sm shadow-sm outline-none placeholder:text-slate-400 focus:border-red-400 focus:ring-2 focus:ring-red-200 dark:border-slate-800/70 dark:bg-slate-900/60 dark:focus:border-red-300 dark:focus:ring-red-300/20"
            />
            <SearchIcon className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </motion.section>

      {/* Projects grid */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
        className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((proj, idx) => (
          <motion.article
            key={proj.title}
            initial={{ y: 16, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.03 * idx }}
            className="group flex flex-col justify-between rounded-3xl border border-slate-200/70 bg-white/70 p-5 shadow-sm transition-all hover:shadow-md dark:border-slate-800/70 dark:bg-slate-900/60"
          >
            <div>
              <h3 className="text-lg font-semibold tracking-tight group-hover:text-red-500 dark:group-hover:text-red-300">
                {proj.title}
              </h3>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
                {proj.summary}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {proj.stack.map((t) => (
                  <span
                    key={t}
                    className={cn(
                      "rounded-full border px-2 py-0.5 text-xs",
                      "border-slate-200/70 bg-white/60 dark:border-slate-800/70 dark:bg-slate-900/50",
                    )}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                {proj.links?.github && (
                  <Button asChild size="sm" variant="ghost" className="gap-1">
                    <Link
                      href={proj.links.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <GithubIcon className="h-4 w-4" /> Code
                    </Link>
                  </Button>
                )}
                {proj.links?.demo && (
                  <Button asChild size="sm" variant="ghost" className="gap-1">
                    <Link
                      href={proj.links.demo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLinkIcon className="h-4 w-4" /> Demo
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </motion.article>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full rounded-3xl border border-slate-200/70 bg-white/60 p-8 text-center text-slate-600 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/50 dark:text-slate-300">
            No projects match your filters.
          </div>
        )}
      </motion.section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
        className="mx-auto mt-14 flex w-full max-w-3xl flex-col items-center justify-center gap-4 rounded-3xl border border-slate-200/70 bg-white/60 p-6 text-center shadow-sm dark:border-slate-800/70 dark:bg-slate-900/50"
      >
        <h3 className="text-xl font-semibold">Want a deeper look?</h3>
        <p className="max-w-2xl text-sm text-slate-700 dark:text-slate-200">
          I can share private repos or walkthroughs for client projects. Get in
          touch and I’ll tailor a demo to your needs.
        </p>
        <Button asChild className="rounded-full px-6 py-3 font-semibold">
          <Link href="mailto:jbarasa.ke@gmail.com">
            Contact Me <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </motion.section>
    </main>
  );
}
