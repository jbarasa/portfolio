import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Joseph Barasa handles your personal data. Our privacy policy explains data collection, usage, security measures, and your rights. Contact: jbarasa.ke@gmail.com | WhatsApp: +254745536182",
  keywords: [
    "privacy policy",
    "data protection",
    "Jbarasa privacy",
    "freelance developer privacy",
    "GDPR",
    "data security",
  ],
  openGraph: {
    title: "Privacy Policy | Joseph Barasa | Jbarasa - Freelance Developer",
    description:
      "Learn how Joseph Barasa handles your personal data. Transparent privacy practices for freelance development services.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | Jbarasa",
    description:
      "Learn how Jbarasa handles your personal data. Transparent privacy practices.",
  },
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
