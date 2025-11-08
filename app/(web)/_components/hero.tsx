"use client";

import { AuroraText } from "@/components/ui/aurora-text";
import { Button } from "@/components/ui/button";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { Globe } from "@/components/ui/globe";
import { Highlighter } from "@/components/ui/highlighter";
import { LightRays } from "@/components/ui/light-rays";
import NavbarMenu from "@/components/ui/navbar-menu";
import { WordByWordEffect } from "@/components/ui/word-by-word-effect";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pb-8 md:min-h-screen">
      <NavbarMenu classname="absolute top-0 left-0 right-0 z-99" />
      <Globe className="-z-15 max-w-[1200px] overflow-hidden opacity-20" />
      <Image
        className="absolute inset-0 -z-20 h-full w-full overflow-hidden object-cover opacity-20"
        src="/hero/hero-bg.svg"
        alt="hero background"
        fill
        priority
      />
      <LightRays className="-z-10 h-full w-full overflow-hidden" />
      <FlickeringGrid
        className="absolute inset-0 -z-8 h-full w-full overflow-hidden mask-[radial-gradient(55rem_circle_at_center,white,transparent)]"
        squareSize={4}
        gridGap={6}
        maxOpacity={0.15}
        flickerChance={0.6}
      />
      {/* Desktop */}
      <div className="hidden px-24 md:block">
        <WordByWordEffect>
          <h1 className="pointer-events-none max-w-[60%] pt-45 pl-8 text-7xl font-bold tracking-tight">
            <span className="word-span">I </span>
            <span className="word-span">Turn </span>
            <span className="word-span">Complex </span>
            <span className="word-span">Ideas </span>
            <span className="word-span">Into </span>
            <AuroraText className="inline-block">
              <span className="word-span">Clean, </span>
              <span className="word-span">Scalable </span>
              <span className="word-span">Software</span>
            </AuroraText>
          </h1>
        </WordByWordEffect>
        <div className={cn("flex items-start justify-between pt-20")}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.8, duration: 2 }}
            className={cn(
              "flex max-w-150 flex-1 flex-col gap-8 rounded-3xl p-8",
              "backdrop-blur-sm",
            )}
          >
            <h3 className="text-4xl">Hi, I’m Joseph Olunga Barasa - </h3>
            <p className="text-muted-foreground text-lg leading-7">
              A{" "}
              <span className="font-semibold">
                <Highlighter>Full Stack Developer</Highlighter>
              </span>{" "}
              crafting reliable solutions with Go, React, React Native, Laravel,
              Flutter and cutting-edge cloud technologies. Transforming ideas
              into scalable digital experiences.
            </p>
            <div className="flex items-center gap-8">
              <Button className="rounded-4xl px-12 py-8 text-lg font-medium">
                View Projects
              </Button>
              <Button
                className="rounded-4xl border-black px-12 py-8 text-lg font-medium"
                variant="outline"
              >
                <Image
                  className="h-5 w-5 grayscale-100"
                  src="/whatsapp.svg"
                  alt="whatsapp logo"
                  width={80}
                  height={80}
                />{" "}
                WhatsApp Me
              </Button>
            </div>
          </motion.div>
          <div className="flex-1">
            <motion.div
              initial={{ y: 300, scale: 0.5, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              transition={{
                delay: 2.5,
                type: "spring",
                stiffness: 80,
                damping: 18,
                duration: 1.5,
              }}
              className="absolute right-24 bottom-0"
            >
              <Image
                className={cn(
                  "object-contain transition-all duration-200 ease-linear",
                  "h-[880px] w-auto hover:grayscale-100",
                )}
                src="/hero/joseph-barasa.png"
                alt="Joseph Barasa's Image"
                width={780}
                height={980}
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="px-4 md:hidden">
        <WordByWordEffect>
          <h1 className="pointer-events-none w-full pt-25 text-4xl font-bold tracking-tight sm:text-3xl">
            <span className="word-span">I </span>
            <span className="word-span">Turn </span>
            <span className="word-span">Complex </span>
            <span className="word-span">Ideas </span>
            <span className="word-span">Into </span>
            <span
              className="word-span relative inline-block bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #FF0080, #FF6B9D)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Clean,
            </span>{" "}
            <span
              className="word-span relative inline-block bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #7928CA, #9D50E0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Scalable
            </span>{" "}
            <span
              className="word-span relative inline-block bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #0070F3, #38bdf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Software
            </span>
          </h1>
        </WordByWordEffect>
        <div className="pt-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1.5 }}
            className={cn(
              "flex w-full flex-col gap-8 rounded-3xl p-4",
              "backdrop-blur-sm",
            )}
          >
            <h3 className="text-2xl">Hi, I’m Joseph Olunga Barasa - </h3>
            <p className="text-muted-foreground leading-7">
              <span className="font-semibold">
                <Highlighter>A Full Stack Developer</Highlighter>
              </span>{" "}
              crafting reliable solutions with Go, React, React Native, Laravel,
              Flutter and cutting-edge cloud technologies. Transforming ideas
              into scalable digital experiences.
            </p>
            <div className="flex items-center gap-8">
              <Button className="rounded-4xl px-4 py-6 font-medium">
                View Projects
              </Button>
              <Button
                className="rounded-4xl border-black px-4 py-6 font-medium"
                variant="outline"
              >
                <Image
                  className="h-4 w-4 grayscale-100"
                  src="/whatsapp.svg"
                  alt="whatsapp logo"
                  width={80}
                  height={80}
                />{" "}
                WhatsApp Me
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute top-1/4 right-4 hidden w-fit space-y-4 md:block">
        <div
          className={cn(
            "floating-element border-primary-red/50 rounded-lg border p-3 font-mono text-xs text-purple-600",
            "bg-linear-to-r from-white to-gray-100",
          )}
        >
          <span className="text-pink-600">const</span> skills = [<br></br>
          &nbsp;&nbsp;<span className="text-green-600">&apos;React&apos;</span>,
          <br />
          &nbsp;&nbsp;<span className="text-green-600">&apos;Go&apos;</span>,
          <br />
          &nbsp;&nbsp;
          <span className="text-green-600">&apos;Flutter&apos;</span>,
          <br />
          &nbsp;&nbsp;
          <span className="text-green-600">&apos;React Native&apos;</span>,
          <br />
          &nbsp;&nbsp;
          <span className="text-green-600">&apos;Laravel&apos;</span>
          <br />
          ];
        </div>
      </div>
      <div className="absolute top-[15%] right-4 hidden w-fit space-y-4 md:block">
        <div className="floating-emoji animate-bounce-slow text-2xl">🚀</div>
      </div>

      <div className="absolute top-1/2 right-4 hidden w-fit space-y-4 md:block">
        <div
          className={cn(
            "floating-element rounded-lg border border-cyan-500/50 p-3 font-mono text-xs text-cyan-600",
            "bg-linear-to-r from-emerald-200/20 to-white",
          )}
        >
          <span className="text-yellow-600">func</span>{" "}
          <span className="text-blue-600">main</span>() &#123;
          <br />
          &nbsp;&nbsp;fmt.Println(
          <span className="text-green-600">&quot;Hello world&quot;</span>)
          <br />
          &#125;
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
