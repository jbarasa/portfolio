import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
