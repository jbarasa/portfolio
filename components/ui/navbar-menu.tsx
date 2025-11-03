"use client";

import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import Link from "next/link";
import {
  HeadsetIcon,
  MailIcon,
  MessageCircleIcon,
  PhoneCallIcon,
} from "lucide-react";
import { Button } from "./button";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

type NavbarPageProps = {
  name: string;
  path: string;
};

const pages: NavbarPageProps[] = [
  { name: "<Home />", path: "/" },
  { name: "<About />", path: "/about" },
  { name: "<Services />", path: "/services" },
  { name: "<MyWork />", path: "/my-work" },
  { name: "<Compendium />", path: "/compendium" },
];

export default function NavbarMenu({ ...className }) {
  const router = useRouter();
  const currentPath = usePathname();
  return (
    <nav
      className={cn(
        "flex items-center justify-between px-24 py-2 rounded-b-3xl h-22 w-full z-99 overflow-hidden",
        "bg-gray-white/30",
        className
      )}
    >
      <div
        className={cn(
          "group flex items-center justify-center gap-2 px-4 py-2",
          "cursor-pointer text-3xl font-bold max-w-fit rounded-xl border-2 border-transparent transition-colors duration-200",
          "hover:border-primary-red "
        )}
        role="button"
        tabIndex={0}
        onClick={() => router.push("/")}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            router.push("/");
          }
        }}
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

      <ul className={cn("flex items-center gap-4 text-md")}>
        {pages.map((page) => {
          const isActive = currentPath.startsWith(page.path);
          return (
            <li key={page.name}>
              <Link
                href={page.path}
                className={cn(
                  "flex items-center px-4 py-2 rounded-xl border-2 border-transparent transition-colors duration-200",
                  "hover:border-primary-red hover:font-medium",
                  {
                    "text-primary-red font-semibold": isActive,
                  }
                )}
              >
                {page.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className={cn("rounded-4xl p-6 text-md font-semibold")}>
            <HeadsetIcon className="stroke-3" /> Let&apos;s Talk
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <PhoneCallIcon /> Voice call
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MessageCircleIcon /> WhatsApp
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MailIcon /> Email
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
