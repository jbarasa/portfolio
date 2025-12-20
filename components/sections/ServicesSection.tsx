"use client";

import React from "react";
import { Section, Heading, Text, ServiceCard } from "@/components/ui";
import { FaReact, FaGolang } from "react-icons/fa6";
import { HiDocumentText } from "react-icons/hi";

const services = [
  {
    icon: FaReact,
    title: "ReactJS Bug Fixing & Features",
    description:
      "Stuck on a React bug or have an unfinished feature? I diagnose issues quickly and implement clean, maintainable solutions.",
    features: [
      "Component debugging & optimization",
      "State management fixes",
      "UI/UX implementation",
      "Performance improvements",
    ],
  },
  {
    icon: FaGolang,
    title: "Golang Backend & API Work",
    description:
      "Backend issues slowing you down? I fix Go services, stabilize APIs, and resolve database integration problems.",
    features: [
      "API endpoint fixes",
      "Database query optimization",
      "Error handling improvements",
      "Service stabilization",
    ],
  },
  {
    icon: HiDocumentText,
    title: "Technical Documentation",
    description:
      "Missing or outdated docs? I write clear README files, API documentation, and setup guides that developers actually find useful.",
    features: [
      "README & quickstart guides",
      "API documentation",
      "Architecture documentation",
      "Setup & deployment guides",
    ],
  },
];

const ServicesSection: React.FC = () => {
  return (
    <Section id="services" background="gray" padding="lg">
      <div className="text-center mb-8 sm:mb-12">
        <Heading as="h2" size="3xl" className="mb-3 sm:mb-4">
          What I Can Help With
        </Heading>
        <Text
          size="lg"
          className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg"
        >
          Focused services for teams with broken, incomplete, or undocumented
          code. No project is too messy.
        </Text>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service.title}
            icon={service.icon}
            title={service.title}
            description={service.description}
            features={service.features}
          />
        ))}
      </div>
    </Section>
  );
};

export default ServicesSection;
