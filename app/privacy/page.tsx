"use client";

import React from "react";
import Link from "next/link";
import {
  HiArrowLeft,
  HiShieldCheck,
  HiLockClosed,
  HiEye,
  HiUserGroup,
  HiClock,
  HiMail,
} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa6";

// Contact information
const CONTACT_INFO = {
  email: "jbarasa.ke@gmail.com",
  whatsapp: "+254745536182",
  whatsappLink: "https://wa.me/254745536182",
};

export default function PrivacyPolicy() {
  const lastUpdated = "December 20, 2025";

  const sections = [
    {
      icon: HiEye,
      title: "Information We Collect",
      content: [
        "Contact information (name, email address) when you reach out through our contact form or chat widget",
        "Technical data such as browser type, device information, and IP address for analytics purposes",
        "Chat messages and conversation history when using our live chat feature",
        "Any additional information you voluntarily provide during our communications",
      ],
    },
    {
      icon: HiUserGroup,
      title: "How We Use Your Information",
      content: [
        "To respond to your inquiries and provide customer support",
        "To communicate with you about projects and services",
        "To improve our website and user experience through analytics",
        "To send project updates and relevant communications (with your consent)",
      ],
    },
    {
      icon: HiLockClosed,
      title: "Data Security",
      content: [
        "We implement industry-standard security measures to protect your data",
        "All data transmission is encrypted using SSL/TLS protocols",
        "We use secure third-party services (Clerk for authentication, Supabase for data storage)",
        "Access to personal data is restricted to authorized personnel only",
      ],
    },
    {
      icon: HiShieldCheck,
      title: "Your Rights",
      content: [
        "Right to access: Request a copy of your personal data",
        "Right to rectification: Request correction of inaccurate data",
        "Right to erasure: Request deletion of your personal data",
        "Right to data portability: Receive your data in a structured format",
      ],
    },
    {
      icon: HiClock,
      title: "Data Retention",
      content: [
        "We retain your data only as long as necessary for the purposes outlined",
        "Chat messages are retained for project reference and support purposes",
        "You may request deletion of your data at any time by contacting us",
        "Analytics data is anonymized and aggregated after 90 days",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <HiArrowLeft size={20} />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 mb-6">
            <HiShieldCheck className="text-white" size={32} />
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 text-lg">
            Your privacy is important to us. This policy explains how we handle
            your data.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Introduction */}
        <div className="prose prose-gray max-w-none mb-12">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 sm:p-8">
            <p className="text-gray-700 leading-relaxed m-0">
              At Jbarasa, I am committed to protecting your privacy and ensuring
              the security of your personal information. This Privacy Policy
              describes how I collect, use, and safeguard your data when you
              visit my website or engage my freelance services.
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <section.icon className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                    {section.title}
                  </h2>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                        <span className="text-gray-600 leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Third-Party Services */}
        <div className="mt-12 bg-gray-50 rounded-2xl p-6 sm:p-8">
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Third-Party Services
          </h2>
          <p className="text-gray-600 mb-4">
            We use the following third-party services that may collect data:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { name: "Clerk", purpose: "Authentication and user management" },
              { name: "Supabase", purpose: "Database and real-time features" },
              { name: "Vercel", purpose: "Website hosting and analytics" },
              { name: "Google Analytics", purpose: "Website traffic analysis" },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 border border-gray-200"
              >
                <p className="font-semibold text-gray-900">{service.name}</p>
                <p className="text-sm text-gray-500">{service.purpose}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 sm:p-8 text-white">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="shrink-0 w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
              <HiMail className="text-white" size={32} />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="font-heading text-xl sm:text-2xl font-bold mb-2">
                Questions About Privacy?
              </h2>
              <p className="text-blue-100 mb-4">
                If you have any questions or concerns about this Privacy Policy,
                please don&apos;t hesitate to reach out.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                >
                  <HiMail size={20} />
                  {CONTACT_INFO.email}
                </a>
                <a
                  href={`${CONTACT_INFO.whatsappLink}?text=Hi%20Jbarasa,%20I%20have%20a%20question%20about%20your%20privacy%20policy...`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors"
                >
                  <FaWhatsapp size={20} />
                  {CONTACT_INFO.whatsapp}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-12 text-center">
          <Link
            href="/terms"
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            View Terms of Service →
          </Link>
        </div>
      </main>
    </div>
  );
}
