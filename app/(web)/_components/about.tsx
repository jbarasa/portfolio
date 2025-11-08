import { DownloadIcon } from "lucide-react";
import { Lens } from "@/components/ui/lens";
import { ShineBorder } from "@/components/ui/shine-border";
import { WordRotate } from "@/components/ui/word-rotate";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="bg-gray-50/80 px-4 py-20 sm:px-8 md:px-24 md:py-35"
    >
      <div className="mx-auto max-w-fit rounded-4xl bg-gray-200 px-4 py-2 md:px-8">
        <h2 className="text-lg font-extrabold md:text-2xl">About Me</h2>
      </div>
      <div className="hidden items-center gap-16 py-15 md:flex">
        <div className="flex flex-1 items-center justify-center bg-transparent">
          <div className="relative rounded-3xl p-4">
            <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
            <Lens>
              <Image
                className="max-h-[700px] w-full rounded-3xl object-cover grayscale-100 hover:grayscale-0"
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
          <div className="flex max-w-2xl flex-col gap-8 pb-8">
            <h2 className="mb-4 text-6xl font-bold tracking-tight text-gray-500">
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
            <p>
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
              . My expertise has been shaped through intensive practice, online
              learning programs and active engagement with global developer
              communities. I excel in designing scalable, performant and
              maintainable systems that align with modern software engineering
              principles. While currently holding a high school certificate, I’m
              committed to advancing my formal education and continually
              evolving as a developer through professional collaboration and
              lifelong learning.
            </p>
            <div className="flex gap-4">
              <Button className="rounded-4xl px-8 py-6 text-base">
                About Me
              </Button>
              <Button
                variant="outline"
                className="rounded-4xl border-2 border-black px-8 py-6 text-base font-bold"
              >
                <DownloadIcon strokeWidth={3} />
                Download CV
              </Button>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-12">
              <div className="rounded-3xl bg-gray-100 px-8 py-4">
                <h4 className="text-lg font-semibold">
                  Freelance Software Developer
                </h4>
                <h6 className="font-medium text-gray-500">
                  April 2023 - Present | Remote
                </h6>
              </div>
              <div className="rounded-3xl bg-gray-100 px-8 py-4">
                <h4 className="text-lg font-semibold">
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
      <div className="flex flex-col gap-10 py-8 md:hidden">
        <div className="flex items-center justify-center bg-transparent">
          <div className="relative rounded-3xl p-4">
            <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
            <Lens>
              <Image
                className="max-h-[700px] w-full rounded-3xl object-cover grayscale-100 hover:grayscale-0"
                src="/about/cv.png"
                alt="CV Image"
                width={391}
                height={655}
                priority
              />
            </Lens>
          </div>
        </div>
        <div className="flex flex-col gap-8 pb-8">
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-500">
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
          <p className="text-sm">
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
            . My expertise has been shaped through intensive practice, online
            learning programs and active engagement with global developer
            communities. I excel in designing scalable, performant and
            maintainable systems that align with modern software engineering
            principles. While currently holding a high school certificate, I’m
            committed to advancing my formal education and continually evolving
            as a developer through professional collaboration and lifelong
            learning.
          </p>
          <div className="flex gap-4">
            <Button className="rounded-4xl px-8 py-6 text-base">
              About Me
            </Button>
            <Button
              variant="outline"
              className="rounded-4xl border-2 border-black px-6 py-6 text-base font-bold"
            >
              <DownloadIcon strokeWidth={3} />
              Download CV
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-3xl bg-gray-100 p-4">
            <h4 className="text-lg font-semibold">
              Freelance Software Developer
            </h4>
            <h6 className="font-medium text-gray-500">
              April 2023 - Present | Remote
            </h6>
          </div>
          <div className="rounded-3xl bg-gray-100 p-4">
            <h4 className="text-lg font-semibold">ICT Support Technician</h4>
            <h6 className="font-medium text-gray-500">
              Nov 2018 - Jan 2020 | Reliance Protection Services LTD
            </h6>
          </div>
        </div>
      </div>
    </section>
  );
}
