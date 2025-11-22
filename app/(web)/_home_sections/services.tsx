import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function MyServices() {
  return (
    <section className="px-4 py-10 sm:px-8 md:px-24 md:py-35">
      <div className="mx-auto max-w-fit rounded-4xl bg-gray-100 px-4 py-2 md:px-8 dark:bg-gray-700">
        <h2 className="text-lg font-extrabold md:text-2xl">
          Engineering Focus Areas
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-12 py-15 md:grid-cols-3">
        {/* Backend Engineering */}
        <div className="flex h-full flex-col rounded-3xl bg-amber-50 p-8 md:px-12 dark:border dark:border-green-800 dark:bg-green-900/20">
          <h3 className="pb-4 text-xl font-bold text-gray-900 dark:text-white">
            Backend Engineering (Go)
          </h3>
          <p className="pb-8 text-gray-600 dark:text-gray-300">
            Building scalable backend systems with Go, covering API design,
            authentication, distributed processing and high-performance request
            handling. Experience with clean architectures, SQLC, and PostgreSQL.
          </p>

          <div className="relative mr-auto -ml-8 h-[140px] w-[260px] overflow-hidden rounded-r-2xl bg-gray-50 md:-ml-12 md:h-[170px] md:w-[320px] dark:bg-transparent">
            <Image
              className="h-full w-full object-cover"
              src="/services/e-s.jpg"
              alt="backend engineering"
              width={360}
              height={200}
            />
            <div className="pointer-events-none absolute inset-0 rounded-r-2xl bg-transparent dark:bg-black/40" />
          </div>

          <Button className="mt-8 w-full rounded-4xl py-6 font-bold">
            View Work
          </Button>
        </div>

        {/* Web Engineering */}
        <div className="flex h-full flex-col rounded-3xl bg-blue-50 p-8 md:px-12 dark:border dark:border-sky-800 dark:bg-sky-900/20">
          <div className="relative mr-auto -ml-8 h-[140px] w-[230px] overflow-hidden rounded-r-2xl bg-gray-50 md:-ml-12 md:h-[170px] md:w-[300px] dark:bg-transparent">
            <Image
              className="h-full w-full object-cover"
              src="/services/web-dev.jpg"
              alt="web engineering"
              width={300}
              height={200}
            />
            <div className="pointer-events-none absolute inset-0 rounded-r-2xl bg-transparent dark:bg-black/40" />
          </div>

          <h3 className="pt-8 pb-4 text-xl font-bold text-gray-900 dark:text-white">
            Web Engineering (React / Next.js)
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Developing responsive, accessible and scalable web applications
            using React, Next.js and modern UI architectures. Skilled in SSR,
            routing, component systems and performance optimization.
          </p>

          <div className="h-10 md:hidden" />
          <Button className="mt-auto w-full rounded-4xl py-6 font-bold">
            View Work
          </Button>
        </div>

        {/* Mobile Engineering */}
        <div className="flex h-full flex-col rounded-3xl bg-red-50 p-8 md:px-12 dark:border dark:border-rose-800 dark:bg-rose-900/20">
          <h3 className="pb-4 text-xl font-bold text-gray-900 dark:text-white">
            Mobile Engineering (React Native)
          </h3>
          <p className="pb-8 text-gray-600 dark:text-gray-300">
            Building modern cross-platform mobile apps using React Native with
            focus on performance, native modules, navigation patterns and smooth
            end-user experience.
          </p>

          <div className="relative -mr-8 ml-auto h-[140px] w-[260px] overflow-hidden rounded-l-2xl bg-gray-50 md:-mr-12 md:h-[170px] md:w-[340px] dark:bg-transparent">
            <Image
              className="h-full w-full object-cover"
              src="/services/mobile-app-dev.jpg"
              alt="mobile engineering"
              width={400}
              height={220}
            />
            <div className="pointer-events-none absolute inset-0 rounded-l-2xl bg-transparent dark:bg-black/40" />
          </div>

          <Button className="mt-8 w-full rounded-4xl py-6 font-bold">
            View Work
          </Button>
        </div>
      </div>
    </section>
  );
}
