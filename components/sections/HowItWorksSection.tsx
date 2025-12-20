"use client";

import React from "react";
import { Section, Heading, Text, StepCard } from "@/components/ui";

const steps = [
  {
    step: 1,
    title: "Tell Me About Your Problem",
    description:
      "Start a chat or send me a message describing the issue. Include any relevant code, error messages, or context.",
  },
  {
    step: 2,
    title: "Quick Assessment",
    description:
      "I'll review your situation and give you an honest estimate of time and effort. No commitment required.",
  },
  {
    step: 3,
    title: "I Get to Work",
    description:
      "Once we agree on scope, I start immediately. You'll get regular updates and clear communication.",
  },
  {
    step: 4,
    title: "Delivered & Documented",
    description:
      "You receive working code with clear documentation. I make sure you understand what was done and why.",
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <Section id="how-it-works" background="white" padding="lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
        <div className="text-center lg:text-left">
          <Heading as="h2" size="3xl" className="mb-3 sm:mb-4">
            How It Works
          </Heading>
          <Text
            size="lg"
            className="mb-4 sm:mb-6 text-sm sm:text-base md:text-lg"
          >
            Simple, straightforward process. No complex contracts or lengthy
            onboarding. Just practical help when you need it.
          </Text>
          <Text className="text-gray-500 text-sm sm:text-base">
            Most issues can be assessed within hours, and many fixes are
            completed within 24-48 hours.
          </Text>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {steps.map((step) => (
            <StepCard
              key={step.step}
              step={step.step}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default HowItWorksSection;
