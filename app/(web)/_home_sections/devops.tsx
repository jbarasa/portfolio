"use client";

import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function DevOps() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative flex flex-col items-center bg-blue-50/50 px-4 py-10 sm:px-8 md:flex-row md:px-24 md:py-35 dark:bg-slate-900/40"
    >
      {/* decorative SVG blobs */}
      <svg
        aria-hidden
        className="pointer-events-none absolute top-4 left-4 -z-10 h-44 w-44 opacity-30 dark:opacity-20"
        viewBox="0 0 100 100"
        fill="none"
      >
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0" stopColor="#7DD3FC" />
            <stop offset="1" stopColor="#60A5FA" />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r="50"
          fill="url(#g1)"
          className="mix-blend-multiply"
        />
      </svg>

      <div className="flex-1">
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="flex max-w-2xl flex-col gap-12"
        >
          <h2 className="text-3xl font-bold text-slate-900 md:text-6xl dark:text-white">
            DevOps/Deployment
          </h2>

          <div className="rounded-3xl bg-green-50/60 p-4 backdrop-blur-sm md:p-8 dark:border dark:border-green-800 dark:bg-green-900/20">
            <h4 className="pb-4 font-semibold text-slate-900 dark:text-white">
              Current Stack
            </h4>
            <p className="text-sm text-slate-700 md:text-base dark:text-slate-300">
              I primarily work with{" "}
              <span className="font-semibold">
                VPS (Virtual Private Servers)
              </span>{" "}
              running Debian-based systems for production deployments. My
              expertise includes configuring and managing:
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-6 text-sm text-slate-700 md:text-base dark:text-slate-300">
              <li>Nginx, Traefik, and Caddy for reverse proxy and SSL</li>
              <li>Continuous deployment pipelines using GitHub Actions</li>
              <li>Docker containers for consistent dev & prod environments</li>
              <li>Server monitoring, backups and maintenance</li>
            </ul>
          </div>

          <div className="rounded-3xl bg-white p-4 backdrop-blur-sm md:p-8 dark:border dark:border-slate-700 dark:bg-slate-800/40">
            <h4 className="pb-4 font-semibold text-slate-900 dark:text-white">
              Cloud Platforms
            </h4>
            <p className="text-sm text-slate-700 md:text-base dark:text-slate-300">
              For rapid deployment and simplified management I leverage:
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-6 text-sm text-slate-700 md:text-base dark:text-slate-300">
              <li>Vercel for Next.js and React applications</li>
              <li>
                Container-based deploys to VPS with Docker + systemd / compose
              </li>
            </ul>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 12 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.08 }}
        className="flex flex-1 items-center justify-center py-8"
      >
        <div className="relative flex w-full max-w-md items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 160, damping: 14 }}
            className="relative z-10 flex items-center justify-center rounded-2xl bg-white/80 p-4 dark:bg-slate-800/60"
          >
            <DotLottieReact
              src="/about/devops.lottie"
              loop
              autoplay
              className="max-w-full md:h-[600px] md:w-[600px]"
            />
          </motion.div>

          {/* subtle background ring */}
          <div className="pointer-events-none absolute -bottom-10 -left-10 -z-10 h-48 w-48 rounded-full bg-linear-to-br from-cyan-200 to-blue-200 opacity-30 blur-3xl dark:from-cyan-800 dark:to-sky-800 dark:opacity-20" />
        </div>
      </motion.div>
    </motion.section>
  );
}
