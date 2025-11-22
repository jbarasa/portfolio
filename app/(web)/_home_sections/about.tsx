"use client";

import { motion } from "motion/react";
import { DownloadIcon } from "lucide-react";
import { Lens } from "@/components/ui/lens";
import { ShineBorder } from "@/components/ui/shine-border";
import { WordRotate } from "@/components/ui/word-rotate";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Highlighter } from "@/components/ui/highlighter";

export default function About() {
  return (
    <section className="relative overflow-hidden bg-gray-50/80 px-4 py-16 sm:px-8 md:px-24 md:py-32 dark:bg-slate-900/60">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute inset-0 -z-10"
        aria-hidden
      >
        <Highlighter>
          <div className="top-16 right-[18%] h-14 w-64 opacity-40 blur-3xl dark:opacity-25"></div>
        </Highlighter>
        <Highlighter>
          <div className="top-20 left-[10%] h-26 w-56 opacity-40 blur-3xl dark:opacity-20"></div>
        </Highlighter>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-fit rounded-4xl bg-gray-200 px-4 py-2 md:px-8 dark:bg-gray-700"
      >
        <h2 className="text-lg font-extrabold md:text-2xl">About Me</h2>
      </motion.div>

      <div className="mt-12 grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] xl:gap-16">
        {/* Profile visual */}
        <motion.div
          initial={{ opacity: 0, x: -12, rotate: -2 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.7,
            type: "spring",
            stiffness: 120,
            damping: 18,
          }}
          className="relative flex items-center justify-center"
        >
          <div className="relative w-full max-w-[420px] rounded-4xl border border-white/70 bg-white/60 p-4 shadow-xl backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/70">
            <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
            <Lens>
              <div className="relative overflow-hidden rounded-3xl">
                <Image
                  className="max-h-[640px] w-full object-cover grayscale transition duration-500 hover:grayscale-40"
                  src="/about/cv.png"
                  alt="CV Image"
                  width={480}
                  height={780}
                  priority
                />
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-br from-transparent via-transparent to-white/40 transition-colors duration-300 dark:from-transparent dark:via-black/20 dark:to-black/45" />
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur dark:bg-slate-900/70 dark:text-white">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  Available for Hire
                </div>
              </div>
            </Lens>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col gap-8 leading-relaxed"
        >
          <div className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl xl:text-[2.85rem] dark:text-white">
              My Journey Through{" "}
              <WordRotate
                className="inline text-4xl text-cyan-600 md:text-5xl dark:text-cyan-300"
                words={[
                  "Software Craft",
                  "Go Systems",
                  "React Engineering",
                  "Mobile Apps",
                  "Product Building",
                ]}
              />
            </h2>

            <p className="text-base text-slate-700 md:text-lg dark:text-slate-200">
              I’m a full-stack engineer who builds clean, scalable and
              production-ready applications using{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-300">
                Golang (Fiber)
              </span>
              ,{" "}
              <span className="font-semibold text-blue-700 dark:text-blue-300">
                React
              </span>{" "}
              and{" "}
              <span className="font-semibold text-emerald-500 dark:text-emerald-300">
                React Native
              </span>
              . I focus on efficient backend systems, well-structured APIs,
              reusable UI components and fast mobile experiences—powered by a
              strong foundation in{" "}
              <span className="font-semibold text-indigo-600 dark:text-indigo-300">
                PostgreSQL
              </span>
              and performance-driven architecture.
            </p>

            <p className="text-base text-slate-700 md:text-lg dark:text-slate-200">
              My development style emphasizes clarity, simplicity, and long-term
              maintainability. I combine solid engineering practices with
              effective communication and documentation to create systems that
              teams can easily build upon, scale, and trust.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button className="rounded-full px-6 py-3 text-sm font-semibold shadow-sm dark:bg-cyan-600 dark:text-white dark:hover:bg-cyan-500">
              View Portfolio
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-full border border-slate-900/20 px-5 py-3 text-sm font-semibold backdrop-blur-md transition dark:border-slate-700/60"
            >
              <DownloadIcon className="h-4 w-4" strokeWidth={3} />
              Download CV
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {/* UPDATED CARD #1 – NGO & DIGITAL SUPPORT */}
            <div className="rounded-3xl border border-slate-200/70 bg-linear-to-br from-cyan-100 via-transparent to-transparent p-6 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/50 dark:from-cyan-900/30">
              <h3 className="text-lg font-semibold">
                Software Development & Digital Support
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                NGOs & Community Organisations · 2020–Present · Volunteering,
                Part-time & Project-based
              </p>
            </div>

            {/* CARD #2 – ICT ROLE */}
            <div className="rounded-3xl border border-slate-200/70 bg-linear-to-br from-amber-100 via-transparent to-transparent px-6 py-5 shadow-sm transition hover:shadow-lg dark:border-slate-800/70 dark:bg-slate-900/60 dark:from-amber-900/20">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                ICT Support Technician
              </h4>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Nov 2018 – Jan 2020 · Ministry of Education - Digital Learning
                Program
              </p>
            </div>
          </motion.div>

          <div className="flex flex-wrap items-center gap-3 rounded-3xl border border-dashed border-slate-300/70 bg-white/60 px-6 py-4 text-sm text-slate-600 shadow-sm backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
            <span className="font-semibold text-slate-900 dark:text-white">
              Available for:
            </span>
            <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-200">
              Remote Roles
            </span>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-900/40 dark:text-amber-200">
              Contract Work
            </span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
              Collaborative Projects
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
