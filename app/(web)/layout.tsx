import { cn } from "@/lib/utils";
import Image from "next/image";

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <footer>
        <div
          className={cn(
            "group flex items-center justify-center gap-2 px-4 py-2",
            "cursor-pointer text-3xl font-bold max-w-fit rounded-xl"
          )}
        >
          <Image
            className="rounded-full w-[50px] h-[50px] object-cover"
            src="/logo.jpg"
            alt="Logo"
            width={100}
            height={100}
          />
          <h1 className="tracking-tight">
            <span className="text-primary-red">J</span>BARASA
          </h1>
        </div>
        <p>
          &copy; {new Date().getFullYear()} Joseph Olunga Barasa | All rights
          reserved.
        </p>
      </footer>
    </>
  );
}
