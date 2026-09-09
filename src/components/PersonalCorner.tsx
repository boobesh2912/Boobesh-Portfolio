"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  storyOpener,
  storyIntro,
  storySections,
  storyLoves,
  storySong,
  storyClosing,
  storySignOff,
  thankYouNames,
} from "@/content/story";

const dustPositions = [
  { left: "12%", top: "20%", delay: 0 },
  { left: "80%", top: "15%", delay: 1.2 },
  { left: "65%", top: "70%", delay: 2.1 },
  { left: "25%", top: "80%", delay: 0.6 },
  { left: "50%", top: "40%", delay: 1.8 },
  { left: "90%", top: "55%", delay: 0.9 },
];

function ExpandingBrainMeme() {
  const tiers = [
    { emoji: "🧠", caption: "make a content calendar" },
    { emoji: "🧠✨", caption: "abandon the content calendar" },
    { emoji: "🧠🌌", caption: "start a completely new project instead" },
    { emoji: "🧠🌠💫", caption: "call it a pivot" },
  ];
  return (
    <div className="mt-10 rounded-3xl border border-ink/10 bg-white/5 p-6">
      <p className="mb-4 font-body text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
        me, explained as a meme
      </p>
      <div className="space-y-3">
        {tiers.map((t, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="text-2xl">{t.emoji}</span>
            <p className="font-body text-sm text-ink/80">{t.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DrakeMeme() {
  return (
    <div className="mt-10 grid grid-cols-[auto_1fr] gap-3 rounded-3xl border border-ink/10 bg-white/5 p-4 sm:gap-4 sm:p-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-coral/20 text-2xl sm:h-20 sm:w-20">
        🙅
      </div>
      <div className="flex items-center rounded-2xl bg-coral/10 px-4 py-3 font-body text-sm text-ink/80">
        finishing one of the 50 projects on my drive
      </div>
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sage/20 text-2xl sm:h-20 sm:w-20">
        🙆
      </div>
      <div className="flex items-center rounded-2xl bg-sage/10 px-4 py-3 font-body text-sm text-ink/80">
        starting project number 51
      </div>
    </div>
  );
}

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
            className="fixed inset-0 z-[90] overflow-y-auto bg-[#04070f]"
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
              className="fixed right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 bg-black/30 text-ink backdrop-blur transition-transform hover:rotate-90"
            >
              ✕
            </button>

            <div className="relative mx-auto max-w-2xl px-6 py-20 sm:px-8">
              <p className="font-hand text-3xl text-butter rotate-[-1deg]">
                the door marked &quot;the real me&quot;
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
                who is Boobesh, actually?
              </h1>

              <div className="mt-8 space-y-4 font-body text-base leading-relaxed text-ink">
                {storyOpener.map((p, i) => (
                  <p key={i} className="font-semibold">
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-6 space-y-4 font-body text-base leading-relaxed text-ink/80">
                {storyIntro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {storySections.map((section) => (
                <div key={section.heading}>
                  <div className="mt-10">
                    <h2 className="font-display text-xl font-bold text-butter sm:text-2xl">
                      {section.heading}
                    </h2>
                    <div className="mt-3 space-y-4 font-body text-base leading-relaxed text-ink/80">
                      {section.paragraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </div>
                  {section.heading === "another experiment I tried" && <ExpandingBrainMeme />}
                  {section.heading === "so who am I actually" && <DrakeMeme />}
                </div>
              ))}

              <div className="mt-10">
                <h2 className="font-display text-xl font-bold text-butter sm:text-2xl">
                  {storyLoves.heading}
                </h2>
                <div className="mt-3 space-y-4 font-body text-base leading-relaxed text-ink/80">
                  {storyLoves.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <Link
                  href="/#speaking"
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-block font-hand text-lg text-coral hover:underline"
                >
                  see the stages I&apos;ve stood on →
                </Link>
              </div>

              <div className="mt-10 rounded-3xl border border-ink/10 bg-white/5 p-6">
                <p className="font-body text-sm text-ink-soft">{storySong.intro}</p>
                <div className="mt-4 space-y-1 border-l-2 border-coral pl-4 font-hand text-xl leading-relaxed text-ink">
                  {storySong.lines.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>

              <div className="mt-14 space-y-4 border-t border-ink/10 pt-10 font-body text-base leading-relaxed text-ink/80">
                {storyClosing.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <p className="mt-10 font-hand text-2xl text-coral rotate-[-1deg]">
                {storySignOff}
              </p>

              <div className="mt-16 border-t border-ink/10 pt-10 text-center">
                <p className="font-hand text-2xl text-butter">thank you</p>
                <p className="mx-auto mt-4 max-w-lg font-body text-sm leading-loose text-ink-soft">
                  {thankYouNames.join(" · ")}
                  <span className="text-ink/50"> · and +10,000 more</span>
                </p>
              </div>

              <div className="mt-14 text-center">
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-ink/30 px-6 py-3 font-body text-sm font-bold text-ink transition-colors hover:bg-ink hover:text-cream"
                >
                  close the door
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
