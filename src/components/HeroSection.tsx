"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AskAI from "@/components/AskAI";

const ticker = [
  "MARKETER, NOT A VIBE",
  "SOLD KITCHENWARE AT 15",
  "CONSISTENCY BEATS TALENT",
  "50 PROJECTS, FEW FINISHED",
  "MOST BRANDS DON'T NEED MORE IDEAS",
  "STILL FIGURING IT OUT",
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-10 sm:px-8 sm:pt-16">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-lavender/40 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute top-10 right-0 h-80 w-80 rounded-full bg-coral/30 blur-3xl animate-blob-slow" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-butter/40 blur-3xl animate-blob" />
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.15] mix-blend-screen"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <path d="M0 420 C 150 350, 250 480, 400 400 S 650 300, 800 380" stroke="var(--sage)" strokeWidth="1.5" fill="none" />
        <path d="M0 180 C 180 240, 320 100, 480 170 S 700 260, 800 190" stroke="var(--lavender)" strokeWidth="1.5" fill="none" />
        <circle cx="120" cy="90" r="2.5" fill="var(--butter)" />
        <circle cx="680" cy="480" r="2.5" fill="var(--pink)" />
        <circle cx="420" cy="60" r="2" fill="var(--coral)" />
      </svg>

      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-8 flex w-fit items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 rotate-[-1deg] lg:mx-0"
          >
            <span className="h-2 w-2 rounded-full bg-sage" />
            <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
              boobesh.com · my corner of the internet
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mx-auto max-w-4xl text-center font-display text-4xl font-bold leading-[1.1] text-ink sm:text-6xl md:text-7xl lg:mx-0 lg:text-left"
          >
            hi, welcome to my corner
            <br />
            of the internet, where{" "}
            <span className="relative inline-block text-coral-deep">
              marketing
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
              >
                <path
                  d="M2 9C40 2 160 2 198 9"
                  stroke="var(--butter)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            gets personal.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-center font-body text-base text-ink-soft sm:text-lg lg:mx-0 lg:text-left"
          >
            I&apos;m Boobesh. I sold kitchen utensils on Sharechat in 10th
            grade before I knew what marketing was. Now I do the same thing
            with content instead of kitchenware, just with better spelling.
            This is where that work actually lives.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <Link
              href="/blog"
              className="rounded-full bg-coral px-6 py-3 font-body text-sm font-bold text-cream shadow-[0_4px_0_0_var(--coral-deep)] transition-transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
            >
              read the dispatches
            </Link>
            <Link
              href="/#work"
              className="rounded-full border-2 border-ink px-6 py-3 font-body text-sm font-bold text-ink transition-transform hover:-translate-y-0.5"
            >
              see the campaigns
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex justify-center lg:justify-start"
          >
            <AskAI />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: -3 }}
          transition={{ duration: 0.8, delay: 0.25, type: "spring" }}
          className="mx-auto hidden w-56 shrink-0 rounded-[2rem] border-4 border-paper bg-paper p-2 shadow-[0_10px_0_0_var(--line)] sm:block"
        >
          <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-coral/30 via-lavender/30 to-sage/30">
            <span className="pointer-events-none z-10 px-4 text-center font-hand text-lg text-ink/60">
              photo drops here, /public/boobesh-portrait.jpg
            </span>
          </div>
          <p className="mt-2 text-center font-hand text-sm text-ink-soft">
            probably mid-sentence about something
          </p>
        </motion.div>
      </div>

      <div className="relative mt-16 overflow-hidden border-y-2 border-dashed border-line py-3">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
          {[...ticker, ...ticker].map((t, i) => (
            <span
              key={i}
              className="font-display text-sm font-bold uppercase tracking-widest text-ink-soft sm:text-base"
            >
              {t} <span className="text-coral">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
