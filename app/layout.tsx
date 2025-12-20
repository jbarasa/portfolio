import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Public_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "@/components/layout/Header";
import { ChatProvider } from "@/lib/context/ChatContext";
import { AuthProvider } from "@/lib/auth";

const geist = Geist({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const publicSans = Public_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default:
      "Joseph Barasa | Freelance React & Golang Developer | Bug Fixes & Feature Completion",
    template: "%s | Jbarasa - Freelance Developer",
  },
  description:
    "I'm Joseph Barasa, a freelance developer specializing in ReactJS and Golang. I fix bugs, complete unfinished features, and stabilize existing systems. Fast, reliable, and available now. Contact: jbarasa.ke@gmail.com | WhatsApp: +254745536182",
  keywords: [
    "Joseph Barasa freelance developer",
    "freelance developer Kenya",
    "React developer",
    "Golang developer",
    "ReactJS bug fixing",
    "Golang backend developer",
    "feature completion",
    "technical documentation",
    "startup developer",
    "indie hacker developer",
    "hire React developer",
    "hire Golang developer",
    "remote developer",
    "API development",
    "code review",
  ],
  authors: [{ name: "Joseph Barasa", url: "https://github.com/jbarasa" }],
  creator: "Joseph Barasa",
  publisher: "Joseph Barasa",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    siteName: "Jbarasa - Freelance Developer",
    title: "Joseph Barasa | Freelance React & Golang Developer | Available Now",
    description:
      "I fix bugs, complete features, and stabilize systems. ReactJS, Golang, and technical documentation. Fast turnaround for startups and indie hackers. Contact: jbarasa.ke@gmail.com",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Jbarasa - Freelance React & Golang Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@jbarasa",
    creator: "@jbarasa",
    title: "Jbarasa | Freelance React & Golang Developer | Available Now",
    description:
      "I fix bugs, complete features, and stabilize systems. Fast turnaround for startups. Contact: jbarasa.ke@gmail.com | WhatsApp: +254745536182",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/apple-icon.svg",
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  },
  category: "technology",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jbarasa",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  email: "jbarasa.ke@gmail.com",
  telephone: "+254745536182",
  jobTitle: "Freelance Software Developer",
  description:
    "Freelance developer specializing in ReactJS and Golang. Bug fixes, feature completion, and technical documentation.",
  knowsAbout: [
    "ReactJS",
    "Golang",
    "Next.js",
    "TypeScript",
    "API Development",
    "Technical Documentation",
  ],
  sameAs: [
    "https://github.com/jbarasa",
    "https://linkedin.com/in/jbarasa",
    "https://twitter.com/jbarasa_ke",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "KE",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+254745536182",
    email: "jbarasa.ke@gmail.com",
    contactType: "customer service",
    availableLanguage: ["English"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geist.variable} ${publicSans.variable} font-body antialiased bg-white text-gray-900`}
      >
        <AuthProvider>
          <ChatProvider>
            <Header />
            <main>{children}</main>
          </ChatProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
