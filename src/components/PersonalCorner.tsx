"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
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

const dustPositions = [
  { left: "12%", top: "20%", delay: 0 },
  { left: "80%", top: "15%", delay: 1.2 },
  { left: "65%", top: "70%", delay: 2.1 },
  { left: "25%", top: "80%", delay: 0.6 },
  { left: "50%", top: "40%", delay: 1.8 },
  { left: "90%", top: "55%", delay: 0.9 },
];

const raindrops = Array.from({ length: 28 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  duration: 1.4 + ((i * 13) % 10) / 10,
  delay: ((i * 7) % 20) / 10,
  height: 30 + ((i * 17) % 40),
}));

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

function RainLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
      {raindrops.map((d, i) => (
        <span
          key={i}
          className="absolute top-[-10%] w-px bg-gradient-to-b from-transparent via-[#c9d6ff]/70 to-transparent"
          style={{
            left: d.left,
            height: `${d.height}px`,
            animation: `rainfall ${d.duration}s linear ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function AmbientAudio({ active }: { active: boolean }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (active && !muted) {
      el.volume = 0.35;
      el.play().catch(() => {
        /* no audio file yet, or browser blocked it, silently ignore */
      });
    } else {
      el.pause();
    }
  }, [active, muted]);

  return (
    <>
      <audio ref={ref} loop src="/kadhaippoma-instrumental.mp3" />
      <button
        onClick={() => setMuted((m) => !m)}
        className="fixed left-5 top-5 z-10 flex items-center gap-2 rounded-full border border-ink/20 bg-black/30 px-3 py-2 font-body text-xs font-bold text-ink backdrop-blur"
      >
        {muted ? "🔇" : "🎵"} Kadhaippoma, OMK
      </button>
    </>
  );
}

function LetterWidget() {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const send = () => {
    const body = encodeURIComponent(text || "Hey Boo, just wanted to say hi.");
    window.location.href = `mailto:dreamsofboo@gmail.com?subject=${encodeURIComponent(
      "a letter for Boo"
    )}&body=${body}`;
  };

  return (
    <div className="fixed bottom-5 right-5 z-10">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            className="mb-3 w-72 rounded-2xl border border-ink/15 bg-[#0a0f1a]/95 p-4 shadow-2xl backdrop-blur"
          >
            <p className="font-hand text-lg text-butter">write me a letter</p>
            <p className="mt-1 font-body text-xs text-ink-soft">
              say whatever you want. I&apos;ll give you something back.
            </p>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              placeholder="dear boo,"
              className="mt-3 w-full rounded-xl border border-ink/15 bg-black/30 p-3 font-body text-sm text-ink placeholder:text-ink-soft/50 focus:outline-none"
            />
            <button
              onClick={send}
              className="mt-3 w-full rounded-full bg-butter px-4 py-2 font-body text-sm font-bold text-[#04070f]"
            >
              send it to my inbox
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-butter text-2xl shadow-[0_4px_0_0_rgba(0,0,0,0.3)]"
        aria-label="write me a letter"
      >
        ✉️
      </button>
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
              <div className="absolute -top-10 right-10 h-24 w-24 rounded-full bg-[#c9d6ff]/20 blur-2xl" />
              <div className="absolute -top-1/4 left-1/2 h-[70vh] w-[70vh] -translate-x-1/2 rounded-full bg-[#8a2c2c]/25 blur-[130px]" />
              <div className="absolute bottom-0 right-0 h-[50vh] w-[50vh] rounded-full bg-[#ff7a59]/10 blur-[110px]" />
              <div className="grain absolute inset-0 opacity-20" />
              <RainLayer />
              {dustPositions.map((d, i) => (
                <span
                  key={i}
                  className="absolute h-1 w-1 animate-blob-slow rounded-full bg-butter/60"
                  style={{ left: d.left, top: d.top, animationDelay: `${d.delay}s` }}
                />
              ))}
            </div>

            <AmbientAudio active={open} />
            <LetterWidget />

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
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-butter/20 text-lg">
                    🎬
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold text-ink">
                      {storySong.title}
                    </p>
                    <p className="font-body text-xs text-ink-soft">
                      from {storySong.movie}
                    </p>
                  </div>
                </div>
                <p className="mt-4 font-body text-sm text-ink-soft">{storySong.intro}</p>
                <div className="mt-4 space-y-1 border-l-2 border-coral pl-4 font-hand text-xl leading-relaxed text-ink">
                  {storySong.lines.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>

              <div className="mt-10 rounded-3xl border border-butter/30 bg-butter/5 p-6">
                <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-butter">
                  where I stand today
                </p>
                <div className="mt-3 space-y-3 font-body text-base leading-relaxed text-ink/80">
                  {storyPositioning.map((p, i) => (
                    <p key={i}>{p}</p>
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
