"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ImageSlot from "@/components/ImageSlot";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/*
  Two panels that fly in from either side of the LinkedIn chapter and leave
  the same way once it has scrolled past. The reading column stays where it
  is; these sit outside it on wide screens and tuck under it on small ones.
*/
export default function LinkedInFlank({
  children,
}: {
  children: React.ReactNode;
}) {
  const anchor = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: anchor,
    offset: ["start 0.95", "end 0.15"],
  });

  // in from off-screen, hold through the middle, back out
  const leftX = useTransform(scrollYProgress, [0, 0.22, 0.75, 1], ["-140%", "0%", "0%", "-140%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.22, 0.75, 1], ["140%", "0%", "0%", "140%"]);
  const fade = useTransform(scrollYProgress, [0, 0.18, 0.8, 1], [0, 1, 1, 0]);
  const leftTilt = useTransform(scrollYProgress, [0, 0.22], [-14, -7]);
  const rightTilt = useTransform(scrollYProgress, [0, 0.22], [14, 6]);

  return (
    <div ref={anchor} className="relative">
      {children}

      {/* left, my own posts */}
      <motion.aside
        style={
          reduced
            ? { opacity: 1 }
            : { x: leftX, opacity: fade, rotate: leftTilt }
        }
        className="pointer-events-none absolute left-0 top-1/2 hidden w-[15rem] -translate-y-1/2 xl:block xl:-left-[17.5rem]"
      >
        <div className="skin skin-line rounded-2xl border p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur">
          <ImageSlot
            src="/shots/linkedin-post.png"
            alt="one of my LinkedIn posts"
            label="a post of mine"
            className="h-[15rem] w-full"
            rounded="rounded-xl"
          />
          <p className="pb-1 pt-2 text-center font-hand text-base text-moon/50">
            the posting habit
          </p>
        </div>
      </motion.aside>

      {/* right, the profile itself */}
      <motion.aside
        style={
          reduced
            ? { opacity: 1 }
            : { x: rightX, opacity: fade, rotate: rightTilt }
        }
        className="pointer-events-none absolute right-0 top-1/2 hidden w-[15rem] -translate-y-1/2 xl:block xl:-right-[17.5rem]"
      >
        <div className="skin skin-line rounded-2xl border p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur">
          <ImageSlot
            src="/shots/linkedin-profile.png"
            alt="my LinkedIn profile"
            label="my profile page"
            className="h-[15rem] w-full"
            rounded="rounded-xl"
          />
          <p className="pb-1 pt-2 text-center font-hand text-base text-moon/50">
            the one I never quit
          </p>
        </div>
      </motion.aside>

      {/* narrow screens get them inline instead of flanking */}
      <div className="mt-8 grid grid-cols-2 gap-3 xl:hidden">
        <div className="skin skin-line rotate-[-4deg] rounded-2xl border p-2">
          <ImageSlot
            src="/shots/linkedin-post.png"
            alt="one of my LinkedIn posts"
            label="a post of mine"
            className="h-40 w-full"
            rounded="rounded-lg"
          />
        </div>
        <div className="skin skin-line rotate-[4deg] rounded-2xl border p-2">
          <ImageSlot
            src="/shots/linkedin-profile.png"
            alt="my LinkedIn profile"
            label="my profile page"
            className="h-40 w-full"
            rounded="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
