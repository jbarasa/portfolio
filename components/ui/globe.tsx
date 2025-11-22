"use client";

import createGlobe, { type COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const MOVEMENT_DAMPING = 1400;

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [51.5074, -0.1278], size: 0.08 },
    { location: [35.6762, 139.6503], size: 0.09 },
    { location: [-23.5505, -46.6333], size: 0.08 },
    { location: [-33.8688, 151.2093], size: 0.07 },
    { location: [48.8566, 2.3522], size: 0.07 },
    { location: [19.076, 72.8777], size: 0.09 },
    { location: [-33.9249, 18.4241], size: 0.06 },
    { location: [43.6532, -79.3832], size: 0.08 },
    { location: [52.52, 13.405], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.08 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [55.7558, 37.6173], size: 0.09 },
    { location: [-34.6037, -58.3816], size: 0.07 },
    { location: [-1.2921, 36.8219], size: 0.08, color: [0.2, 1, 0.2] },
    { location: [6.5244, 3.3792], size: 0.09 },
    { location: [33.5731, -7.5898], size: 0.07 },
    { location: [9.032, 38.7469], size: 0.07 },
    { location: [5.6037, -0.187], size: 0.07 },
    { location: [-6.7924, 39.2083], size: 0.07 },
    { location: [14.7167, -17.4677], size: 0.06 },
  ],
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  // Single useEffect that handles everything
  useEffect(() => {
    if (!canvasRef.current) return;

    // Check WebGL support
    const canvas = canvasRef.current;
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (!gl) {
      console.warn("WebGL not available, globe disabled");
      return;
    }

    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    // Clean up previous globe if it exists
    if (globeRef.current) {
      globeRef.current.destroy();
    }

    // // Theme-aware config
    // const themeAwareConfig: COBEOptions = {
    const themeAwareConfig: COBEOptions = {
      ...GLOBE_CONFIG,
      ...config,
      dark: isDark ? 1 : 0,
      baseColor: isDark ? [0.15, 0.15, 0.15] : [1, 1, 1],
      glowColor: isDark ? [0.2, 0.2, 0.2] : [1, 1, 1],
      mapBrightness: isDark ? 2 : 1.2,
    };

    // Create globe once
    globeRef.current = createGlobe(canvasRef.current, {
      ...themeAwareConfig,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) {
          phiRef.current += 0.005;
        }
        state.phi = phiRef.current + rs.get();
        state.width = widthRef.current * 2;
        state.height = widthRef.current * 2;
      },
    });

    // Fade in
    requestAnimationFrame(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    });

    return () => {
      if (globeRef.current) {
        globeRef.current.destroy();
      }
      window.removeEventListener("resize", onResize);
    };
  }, [rs, config, isDark]);

  return (
    <div
      className={cn("absolute inset-0 mx-auto aspect-square w-full", className)}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 contain-[layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
