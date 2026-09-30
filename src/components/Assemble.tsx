"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/*
  A box that starts away from its place, off to one side and slightly
  tilted, and slides home as you scroll. The position is tied to the scroll,
  not fired once, so scrolling back up takes it apart again. A spring smooths
  it so it settles rather than snapping.
*/
export type Side = "left" | "right" | "top" | "bottom" | "tl" | "tr" | "bl" | "br";

const VECTORS: Record<Side, { x: number; y: number; r: number }> = {
  left: { x: -1, y: 0, r: -8 },
  right: { x: 1, y: 0, r: 8 },
  top: { x: 0, y: -1, r: 5 },
  bottom: { x: 0, y: 1, r: -5 },
  tl: { x: -1, y: -1, r: -10 },
  tr: { x: 1, y: -1, r: 10 },
  bl: { x: -1, y: 1, r: 9 },
  br: { x: 1, y: 1, r: -9 },
};

export default function Assemble({
  from,
  distance = 240,
  children,
  className = "",
}: {
  from: Side;
  distance?: number;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const v = VECTORS[from];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 1.05", "start 0.55"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 26, restDelta: 0.001 });

  const x = useTransform(p, [0, 1], [v.x * distance, 0]);
  const y = useTransform(p, [0, 1], [v.y * distance * 0.6, 0]);
  const rotate = useTransform(p, [0, 1], [v.r, 0]);
  const scale = useTransform(p, [0, 1], [0.86, 1]);
  const opacity = useTransform(p, [0, 0.55], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={reduced ? undefined : { x, y, rotate, scale, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
