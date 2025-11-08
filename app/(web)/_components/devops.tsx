"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function DevOps() {
  return (
    <>
      <section className="flex flex-col items-center bg-blue-50/50 px-4 py-10 sm:px-8 md:flex-row md:px-24 md:py-35">
        <div className="flex-1">
          <div className="flex max-w-2xl flex-col gap-12">
            <h2 className="text-3xl font-bold md:text-6xl">
              DevOps/Deployment
            </h2>
            <div className="rounded-3xl bg-green-50/50 p-4 backdrop-blur-sm md:p-8">
              <h4 className="pb-4 font-semibold">Current Stack</h4>
              <p className="text-sm md:text-base">
                I primarily work with{" "}
                <span className="font-semibold">
                  VPS (Virtual Private Servers)
                </span>{" "}
                running Debian-based systems for production deployments. My
                expertise includes configuring and managing:
              </p>
              <ul className="mt-2 list-disc space-y-2 pl-6 text-sm md:text-base">
                <li>
                  Web servers like Nginx, Traefik, and Caddy for reverse proxy
                  and SSL management
                </li>
                <li>Continuous deployment pipelines using GitHub Actions</li>
                <li>
                  Docker containers for consistent development and production
                  environments
                </li>
                <li>Server monitoring and maintenance</li>
              </ul>
            </div>
            <div className="rounded-3xl bg-white p-4 backdrop-blur-sm md:p-8">
              <h4 className="pb-4 font-semibold">Cloud Platforms</h4>
              <p className="text-sm md:text-base">
                For projects requiring rapid deployment and simplified
                management, I leverage:
              </p>
              <ul className="mt-2 list-disc space-y-2 pl-6 text-sm md:text-base">
                <li>Vercel for Next.js and React applications</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <DotLottieReact
            src="/about/devops.lottie"
            loop
            autoplay
            className="max-w-full md:h-[650px] md:w-[650px]"
          />
        </div>
      </section>
    </>
  );
}
