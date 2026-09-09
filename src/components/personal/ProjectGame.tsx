"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/*
  A tiny game about the thing I am worst at: finishing.

  Ideas pop up. Click one to ship it before it fades into the pile. It gets
  faster, because that is how it actually feels.
*/

const IDEAS = [
  "an agency",
  "a newsletter",
  "a podcast",
  "a SaaS thing",
  "a community",
  "an AI tool",
  "a course",
  "a clothing brand",
  "a Notion template",
  "a YouTube channel",
  "a job board",
  "a resume builder",
  "an app for students",
  "a content calendar tool",
  "a startup, again",
  "a personal site",
  "a design studio",
  "a coaching offer",
];

const ROUND_SECONDS = 25;
const CELLS = 9;

type Live = { id: number; cell: number; idea: string; born: number; life: number };

function verdict(shipped: number, dropped: number) {
  if (shipped >= 14)
    return {
      title: "Suspicious.",
      line: "You finished more than I ever have. Either you are lying or you should be running Gari Tech.",
    };
  if (shipped >= 9)
    return {
      title: "Better than me.",
      line: "Genuinely. That is a higher finish rate than my drive folder has ever seen.",
    };
  if (shipped >= 5)
    return {
      title: "You are me.",
      line: `${shipped} shipped, ${dropped} left to rot. That is almost exactly my ratio. Welcome to the club.`,
    };
  return {
    title: "Ah. A fellow starter.",
    line: "Do not worry about it. There are 50 projects on my drive and about half of them look like this too.",
  };
}

