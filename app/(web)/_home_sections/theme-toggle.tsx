"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { FaCloudMoon, FaCloudSun } from "react-icons/fa6";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // React-approved way: run this once *after* the component is mounted
  useEffect(() => {
    // schedule state update in a microtask to avoid cascading-render warning
    queueMicrotask(() => setMounted(true));
  }, []);

  if (!mounted || !resolvedTheme) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="toggle theme"
      variant="outline"
      size="icon"
    >
      {isDark ? <FaCloudMoon /> : <FaCloudSun />}
    </Button>
  );
}
