import { cn } from "@/lib/utils";
import ReactLenis from "lenis/react";
import Image from "next/image";
import Link from "next/link";

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ReactLenis root />
      {children}
      <footer className="py-10 px-24 flex flex-col items-center justify-between gap-8">
        <div
          className={cn(
            "group flex items-center justify-center gap-x-2 px-4 py-2",
            "cursor-pointer text-3xl font-bold max-w-fit rounded-xl"
          )}
        >
          <Image
            className="rounded-full w-[50px] h-[50px] object-cover"
            src="/logo.jpg"
            alt="Logo"
            width={100}
            height={100}
          />
          <h1 className="tracking-tight">
            <span className="text-primary-red">J</span>BARASA
          </h1>
        </div>
        <div className="flex gap-x-4 text-gray-600">
          <Link href="">Terms</Link> | <Link href="">Privacy Policy</Link>
        </div>
        <div className="flex gap-x-4 mt-6">
          <Image
            className="w-[35px] h-[35px]"
            src="/footer/github.svg"
            alt="github logo"
            width={100}
            height={100}
          />
          <Image
            className="w-[42px] h-[42px] -mt-0.5"
            src="/footer/linked-in.svg"
            alt="linked-in logo"
            width={100}
            height={100}
          />
          <Image
            className="w-[33px] h-[33px] mt-0.5"
            src="/footer/twitter-x.png"
            alt="twitter-x logo"
            width={100}
            height={100}
          />
          <Image
            className="w-[39px] h-[39px] -mt-0.5"
            src="/footer/reddit.svg"
            alt="reddit logo"
            width={100}
            height={100}
          />
          <Image
            className="w-[36px] h-[36px]"
            src="/footer/discord.svg"
            alt="discord logo"
            width={100}
            height={100}
          />
        </div>
        <p className="mt-auto -mb-4">
          &copy; {new Date().getFullYear()} Joseph Olunga Barasa | All rights
          reserved.
        </p>
      </footer>
    </>
  );
}
