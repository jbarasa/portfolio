"use client";

import React from "react";
import Link from "next/link";
import {
  HiArrowLeft,
  HiDocumentText,
  HiCheckCircle,
  HiBan,
  HiCurrencyDollar,
  HiScale,
  HiRefresh,
  HiMail,
} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa6";

// Contact information
const CONTACT_INFO = {
  email: "jbarasa.ke@gmail.com",
  whatsapp: "+254745536182",
  whatsappLink: "https://wa.me/254745536182",
};

export default function TermsOfService() {
  const lastUpdated = "December 20, 2025";

  const sections = [
    {
      icon: HiCheckCircle,
      title: "Services Provided",
      content: [
        "Custom web application development using React, Next.js, and Golang",
        "Bug fixes, feature development, and code reviews",
        "Technical consultation and architecture planning",
        "Documentation and knowledge transfer",
        "Ongoing maintenance and support (as agreed upon)",
      ],
    },
    {
      icon: HiCurrencyDollar,
      title: "Payment Terms",
      content: [
        "Payment terms are agreed upon before project commencement",
        "Typically, a deposit of 30-50% is required to begin work",
        "Final payment is due upon project completion and approval",
        "Invoices are payable within 14 days unless otherwise agreed",
        "Late payments may incur additional fees as specified in the contract",
      ],
    },
    {
      icon: HiScale,
      title: "Intellectual Property",
      content: [
        "Upon full payment, you own all custom code created specifically for your project",
        "Pre-existing code, libraries, and frameworks remain the property of their respective owners",
        "I retain the right to showcase the work in my portfolio unless otherwise agreed",
        "Open-source components used are subject to their respective licenses",
      ],
    },
    {
      icon: HiBan,
      title: "Limitations & Disclaimers",
      content: [
        "Services are provided 'as is' without warranties of any kind",
        "I am not liable for indirect, incidental, or consequential damages",
        "Project timelines are estimates and may vary based on scope changes",
        "I reserve the right to refuse projects that conflict with my values",
      ],
    },
    {
      icon: HiRefresh,
      title: "Revisions & Changes",
      content: [
        "Minor revisions within the agreed scope are included in the project fee",
        "Significant scope changes may require additional time and cost",
        "All change requests should be documented in writing",
        "Revision rounds are typically limited as specified in the project agreement",
      ],
    },
  ];

  const clientResponsibilities = [
    "Provide clear project requirements and timely feedback",
    "Supply necessary assets, content, and access credentials",
    "Review and approve deliverables within agreed timeframes",
    "Communicate any concerns or issues promptly",
    "Ensure legal rights to use provided content and materials",
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
            <HiDocumentText className="text-white" size={32} />
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600 text-lg">
            Please read these terms carefully before engaging my services.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Introduction */}
        <div className="prose prose-gray max-w-none mb-12">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 sm:p-8">
            <p className="text-gray-700 leading-relaxed m-0">
              These Terms of Service (&quot;Terms&quot;) govern your engagement
              with Jbarasa (&quot;I&quot;, &quot;me&quot;, &quot;my&quot;) for
              freelance development services. By engaging my services, you agree
              to be bound by these Terms. Individual project agreements may
              supplement but not contradict these Terms.
            </p>
          </div>
        </div>

        {/* Main Sections */}
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

        {/* Client Responsibilities */}
        <div className="mt-12 bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl p-6 sm:p-8 text-white">
          <h2 className="font-heading text-xl sm:text-2xl font-bold mb-6">
            Client Responsibilities
          </h2>
          <p className="text-gray-300 mb-6">
            To ensure successful project delivery, clients are expected to:
          </p>
          <ul className="space-y-4">
            {clientResponsibilities.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <HiCheckCircle
                  className="shrink-0 text-green-400 mt-0.5"
                  size={20}
                />
                <span className="text-gray-200">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Termination */}
        <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Termination
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Either party may terminate an engagement with written notice. In
              case of termination:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-3">
                <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                <span>
                  Payment is due for all work completed up to the termination
                  date
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                <span>
                  Deposits may be non-refundable depending on work completed
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                <span>All deliverables paid for will be provided</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                <span>Confidentiality obligations survive termination</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Governing Law */}
        <div className="mt-8 bg-gray-50 rounded-2xl p-6 sm:p-8">
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Governing Law
          </h2>
          <p className="text-gray-600">
            These Terms shall be governed by and construed in accordance with
            the laws of Kenya. Any disputes arising from these Terms or related
            services shall be resolved through good-faith negotiation. If
            negotiation fails, disputes may be submitted to arbitration in
            Nairobi, Kenya.
          </p>
        </div>

        {/* Updates to Terms */}
        <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Updates to These Terms
          </h2>
          <p className="text-gray-600">
            I reserve the right to update these Terms at any time. Changes will
            be effective immediately upon posting to this page. For ongoing
            projects, the Terms in effect at the time of project commencement
            will apply unless both parties agree to updated Terms.
          </p>
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 sm:p-8 text-white">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="shrink-0 w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
              <HiMail className="text-white" size={32} />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="font-heading text-xl sm:text-2xl font-bold mb-2">
                Questions About Terms?
              </h2>
              <p className="text-blue-100 mb-4">
                If you have any questions about these Terms of Service or need
                clarification before engaging my services, feel free to reach
                out.
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
                  href={`${CONTACT_INFO.whatsappLink}?text=Hi%20Jbarasa,%20I%20have%20a%20question%20about%20your%20terms%20of%20service...`}
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
            href="/privacy"
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            View Privacy Policy →
          </Link>
        </div>
      </main>
    </div>
  );
}
