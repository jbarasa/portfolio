'use client';

import React, { useState } from 'react';
import { Section, Heading, Text } from '@/components/ui';
import { HiChevronDown } from 'react-icons/hi';

const faqs = [
  {
    question: "How quickly can you start working on my project?",
    answer:
      "For urgent issues, I can often start the same day or next day. For larger tasks, I usually begin within 2-3 business days after our initial conversation and scope agreement.",
  },
  {
    question: "What if you can't fix the problem?",
    answer:
      "I'll be upfront during the assessment phase if something is outside my expertise or would take longer than expected. If I start work and can't resolve the issue, you won't be charged for unproductive time.",
  },
  {
    question: "Do you work with existing codebases?",
    answer:
      "Yes, that's my specialty. I regularly work with legacy code, incomplete projects, and codebases with little documentation. I'm comfortable diving into unfamiliar code.",
  },
  {
    question: "How do you handle pricing?",
    answer:
      "I work on hourly or fixed-price basis depending on the project scope. After the initial assessment, I'll provide a clear estimate. No hidden fees or surprise charges.",
  },
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section id="faq" background="gray" padding="lg">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Heading as="h2" size="3xl" className="mb-4">
            Frequently Asked Questions
          </Heading>
          <Text size="lg">
            Common questions from founders before they hire.
          </Text>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-heading font-semibold text-gray-900">
                  {faq.question}
                </span>
                <HiChevronDown
                  className={`shrink-0 w-5 h-5 text-gray-400 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <Text className="text-gray-600">{faq.answer}</Text>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default FAQSection;
