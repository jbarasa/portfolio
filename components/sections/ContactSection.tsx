"use client";

import React, { useState } from "react";
import { Section, Heading, Text, Button, Card } from "@/components/ui";
import { useChat } from "@/lib/context/ChatContext";
import { HiMail, HiChat, HiPaperAirplane } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa6";

// Contact information
const CONTACT_INFO = {
  email: "jbarasa.ke@gmail.com",
  whatsapp: "+254745536182",
  whatsappLink: "https://wa.me/254745536182",
};

const ContactSection: React.FC = () => {
  const { isOnline, setIsChatOpen } = useChat();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to an API endpoint
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Section id="contact" background="white" padding="lg">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Heading as="h2" size="3xl" className="mb-4">
            Let&apos;s Talk About Your Project
          </Heading>
          <Text size="lg" className="max-w-2xl mx-auto">
            Describe your issue or project, and I&apos;ll get back to you with
            an honest assessment. No pressure, no sales pitch.
          </Text>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card variant="bordered" padding="lg">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HiMail className="text-green-600" size={32} />
                </div>
                <Heading as="h3" size="xl" className="mb-2">
                  Message Sent!
                </Heading>
                <Text>
                  I&apos;ll review your message and get back to you soon.
                </Text>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Tell Me About Your Project
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    placeholder="Describe the bug, feature, or documentation you need help with..."
                  />
                </div>
                <Button
                  type="submit"
                  fullWidth
                  icon={HiPaperAirplane}
                  iconPosition="right"
                >
                  Send Message
                </Button>
              </form>
            )}
          </Card>

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* Direct Contact Options */}
            <Card
              variant="bordered"
              padding="lg"
              className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-500 rounded-lg">
                  <FaWhatsapp className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-gray-900 mb-2">
                    WhatsApp (Fastest Response)
                  </h3>
                  <Text className="mb-3 text-gray-600">
                    Need urgent help? Message me directly on WhatsApp for quick
                    responses.
                  </Text>
                  <a
                    href={`${CONTACT_INFO.whatsappLink}?text=Hi%20Jbarasa,%20I%20need%20help%20with%20my%20project...`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <FaWhatsapp size={18} />
                    {CONTACT_INFO.whatsapp}
                  </a>
                </div>
              </div>
            </Card>

            {/* Email Contact */}
            <Card variant="bordered" padding="lg">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <HiMail className="text-blue-600" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-gray-900 mb-2">
                    Email Me
                  </h3>
                  <Text className="mb-3 text-gray-600">
                    Prefer email? Send me details about your project.
                  </Text>
                  <a
                    href={`mailto:${CONTACT_INFO.email}?subject=Project%20Inquiry`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <HiMail size={18} />
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>
            </Card>

            {/* Live Chat Option */}
            <Card variant="bordered" padding="lg">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <HiChat className="text-purple-600" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-gray-900 mb-2">
                    Live Chat
                  </h3>
                  {isOnline ? (
                    <>
                      <Text className="mb-3 text-gray-600">
                        I&apos;m online right now. Click to start a
                        conversation.
                      </Text>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setIsChatOpen(true)}
                        icon={HiChat}
                      >
                        Start Live Chat
                      </Button>
                    </>
                  ) : (
                    <Text className="text-gray-500">
                      I&apos;m currently offline. Use WhatsApp or email above
                      for fastest response.
                    </Text>
                  )}
                </div>
              </div>
            </Card>

            {/* What to Include */}
            <Card variant="bordered" padding="lg">
              <h3 className="font-heading font-semibold text-gray-900 mb-4">
                What to Include
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
                  <span>Brief description of the issue or feature</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
                  <span>Technologies involved (React, Go, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
                  <span>Any deadline or time constraints</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
                  <span>Link to repo or codebase (if available)</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ContactSection;
