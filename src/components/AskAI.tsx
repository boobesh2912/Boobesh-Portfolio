"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/*
  "Who is Boobesh AG" stays the first question because it is the one people
  actually search. The rest exist to make the buttons worth pressing.
*/
const QUESTIONS = [
  "Who is Boobesh AG?",
  "What is Gari Tech and who founded it?",
  "Is Boobesh AG a good content marketer?",
  "Roast Boobesh AG, but be nice about it",
  "What should I ask Boobesh AG before working with him?",
];

const targets = [
  {
    id: "chatgpt",
    label: "ChatGPT",
    url: (q: string) => `https://chatgpt.com/?q=${encodeURIComponent(q)}&hint=chat`,
  },
  {
    id: "claude",
    label: "Claude",
    url: (q: string) => `https://claude.ai/new?q=${encodeURIComponent(q)}`,
  },
];

/* a fixed set of tilts, so the pile lands the same way on every render */
const TILT = [-14, 9, -6, 12, -10, 7, -12];

export default function AskAI() {
  const [pick, setPick] = useState(0);
  const reduced = usePrefersReducedMotion();

  /*
    The chips and buttons fall in from above and bounce as they land, the way
    things would if you dropped them on a table. The trigger lives on the
    card, which stays put. If each chip watched itself, its starting position
    (320px up) would already be on screen and it would fall before anyone
    scrolled here. Every chip is draggable and springs back.
  */
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0 : 0.11 } },
  };
  const dropped = {
    hidden: (i: number) =>
      reduced ? {} : { y: -340, rotate: TILT[i % TILT.length] * 2, opacity: 0 },
    show: {
      y: 0,
      rotate: 0,
      opacity: 1,
      transition: reduced
        ? { duration: 0 }
        : {
            type: "spring" as const,
            stiffness: 130,
            damping: 9,
            mass: 0.9,
            // visible for the whole fall; the spring would fade it in too slowly
            opacity: { duration: 0.15 },
          },
    },
  };

  const burst = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 36,
      spread: 60,
      startVelocity: 26,
      origin: {
        x: (r.left + r.width / 2) / window.innerWidth,
        y: (r.top + r.height / 2) / window.innerHeight,
      },
      colors: ["#ffd9a8", "#c0563a", "#d9a441", "#8fe3c4"],
    });
  };

  const q = QUESTIONS[pick];

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={container}
      className="mt-10 max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] p-5 pb-7 backdrop-blur"
    >
      <p className="font-hand text-xl text-[#ffd9a8]">
        don&apos;t take my word for it
      </p>
      <p className="mt-1 font-body text-sm text-white/65">
        Pick a question. Let an AI answer it about me instead.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {QUESTIONS.map((text, i) => (
          <motion.button
            key={text}
            variants={dropped}
            custom={i}
            drag
            dragSnapToOrigin
            dragElastic={0.45}
            whileDrag={{ scale: 1.1, zIndex: 20 }}
            whileHover={{ y: -3, rotate: TILT[i % TILT.length] / 3 }}
            onTap={() => setPick(i)}
            data-cursor="pick"
            className={`rounded-full border px-3.5 py-1.5 text-left font-body text-xs ${
              i === pick
                ? "border-[#ffd9a8] bg-[#ffd9a8] font-semibold text-[#17140f]"
                : "border-white/25 text-white/75"
            }`}
          >
            {text}
          </motion.button>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {targets.map((t, i) => (
          <motion.a
            key={t.id}
            variants={dropped}
            custom={QUESTIONS.length + i}
            whileHover={{ y: -4, scale: 1.05, rotate: i ? 2 : -2 }}
            whileTap={{ scale: 0.94 }}
            href={t.url(q)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={burst}
            className="rounded-full bg-white px-5 py-2.5 font-body text-xs font-bold uppercase tracking-wide text-[#17140f]"
          >
            ask {t.label} →
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
