"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/*
  An old television with four channels, one per platform. Flip a channel and
  it cuts to static before the next one settles. Nothing like the stamp sheet
  on the professional side, which is the point.
*/

const channels = [
  {
    n: "01",
    label: "LINKEDIN",
    href: "https://www.linkedin.com/in/boobesh2912",
    line: "the only channel I never stopped broadcasting on",
    sub: "in/boobesh2912",
    tint: "from-[#1d3a5c] to-[#0d1d30]",
  },
  {
    n: "02",
    label: "INSTAGRAM",
    href: "https://www.instagram.com/boobeshganesan",
    line: "everything that looked better than it felt",
    sub: "@boobeshganesan",
    tint: "from-[#5c1d47] to-[#2a0d21]",
  },
  {
    n: "03",
    label: "X",
    href: "https://www.x.com/buildwithboo",
    line: "half formed thoughts, posted anyway",
    sub: "@buildwithboo",
    tint: "from-[#2d2d2d] to-[#101010]",
  },
  {
    n: "04",
    label: "YOUTUBE",
    href: "https://www.youtube.com/@dreamsofboo",
    line: "the one I keep promising to take seriously",
    sub: "@dreamsofboo",
    tint: "from-[#5c2018] to-[#280d09]",
  },
];

export default function TvSocials() {
  const [ch, setCh] = useState(0);
  const [tuning, setTuning] = useState(false);
  const active = channels[ch];

  const flip = (next: number) => {
    if (next === ch) return;
    setTuning(true);
    setTimeout(() => {
      setCh(next);
      setTuning(false);
    }, 260);
  };

  return (
    <section className="mt-24">
      <p className="mb-6 text-center font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-moon/40">
        now broadcasting
      </p>

      <div className="mx-auto max-w-md">
        {/* the set */}
        <div className="rounded-[2rem] border border-[rgba(var(--card-skin),0.14)] bg-[rgba(var(--card-skin),0.06)] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
          {/* screen */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.2rem] bg-black">
            <AnimatePresence mode="wait">
              {tuning ? (
                <motion.div
                  key="static"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                  }}
                />
              ) : (
                <motion.a
                  key={active.label}
                  href={active.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scaleY: 0.6 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  exit={{ opacity: 0, scaleY: 0.6 }}
                  transition={{ duration: 0.22 }}
                  className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br ${active.tint} p-6 text-center`}
                >
                  <span className="font-body text-[10px] uppercase tracking-[0.3em] text-white/40">
                    ch {active.n}
                  </span>
                  <span className="mt-3 font-display text-3xl font-semibold tracking-wide text-white sm:text-4xl">
                    {active.label}
                  </span>
                  <span className="mt-1 font-body text-[11px] text-white/50">
                    {active.sub}
                  </span>
                  <span className="mt-4 max-w-[15rem] font-hand text-lg leading-snug text-white/70">
                    {active.line}
                  </span>
                  <span className="mt-4 rounded-full border border-white/25 px-4 py-1.5 font-body text-[10px] font-semibold uppercase tracking-widest text-white/70">
                    tune in →
                  </span>
                </motion.a>
              )}
            </AnimatePresence>

            {/* scanlines and the curve of the glass */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.22]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, rgba(0,0,0,0.6) 0 1px, transparent 1px 3px)",
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_50%,transparent_55%,rgba(0,0,0,0.65)_100%)]" />
          </div>

          {/* controls */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex flex-1 gap-2">
              {channels.map((c, i) => (
                <button
                  key={c.n}
                  onClick={() => flip(i)}
                  aria-label={`channel ${c.n}, ${c.label}`}
                  className={`h-9 flex-1 rounded-md border font-body text-[11px] font-bold transition-colors ${
                    i === ch
                      ? "border-ember bg-ember/20 text-ember"
                      : "border-[rgba(var(--card-skin),0.15)] text-moon/45 hover:text-moon/80"
                  }`}
                >
                  {c.n}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-ember/70" />
              <span className="h-6 w-6 rounded-full border-2 border-[rgba(var(--card-skin),0.2)]" />
            </div>
          </div>
        </div>

        <p className="mt-4 text-center font-hand text-lg text-moon/35">
          four channels, one person, varying quality
        </p>
      </div>
    </section>
  );
}
