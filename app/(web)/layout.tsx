import { cn } from "@/lib/utils";
import ReactLenis from "lenis/react";
import Image from "next/image";
import Link from "next/link";
import {
  FaDiscord,
  FaGithub,
  FaLinkedinIn,
  FaReddit,
  FaSquareXTwitter,
} from "react-icons/fa6";

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ReactLenis root />
      {children}
      <footer className="flex flex-col items-center justify-between gap-8 px-4 py-10 sm:px-8 md:px-24">
        <div
          className={cn(
            "group flex items-center justify-center gap-x-2 px-4 py-2",
            "max-w-fit cursor-pointer rounded-xl text-3xl font-bold",
          )}
        >
          <Image
            className="h-[50px] w-[50px] rounded-full object-cover"
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
        <div className="mt-6 flex gap-x-4">
          <FaGithub size={36} />
          <FaLinkedinIn size={36} />
          <FaSquareXTwitter size={36} />
          <FaReddit size={36} />
          <FaDiscord size={36} />
        </div>
        <p className="mt-auto -mb-4 text-center">
          &copy; {new Date().getFullYear()} Joseph Olunga Barasa | All rights
          reserved.
        </p>
      </footer>
    </>
  );
}
