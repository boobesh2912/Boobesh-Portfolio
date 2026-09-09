"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const MAX_OS = 16;
const MIN_OS = 2;

export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [oCount, setOCount] = useState(MIN_OS);
  const [phase, setPhase] = useState<"grow" | "shrink" | "done">("grow");

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem("boobesh-intro-seen");
    if (alreadySeen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from sessionStorage on mount
      setShowLoader(false);
      return;
    }
    setVisible(true);

    let count = MIN_OS;
    const growInterval = setInterval(() => {
      count += 1;
      setOCount(count);
      if (count >= MAX_OS) {
        clearInterval(growInterval);
        setPhase("shrink");
        const shrinkInterval = setInterval(() => {
          count -= 2;
          setOCount(Math.max(count, MIN_OS));
          if (count <= MIN_OS) {
            clearInterval(shrinkInterval);
            setPhase("done");
            setTimeout(() => {
              sessionStorage.setItem("boobesh-intro-seen", "1");
              setVisible(false);
            }, 550);
          }
        }, 45);
      }
    }, 55);

    return () => clearInterval(growInterval);
  }, []);

  useEffect(() => {
    if (!visible && showLoader) {
      const t = setTimeout(() => setShowLoader(false), 700);
      return () => clearTimeout(t);
    }
  }, [visible, showLoader]);

  if (!showLoader) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-coral overflow-hidden"
          exit={{ clipPath: "circle(0% at 50% 50%)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          style={{ clipPath: "circle(150% at 50% 50%)" }}
        >
          <div className="absolute inset-0 grain opacity-40" />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-hand text-3xl sm:text-4xl text-cream mb-1 rotate-[-2deg]"
          >
            hi, I&apos;m
          </motion.p>
          <div className="flex items-end font-display font-bold text-cream text-[15vw] sm:text-[9vw] leading-none tracking-tight select-none">
            <span>B</span>
            <motion.span
              key={oCount}
              initial={{ scale: 0.85 }}
              animate={{ scale: phase === "grow" ? [1, 1.06, 1] : 1 }}
              transition={{ duration: 0.12 }}
              className="inline-block"
              style={{ letterSpacing: "-0.02em" }}
            >
              {"o".repeat(oCount)}
            </motion.span>
            <span>besh</span>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "done" ? 1 : 0 }}
            transition={{ duration: 0.35 }}
            className="font-body font-semibold text-cream/90 tracking-[0.3em] uppercase text-xs sm:text-sm mt-4"
          >
            content marketer, loading the good stuff
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
