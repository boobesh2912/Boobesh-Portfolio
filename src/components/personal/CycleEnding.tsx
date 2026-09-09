"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/*
  The last stretch. A flat black road, and a kid cycling across it as you
  scroll. When he rides out of frame, the page is over.
*/
export default function CycleEnding() {
  const band = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: band,
    offset: ["start end", "end start"],
  });

  // rides left to right across the full width, then off
  const x = useTransform(scrollYProgress, [0, 0.85], ["-18vw", "108vw"]);
  const wheelSpin = useTransform(scrollYProgress, [0, 0.85], [0, 1440]);
  const fade = useTransform(scrollYProgress, [0.6, 0.9], [1, 0]);
  const signOff = useTransform(scrollYProgress, [0.45, 0.7], [0, 1]);

  return (
    <section
      ref={band}
      className="relative mt-20 overflow-hidden bg-[#050403] pb-20 pt-24"
    >
      <motion.p
        style={{ opacity: reduced ? 1 : signOff }}
        className="relative mx-auto mb-16 max-w-md px-6 text-center font-display text-2xl italic leading-snug text-moon/80 sm:text-3xl"
      >
        Anyway. That is the whole thing.
        <br />
        <span className="text-ember">Thanks for reading it.</span>
      </motion.p>

      {/* the road */}
      <div className="relative h-[150px]">
        {/*
          Light rises from the horizon line upward, which is where the rider
          actually is. Sits before him in the DOM so he stays a cutout on top.
        */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[30px] h-[230px] bg-[linear-gradient(to_top,rgba(222,215,198,0.26),rgba(222,215,198,0.10)_38%,transparent_85%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-[30px] h-[120px] bg-[linear-gradient(to_top,rgba(224,138,74,0.20),transparent_90%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[30px] bg-[#040302]" />
        <div className="absolute bottom-[30px] left-0 right-0 h-px bg-moon/40" />

        <motion.div
          style={{ x: reduced ? "40vw" : x, opacity: reduced ? 1 : fade }}
          className="absolute bottom-[18px] left-0"
        >
          <svg
            viewBox="0 0 200 120"
            className="h-[128px] w-[212px]"
            role="img"
            aria-label="a boy riding a cycle"
          >
            <g fill="#000000" stroke="#000000" strokeWidth="0.5">
              {/*
                Each wheel is drawn around its own 0,0 and moved into place by
                the parent group, so rotating about "0px 0px" is exact no
                matter how the SVG is scaled.
              */}
              <g transform="translate(42 88)">
                <motion.g style={{ rotate: reduced ? 0 : wheelSpin, transformOrigin: "0px 0px" }}>
                  <circle r="25" fill="none" stroke="#000000" strokeWidth="3.5" />
                  <path d="M0 -25 L0 25 M-25 0 L25 0 M-18 -18 L18 18 M18 -18 L-18 18" stroke="#000000" strokeWidth="1.4" />
                </motion.g>
              </g>
              <g transform="translate(150 88)">
                <motion.g style={{ rotate: reduced ? 0 : wheelSpin, transformOrigin: "0px 0px" }}>
                  <circle r="25" fill="none" stroke="#000000" strokeWidth="3.5" />
                  <path d="M0 -25 L0 25 M-25 0 L25 0 M-18 -18 L18 18 M18 -18 L-18 18" stroke="#000000" strokeWidth="1.4" />
                </motion.g>
              </g>

              {/* frame */}
              <path
                d="M42 88 L82 88 L104 52 L128 52 M82 88 L104 52 M82 88 L150 88 L128 52"
                fill="none"
                stroke="#000000"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              {/* seat and bars */}
              <path d="M74 60 L92 60" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
              <path d="M82 88 L82 62" stroke="#000000" strokeWidth="3" />
              <path d="M128 52 L128 36 M118 34 L138 34" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
              {/* pedal */}
              <circle cx="104" cy="86" r="5" fill="#000000" />

              {/* the kid */}
              <circle cx="112" cy="14" r="9" fill="#000000" />
              <path
                d="M112 23 L106 48 L100 62"
                stroke="#000000"
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
              />
              {/* arm to the bars */}
              <path d="M110 30 L128 36" stroke="#000000" strokeWidth="5" strokeLinecap="round" fill="none" />
              {/* legs, pedalling */}
              <motion.path
                d="M100 62 L104 78 L104 88"
                stroke="#000000"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
                animate={reduced ? undefined : { d: [
                  "M100 62 L104 78 L104 88",
                  "M100 62 L96 78 L104 86",
                  "M100 62 L104 78 L104 88",
                ] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
              />
              <motion.path
                d="M100 62 L96 78 L104 86"
                stroke="#000000"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
                animate={reduced ? undefined : { d: [
                  "M100 62 L96 78 L104 86",
                  "M100 62 L104 78 L104 88",
                  "M100 62 L96 78 L104 86",
                ] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
              />
            </g>
          </svg>
        </motion.div>
      </div>

      <div className="relative mt-16 text-center">
        <Link
          href="/"
          className="inline-block rounded-full border border-moon/20 px-7 py-3 font-body text-sm font-semibold text-moon/80 transition-colors hover:bg-moon hover:text-night"
        >
          close the door
        </Link>
        <p className="mt-6 font-hand text-lg text-moon/25">
          see you on the other side
        </p>
      </div>
    </section>
  );
}
