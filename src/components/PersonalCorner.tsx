"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  storyIntro,
  storySections,
  storyClosing,
  storySignOff,
} from "@/content/story";

const dustPositions = [
  { left: "12%", top: "20%", delay: 0 },
  { left: "80%", top: "15%", delay: 1.2 },
  { left: "65%", top: "70%", delay: 2.1 },
  { left: "25%", top: "80%", delay: 0.6 },
  { left: "50%", top: "40%", delay: 1.8 },
  { left: "90%", top: "55%", delay: 0.9 },
];

export default function PersonalCorner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 14 }}
        whileHover={{ scale: 1.08 }}
        aria-label="read my personal story"
        className="group fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-ink text-cream shadow-[0_4px_0_0_rgba(0,0,0,0.3)]"
        style={{ display: open ? "none" : "flex" }}
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-coral/40" />
        <span className="relative font-hand text-sm leading-tight text-center">
          the
          <br />
          real me
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] overflow-y-auto bg-[#160f0d]"
            initial={{ clipPath: "circle(0% at calc(100% - 40px) calc(100% - 40px))" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) calc(100% - 40px))" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) calc(100% - 40px))" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="pointer-events-none fixed inset-0">
              <div className="absolute -top-1/4 left-1/2 h-[70vh] w-[70vh] -translate-x-1/2 rounded-full bg-coral/25 blur-[120px]" />
              <div className="absolute bottom-0 right-0 h-[50vh] w-[50vh] rounded-full bg-pink/10 blur-[100px]" />
              <div className="grain absolute inset-0 opacity-20" />
              {dustPositions.map((d, i) => (
                <span
                  key={i}
                  className="absolute h-1 w-1 animate-blob-slow rounded-full bg-butter/60"
                  style={{ left: d.left, top: d.top, animationDelay: `${d.delay}s` }}
                />
              ))}
            </div>

            <button
              onClick={() => setOpen(false)}
              aria-label="close"
              className="fixed right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 bg-black/30 text-cream backdrop-blur transition-transform hover:rotate-90"
            >
              ✕
            </button>

            <div className="relative mx-auto max-w-2xl px-6 py-20 sm:px-8">
              <p className="font-hand text-3xl text-butter rotate-[-1deg]">
                the door marked &quot;the real me&quot;
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold text-cream sm:text-4xl">
                who is Boobesh, actually?
              </h1>

              <div className="mt-8 space-y-4 font-body text-base leading-relaxed text-cream/80">
                {storyIntro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {storySections.map((section) => (
                <div key={section.heading} className="mt-10">
                  <h2 className="font-display text-xl font-bold text-butter sm:text-2xl">
                    {section.heading}
                  </h2>
                  <div className="mt-3 space-y-4 font-body text-base leading-relaxed text-cream/80">
                    {section.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              ))}

              <div className="mt-14 space-y-4 border-t border-cream/10 pt-10 font-body text-base leading-relaxed text-cream/80">
                {storyClosing.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <p className="mt-10 font-hand text-2xl text-coral rotate-[-1deg]">
                {storySignOff}
              </p>

              <button
                onClick={() => setOpen(false)}
                className="mt-14 rounded-full border border-cream/30 px-6 py-3 font-body text-sm font-bold text-cream transition-colors hover:bg-cream hover:text-ink"
              >
                close the door
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
