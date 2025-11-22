"use client";

import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import Link from "next/link";
import {
  HeadsetIcon,
  MailIcon,
  MenuIcon,
  MessageCircleIcon,
  PhoneCallIcon,
  XIcon,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import ThemeToggle from "../_home_sections/theme-toggle";

type NavbarPageProps = {
  name: string;
  path: string;
};

const pages: NavbarPageProps[] = [
  { name: "<Home />", path: "/" },
  { name: "<About />", path: "/about" },
  { name: "<MyWork />", path: "/my-work" },
  { name: "<Compendium />", path: "/compendium" },
];

export default function NavbarMenu({
  className,
  headerClassname,
}: {
  className?: string;
  headerClassname?: string;
}) {
  const router = useRouter();
  const currentPath = usePathname();
  const [openMenu, setOpenMenu] = useState(false);

  // NEW: sticky hide-on-scroll-down / show-on-scroll-up + backdrop blur when shown
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = openMenu ? "hidden" : "";
  }, [openMenu]);

  useEffect(() => {
    let lastY = typeof window !== "undefined" ? window.scrollY : 0;
    let ticking = false;

    const onScroll = () => {
      const y = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(y > 10);
          // hide when scrolling down and past a threshold, show when scrolling up
          if (y > lastY && y > 80) {
            setHidden(true);
          } else {
            setHidden(false);
          }
          lastY = y;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("z-50 overflow-x-hidden", headerClassname)}>
      <motion.nav
        initial={{ y: -120, opacity: 0 }}
        animate={hidden ? { y: -120, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 22,
          duration: 0.6,
        }}
        className={cn(
          "flex w-full items-center justify-between overflow-hidden rounded-b-3xl px-4 py-2 sm:px-8 md:px-24",
          // base transparent look when at top, switch to blurred backdrop when scrolled and visible
          scrolled && !hidden
            ? "bg-gray-100/50 shadow-sm backdrop-blur-sm dark:bg-gray-900/40"
            : "bg-transparent",
          // keep a subtle default for dark mode when not scrolled
          "transition-all duration-250 ease-in-out",
          className,
        )}
      >
        <div
          className={cn(
            "group flex items-center justify-center gap-2 py-2 md:px-4",
            "max-w-fit cursor-pointer rounded-xl border-2 border-transparent text-xl font-bold transition-colors duration-200 md:text-3xl",
            "hover:border-red-500 dark:hover:border-red-300",
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
            <span className="text-red-500 dark:text-red-300">J</span>BARASA
          </h1>
        </div>

        <ul className={cn("hidden items-center gap-4 text-base md:flex")}>
          {pages.map((page) => {
            const isActive = currentPath?.startsWith(page.path);
            return (
              <li key={page.name}>
                <Link
                  href={page.path}
                  className={cn(
                    "flex items-center rounded-xl border-2 border-transparent px-4 py-2 transition-colors duration-200",
                    "hover:border-red-500 hover:font-medium dark:hover:border-red-300",
                    {
                      "font-semibold text-red-500 dark:text-red-300": isActive,
                    },
                  )}
                >
                  {page.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="hidden items-center gap-4 md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className={cn("rounded-4xl p-6 text-base font-semibold")}>
                <HeadsetIcon className="stroke-3" /> Let&apos;s Talk
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px] py-2">
              <DropdownMenuItem className="px-4 text-lg">
                <PhoneCallIcon /> Voice call
              </DropdownMenuItem>
              <DropdownMenuItem className="px-4 text-lg">
                <MessageCircleIcon /> WhatsApp
              </DropdownMenuItem>
              <DropdownMenuItem className="px-4 text-lg">
                <MailIcon /> Email
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeToggle />
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
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 dark:bg-black/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenMenu(false)}
            />

            <motion.div
              className="fixed top-0 right-0 z-80 flex h-full w-64 flex-col bg-white px-4 py-6 shadow-xl dark:bg-gray-900"
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
                    "hover:border-red-500 dark:hover:border-red-300",
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
                    <span className="text-red-500 dark:text-red-300">J</span>
                    BARASA
                  </h1>
                </div>
                <button
                  onClick={() => setOpenMenu(false)}
                  className="text-gray-700 hover:text-red-500 dark:text-gray-200 dark:hover:text-red-300"
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
                  const isActive = currentPath?.startsWith(page.path);
                  return (
                    <li key={page.name} className="w-full">
                      <Link
                        onClick={() => {
                          setOpenMenu(false);
                        }}
                        href={page.path}
                        className={cn(
                          "flex items-center rounded-xl border-2 border-transparent px-4 py-2 transition-colors duration-200",
                          "hover:border-red-500 hover:font-medium dark:hover:border-red-300",
                          {
                            "font-semibold text-red-500 dark:text-red-300":
                              isActive,
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
