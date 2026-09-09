"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const MAX_OS = 26;
const MIN_OS = 2;

export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [oCount, setOCount] = useState(MIN_OS);
  const [phase, setPhase] = useState<"grow" | "hold" | "done">("grow");

  useEffect(() => {
    if (sessionStorage.getItem("boobesh-intro-seen")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of session state on mount
      setMounted(false);
      return;
    }
    setVisible(true);

    let count = MIN_OS;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const grow = setInterval(() => {
      count += 1;
      setOCount(count);
      if (count >= MAX_OS) {
        clearInterval(grow);
        setPhase("hold");
        timers.push(
          setTimeout(() => {
            setPhase("done");
            timers.push(
              setTimeout(() => {
                sessionStorage.setItem("boobesh-intro-seen", "1");
                setVisible(false);
                timers.push(setTimeout(() => setMounted(false), 900));
              }, 700)
            );
          }, 500)
        );
      }
    }, 42);

    return () => {
      clearInterval(grow);
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

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "grow" ? 0 : 1 }}
            transition={{ duration: 0.4 }}
            className="relative mt-5 font-body text-xs font-semibold uppercase tracking-[0.35em] text-cream/80 sm:text-sm"
          >
            content marketer
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
