import { AuroraText } from "@/components/ui/aurora-text";
import { Button } from "@/components/ui/button";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { Highlighter } from "@/components/ui/highlighter";
import { LightRays } from "@/components/ui/light-rays";
import NavbarMenu from "@/components/ui/navbar-menu";
import { WordByWordEffect } from "@/components/ui/word-by-word-effect";
import { cn } from "@/lib/utils";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <NavbarMenu classname="absolute top-0 left-0 right-0 z-99" />
      <Image
        className="absolute inset-0 w-full h-full object-cover -z-20 opacity-20"
        src="/hero/hero-bg.svg"
        alt="hero background"
        fill
        priority
      />
      <LightRays className="w-full h-full -z-10" />
      <FlickeringGrid
        className="absolute inset-0 w-full h-full -z-8 mask-[radial-gradient(55rem_circle_at_center,white,transparent)]"
        squareSize={4}
        gridGap={6}
        maxOpacity={0.15}
        flickerChance={0.6}
      />
      <div className="px-24">
        <WordByWordEffect>
          <h1 className="pt-45 pl-8 pointer-events-none text-7xl font-bold tracking-tight max-w-[60%]">
            <span
              className="word-span opacity-0"
              style={{ filter: "blur(10px)" }}
            >
              I{" "}
            </span>
            <span
              className="word-span opacity-0"
              style={{ filter: "blur(10px)" }}
            >
              Turn{" "}
            </span>
            <span
              className="word-span opacity-0"
              style={{ filter: "blur(10px)" }}
            >
              Complex{" "}
            </span>
            <span
              className="word-span opacity-0"
              style={{ filter: "blur(10px)" }}
            >
              Ideas{" "}
            </span>
            <span
              className="word-span opacity-0"
              style={{ filter: "blur(10px)" }}
            >
              Into{" "}
            </span>
            <AuroraText>
              <span
                className="word-span opacity-0"
                style={{ filter: "blur(10px)" }}
              >
                Clean,{" "}
              </span>
              <span
                className="word-span opacity-0"
                style={{ filter: "blur(10px)" }}
              >
                Scalable{" "}
              </span>
              <span
                className="word-span opacity-0"
                style={{ filter: "blur(10px)" }}
              >
                Software
              </span>
            </AuroraText>
          </h1>
        </WordByWordEffect>
        <div className={cn("flex items-start justify-between pt-20")}>
          <div
            className={cn(
              "flex flex-col flex-1 gap-8 max-w-150 rounded-3xl p-8",
              "backdrop-blur-sm"
            )}
          >
            <h3 className={cn("text-4xl")}>Hi, I’m Joseph Olunga Barasa - </h3>
            <p className="text-lg leading-7 text-muted-foreground">
              A{" "}
              <span className="font-semibold">
                <Highlighter>Full Stack Developer</Highlighter>
              </span>{" "}
              crafting reliable solutions with Go, React, React Native, Laravel,
              Flutter and cutting-edge cloud technologies. Transforming ideas
              into scalable digital experiences.
            </p>
            <div className="flex items-center gap-8">
              <Button className="py-8 px-12 text-lg font-medium rounded-4xl">
                View Projects
              </Button>
              <Button
                className="border-black py-8 px-12 text-lg font-medium rounded-4xl"
                variant="outline"
              >
                Get Estimate
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <div className="absolute bottom-0 right-0">
              <Image
                className="object-contain hover:grayscale-100 transition-all ease-linear duration-200"
                src="/hero/joseph-barasa.png"
                alt="Joseph Barasa's Image"
                width={750}
                height={950}
                priority
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-1/4 right-4 space-y-4 w-fit">
        <div className="floating-element bg-linear-to-r from-white to-gray-100 p-3 rounded-lg border border-primary-red/50 text-purple-600 font-mono text-xs">
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
      <div className="absolute top-[15%] right-4 space-y-4 w-fit">
        <div className="floating-emoji text-2xl animate-bounce-slow">🚀</div>
      </div>

      <div className="absolute top-1/2 right-4 space-y-4 w-fit">
        <div className="floating-element bg-linear-to-r from-emerald-200/20 to-white p-3 rounded-lg border border-cyan-500/50 text-cyan-600 font-mono text-xs">
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
