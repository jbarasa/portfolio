import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function MyServices() {
  return (
    <section className="py-35 px-24">
      <div className=" bg-gray-100  px-8 py-2 max-w-fit mx-auto rounded-4xl">
        <h2 className="font-extrabold text-2xl">Professional Services</h2>
      </div>
      <div className="grid grid-cols-3 gap-12 py-15">
        <div className="bg-amber-50 px-12 py-8 rounded-3xl flex flex-col h-full">
          <h3 className="text-xl font-bold pb-4">
            Enterprise Software Development
          </h3>
          <p className="text-gray-600 pb-8">
            Custom business solutions including ERP systems, HR management
            platforms and employee tracking software. Focused on scalable,
            secure, and efficient enterprise applications.
          </p>
          <Image
            className="mr-auto -ml-12 w-[320px] h-[170px] rounded-r-2xl"
            src="/services/e-s.jpg"
            alt="enterprise software development"
            width={360}
            height={200}
          />
          <Button className="w-full py-6 rounded-4xl font-bold mt-8">
            View Projects
          </Button>
        </div>
        <div className="bg-blue-50 px-12 py-8 rounded-3xl flex flex-col h-full">
          <Image
            className="mr-auto -ml-12 w-[280px] h-[180px] rounded-r-2xl"
            src="/services/web-dev.jpg"
            alt="web development"
            width={300}
            height={200}
          />

          <h3 className="text-xl font-bold pt-8 pb-4">Web Development</h3>
          <p className="text-gray-600">
            Modern web applications and websites using React, and Laravel. From
            company websites to e-commerce platforms and customer-facing web
            portals.
          </p>
          <Button className="w-full py-6 rounded-4xl font-bold mt-auto">
            View Projects
          </Button>
        </div>

        <div className="bg-red-50 px-12 py-8 rounded-3xl flex flex-col h-full">
          <h3 className="text-xl font-bold pb-4">Mobile App Development</h3>
          <p className="text-gray-600 pb-8">
            Cross-platform mobile applications built with React Native and
            Flutter. Specializing in business apps, marketplace solutions, and
            real-time tracking systems. Focus on native-like performance and
            seamless user experience.
          </p>
          <Image
            className="ml-auto -mr-12 w-[340px] h-[170px] rounded-l-2xl"
            src="/services/mobile-app-dev.jpg"
            alt="mobile app development"
            width={400}
            height={220}
          />
          <Button className="w-full py-6 rounded-4xl font-bold mt-8">
            View Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
