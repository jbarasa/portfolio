import Image from "next/image";
import Link from "next/link";
import MySkills from "./_about/my-skills";

export default function TechStack() {
  return (
    <section className="bg-cyan-50/20 px-4 py-10 sm:px-8 md:px-24 md:py-35">
      <div className="mx-auto max-w-fit rounded-4xl bg-gray-100 px-4 py-2 md:px-8">
        <h2 className="text-lg font-extrabold md:text-2xl">My Coding Stack</h2>
      </div>
      <div className="grid grid-cols-1 gap-x-12 gap-y-18 py-18 md:grid-cols-3">
        <MySkills
          skill={
            <Link href="https://go.dev" target="_blank">
              Golang
            </Link>
          }
          skillImage="/about/go.png"
          why={
            <p className="text-sm md:text-base">
              I use Go for backend APIs — it&apos;s blazing fast, efficient, and
              designed for concurrency, perfect for systems-level design and
              performance-driven logic.
            </p>
          }
          how={
            <p className="text-sm md:text-base">
              I leverage <span className="font-semibold">Echo</span> and{" "}
              <span className="font-semibold">Fiber</span> frameworks for
              RESTful APIs, focusing on backend-only implementations. These
              frameworks offer excellent performance and simple routing
              patterns. I strictly use Go for API development rather than
              full-stack solutions, paired with modern deployment on VPS
              servers.
            </p>
          }
        />
        <MySkills
          skill={
            <Link href="https://laravel.com/" target="_blank">
              Laravel
            </Link>
          }
          skillImage="/about/laravel.jpg"
          why={
            <p className="text-sm md:text-base">
              Perfect for rapid full-stack development with built-in
              authentication, database management, and template engine. Ideal
              for projects requiring shared hosting compatibility and quick
              deployment.
            </p>
          }
          how={
            <p className="text-sm md:text-base">
              I utilize Laravel&apos;s MVC architecture for complete web
              applications, leveraging Blade templating and built-in features
              like authentication, database migrations, and Eloquent ORM.
              Excellent for projects needing shared hosting deployment.
            </p>
          }
        />
        <MySkills
          skill={
            <Link href="https://react.dev/" target="_blank">
              React
            </Link>
          }
          skillImage="/about/react.png"
          why={
            <p className="text-sm md:text-base">
              I choose <span className="font-semibold">Next.js</span> for
              SEO-critical projects and server-side rendering needs, while{" "}
              <span className="font-semibold">React Router</span> for
              client-side SPAs. Next.js offers better performance and built-in
              optimizations, while React Router provides simpler deployment and
              lighter builds.
            </p>
          }
          how={
            <p className="text-sm md:text-base">
              For <span className="font-semibold">Next.js</span> projects, I
              leverage its file-based routing, API routes, and server
              components. With{" "}
              <span className="font-semibold">React Router</span>, I focus on
              client-side state management and routing for simpler applications.
              Both approaches use modern React patterns and hooks.
            </p>
          }
        />
        <div className="flex max-w-2xl flex-col gap-4 p-4">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-[100%] md:h-20 md:w-20">
              <Image
                src="/about/r-native.png"
                alt="React native logo"
                className="h-12 w-12 rounded-[100%] object-cover md:h-20 md:w-20"
                width={100}
                height={100}
              />
            </div>

            <div className="-ml-8 flex h-12 w-12 items-center justify-center rounded-[100%] md:h-20 md:w-20">
              <Image
                src="/about/flutter.jpg"
                alt="Flutter Logo"
                className="h-12 w-12 rounded-[100%] object-cover md:h-20 md:w-20"
                width={100}
                height={100}
              />
            </div>
          </div>
          <div className="pt-1 md:pt-2">
            <h2 className="text-lg font-bold md:text-xl">Mobile Development</h2>
            <div className="mt-4 max-w-fit rounded-4xl bg-gray-100 px-2">
              <h4 className="text-xs font-semibold text-gray-500 md:text-sm">
                <Link href="https://reactnative.dev/" target="_blank">
                  React Native
                </Link>
              </h4>
            </div>
            <p className="text-sm md:text-base">
              I use React Native for cross-platform apps requiring deep OS
              integration and when JavaScript ecosystem compatibility is
              important. Perfect for leveraging existing React knowledge.
            </p>
            <div className="mt-4 max-w-fit rounded-4xl bg-gray-100 px-2">
              <h4 className="text-xs font-semibold text-gray-500 md:text-sm">
                <Link href="https://flutter.dev/" target="_blank">
                  Flutter
                </Link>
              </h4>
            </div>
            <p className="text-sm md:text-base">
              I choose Flutter for apps needing pixel-perfect designs and
              superior performance. Its widget-based architecture and hot reload
              make it excellent for rapid development of beautiful UIs.
            </p>
          </div>
        </div>
        <div className="flex max-w-2xl flex-col gap-4 p-4">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-[100%] md:h-20 md:w-20">
              <Image
                src="/about/postgres.jpg"
                alt="React native logo"
                className="h-12 w-12 rounded-[100%] object-cover md:h-20 md:w-20"
                width={100}
                height={100}
              />
            </div>

            <div className="-ml-8 flex h-12 w-12 items-center justify-center rounded-[100%] md:h-20 md:w-20">
              <Image
                src="/about/maria-db.jpg"
                alt="Flutter Logo"
                className="h-12 w-12 rounded-[100%] object-cover md:h-20 md:w-20"
                width={100}
                height={100}
              />
            </div>
          </div>
          <div className="pt-1 md:pt-2">
            <h2 className="text-lg font-bold md:text-xl">Databases</h2>
            <div className="mt-4 max-w-fit rounded-4xl bg-gray-100 px-2">
              <h4 className="text-sm font-semibold text-gray-500">
                <Link href="https://www.postgresql.org/" target="_blank">
                  PostgreSQL
                </Link>
              </h4>
            </div>
            <p className="text-sm md:text-base">
              My go-to for complex applications requiring advanced features like
              JSON storage, full-text search, and strict data integrity. Perfect
              for scalable applications and complex queries.
            </p>
            <div className="mt-4 max-w-fit rounded-4xl bg-gray-100 px-2">
              <h4 className="text-sm font-semibold text-gray-500">
                <Link href="https://mariadb.org/" target="_blank">
                  MariaDB
                </Link>
              </h4>
            </div>
            <p className="text-sm md:text-base">
              I use MariaDB for projects needing MySQL compatibility with better
              performance and security. Ideal for shared hosting environments
              and traditional web applications.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
