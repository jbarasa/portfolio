import { Footer } from "@/components/layout";
import { ChatWidget } from "@/components/chat";
import {
  HeroSection,
  ServicesSection,
  HowItWorksSection,
  TestimonialsSection,
  FAQSection,
  ContactSection,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <ChatWidget />
    </>
  );
}
