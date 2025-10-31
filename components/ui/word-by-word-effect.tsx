"use client";

import { cn } from "@/lib/utils";
import { stagger, useAnimate } from "motion/react";
import { useEffect, useRef } from "react";

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
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!hasAnimated.current) {
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
      hasAnimated.current = true;
    }
  }, [animate, duration, filter]);

  return (
    <div className={cn("font-bold", className)} ref={scope}>
      <div className="mt-4">
        <div className="dark:text-white text-black text-2xl leading-snug tracking-wide">
          {children}
        </div>
      </div>
    </div>
  );
};
