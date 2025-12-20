"use client";

import React from "react";
import { Section, Heading, Text, Button } from "@/components/ui";
import { HiArrowRight, HiClock, HiMail } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa6";

// Contact information
const CONTACT_INFO = {
  email: "jbarasa.ke@gmail.com",
  whatsapp: "+254745536182",
  whatsappLink: "https://wa.me/254745536182",
};

const HeroSection: React.FC = () => {
  return (
    <Section background="white" padding="lg" className="pt-6 sm:pt-8 md:pt-16">
      <div className="max-w-3xl mx-auto text-center px-2">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-green-50 border border-green-200 rounded-full mb-4 sm:mb-6">
          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs sm:text-sm font-medium text-green-700">
            Available for immediate work
          </span>
        </div>

        {/* Main Headline */}
        <Heading as="h1" size="5xl" className="mb-4 sm:mb-6">
          Your Code Needs Fixing?
          <br />
          <span className="text-blue-600">I&apos;ll Handle It.</span>
        </Heading>

        {/* Subheadline */}
        <Text
          size="xl"
          className="mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl"
        >
          Freelance developer specializing in React and Golang. I fix bugs,
          complete unfinished features, and stabilize systems for startups and
          indie hackers.
        </Text>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a
            href={`${CONTACT_INFO.whatsappLink}?text=Hi%20Jbarasa,%20I%20need%20help%20with%20my%20project...`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-all duration-300 shadow-lg shadow-green-500/25"
          >
            <FaWhatsapp size={20} />
            WhatsApp Me Now
          </a>
          <a href="#contact" className="w-full sm:w-auto">
            <Button
              size="lg"
              icon={HiArrowRight}
              iconPosition="right"
              fullWidth
              className="sm:w-auto"
            >
              Start a Conversation
            </Button>
          </a>
        </div>

        {/* Quick Contact Info */}
        <div className="mt-6 sm:mt-8 flex flex-col xs:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-600">
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="flex items-center gap-2 hover:text-blue-600 transition-colors"
          >
            <HiMail className="text-blue-500" size={16} />
            <span>{CONTACT_INFO.email}</span>
          </a>
          <a
            href={`${CONTACT_INFO.whatsappLink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-green-600 transition-colors"
          >
            <FaWhatsapp className="text-green-500" size={16} />
            <span>{CONTACT_INFO.whatsapp}</span>
          </a>
        </div>

        {/* Trust indicators */}
        <div className="mt-4 sm:mt-6 flex flex-col xs:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <HiClock className="text-blue-500" />
            <span>Fast turnaround</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-gray-400 rounded-full" />
            <span>Honest communication</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-gray-400 rounded-full" />
            <span>No hype, just results</span>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default HeroSection;
