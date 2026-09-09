"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/*
  A winding line that draws itself down a section as you scroll, so a list of
  stops reads as a route you are walking rather than three cards in a stack.
  preserveAspectRatio is off, so one path stretches to whatever height the
  section ends up being.
*/
export default function PathSpine({ className = "" }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: host,
    offset: ["start 0.85", "end 0.35"],
  });
  const drawn = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 26,
    restDelta: 0.001,
  });
  const length = useTransform(drawn, [0, 1], [0, 1]);

  const d =
    "M50 0 C 96 90, 4 170, 50 260 C 96 350, 4 430, 50 520 C 96 610, 4 690, 50 780 C 96 870, 4 950, 50 1040";

  return (
    <div
      ref={host}
      aria-hidden
      className={`pointer-events-none absolute inset-y-0 ${className}`}
    >
      <svg
        viewBox="0 0 100 1040"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        {/* the road not yet walked */}
        <path
          d={d}
          fill="none"
          stroke="var(--line)"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          strokeDasharray="7 9"
        />
        {/* and the part behind you */}
        <motion.path
          d={d}
          fill="none"
          stroke="var(--coral)"
          strokeWidth="2.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: reduced ? 1 : length }}
        />
      </svg>
    </div>
  );
}
