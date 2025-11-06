"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { DownloadIcon } from "lucide-react";
import { Lens } from "@/components/ui/lens";
import { ShineBorder } from "@/components/ui/shine-border";
import { WordRotate } from "@/components/ui/word-rotate";
import Link from "next/link";
import ScrollySection from "@/components/ui/scrolly-section";
import MySkills from "./_about/my-skills";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import MyServices from "./services";

export default function AboutHome() {
  return (
    <>
      <ScrollySection className="bg-gray-50/80 py-35 px-24">
        <div className=" bg-gray-200 px-8 py-2 max-w-fit mx-auto rounded-4xl">
          <h2 className="font-extrabold text-2xl">Did You Know?</h2>
        </div>
        <div className="flex items-center gap-16 py-15">
          <div className="flex-1 flex items-center justify-center bg-transparent">
            <div className="relative rounded-3xl p-4">
              <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
              <Lens>
                <Image
                  className="rounded-3xl object-cover"
                  src="/about/cv.png"
                  alt="CV Image"
                  width={391}
                  height={655}
                  priority
                />
              </Lens>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-8 max-w-2xl pb-8">
              <h2 className="text-gray-500 text-6xl font-bold mb-4 tracking-tight">
                My Journey Through{" "}
                <WordRotate
                  className="font-extrabold text-black"
                  words={[
                    "Coding",
                    "Computer Programming",
                    "Software Development",
                    "Web Development",
                    "App Development",
                    "Tech Innovation",
                  ]}
                />
              </h2>
              <p className="text-md">
                I’m a proficient software developer with solid experience in
                full-stack development using{" "}
                <span className="font-semibold">
                  <span className="text-blue-500">Go</span>,{" "}
                  <span className="text-blue-700">React</span>,{" "}
                  <span className="text-red-500">Laravel</span>,{" "}
                  <span className="text-blue-700">React Native</span>,{" "}
                  <span className="text-blue-400">Flutter</span>,{" "}
                  <span className="text-blue-800">PostgreSQL</span> and{" "}
                  <span className="text-orange-900">MariaDB</span>
                </span>
                . My expertise has been shaped through intensive practice,
                online learning programs and active engagement with global
                developer communities. I excel in designing scalable, performant
                and maintainable systems that align with modern software
                engineering principles. While currently holding a high school
                certificate, I’m committed to advancing my formal education and
                continually evolving as a developer through professional
                collaboration and lifelong learning.
              </p>
              <div className="flex gap-4">
                <Button className="rounded-4xl">About Me</Button>
                <Button
                  variant="outline"
                  className="rounded-4xl border-2 border-black"
                >
                  <DownloadIcon />
                  Download CV
                </Button>
              </div>
            </div>
            <div className="">
              <div className="flex items-center gap-12">
                <div className="bg-gray-100 rounded-3xl py-4 px-8">
                  <h4 className="font-semibold text-lg">
                    Freelance Software Developer
                  </h4>
                  <h6 className="font-medium text-gray-500">
                    April 2023 - Present | Remote
                  </h6>
                </div>
                <div className="bg-gray-100 rounded-3xl py-4 px-8">
                  <h4 className="font-semibold text-lg">
                    ICT Support Technician
                  </h4>
                  <h6 className="font-medium text-gray-500">
                    Nov 2018 - Jan 2020 | Reliance Protection Services LTD
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollySection>

      <MyServices />

      <section className="bg-cyan-50/20 py-35 px-24">
        <div className=" bg-gray-100  px-8 py-2 max-w-fit mx-auto rounded-4xl">
          <h2 className="font-extrabold text-2xl">My Programming Stack</h2>
        </div>
        <div className="grid grid-cols-3 gap-x-12 gap-y-18 py-18">
          <MySkills
            skill={
              <Link href="https://go.dev" target="_blank">
                Golang
              </Link>
            }
            skillImage="/about/go.png"
            why={
              <p>
                I use Go for backend APIs — it&apos;s blazing fast, efficient,
                and designed for concurrency, perfect for systems-level design
                and performance-driven logic.
              </p>
            }
            how={
              <p>
                I leverage <span className="font-semibold">Echo</span> and{" "}
                <span className="font-semibold">Fiber</span> frameworks for
                RESTful APIs, focusing on backend-only implementations. These
                frameworks offer excellent performance and simple routing
                patterns. I strictly use Go for API development rather than
                full-stack solutions, paired with modern deployment on VPS
                servers.
              </p>
            }
          />
          <MySkills
            skill={
              <Link href="https://laravel.com/" target="_blank">
                Laravel
              </Link>
            }
            skillImage="/about/laravel.jpg"
            why={
              <p>
                Perfect for rapid full-stack development with built-in
                authentication, database management, and template engine. Ideal
                for projects requiring shared hosting compatibility and quick
                deployment.
              </p>
            }
            how={
              <p>
                I utilize Laravel&apos;s MVC architecture for complete web
                applications, leveraging Blade templating and built-in features
                like authentication, database migrations, and Eloquent ORM.
                Excellent for projects needing shared hosting deployment.
              </p>
            }
          />
          <MySkills
            skill={
              <Link href="https://react.dev/" target="_blank">
                React
              </Link>
            }
            skillImage="/about/react.png"
            why={
              <p>
                I choose <span className="font-semibold">Next.js</span> for
                SEO-critical projects and server-side rendering needs, while{" "}
                <span className="font-semibold">React Router</span> for
                client-side SPAs. Next.js offers better performance and built-in
                optimizations, while React Router provides simpler deployment
                and lighter builds.
              </p>
            }
            how={
              <p>
                For <span className="font-semibold">Next.js</span> projects, I
                leverage its file-based routing, API routes, and server
                components. With{" "}
                <span className="font-semibold">React Router</span>, I focus on
                client-side state management and routing for simpler
                applications. Both approaches use modern React patterns and
                hooks.
              </p>
            }
          />
          <div className="p-4 flex flex-col gap-4 max-w-2xl">
            <div className="flex items-center">
              <div className="rounded-[100%] w-20 h-20 flex items-center justify-center">
                <Image
                  src="/about/r-native.png"
                  alt="React native logo"
                  className="w-20 height-20 rounded-[100%] object-cover"
                  width={100}
                  height={100}
                />
              </div>

              <div className="rounded-[100%] w-20 h-20 flex items-center justify-center -ml-8">
                <Image
                  src="/about/flutter.jpg"
                  alt="Flutter Logo"
                  className="w-20 height-20 rounded-[100%] object-cover"
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <div className="pt-8">
              <h2 className="text-xl font-bold">Mobile Development</h2>
              <div className=" bg-gray-100  px-2 max-w-fit rounded-4xl mt-4">
                <h4 className="font-semibold text-gray-500 text-sm">
                  <Link href="https://reactnative.dev/" target="_blank">
                    React Native
                  </Link>
                </h4>
              </div>
              <p>
                I use React Native for cross-platform apps requiring deep OS
                integration and when JavaScript ecosystem compatibility is
                important. Perfect for leveraging existing React knowledge.
              </p>
              <div className=" bg-gray-100  px-2 max-w-fit rounded-4xl mt-4">
                <h4 className="font-semibold text-gray-500 text-sm">
                  <Link href="https://flutter.dev/" target="_blank">
                    Flutter
                  </Link>
                </h4>
              </div>
              <p>
                I choose Flutter for apps needing pixel-perfect designs and
                superior performance. Its widget-based architecture and hot
                reload make it excellent for rapid development of beautiful UIs.
              </p>
            </div>
          </div>
          <div className="p-4 flex flex-col gap-4 max-w-2xl">
            <div className="flex items-center">
              <div className="rounded-[100%] w-20 h-20 flex items-center justify-center">
                <Image
                  src="/about/postgres.jpg"
                  alt="React native logo"
                  className="w-20 height-20 rounded-[100%] object-cover"
                  width={100}
                  height={100}
                />
              </div>

              <div className="rounded-[100%] w-20 h-20 flex items-center justify-center -ml-8">
                <Image
                  src="/about/maria-db.jpg"
                  alt="Flutter Logo"
                  className="w-20 height-20 rounded-[100%] object-cover"
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <div className="pt-8">
              <h2 className="text-xl font-bold">Databases</h2>
              <div className=" bg-gray-100  px-2 max-w-fit rounded-4xl mt-4">
                <h4 className="font-semibold text-gray-500 text-sm">
                  <Link href="https://www.postgresql.org/" target="_blank">
                    PostgreSQL
                  </Link>
                </h4>
              </div>
              <p>
                My go-to for complex applications requiring advanced features
                like JSON storage, full-text search, and strict data integrity.
                Perfect for scalable applications and complex queries.
              </p>
              <div className=" bg-gray-100  px-2 max-w-fit rounded-4xl mt-4">
                <h4 className="font-semibold text-gray-500 text-sm">
                  <Link href="https://mariadb.org/" target="_blank">
                    MariaDB
                  </Link>
                </h4>
              </div>
              <p>
                I use MariaDB for projects needing MySQL compatibility with
                better performance and security. Ideal for shared hosting
                environments and traditional web applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-50/50 py-35 px-24 flex items-center">
        <div className="flex-1">
          <div className="max-w-2xl flex flex-col gap-12">
            <h2 className="text-6xl font-bold">DevOps/Deployment</h2>
            <div className="bg-green-50/50 p-8 rounded-3xl backdrop-blur-sm">
              <h4 className="font-semibold pb-4">Current Stack</h4>
              <p>
                I primarily work with{" "}
                <span className="font-semibold">
                  VPS (Virtual Private Servers)
                </span>{" "}
                running Debian-based systems for production deployments. My
                expertise includes configuring and managing:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
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
            <div className="bg-white p-8 rounded-3xl backdrop-blur-sm">
              <h4 className="font-semibold pb-4">Cloud Platforms</h4>
              <p>
                For projects requiring rapid deployment and simplified
                management, I leverage:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Vercel for Next.js and React applications</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <DotLottieReact
            src="/about/devops.lottie"
            loop
            autoplay
            className="w-[650px] h-[650px] max-w-full"
          />
        </div>
      </section>
    </>
  );
}
