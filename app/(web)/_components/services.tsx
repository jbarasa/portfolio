import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function MyServices() {
  return (
    <section className="px-4 py-10 sm:px-8 md:px-24 md:py-35">
      <div className="mx-auto max-w-fit rounded-4xl bg-gray-100 px-4 py-2 md:px-8">
        <h2 className="text-lg font-extrabold md:text-2xl">
          Professional Services
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-12 py-15 md:grid-cols-3">
        <div className="flex h-full flex-col rounded-3xl bg-amber-50 p-8 md:px-12">
          <h3 className="pb-4 text-xl font-bold">
            Enterprise Software Development
          </h3>
          <p className="pb-8 text-gray-600">
            Custom business solutions including ERP systems, HR management
            platforms and employee tracking software. Focused on scalable,
            secure, and efficient enterprise applications.
          </p>
          <Image
            className="mr-auto -ml-8 h-[140px] w-[260px] rounded-r-2xl md:-ml-12 md:h-[170px] md:w-[320px]"
            src="/services/e-s.jpg"
            alt="enterprise software development"
            width={360}
            height={200}
          />
          <Button className="mt-8 w-full rounded-4xl py-6 font-bold">
            View Projects
          </Button>
        </div>
        <div className="flex h-full flex-col rounded-3xl bg-blue-50 p-8 md:px-12">
          <Image
            className="mr-auto -ml-8 h-[140px] w-[230px] rounded-r-2xl md:-ml-12 md:h-[170px] md:w-[300px]"
            src="/services/web-dev.jpg"
            alt="web development"
            width={300}
            height={200}
          />

          <h3 className="pt-8 pb-4 text-xl font-bold">Web Development</h3>
          <p className="text-gray-600">
            Modern web applications and websites using React, and Laravel. From
            company websites to e-commerce platforms and customer-facing web
            portals.
          </p>
          <div className="h-10 md:hidden"></div>
          <Button className="mt-auto w-full rounded-4xl py-6 font-bold">
            View Projects
          </Button>
        </div>

        <div className="flex h-full flex-col rounded-3xl bg-red-50 p-8 md:px-12">
          <h3 className="pb-4 text-xl font-bold">Mobile App Development</h3>
          <p className="pb-8 text-gray-600">
            Cross-platform mobile applications built with React Native and
            Flutter. Specializing in business apps, marketplace solutions, and
            real-time tracking systems. Focus on native-like performance and
            seamless user experience.
          </p>
          <Image
            className="-mr-8 ml-auto h-[140px] w-[260px] rounded-l-2xl md:-mr-12 md:h-[170px] md:w-[340px]"
            src="/services/mobile-app-dev.jpg"
            alt="mobile app development"
            width={400}
            height={220}
          />
          <Button className="mt-8 w-full rounded-4xl py-6 font-bold">
            View Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
