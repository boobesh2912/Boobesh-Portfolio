"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ImageSlot from "@/components/ImageSlot";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/*
  The Gari Tech mark arrives huge and settles down beside the words, like it
  is landing on the page. Drop a logo at /shots/gari-tech.png and it takes
  over from the placeholder.
*/
export default function GariTechDrop({
  children,
}: {
  children: React.ReactNode;
}) {
  const anchor = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: anchor,
    offset: ["start 0.9", "start 0.25"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [4.2, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [-160, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-18, -4]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 1], [0, 0.55, 1]);
  const blur = useTransform(scrollYProgress, [0, 1], [8, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <div ref={anchor} className="relative">
      <div className="flex flex-wrap items-start gap-6">
        <div className="min-w-0 flex-1">{children}</div>

        <motion.div
          style={
            reduced
              ? undefined
              : { scale, y, rotate, opacity, filter, transformOrigin: "top right" }
          }
          className="relative mx-auto mt-2 w-28 shrink-0 sm:w-32"
        >
          {/*
            The mark is white with a transparent ground, so it needs a dark
            tile under it or it disappears entirely in day mode. The tile also
            gives it a frame to land on.
          */}
          <div className="overflow-hidden rounded-2xl bg-[#17140f] p-4 shadow-[0_18px_40px_rgba(23,20,15,0.28)]">
            <ImageSlot
              src="/shots/gari-tech.png"
              alt="Gari Tech logo"
              label="gari tech logo"
              className="h-20 w-full sm:h-24"
              rounded="rounded-none"
              fit="contain"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
