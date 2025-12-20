"use client";

import React from "react";
import { Section, Heading, Text, Card, Badge } from "@/components/ui";
import { HiInformationCircle } from "react-icons/hi";

const TestimonialsSection: React.FC = () => {
  return (
    <Section id="testimonials" background="white" padding="md">
      <Card variant="bordered" className="max-w-2xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <HiInformationCircle className="text-blue-500" size={24} />
          <Badge variant="info">Building Trust</Badge>
        </div>
        <Heading as="h3" size="xl" className="mb-4">
          I&apos;m Currently Building My Client Portfolio
        </Heading>
        <Text className="text-gray-600">
          I&apos;m new to freelancing but not to development. I have hands-on
          experience with React and Go in real projects. Instead of inventing
          testimonials, I prefer to earn them through quality work.
        </Text>
        <Text className="text-gray-500 mt-4 text-sm">
          Your project could be the start of a great working relationship.
        </Text>
      </Card>
    </Section>
  );
};

export default TestimonialsSection;
