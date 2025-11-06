"use client";

import { useEffect, useRef } from "react";
import createGlobe, { COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "motion/react";

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
    // United States (New York)
    { location: [40.7128, -74.006], size: 0.1 },

    // United Kingdom (London)
    { location: [51.5074, -0.1278], size: 0.08 },

    // Japan (Tokyo)
    { location: [35.6762, 139.6503], size: 0.09 },

    // Brazil (São Paulo)
    { location: [-23.5505, -46.6333], size: 0.08 },

    // Australia (Sydney)
    { location: [-33.8688, 151.2093], size: 0.07 },

    // France (Paris)
    { location: [48.8566, 2.3522], size: 0.07 },

    // India (Mumbai)
    { location: [19.076, 72.8777], size: 0.09 },

    // South Africa (Cape Town)
    { location: [-33.9249, 18.4241], size: 0.06 },

    // Canada (Toronto)
    { location: [43.6532, -79.3832], size: 0.08 },

    // Germany (Berlin)
    { location: [52.52, 13.405], size: 0.07 },

    // China (Beijing)
    { location: [39.9042, 116.4074], size: 0.1 },

    // Mexico (Mexico City)
    { location: [19.4326, -99.1332], size: 0.08 },

    // Egypt (Cairo)
    { location: [30.0444, 31.2357], size: 0.07 },

    // Russia (Moscow)
    { location: [55.7558, 37.6173], size: 0.09 },

    // Argentina (Buenos Aires)
    { location: [-34.6037, -58.3816], size: 0.07 },

    // Kenya (Nairobi) - Bright Green
    { location: [-1.2921, 36.8219], size: 0.08, color: [0.2, 1, 0.2] },

    // Nigeria (Lagos)
    { location: [6.5244, 3.3792], size: 0.09 },

    // Morocco (Casablanca)
    { location: [33.5731, -7.5898], size: 0.07 },

    // Ethiopia (Addis Ababa)
    { location: [9.032, 38.7469], size: 0.07 },

    // Ghana (Accra)
    { location: [5.6037, -0.187], size: 0.07 },

    // Tanzania (Dar es Salaam)
    { location: [-6.7924, 39.2083], size: 0.07 },

    // Senegal (Dakar)
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
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

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

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
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

    setTimeout(() => (canvasRef.current!.style.opacity = "1"), 0);
    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs, config]);

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
