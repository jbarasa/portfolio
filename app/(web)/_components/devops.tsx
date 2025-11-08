"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function DevOps() {
  return (
    <>
      <section className="flex items-center bg-blue-50/50 px-24 py-35">
        <div className="flex-1">
          <div className="flex max-w-2xl flex-col gap-12">
            <h2 className="text-6xl font-bold">DevOps/Deployment</h2>
            <div className="rounded-3xl bg-green-50/50 p-8 backdrop-blur-sm">
              <h4 className="pb-4 font-semibold">Current Stack</h4>
              <p>
                I primarily work with{" "}
                <span className="font-semibold">
                  VPS (Virtual Private Servers)
                </span>{" "}
                running Debian-based systems for production deployments. My
                expertise includes configuring and managing:
              </p>
              <ul className="mt-2 list-disc space-y-2 pl-6">
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
            <div className="rounded-3xl bg-white p-8 backdrop-blur-sm">
              <h4 className="pb-4 font-semibold">Cloud Platforms</h4>
              <p>
                For projects requiring rapid deployment and simplified
                management, I leverage:
              </p>
              <ul className="mt-2 list-disc space-y-2 pl-6">
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
            className="h-[650px] w-[650px] max-w-full"
          />
        </div>
      </section>
    </>
  );
}
