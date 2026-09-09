"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const MAX_OS = 24;
const MIN_OS = 2;

/*
  The intro plays on every visit, refreshes included. It is short enough that
  it reads as part of the site rather than a toll booth in front of it.
*/
const ROLES = [
  "Content Marketer",
  "Founder",
  "Entrepreneur",
  "Marketer",
  "Engineer",
  "Product Developer",
  "Content Writer",
  "Builder",
  "Web Developer",
  "Wanderlust",
];

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);
  const [oCount, setOCount] = useState(MIN_OS);
  const [role, setRole] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    const grow = setInterval(() => {
      setOCount((n) => {
        if (n >= MAX_OS) {
          clearInterval(grow);
          return n;
        }
        return n + 1;
      });
    }, 40);

    // the job titles flick past underneath while the name stretches
    const flick = setInterval(() => setRole((r) => r + 1), 155);

    timers.push(
      setTimeout(() => {
        clearInterval(grow);
        clearInterval(flick);
        setVisible(false);
        timers.push(setTimeout(() => setMounted(false), 900));
      }, 2300)
    );

    return () => {
      clearInterval(grow);
      clearInterval(flick);
      timers.forEach(clearTimeout);
    };
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-coral px-6"
          exit={{ clipPath: "circle(0% at 50% 50%)" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          style={{ clipPath: "circle(150% at 50% 50%)" }}
        >
          <div className="grain absolute inset-0 opacity-30" />

          {/* a slow ring that widens behind the name */}
          <motion.div
            aria-hidden
            initial={{ scale: 0.2, opacity: 0.5 }}
            animate={{ scale: 2.4, opacity: 0 }}
            transition={{ duration: 2.3, ease: "easeOut" }}
            className="pointer-events-none absolute h-[38vmin] w-[38vmin] rounded-full border border-cream/40"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative mb-1 font-hand text-3xl text-cream/90 sm:text-4xl"
          >
            hi, I&apos;m
          </motion.p>

          <div className="relative flex max-w-full items-baseline justify-center overflow-hidden font-display text-[13vw] font-semibold leading-none tracking-tight text-cream sm:text-[8vw]">
            <span>B</span>
            <span
              className="inline-block overflow-hidden whitespace-nowrap transition-[max-width] duration-100 ease-out"
              style={{ maxWidth: `${oCount * 0.62}em` }}
            >
              {"o".repeat(oCount)}
            </span>
            <span>besh</span>
          </div>

          {/*
            The titles cycle rather than settling on one, because picking one
            has never gone well. Fixed height so the name does not jump.
          */}
          <div className="relative mt-6 flex h-7 items-center justify-center overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={role}
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -18, opacity: 0 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className="block whitespace-nowrap font-body text-xs font-semibold uppercase tracking-[0.35em] text-cream/85 sm:text-sm"
              >
                {ROLES[role % ROLES.length]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
