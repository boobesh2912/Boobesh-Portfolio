"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import AskAI from "@/components/AskAI";
import ImageSlot from "@/components/ImageSlot";

const ticker = [
  "MARKETING LEAD AT TRIBE FORTIS",
  "MARKETING MANAGER AT YOUR COLLEGE SENIOR",
  "FOUNDER OF GARI TECH",
  "SOLD KITCHENWARE AT 15",
  "FIRST 1 LAKH BEFORE 21",
  "STILL FIGURING IT OUT",
];

export default function HeroSection() {
  const { scrollYProgress } = useScroll();
  const artY = useTransform(scrollYProgress, [0, 0.3], [0, 80]);
  const photoY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-10 sm:px-8 sm:pt-14">
      {/* soft washes of colour, kept warm rather than neon */}
      <motion.div style={{ y: artY }} className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-24 h-80 w-80 rounded-full bg-butter/25 blur-3xl animate-blob" />
        <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-coral/15 blur-3xl animate-blob-slow" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-sage/15 blur-3xl animate-blob" />
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.28]"
          viewBox="0 0 900 600"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <path
            d="M-20 430 C 180 350, 300 500, 470 405 S 760 300, 920 385"
            stroke="var(--sage)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M-20 200 C 200 265, 350 110, 520 185 S 760 275, 920 205"
            stroke="var(--coral)"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="150" cy="105" r="3" fill="var(--butter)" />
          <circle cx="760" cy="500" r="3" fill="var(--coral)" />
        </svg>
      </motion.div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-7 flex w-fit items-center gap-2 rounded-full border border-line bg-paper/70 px-4 py-2 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-sage" />
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-soft">
              boobesh.com · marketer, chennai
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08 }}
            className="max-w-3xl font-display text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.02em] text-ink sm:text-6xl lg:text-[4.2rem]"
          >
            I make people
            <br />
            stop scrolling,
            <br />
            <span className="italic text-coral-deep">then stay.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.16 }}
            className="mt-7 max-w-xl font-body text-base leading-[1.75] text-ink-soft sm:text-[17px]"
          >
            I am Boobesh. I sold kitchen utensils on Sharechat in 10th grade
            before I knew the word marketing. Today I lead marketing at
            <span className="font-semibold text-ink"> Tribe Fortis</span>, run
            content at <span className="font-semibold text-ink">Your College Senior</span>,
            and build <span className="font-semibold text-ink">Gari Tech</span> on
            the side. Same instinct, better tools.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.24 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/#work"
              className="rounded-full bg-ink px-7 py-3.5 font-body text-sm font-semibold text-cream transition-transform hover:-translate-y-0.5"
            >
              see the work
            </Link>
            <Link
              href="/blog"
              className="rounded-full border border-ink/25 px-7 py-3.5 font-body text-sm font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream"
            >
              read what I write
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75, delay: 0.34 }}
          >
            <AskAI />
          </motion.div>
        </div>

        <motion.div
          style={{ y: photoY }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mx-auto hidden w-full max-w-[19rem] lg:block"
        >
          <div className="rotate-[-2deg] rounded-[1.6rem] border border-line bg-paper p-2.5 shadow-[0_18px_50px_rgba(23,20,15,0.12)]">
            <ImageSlot
              src="/shots/boobesh.jpg"
              alt="Boobesh AG"
              label="your photo goes here"
              className="h-[22rem] w-full"
              rounded="rounded-[1.1rem]"
            />
            <p className="pb-1 pt-3 text-center font-hand text-lg text-ink-soft">
              probably mid sentence about something
            </p>
          </div>
        </motion.div>
      </div>

      <div className="relative mt-14 overflow-hidden border-y border-line py-4">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {[...ticker, ...ticker].map((t, i) => (
            <span
              key={i}
              className="font-body text-[11px] font-semibold uppercase tracking-[0.25em] text-ink-soft"
            >
              {t}
              <span className="ml-10 text-coral">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
