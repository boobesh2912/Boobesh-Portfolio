"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/*
  A cyclist pinned to the bottom of the window who rides the whole story.
  He starts in the right corner at the title and works his way left as you
  read, so he doubles as a progress bar you can actually watch. The road
  under him fills in behind.
*/
export default function ScrollRider() {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();

  const eased = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.0005,
  });

  const left = useTransform(eased, [0, 1], ["88%", "4%"]);
  const spin = useTransform(eased, [0, 1], [0, -2600]);
  const roadFill = useTransform(eased, [0, 1], ["0%", "100%"]);

  if (reduced) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 hidden h-16 sm:block">
      {/* the road he is on, drawn from the right as he travels */}
      <div className="absolute bottom-[13px] left-0 right-0 h-px bg-[rgba(var(--card-skin),0.12)]" />
      <motion.div
        style={{ width: roadFill }}
        className="absolute bottom-[13px] right-0 h-px bg-ember/50"
      />

      <motion.div style={{ left }} className="absolute bottom-[7px]">
        <svg
          viewBox="0 0 200 120"
          className="h-11 w-[72px] -translate-x-1/2"
          style={{ transform: "scaleX(-1)" }}
          role="img"
          aria-label="a cyclist marking how far you have read"
        >
          <g stroke="var(--moon)" fill="var(--moon)" opacity="0.5">
            <g transform="translate(42 88)">
              <motion.g style={{ rotate: spin, transformOrigin: "0px 0px" }}>
                <circle r="25" fill="none" stroke="var(--moon)" strokeWidth="4" />
                <path
                  d="M0 -25 L0 25 M-25 0 L25 0 M-18 -18 L18 18 M18 -18 L-18 18"
                  stroke="var(--moon)"
                  strokeWidth="2"
                />
              </motion.g>
            </g>
            <g transform="translate(150 88)">
              <motion.g style={{ rotate: spin, transformOrigin: "0px 0px" }}>
                <circle r="25" fill="none" stroke="var(--moon)" strokeWidth="4" />
                <path
                  d="M0 -25 L0 25 M-25 0 L25 0 M-18 -18 L18 18 M18 -18 L-18 18"
                  stroke="var(--moon)"
                  strokeWidth="2"
                />
              </motion.g>
            </g>

            <path
              d="M42 88 L82 88 L104 52 L128 52 M82 88 L104 52 M82 88 L150 88 L128 52"
              fill="none"
              stroke="var(--moon)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path d="M74 60 L92 60" stroke="var(--moon)" strokeWidth="5" strokeLinecap="round" />
            <path d="M82 88 L82 62" stroke="var(--moon)" strokeWidth="4" />
            <path d="M128 52 L128 36 M118 34 L138 34" stroke="var(--moon)" strokeWidth="4" strokeLinecap="round" />

            <circle cx="112" cy="14" r="10" />
            <path d="M112 24 L106 48 L100 62" stroke="var(--moon)" strokeWidth="9" strokeLinecap="round" fill="none" />
            <path d="M110 30 L128 36" stroke="var(--moon)" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/*
              The legs pedal by rotating around the hip. Animating the path d
              string directly does not work: framer-motion cannot interpolate
              two d strings and hands the DOM d="undefined" mid-tween.
            */}
            <g transform="translate(100 62)">
              <motion.path
                d="M0 0 L4 16 L4 26"
                stroke="var(--moon)"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
                style={{ transformOrigin: "0px 0px" }}
                animate={{ rotate: [-16, 16, -16] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.path
                d="M0 0 L-4 16 L4 24"
                stroke="var(--moon)"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
                style={{ transformOrigin: "0px 0px" }}
                animate={{ rotate: [16, -16, 16] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </g>
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
