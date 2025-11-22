"use client";

import type { Metadata } from "next";
import { motion } from "motion/react";
import Link from "next/link";
import {
  MailIcon,
  MapPinIcon,
  DownloadIcon,
  ArrowRightIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Highlighter } from "@/components/ui/highlighter";
import NavbarMenu from "../_components/navbar-menu";

// export const metadata: Metadata = {
//   title: "About — Joseph Barasa",
//   description:
//     "Full‑Stack React + Go developer in Nairobi. Building reliable web and mobile experiences with React, React Native, and Golang.",
// };

export default function AboutPage() {
  return (
    <>
      <NavbarMenu
        headerClassname="fixed top-0 left-0 right-0 z-50"
        className="w-full backdrop-blur-sm"
      />
      <main
        className={cn(
          "mx-auto mt-22 w-full max-w-6xl px-4 pt-10 pb-24 sm:px-8 md:pt-16",
        )}
      >
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              JOSEPH OLUNGA BARASA
            </h1>
            <p className="relative mt-2 text-lg text-slate-600 md:text-xl dark:text-slate-300">
              <Highlighter>Full‑Stack React + Go Developer</Highlighter> ·
              Building production‑ready web and mobile apps with React, React
              Native, and Golang.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
              <span className="inline-flex items-center gap-2">
                <MapPinIcon className="h-4 w-4" /> Nairobi, Kenya
              </span>
              <Link
                href="mailto:jbarasa.ke@gmail.com"
                className="inline-flex items-center gap-2 underline-offset-4 hover:underline"
              >
                <MailIcon className="h-4 w-4" />
                jbarasa.ke@gmail.com
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="rounded-full px-6 py-3 font-semibold">
              <Link href="/my-work">
                View Projects <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-6 py-3 font-semibold"
            >
              <DownloadIcon className="mr-2 h-4 w-4" />
              Download CV
            </Button>
          </div>
        </motion.section>

        {/* Professional Summary */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-12 grid gap-6 md:grid-cols-2"
        >
          <div className="rounded-3xl border border-slate-200/70 bg-white/60 p-6 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/50">
            <h2 className="text-xl font-semibold">Professional Summary</h2>
            <p className="mt-3 text-slate-700 dark:text-slate-200">
              Dependable full‑stack developer focused on delivering clear,
              maintainable, and scalable solutions. I design and ship
              user‑centric products with <strong>React</strong> and{" "}
              <strong>React Native</strong>, build robust APIs and services in{" "}
              <strong>Go (Golang)</strong>, and integrate modern tooling,
              testing, and deployment practices for reliable delivery.
            </p>
            <p className="mt-3 text-slate-700 dark:text-slate-200">
              I’ve supported NGOs, schools, and community organisations by
              building practical digital tools, improving content workflows, and
              aligning technology with impact‑driven goals.
            </p>
          </div>

          {/* Core Skills */}
          <div className="rounded-3xl border border-slate-200/70 bg-white/60 p-6 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/50">
            <h2 className="text-xl font-semibold">Core Skills</h2>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
              {[
                "React (Next.js, Hooks, Context)",
                "React Native",
                "TypeScript",
                "Golang (HTTP, concurrency, CLI)",
                "REST APIs",
                "State mgmt (Effector)",
                "UI/UX with Tailwind CSS",
                "Testing & QA",
                "Auth & Security basics",
                "CI/CD & Deployments",
                "Content & Docs",
                "Analytics & Reporting",
              ].map((skill) => (
                <li
                  key={skill}
                  className="rounded-xl border border-slate-200/70 bg-white/50 px-3 py-2 dark:border-slate-800/70 dark:bg-slate-900/40"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Relevant Experience */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          className="mt-12"
        >
          <h2 className="text-xl font-semibold">Relevant Experience</h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200/70 bg-gradient-to-br from-cyan-100 via-transparent to-transparent p-6 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/50 dark:from-cyan-900/30">
              <h3 className="text-lg font-semibold">
                Software Development & Digital Support
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                NGOs & Community Organisations · 2020–Present · Volunteering,
                Part‑time & Project‑based
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-200">
                <li>
                  Built and maintained web experiences with React and Next.js.
                </li>
                <li>
                  Developed lightweight Go services and integrations for content
                  and forms.
                </li>
                <li>
                  Improved social and content workflows with clear documentation
                  and automation.
                </li>
                <li>
                  Delivered consistent UI patterns and responsive design for
                  accessibility.
                </li>
              </ul>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                Supported: NGO Council of Kenya, Ministry of Education (Kenya),
                Mully Children’s Family, Potterhouse School, Rose of Sharon
                School, First Love Kenya.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200/70 bg-gradient-to-br from-amber-100 via-transparent to-transparent p-6 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/50 dark:from-amber-900/20">
              <h3 className="text-lg font-semibold">ICT Support Technician</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Ministry of Education - Digital Learning Program · Nov 2018 –
                Jan 2020
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-200">
                <li>
                  Produced internal briefs and guided staff on technical
                  procedures.
                </li>
                <li>
                  Authored SOPs that reduced repeated issues and improved
                  efficiency.
                </li>
                <li>
                  Assisted with digital workflows and supported online systems.
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Education & Extras */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          className="mt-12 grid gap-4 md:grid-cols-3"
        >
          <div className="rounded-3xl border border-slate-200/70 bg-white/60 p-6 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/50">
            <h3 className="text-lg font-semibold">Education</h3>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
              Kenya Certificate of Secondary Education (KCSE)
              <br />
              Friends School Bokoli Boys · 2017
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200/70 bg-white/60 p-6 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/50">
            <h3 className="text-lg font-semibold">Languages</h3>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
              English, Swahili
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200/70 bg-white/60 p-6 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/50">
            <h3 className="text-lg font-semibold">Availability</h3>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
              References available upon request · Willing to travel
            </p>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          className="mx-auto mt-14 flex w-full max-w-3xl flex-col items-center justify-center gap-4 rounded-3xl border border-slate-200/70 bg-white/60 p-6 text-center shadow-sm dark:border-slate-800/70 dark:bg-slate-900/50"
        >
          <h3 className="text-xl font-semibold">Explore My Work</h3>
          <p className="max-w-2xl text-sm text-slate-700 dark:text-slate-200">
            See selected projects built with React, React Native, and Golang.
          </p>
          <Button asChild className="rounded-full px-6 py-3 font-semibold">
            <Link href="/my-work">
              View Projects <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.section>
      </main>
    </>
  );
}
