import HeroSection from "./_components/hero";
import AboutHome from "./_components/about-home";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutHome />
      <section>
        <h2>Professional Services</h2>
        <div>
          <div>
            <h3>Enterprise Software Development</h3>
            <p className="text-gray-600">
              Custom business solutions including ERP systems, HR management
              platforms and employee tracking software. Focused on scalable,
              secure, and efficient enterprise applications.
            </p>
            <Image
              src="/services/e-s.png"
              alt="enterprise software development"
              width={100}
              height={60}
            />
          </div>
          <div>
            <Image
              src="/services/web-dev.jpg"
              alt="web development"
              width={100}
              height={60}
            />

            <h3>Web Development</h3>
            <p className="text-gray-600">
              Modern web applications and websites using React, and Laravel.
              From company websites to e-commerce platforms and customer-facing
              web portals.
            </p>
          </div>

          <div>
            <h3>Mobile App Development</h3>
            <p className="text-gray-600">
              Cross-platform mobile applications built with React Native and
              Flutter. Specializing in business apps, marketplace solutions, and
              real-time tracking systems. Focus on native-like performance and
              seamless user experience.
            </p>
            <Image
              src="/services/mobile-app-dev.jpg"
              alt="mobile app development"
              width={100}
              height={60}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
