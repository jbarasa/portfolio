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
  MenuIcon,
  MessageCircleIcon,
  PhoneCallIcon,
  XIcon,
} from "lucide-react";
import { Button } from "./button";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

type NavbarPageProps = {
  name: string;
  path: string;
};

const pages: NavbarPageProps[] = [
  { name: "<Home />", path: "/" },
  { name: "<About />", path: "#about" },
  { name: "<Services />", path: "/services" },
  { name: "<MyWork />", path: "/my-work" },
  { name: "<Compendium />", path: "/compendium" },
];

export default function NavbarMenu({ ...className }) {
  const router = useRouter();
  const currentPath = usePathname();
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    document.body.style.overflow = openMenu ? "hidden" : "";
  }, [openMenu]);

  return (
    <header className="overflow-x-hidden">
      <motion.nav
        initial={{
          y: -100,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          type: "spring", // gives a natural bounce
          stiffness: 100,
          damping: 20,
          duration: 1.2,
        }}
        className={cn(
          "z-99 flex h-22 w-full items-center justify-between overflow-hidden rounded-b-3xl px-4 py-2 sm:px-8 md:px-24",
          "bg-gray-white/30",
          className,
        )}
      >
        <div
          className={cn(
            "group flex items-center justify-center gap-2 py-2 md:px-4",
            "max-w-fit cursor-pointer rounded-xl border-2 border-transparent text-xl font-bold transition-colors duration-200 md:text-3xl",
            "hover:border-primary-red",
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
            className="h-[35px] w-[35px] rounded-full object-cover md:h-[50px] md:w-[50px]"
            src="/logo.jpg"
            alt="Logo"
            width={100}
            height={100}
          />
          <h1 className="tracking-tight">
            <span className="text-primary-red">J</span>BARASA
          </h1>
        </div>

        <ul className={cn("hidden items-center gap-4 text-base md:flex")}>
          {pages.map((page) => {
            const isActive = currentPath.startsWith(page.path);
            return (
              <li key={page.name}>
                <Link
                  href={page.path}
                  className={cn(
                    "flex items-center rounded-xl border-2 border-transparent px-4 py-2 transition-colors duration-200",
                    "hover:border-primary-red hover:font-medium",
                    {
                      "text-primary-red font-semibold": isActive,
                    },
                  )}
                >
                  {page.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="hidden items-center md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className={cn("rounded-4xl p-6 text-base font-semibold")}>
                <HeadsetIcon className="stroke-3" /> Let&apos;s Talk
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px] py-2">
              <DropdownMenuItem className="px-4 text-lg">
                <PhoneCallIcon className="text-lg" /> Voice call
              </DropdownMenuItem>
              <DropdownMenuItem className="px-4 text-lg">
                <MessageCircleIcon className="text-lg" /> WhatsApp
              </DropdownMenuItem>
              <DropdownMenuItem className="px-4 text-lg">
                <MailIcon className="text-lg" /> Email
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile menu button */}
        <button
          className="border-none bg-transparent px-1 py-0 md:hidden"
          aria-label="open menu"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <MenuIcon size={26} />
        </button>
      </motion.nav>
      {/* Drawer Overlay and Menu */}
      <AnimatePresence>
        {openMenu && (
          <>
            {/* Overlay (dark semi-transparent background) */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenMenu(false)}
            />

            {/* Slide-in Drawer */}
            <motion.div
              className="fixed top-0 right-0 z-50 flex h-full w-64 flex-col bg-white px-4 py-6 shadow-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div
                  className={cn(
                    "group flex items-center justify-center gap-2 px-4 py-2",
                    "max-w-fit cursor-pointer rounded-xl border border-transparent text-xl font-bold transition-colors duration-200",
                    "hover:border-primary-red",
                  )}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setOpenMenu(false);
                    router.push("/");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setOpenMenu(false);
                      router.push("/");
                    }
                  }}
                >
                  <Image
                    className="h-[30px] w-[30px] rounded-full object-cover"
                    src="/logo.jpg"
                    alt="Logo"
                    width={100}
                    height={100}
                  />
                  <h1 className="tracking-tight">
                    <span className="text-primary-red">J</span>BARASA
                  </h1>
                </div>
                <button
                  onClick={() => setOpenMenu(false)}
                  className="text-gray-700 hover:text-red-500"
                  aria-label="Close menu"
                >
                  <XIcon size={28} />
                </button>
              </div>
              <ul
                className={cn(
                  "flex w-full flex-col items-start gap-4 text-base",
                )}
              >
                {pages.map((page) => {
                  const isActive = currentPath.startsWith(page.path);
                  return (
                    <li key={page.name} className="w-full">
                      <Link
                        onClick={() => {
                          setOpenMenu(false);
                        }}
                        href={page.path}
                        className={cn(
                          "flex items-center rounded-xl border-2 border-transparent px-4 py-2 transition-colors duration-200",
                          "hover:border-primary-red hover:font-medium",
                          {
                            "text-primary-red font-semibold": isActive,
                          },
                        )}
                      >
                        {page.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
