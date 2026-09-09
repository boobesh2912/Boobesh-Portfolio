"use client";

import { motion } from "framer-motion";
import ImageSlot from "@/components/ImageSlot";
import {
  labels,
  lifeStrip,
  driveStats,
  storySong,
} from "@/content/story";

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

const toneClass = {
  kind: "border-sage/40 bg-sage/10 text-moon/85",
  harsh: "border-[#8a3f22]/50 bg-[#8a3f22]/15 text-moon/75",
  flat: "border-moon/15 bg-white/[0.04] text-moon/70",
};

/* People's labels, as chips rather than a block of prose. */
export function LabelCloud() {
  return (
    <motion.div {...fadeUp} className="mt-10">
      <p className="font-body text-[10px] font-semibold uppercase tracking-[0.28em] text-moon/40">
        what people decide I am
      </p>
      <div className="mt-5 flex flex-wrap gap-2.5">
        {labels.map((l, i) => (
          <motion.span
            key={l.text}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.35 }}
            className={`rounded-full border px-4 py-2 font-body text-[13px] ${toneClass[l.tone]}`}
          >
            {l.text}
          </motion.span>
        ))}
      </div>
      <p className="mt-7 font-display text-2xl italic leading-snug text-ember sm:text-3xl">
        All of it at once. None of it fully.
      </p>
    </motion.div>
  );
}

/* The whole arc in one glanceable strip. */
export function LifeStrip() {
  return (
    <motion.div {...fadeUp} className="mt-14">
      <p className="mb-4 font-body text-[10px] font-semibold uppercase tracking-[0.28em] text-moon/40">
        the whole thing, in one line
      </p>
      <ol className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {lifeStrip.map((s) => (
          <li
            key={s.when}
            className="rounded-xl border border-moon/10 bg-white/[0.03] p-4"
          >
            <span className="font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-ember">
              {s.when}
            </span>
            <p className="mt-2 font-body text-[13px] leading-snug text-moon/70">
              {s.what}
            </p>
          </li>
        ))}
      </ol>
    </motion.div>
  );
}

export function PullQuote({ children }: { children: string }) {
  return (
    <motion.blockquote
      {...fadeUp}
      className="my-14 border-l-2 border-ember/50 pl-6 font-display text-2xl font-medium italic leading-[1.35] text-moon sm:text-[2rem]"
    >
      {children}
    </motion.blockquote>
  );
}

export function DriveStats() {
  return (
    <motion.div {...fadeUp} className="mt-10 grid grid-cols-3 gap-3">
      {driveStats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl border border-moon/10 bg-white/[0.03] p-5 text-center"
        >
          <p className="font-display text-3xl font-semibold text-ember sm:text-4xl">
            {s.value}
          </p>
          <p className="mt-1.5 font-body text-[12px] leading-snug text-moon/55">
            {s.label}
          </p>
        </div>
      ))}
    </motion.div>
  );
}

export function MemeBreak() {
  return (
    <motion.div {...fadeUp} className="mt-10">
      <p className="mb-4 font-body text-[10px] font-semibold uppercase tracking-[0.28em] text-moon/40">
        me, as a meme
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <ImageSlot
          src="/shots/meme-1.jpg"
          alt="a meme about starting projects"
          label="drop a meme here"
          className="h-48 w-full"
          rounded="rounded-xl"
        />
        <div className="flex flex-col justify-center gap-4 rounded-xl border border-moon/10 bg-white/[0.03] p-6">
          <div>
            <p className="font-body text-[11px] font-semibold uppercase tracking-wider text-[#c96a4a]">
              me
            </p>
            <p className="font-body text-[15px] text-moon/70">
              finishing one of the 50 projects on my drive
            </p>
          </div>
          <div className="h-px bg-moon/10" />
          <div>
            <p className="font-body text-[11px] font-semibold uppercase tracking-wider text-sage">
              also me
            </p>
            <p className="font-body text-[15px] text-moon/70">
              starting project number 51 at 2am
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* The song gets its own room. */
export function SongSection() {
  return (
    <section
      id="song"
      className="relative mt-28 border-y border-moon/10 bg-black/25 py-20"
    >
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        <motion.p
          {...fadeUp}
          className="text-center font-body text-[10px] font-semibold uppercase tracking-[0.32em] text-ember"
        >
          the song playing right now
        </motion.p>

        <motion.h2
          {...fadeUp}
          className="mt-5 text-center font-display text-4xl font-semibold leading-tight text-moon sm:text-6xl"
        >
          {storySong.title}
        </motion.h2>

        <motion.p
          {...fadeUp}
          className="mt-2 text-center font-body text-sm text-moon/50"
        >
          from {storySong.movie}
        </motion.p>

        <motion.div
          {...fadeUp}
          className="mt-12 grid items-center gap-10 sm:grid-cols-[auto_1fr]"
        >
          <ImageSlot
            src="/shots/oh-my-kadavule.jpg"
            alt="Oh My Kadavule poster"
            label="poster goes here"
            className="mx-auto h-56 w-40"
            rounded="rounded-lg"
          />

          <div>
            <div className="space-y-2 border-l-2 border-ember pl-6 font-hand text-[26px] leading-[1.5] text-moon sm:text-[30px]">
              {storySong.lines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            <p className="mt-6 pl-6 font-body text-[13px] italic leading-relaxed text-moon/45">
              {storySong.gloss}
            </p>
          </div>
        </motion.div>

        <motion.p
          {...fadeUp}
          className="mx-auto mt-12 max-w-lg text-center font-body text-[15px] leading-[1.8] text-moon/60"
        >
          {storySong.intro}
        </motion.p>
      </div>
    </section>
  );
}
