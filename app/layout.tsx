import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { cn } from "@/lib/utils";
import { StickyBanner } from "@/components/ui/sticky-banner";
import { FaFaceSadTear } from "react-icons/fa6";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Joseph Barasa - Full Stack Developer in Kenya",
  description:
    "Experienced Software Developer in Kenya specializing in React, React Native, Golang, Laravel, and Flutter. Known for delivering high-quality solutions on time. Expert in developing with modern frameworks and collaborative software engineering.",
  keywords:
    "software developer kenya, nextjs developer kenya, react developer kenya, laravel developer kenya, joseph barasa, full stack developer nairobi, golang developer kenya, react native developer africa, flutter developer kenya, web developer kenya, mobile app developer kenya",
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "flex min-h-screen flex-col font-sans antialiased",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StickyBanner className="z-[100] bg-linear-to-b from-red-400 to-red-600">
            <p className="mx-0 flex max-w-[90%] items-center gap-2 font-bold text-white drop-shadow-md">
              <FaFaceSadTear className="text-2xl opacity-90" />
              Heads up! This site is still being worked on, so some pages and
              features might not function yet.
            </p>
          </StickyBanner>

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
