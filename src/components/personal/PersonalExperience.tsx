"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Marked from "@/components/Marked";
import MusicToggle from "@/components/MusicToggle";
import NightRoom from "@/components/personal/NightRoom";
import LetterWidget from "@/components/personal/LetterWidget";
import {
  DriveStats,
  LabelCloud,
  LifeStrip,
  MemeBreak,
  PullQuote,
  SongSection,
  fadeUp,
} from "@/components/personal/blocks";
import {
  storyOpener,
  storyIntro,
  storySections,
  storyLoves,
  storyPositioning,
  storyClosing,
  storySignOff,
  thankYouNames,
  pullQuotes,
} from "@/content/story";

/* Visual breathers, keyed to the chapter they follow. */
const interludes: Record<string, React.ReactNode> = {
  "it started with curiosity": <LifeStrip />,
  "then money entered the picture": <PullQuote>{pullQuotes.money}</PullQuote>,
  "then gari tech happened": <PullQuote>{pullQuotes.wordpress}</PullQuote>,
  "the ones I started and stopped": (
    <>
      <DriveStats />
      <MemeBreak />
    </>
  ),
  "maybe this sounds familiar": (
    <PullQuote>{pullQuotes.consistency}</PullQuote>
  ),
};

function Chapter({
  index,
  heading,
  paragraphs,
}: {
  index: number;
  heading: string;
  paragraphs: string[];
}) {
  return (
    <motion.section {...fadeUp} className="mt-20">
      <div className="flex items-baseline gap-4">
        <span className="font-display text-sm text-ember/60">
          {String(index).padStart(2, "0")}
        </span>
        <h2 className="font-display text-2xl font-semibold text-moon sm:text-[1.75rem]">
          {heading}
        </h2>
      </div>
      <div className="mt-5 space-y-5 font-body text-[17px] leading-[1.85] text-moon/70">
        {paragraphs.map((p, i) => (
          <p key={i}>
            <Marked text={p} markClass="mark-clay" />
          </p>
        ))}
      </div>
    </motion.section>
  );
}

export default function PersonalExperience() {
  return (
    <>
      <NightRoom />

      <motion.div
        initial={{ clipPath: "circle(0% at calc(100% - 51px) calc(100% - 51px))" }}
        animate={{ clipPath: "circle(160% at calc(100% - 51px) calc(100% - 51px))" }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        className="relative"
      >
        <div className="fixed left-5 top-5 z-30">
          <MusicToggle />
        </div>

        <Link
          href="/"
          className="fixed right-5 top-5 z-30 rounded-full border border-moon/20 bg-black/30 px-4 py-2 font-body text-[11px] font-semibold text-moon/90 backdrop-blur transition-colors hover:border-ember/60 hover:text-ember"
        >
          ← back outside
        </Link>

        <LetterWidget />

        {/* opening */}
        <header className="relative mx-auto max-w-2xl px-6 pt-28 sm:px-8 sm:pt-36">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="font-hand text-3xl text-ember"
          >
            the door marked &ldquo;the real me&rdquo;
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.8 }}
            className="mt-3 font-display text-4xl font-semibold leading-[1.08] text-moon sm:text-6xl"
          >
            who is Boobesh,
            <br />
            <span className="italic text-ember">actually?</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.76, duration: 0.8 }}
            className="mt-10 space-y-5 border-l-2 border-ember/40 pl-5 font-body text-[17px] leading-[1.85] text-moon/90"
          >
            {storyOpener.map((p, i) => (
              <p key={i}>
                <Marked text={p} markClass="mark-clay" />
              </p>
            ))}
          </motion.div>

          <LabelCloud />

          <motion.div
            {...fadeUp}
            className="mt-12 space-y-5 font-body text-[17px] leading-[1.85] text-moon/70"
          >
            {storyIntro.slice(1).map((p, i) => (
              <p key={i}>
                <Marked text={p} markClass="mark-clay" />
              </p>
            ))}
          </motion.div>
        </header>

        {/* chapters with breathers between them */}
        <div className="relative mx-auto max-w-2xl px-6 sm:px-8">
          {storySections.map((section, i) => (
            <div key={section.heading}>
              <Chapter
                index={i + 1}
                heading={section.heading!}
                paragraphs={section.paragraphs}
              />
              {interludes[section.heading!] ?? null}
            </div>
          ))}
        </div>

        {/* the song gets its own room */}
        <SongSection />

        <div className="relative mx-auto max-w-2xl px-6 pb-32 sm:px-8">
          {/* what I love, as cards */}
          <motion.section {...fadeUp} className="mt-24">
            <h2 className="font-display text-2xl font-semibold text-moon sm:text-[1.75rem]">
              {storyLoves.heading}
            </h2>
            <div className="mt-6 space-y-3">
              {storyLoves.paragraphs.map((p, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-moon/10 bg-white/[0.03] p-5 font-body text-[16px] leading-[1.8] text-moon/70"
                >
                  <Marked text={p} markClass="mark-clay" />
                </div>
              ))}
            </div>
            <Link
              href="/#speaking"
              className="mt-5 inline-block font-hand text-xl text-ember hover:underline"
            >
              see the stages I have stood on →
            </Link>
          </motion.section>

          {/* where I stand */}
          <motion.section
            {...fadeUp}
            className="mt-20 rounded-2xl border border-ember/25 bg-ember/[0.07] p-8"
          >
            <p className="font-body text-[10px] font-semibold uppercase tracking-[0.28em] text-ember">
              where I stand today
            </p>
            <div className="mt-5 space-y-4 font-body text-[17px] leading-[1.85] text-moon/85">
              {storyPositioning.map((p, i) => (
                <p key={i}>
                  <Marked text={p} markClass="mark-clay" />
                </p>
              ))}
            </div>
          </motion.section>

          {/* closing */}
          <motion.div
            {...fadeUp}
            className="mt-20 space-y-5 border-t border-moon/10 pt-12 font-body text-[17px] leading-[1.85] text-moon/70"
          >
            {storyClosing.map((p, i) => (
              <p key={i}>
                <Marked text={p} markClass="mark-clay" />
              </p>
            ))}
          </motion.div>

          <motion.p {...fadeUp} className="mt-10 font-hand text-3xl text-ember">
            {storySignOff}
          </motion.p>

          {/* thank you */}
          <motion.div
            {...fadeUp}
            className="mt-24 border-t border-moon/10 pt-14 text-center"
          >
            <p className="font-display text-3xl italic text-moon">thank you</p>
            <p className="mx-auto mt-6 max-w-lg font-body text-sm leading-[2.1] text-moon/50">
              {thankYouNames.join("  ·  ")}
              <span className="text-moon/30">  ·  and +10,000 more</span>
            </p>
          </motion.div>

          <motion.div {...fadeUp} className="mt-20 text-center">
            <Link
              href="/"
              className="inline-block rounded-full border border-moon/25 px-7 py-3 font-body text-sm font-semibold text-moon transition-colors hover:bg-moon hover:text-night"
            >
              close the door
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
