"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/*
  The last stretch. A flat black road, and someone walking across it as you
  scroll. The cycle carried the story; this is just a person leaving on foot.
*/
export default function WalkEnding() {
  const band = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: band,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 0.85], ["-14vw", "104vw"]);
  const fade = useTransform(scrollYProgress, [0.62, 0.92], [1, 0]);

  /* one stride, reused by both arms and both legs at opposite phase */
  const stride = (from: number) => ({
    animate: reduced ? undefined : { rotate: [from, -from, from] },
    transition: { duration: 0.9, repeat: Infinity, ease: "easeInOut" as const },
  });

  return (
    <section
      ref={band}
      className="relative mt-20 overflow-hidden bg-[#050403] pb-20 pt-28"
    >
      {/* the road */}
      <div className="relative h-[150px]">
        {/*
          Light rises from the horizon line upward, which is where the walker
          is. Declared before him so he stays a cutout on top of it.
        */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[30px] h-[230px] bg-[linear-gradient(to_top,rgba(222,215,198,0.26),rgba(222,215,198,0.10)_38%,transparent_85%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-[30px] h-[120px] bg-[linear-gradient(to_top,rgba(224,138,74,0.20),transparent_90%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[30px] bg-[#040302]" />
        <div className="absolute bottom-[30px] left-0 right-0 h-px bg-moon/40" />

        <motion.div
          style={{ x: reduced ? "44vw" : x, opacity: reduced ? 1 : fade }}
          /*
            bottom is set so the feet land on the horizon line at 30px rather
            than floating above it: the svg is 140 units tall rendered at
            124px, and the feet sit at unit 128, which is ~11px up from the
            bottom edge of the box.
          */
          className="absolute bottom-[19px] left-0"
        >
          <svg
            viewBox="0 0 120 140"
            className="h-[124px] w-[106px]"
            role="img"
            aria-label="a person walking away"
          >
            <g stroke="#000000" fill="#000000" strokeLinecap="round">
              <circle cx="60" cy="18" r="12" />
              {/* torso, leaning very slightly into the walk */}
              <path d="M60 30 L57 80" strokeWidth="11" fill="none" />

              {/*
                Arms hang from the shoulder and legs from the hip. Each limb is
                drawn around its own 0,0 and moved into place by the parent
                group, so rotating about 0,0 is exact at any scale. They start
                splayed so the silhouette never collapses onto the torso.
              */}
              <g transform="translate(60 40)">
                <motion.path
                  d="M0 0 L-10 18 L-6 33"
                  strokeWidth="7"
                  fill="none"
                  style={{ transformOrigin: "0px 0px" }}
                  {...stride(20)}
                />
                <motion.path
                  d="M0 0 L11 18 L7 33"
                  strokeWidth="7"
                  fill="none"
                  style={{ transformOrigin: "0px 0px" }}
                  {...stride(-20)}
                />
              </g>

              <g transform="translate(57 80)">
                <motion.path
                  d="M0 0 L-13 25 L-16 48"
                  strokeWidth="10"
                  fill="none"
                  style={{ transformOrigin: "0px 0px" }}
                  {...stride(-14)}
                />
                <motion.path
                  d="M0 0 L14 25 L17 48"
                  strokeWidth="10"
                  fill="none"
                  style={{ transformOrigin: "0px 0px" }}
                  {...stride(14)}
                />
              </g>
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
        <p className="mt-6 font-hand text-lg text-moon/40">
          see you on the other side
        </p>
      </div>
    </section>
  );
}
