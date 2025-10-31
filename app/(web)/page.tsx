import { Button } from "@/components/ui/button";
import { Ripple } from "@/components/ui/ripple";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Home() {
  return (
    <section className="relative min-h-screen px-24 overflow-hidden">
      {/* Code editor */}

      <Image
        className="absolute inset-0 w-full h-full -z-10 object-cover opacity-10"
        src="/hero/code-editor-light.png"
        alt="Code Editor Image"
        fill
        priority
      />

      <Ripple className="absolute bottom-0 w-full h-full -z-8" />

      <h1
        className={cn(
          "pointer-events-none text-7xl font-bold tracking-tight max-w-[60%]"
        )}
      >
        I Turn Complex Ideas Into <span> Clean, Scalable Software</span>
      </h1>
      <div className={cn("flex items-center justify-between")}>
        <div className="flex flex-col flex-1 gap-6">
          <h3 className={cn("text-4xl")}>Hi, I’m Joseph Olunga Barasa - </h3>
          <p>
            A Full Stack Developer crafting reliable solutions with Go, React,
            React Native, Laravel, Flutter and cutting-edge cloud technologies.
            Transforming ideas into scalable digital experiences.
          </p>
          <Button>View Projects</Button>
          <Button variant="outline">Get Estimate</Button>
          <div className="flex gap-4">
            <div className="bg-blue-600 h-20 w-50"></div>
            <div className="bg-blue-600 h-20 w-50"></div>
            <div className="bg-blue-600 h-20 w-50"></div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex-end">
            <Image
              src="/hero/joseph-barasa.png"
              alt="Joseph Barasa's Image"
              width={400}
              height={600}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
