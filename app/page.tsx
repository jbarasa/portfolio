import { Footer } from "@/components/layout";
import { ChatWidget } from "@/components/chat";
import {
  HeroSection,
  ServicesSection,
  HowItWorksSection,
  ProjectsSection,
  BlogSection,
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
      <ProjectsSection />
      <BlogSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <ChatWidget />
    </>
  );
}
