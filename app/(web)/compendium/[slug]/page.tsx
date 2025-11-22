"use client";

import Link from "next/link";
import { useMemo } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

function humanize(slug: string) {
  return slug
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .replace(/^\w|\s\w/g, (m) => m.toUpperCase());
}

export default function PostPlaceholder({
  params,
}: {
  params: { slug: string };
}) {
  const title = useMemo(() => humanize(params.slug), [params.slug]);

  return (
    <main
      className={cn(
        "mx-auto w-full max-w-3xl px-4 pt-10 pb-24 sm:px-8 md:pt-16",
      )}
    >
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/60"
      >
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <Button asChild variant="ghost" size="sm">
            <Link href="/compendium">
              <ArrowLeftIcon className="mr-1 h-4 w-4" /> Back
            </Link>
          </Button>
        </div>

        <p className="mt-3 text-slate-700 dark:text-slate-200">
          The full article page is coming soon. This placeholder confirms your
          routing is set up. You can connect a CMS or MDX files to render real
          content here.
        </p>
      </motion.section>
    </main>
  );
}
