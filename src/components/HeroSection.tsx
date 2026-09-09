"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import AskAI from "@/components/AskAI";
import ImageSlot from "@/components/ImageSlot";
import TorchLight from "@/components/TorchLight";

const ticker = [
  "MARKETING LEAD AT TRIBE FORTIS",
  "MARKETING MANAGER AT YOUR COLLEGE SENIOR",
  "FOUNDER OF GARI TECH",
  "SOLD KITCHENWARE AT 15",
  "FIRST 1,00,000 BEFORE 21",
  "STILL FIGURING IT OUT",
];

export default function HeroSection() {
  const panel = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 0.3], [0, 60]);
  const bgScale = useTransform(scrollYProgress, [0, 0.3], [1.06, 1.14]);

  // a soft light that follows the pointer across the panel
  const glow = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = panel.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--gx", `${e.clientX - r.left}px`);
    el.style.setProperty("--gy", `${e.clientY - r.top}px`);
  };

  return (
    <section className="px-3 pt-3 sm:px-5">
      <div
        ref={panel}
        onMouseMove={glow}
        className="group relative overflow-hidden rounded-[1.75rem] px-6 pb-14 pt-20 sm:px-12 sm:pb-20 sm:pt-28"
      >
        {/* the gradient plate */}
        <motion.div
          style={{ y: bgY, scale: bgScale }}
          className="absolute inset-0 -z-10"
        >
          <ImageSlot
            src="/shots/hero-bg.jpg"
            alt=""
            label="hero background"
            className="h-full w-full"
            rounded="rounded-none"
          />
        </motion.div>

        {/* legibility scrim, warm rather than flat black */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(10,9,14,0.9)_0%,rgba(10,9,14,0.72)_42%,rgba(10,9,14,0.35)_100%)]" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_260px_at_var(--gx,70%)_var(--gy,30%),rgba(255,236,206,0.16),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="grain pointer-events-none absolute inset-0 -z-10 opacity-30" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-7 flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#8fe3c4]" />
              <p className="font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
                boobesh.com · marketer, chennai
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08 }}
              className="max-w-3xl font-display text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.02em] text-white sm:text-6xl lg:text-[4.2rem]"
            >
              I make people
              <br />
              stop scrolling,
              <br />
              <span className="italic text-[#ffd9a8]">then stay.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.16 }}
              className="mt-7 max-w-xl font-body text-base leading-[1.75] text-white/70 sm:text-[17px]"
            >
              I am Boobesh. I sold kitchen utensils on Sharechat in 10th grade
              before I knew the word marketing. Today I lead marketing at
              <span className="font-semibold text-white"> Tribe Fortis</span>,
              run content at{" "}
              <span className="font-semibold text-white">Your College Senior</span>
              , and build <span className="font-semibold text-white">Gari Tech</span>{" "}
              on the side. Same instinct, better tools.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.24 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/#work"
                className="rounded-full bg-white px-7 py-3.5 font-body text-sm font-semibold text-[#17140f] transition-transform hover:-translate-y-0.5"
              >
                see the work
              </Link>
              <Link
                href="/blog"
                className="rounded-full border border-white/35 px-7 py-3.5 font-body text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#17140f]"
              >
                read what I write
              </Link>
              <TorchLight tone="dark" className="ml-1" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.75, delay: 0.34 }}
              className="[&_p]:text-white/60"
            >
              <AskAI />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mx-auto hidden w-full max-w-[17rem] lg:block"
          >
            <div className="rounded-[1.4rem] border border-white/15 bg-white/10 p-2.5 backdrop-blur">
              <ImageSlot
                src="/shots/boobesh.jpg"
                alt="Boobesh AG"
                label="your photo goes here"
                className="h-[20rem] w-full"
                rounded="rounded-[1rem]"
              />
              <p className="pb-1 pt-3 text-center font-hand text-lg text-white/70">
                probably mid sentence about something
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative mt-10 overflow-hidden border-y border-line py-4">
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
