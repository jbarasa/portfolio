import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Joseph Barasa's freelance development services. Clear terms for ReactJS, Golang development, bug fixes, and technical documentation. Contact: jbarasa.ke@gmail.com | WhatsApp: +254745536182",
  keywords: [
    "terms of service",
    "freelance terms",
    "Jbarasa terms",
    "development contract",
    "service agreement",
    "freelance developer terms",
  ],
  openGraph: {
    title: "Terms of Service | Joseph Barasa | Jbarasa - Freelance Developer",
    description:
      "Clear and transparent terms for freelance ReactJS and Golang development services.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service | Joseph Barasa | Jbarasa",
    description:
      "Clear and transparent terms for freelance development services.",
  },
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