export default function ProjectGame() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<"idle" | "playing" | "over">("idle");
  const [left, setLeft] = useState(ROUND_SECONDS);
  const [shipped, setShipped] = useState(0);
  const [dropped, setDropped] = useState(0);
  const [live, setLive] = useState<Live[]>([]);

  const nextId = useRef(0);
  const spawnT = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tickT = useRef<ReturnType<typeof setInterval> | null>(null);
  const endT = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (spawnT.current) clearTimeout(spawnT.current);
    if (tickT.current) clearInterval(tickT.current);
    if (endT.current) clearTimeout(endT.current);
    spawnT.current = null;
    tickT.current = null;
    endT.current = null;
  }, []);

  // The round ends on its own timer rather than by watching the clock in an
  // effect, so the transition happens in one place.
  const endRound = useCallback(() => {
    clearTimers();
    setLive([]);
    setPhase("over");
  }, [clearTimers]);

  const start = () => {
    clearTimers();
    setPhase("playing");
    setLeft(ROUND_SECONDS);
    setShipped(0);
    setDropped(0);
    setLive([]);
    endT.current = setTimeout(endRound, ROUND_SECONDS * 1000);
  };

  // display countdown only, it never drives the transition
  useEffect(() => {
    if (phase !== "playing") return;
    tickT.current = setInterval(() => {
      setLeft((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => {
      if (tickT.current) clearInterval(tickT.current);
    };
  }, [phase]);

  // spawn loop, speeding up as the round goes on
  useEffect(() => {
    if (phase !== "playing") return;
    let cancelled = false;

    const spawn = () => {
      if (cancelled) return;
      const elapsed = ROUND_SECONDS - left;
      const life = Math.max(900, 2000 - elapsed * 45);

      setLive((cur) => {
        const taken = new Set(cur.map((l) => l.cell));
        const free = Array.from({ length: CELLS }, (_, i) => i).filter(
          (c) => !taken.has(c)
        );
        if (!free.length) return cur;
        const cell = free[Math.floor(Math.random() * free.length)];
        const item: Live = {
          id: nextId.current++,
          cell,
          idea: IDEAS[Math.floor(Math.random() * IDEAS.length)],
          born: Date.now(),
          life,
        };
        setTimeout(() => {
          if (cancelled) return;
          setLive((c2) => {
            if (!c2.some((l) => l.id === item.id)) return c2;
            setDropped((d) => d + 1);
            return c2.filter((l) => l.id !== item.id);
          });
        }, life);
        return [...cur, item];
      });

      const gap = Math.max(340, 900 - (ROUND_SECONDS - left) * 22);
      spawnT.current = setTimeout(spawn, gap);
    };

    spawnT.current = setTimeout(spawn, 350);
    return () => {
      cancelled = true;
      if (spawnT.current) clearTimeout(spawnT.current);
    };
    // left is intentionally excluded: re-running on every tick would reset
    // the spawn chain. Difficulty is read from the ref-like closure instead.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const ship = (id: number) => {
    setLive((cur) => {
      if (!cur.some((l) => l.id === id)) return cur;
      setShipped((s) => s + 1);
      return cur.filter((l) => l.id !== id);
    });
  };

  const v = verdict(shipped, dropped);

  return (
    <div className="mt-16">
      {!open && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onClick={() => setOpen(true)}
          className="group w-full rounded-2xl border border-ember/30 bg-ember/[0.07] p-7 text-left transition-colors hover:border-ember/60"
        >
          <p className="font-hand text-2xl text-ember">can we play a game?</p>
          <p className="mt-2 font-body text-[15px] leading-relaxed text-moon/70">
            It is about the thing I am worst at. Ideas will keep appearing.
            Ship them before they end up in the pile with the other fifty.
          </p>
          <span className="mt-4 inline-flex items-center gap-2 font-body text-sm font-semibold text-ember">
            open it
            <span className="transition-transform group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </span>
        </motion.button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="rounded-2xl border border-moon/12 bg-black/30 p-6 backdrop-blur"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-hand text-2xl text-ember">ship it before it dies</p>
                <p className="mt-1 font-body text-[13px] text-moon/50">
                  a game about my worst habit
                </p>
              </div>
              <button
                onClick={() => {
                  setOpen(false);
                  setPhase("idle");
                  clearTimers();
                }}
                className="rounded-full border border-moon/20 px-3 py-1.5 font-body text-[11px] font-semibold text-moon/70 hover:border-ember/50 hover:text-ember"
              >
                close
              </button>
            </div>

            {phase === "playing" && (
              <div className="mt-5 flex items-center gap-5 font-body text-[12px] font-semibold uppercase tracking-wider">
                <span className="text-sage">shipped {shipped}</span>
                <span className="text-[#c96a4a]">dropped {dropped}</span>
                <span className="ml-auto tabular-nums text-moon/70">{left}s</span>
              </div>
            )}

            {phase === "idle" && (
              <div className="mt-6 text-center">
                <p className="mx-auto max-w-sm font-body text-[15px] leading-relaxed text-moon/65">
                  Twenty five seconds. Ideas pop up, you click to ship them.
                  They get faster. That part is not a bug.
                </p>
                <button
                  onClick={start}
                  className="mt-5 rounded-full bg-ember px-7 py-3 font-body text-sm font-bold text-[#14100c] transition-transform hover:-translate-y-0.5"
                >
                  start
                </button>
              </div>
            )}

            {phase === "playing" && (
              <div className="mt-4 grid grid-cols-3 gap-2.5">
                {Array.from({ length: CELLS }, (_, cell) => {
                  const item = live.find((l) => l.cell === cell);
                  return (
                    <div
                      key={cell}
                      className="relative flex h-24 items-center justify-center rounded-xl border border-moon/8 bg-white/[0.02] sm:h-28"
                    >
                      <AnimatePresence>
                        {item && (
                          <motion.button
                            key={item.id}
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ duration: 0.16 }}
                            onClick={() => ship(item.id)}
                            className="absolute inset-1 flex flex-col items-center justify-center gap-1 rounded-lg bg-gradient-to-br from-ember/25 to-[#8a3f22]/30 px-2 text-center"
                          >
                            <span className="font-body text-[12px] font-semibold leading-tight text-moon">
                              {item.idea}
                            </span>
                            <motion.span
                              initial={{ width: "90%" }}
                              animate={{ width: "0%" }}
                              transition={{ duration: item.life / 1000, ease: "linear" }}
                              className="h-[3px] rounded-full bg-ember"
                            />
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}

            {phase === "over" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-center"
              >
                <div className="flex justify-center gap-8">
                  <div>
                    <p className="font-display text-4xl font-semibold text-sage">
                      {shipped}
                    </p>
                    <p className="font-body text-[11px] uppercase tracking-wider text-moon/45">
                      shipped
                    </p>
                  </div>
                  <div>
                    <p className="font-display text-4xl font-semibold text-[#c96a4a]">
                      {dropped}
                    </p>
                    <p className="font-body text-[11px] uppercase tracking-wider text-moon/45">
                      unfinished
                    </p>
                  </div>
                </div>

                <p className="mt-6 font-display text-2xl font-semibold italic text-moon">
                  {v.title}
                </p>
                <p className="mx-auto mt-2 max-w-md font-body text-[15px] leading-relaxed text-moon/65">
                  {v.line}
                </p>

                <button
                  onClick={start}
                  className="mt-6 rounded-full border border-moon/25 px-6 py-2.5 font-body text-sm font-semibold text-moon transition-colors hover:bg-moon hover:text-night"
                >
                  again
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
