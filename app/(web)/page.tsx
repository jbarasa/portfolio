import { Button } from "@/components/ui/button";
import HeroSection from "./_components/hero";
import Image from "next/image";
import { DownloadIcon } from "lucide-react";
import { Lens } from "@/components/ui/lens";
import { ShineBorder } from "@/components/ui/shine-border";
import { WordRotate } from "@/components/ui/word-rotate";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <section className="flex items-center py-46 px-24 gap-16">
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
          <div className="flex flex-col gap-8 max-w-2xl">
            <h2 className="text-gray-500 text-6xl font-bold mb-4 tracking-tight">
              My Journey Through{" "}
              <WordRotate
                className="font-extrabold text-black"
                words={[
                  "Coding",
                  "Computer Programming",
                  "Software Development",
                ]}
              />
            </h2>
            <p className="text-md">
              I’m a proficient software developer with solid experience in
              full-stack development using Go, React, Laravel, Flutter,
              PostgreSQL and MariaDB. My expertise has been shaped through
              intensive practice, online learning programs and active engagement
              with global developer communities. I excel in designing scalable,
              performant and maintainable systems that align with modern
              software engineering principles. While currently holding a high
              school certificate, I’m committed to advancing my formal education
              and continually evolving as a developer through professional
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
        </div>
      </section>
    </main>
  );
}
