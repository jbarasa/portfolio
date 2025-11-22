"use client";

import { stagger, useAnimate } from "motion/react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export const WordByWordEffect = ({
  children,
  className,
  filter = true,
  duration = 0.5,
}: {
  children: React.ReactNode;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (!scope.current) return;

    // Get ALL .word-span elements, including deeply nested ones
    const spans = scope.current.querySelectorAll(".word-span");

    if (!spans.length) return;

    // Reset animation state first
    spans.forEach((span: Element) => {
      (span as HTMLElement).style.opacity = "0";
      (span as HTMLElement).style.filter = filter ? "blur(10px)" : "none";
    });

    // Trigger animation with a slight delay
    const animationTimeout = setTimeout(() => {
      animate(
        ".word-span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration: duration,
          delay: stagger(0.2),
        }
      );
    }, 100);

    return () => clearTimeout(animationTimeout);
  }, [animate, duration, filter, scope]);

  return (
    <div className={cn("font-bold", className)} ref={scope}>
      <div className="mt-4">
        <div className="text-2xl leading-snug tracking-wide text-black dark:text-white">
          {children}
        </div>
      </div>
    </div>
  );
};
