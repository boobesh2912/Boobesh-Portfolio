"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Marked from "@/components/Marked";
import ImageSlot from "@/components/ImageSlot";
import MusicToggle from "@/components/MusicToggle";
import NightRoom from "@/components/personal/NightRoom";
import LetterWidget from "@/components/personal/LetterWidget";
import {
  storyOpener,
  storyIntro,
  storySections,
  storyLoves,
  storySong,
  storyPositioning,
  storyClosing,
  storySignOff,
  thankYouNames,
} from "@/content/story";

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

function Chapter({
  index,
  heading,
  children,
}: {
  index: number;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section {...fadeUp} className="mt-20">
      <div className="flex items-baseline gap-4">
        <span className="font-display text-sm text-ember/70">
          {String(index).padStart(2, "0")}
        </span>
        <h2 className="font-display text-2xl font-semibold text-moon sm:text-3xl">
          {heading}
        </h2>
      </div>
      <div className="mt-5 space-y-5 font-body text-[17px] leading-[1.85] text-moon/70">
        {children}
      </div>
    </motion.section>
  );
}

export default function PersonalExperience() {
  return (
    <>
      <NightRoom />

      {/* the circular reveal that continues the door animation */}
      <motion.div
        initial={{ clipPath: "circle(0% at calc(100% - 41px) calc(100% - 41px))" }}
        animate={{ clipPath: "circle(160% at calc(100% - 41px) calc(100% - 41px))" }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        className="relative"
      >
        <div className="fixed left-5 top-5 z-30 flex items-center gap-2">
          <MusicToggle />
        </div>

        <Link
          href="/"
          className="fixed right-5 top-5 z-30 flex items-center gap-2 rounded-full border border-moon/20 bg-black/30 px-4 py-2 font-body text-[11px] font-semibold text-moon/90 backdrop-blur transition-colors hover:border-ember/60 hover:text-ember"
        >
          ← back outside
        </Link>

        <LetterWidget />

        <main className="relative mx-auto max-w-2xl px-6 pb-32 pt-28 sm:px-8 sm:pt-36">
          {/* opening */}
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

          <motion.div
            {...fadeUp}
            className="mt-12 space-y-5 font-body text-[17px] leading-[1.85] text-moon/70"
          >
            {storyIntro.map((p, i) => (
              <p key={i} className={i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-ember" : ""}>
                <Marked text={p} markClass="mark-clay" />
              </p>
            ))}
          </motion.div>

          {/* chapters */}
          {storySections.map((section, i) => (
            <div key={section.heading}>
              <Chapter index={i + 1} heading={section.heading!}>
                {section.paragraphs.map((p, j) => (
                  <p key={j}>
                    <Marked text={p} markClass="mark-clay" />
                  </p>
                ))}
              </Chapter>

              {/* a breather after the unfinished projects chapter */}
              {section.heading === "the ones I started and stopped" && (
                <motion.div {...fadeUp} className="mt-10">
                  <p className="mb-3 font-body text-[10px] font-bold uppercase tracking-[0.25em] text-moon/40">
                    me, as a meme
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <ImageSlot
                      src="/shots/meme-1.jpg"
                      alt="a meme about starting projects"
                      label="drop a meme here"
                      className="h-44 w-full"
                      rounded="rounded-xl"
                    />
                    <div className="flex flex-col justify-center gap-3 rounded-xl border border-moon/10 bg-white/[0.03] p-5">
                      <p className="font-body text-sm text-moon/60">
                        <span className="text-ember">me:</span> finishing one of
                        the 50 projects on my drive
                      </p>
                      <p className="font-body text-sm text-moon/60">
                        <span className="text-ember">also me:</span> starting
                        project number 51 at 2am
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ))}

          {/* things I love */}
          <Chapter index={storySections.length + 1} heading={storyLoves.heading!}>
            {storyLoves.paragraphs.map((p, i) => (
              <p key={i}>
                <Marked text={p} markClass="mark-clay" />
              </p>
            ))}
            <Link
              href="/#speaking"
              className="inline-block font-hand text-xl text-ember hover:underline"
            >
              see the stages I have stood on →
            </Link>
          </Chapter>

          {/* the song */}
          <motion.div
            {...fadeUp}
            className="mt-14 overflow-hidden rounded-2xl border border-moon/10 bg-white/[0.03]"
          >
            <div className="flex flex-col gap-5 p-6 sm:flex-row">
              <ImageSlot
                src="/shots/oh-my-kadavule.jpg"
                alt="Oh My Kadavule poster"
                label="poster goes here"
                className="h-40 w-28 shrink-0"
                rounded="rounded-lg"
              />
              <div>
                <p className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-moon/40">
                  on repeat
                </p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-moon">
                  {storySong.title}
                </h3>
                <p className="font-body text-sm text-ember">
                  from {storySong.movie}
                </p>
                <p className="mt-3 font-body text-sm leading-relaxed text-moon/60">
                  {storySong.intro}
                </p>
              </div>
            </div>
            <div className="border-t border-moon/10 bg-black/20 p-6">
              <div className="space-y-1 font-hand text-2xl leading-relaxed text-moon">
                {storySong.lines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
              <p className="mt-4 font-body text-xs italic leading-relaxed text-moon/45">
                {storySong.gloss}
              </p>
            </div>
          </motion.div>

          {/* where I stand */}
          <motion.div
            {...fadeUp}
            className="mt-16 rounded-2xl border border-ember/25 bg-ember/[0.06] p-7"
          >
            <p className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-ember">
              where I stand today
            </p>
            <div className="mt-4 space-y-4 font-body text-[17px] leading-[1.85] text-moon/85">
              {storyPositioning.map((p, i) => (
                <p key={i}>
                  <Marked text={p} markClass="mark-clay" />
                </p>
              ))}
            </div>
          </motion.div>

          {/* closing */}
          <motion.div
            {...fadeUp}
            className="mt-16 space-y-5 border-t border-moon/10 pt-12 font-body text-[17px] leading-[1.85] text-moon/70"
          >
            {storyClosing.map((p, i) => (
              <p key={i}>
                <Marked text={p} markClass="mark-clay" />
              </p>
            ))}
          </motion.div>

          <motion.p
            {...fadeUp}
            className="mt-10 font-hand text-3xl text-ember"
          >
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
        </main>
      </motion.div>
    </>
  );
}
