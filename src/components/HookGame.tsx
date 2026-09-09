"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/*
  Pick the hook that worked. Every pair is a real choice I have argued about
  in a doc with somebody, and the reason under it is the actual reason, not a
  rule from a carousel about copywriting.
*/
type Round = {
  a: string;
  b: string;
  winner: "a" | "b";
  why: string;
};

const rounds: Round[] = [
  {
    a: "5 tips to grow on LinkedIn in 2026",
    b: "I posted for 90 days straight. Here is what nobody tells you.",
    winner: "b",
    why: "Specific beats numbered. Ninety days is a claim you can check, five tips is a shape you have scrolled past a thousand times.",
  },
  {
    a: "We are excited to announce our new website!",
    b: "Our old website was costing us clients. So we rebuilt it.",
    winner: "b",
    why: "Nobody is excited about your announcement. They are interested in the problem, because they probably have it too.",
  },
  {
    a: "How to write better captions",
    b: "Your caption is not the problem. Your first line is.",
    winner: "b",
    why: "Disagreeing with the reader earns a second of attention. Agreeing with them earns nothing.",
  },
  {
    a: "I made ₹1,00,000 before I turned 21.",
    b: "I made my first ₹1,00,000 selling kitchen utensils I did not own.",
    winner: "b",
    why: "The number is the setup, not the hook. The strange detail is what makes someone stop.",
  },
  {
    a: "Consistency is key to content marketing success.",
    b: "Everything that worked for me, worked after week two.",
    winner: "b",
    why: "Same idea. One is a poster in an office, the other sounds like it cost somebody something.",
  },
  {
    a: "Thoughts on the new Instagram algorithm?",
    b: "The algorithm did not change. Your posting did.",
    winner: "b",
    why: "A question invites a scroll. A verdict invites an argument, and arguments get comments.",
  },
];

export default function HookGame() {
  const [round, setRound] = useState(0);
  const [picked, setPicked] = useState<"a" | "b" | null>(null);
  const [score, setScore] = useState(0);

  const current = rounds[round];
  const done = round >= rounds.length;

  const choose = (choice: "a" | "b") => {
    if (picked) return;
    setPicked(choice);
    if (choice === current.winner) setScore((s) => s + 1);
  };

  const next = () => {
    setPicked(null);
    setRound((r) => r + 1);
  };

  const restart = () => {
    setPicked(null);
    setScore(0);
    setRound(0);
  };

  const verdict =
    score === rounds.length
      ? "You do this for a living, do not you."
      : score >= 4
        ? "Solid instincts. You would survive my content calendar."
        : score >= 2
          ? "Halfway there. The good news is this is learnable."
          : "Genuinely, this is the most common score. It is why I have a job.";

  return (
    <section className="bg-dots border-y border-line px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="font-hand text-2xl text-coral-deep">
            a break from reading
          </p>
          <h2 className="mt-1 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Which hook worked?
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-body text-[15px] leading-relaxed text-ink-soft">
            Six pairs. One of each actually performed. Pick the one you would
            have published and find out how much of this you already know.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-line bg-paper p-7 shadow-[0_10px_30px_rgba(23,20,15,0.06)] sm:p-9">
          {done ? (
            <div className="text-center">
              <p className="font-display text-6xl font-semibold text-ink">
                {score}
                <span className="text-2xl text-ink-soft">/{rounds.length}</span>
              </p>
              <p className="mx-auto mt-4 max-w-md font-body text-[16px] leading-relaxed text-ink-soft">
                {verdict}
              </p>
              <button
                onClick={restart}
                className="mt-7 rounded-full bg-ink px-6 py-3 font-body text-sm font-semibold text-cream transition-transform hover:-translate-y-0.5"
              >
                go again
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between font-body text-[11px] font-bold uppercase tracking-[0.2em] text-ink-soft">
                <span>
                  round {round + 1} of {rounds.length}
                </span>
                <span>score {score}</span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {(["a", "b"] as const).map((key) => {
                  const isWinner = current.winner === key;
                  const chosen = picked === key;
                  const state = !picked
                    ? "border-line bg-cream hover:border-coral hover:-translate-y-0.5"
                    : isWinner
                      ? "border-sage bg-sage/25 shadow-[0_0_0_3px_color-mix(in_srgb,var(--sage)_22%,transparent)]"
                      : chosen
                        ? "border-coral bg-coral/18"
                        : "border-line bg-cream opacity-45";
                  return (
                    <button
                      key={key}
                      onClick={() => choose(key)}
                      disabled={!!picked}
                      className={`rounded-2xl border p-6 text-left font-body text-[15px] leading-relaxed text-ink transition-all ${state}`}
                    >
                      {current[key]}
                      {picked && isWinner && (
                        <span className="mt-3 block font-body text-[11px] font-bold uppercase tracking-[0.16em] text-sage-deep">
                          this one
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {picked && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="mt-6 border-l-2 border-coral pl-5 font-body text-[15px] leading-[1.8] text-ink-soft">
                      {current.why}
                    </p>
                    <button
                      onClick={next}
                      className="mt-6 w-full rounded-full bg-ink px-6 py-3 font-body text-sm font-semibold text-cream transition-transform hover:-translate-y-0.5"
                    >
                      {round === rounds.length - 1 ? "see the score" : "next pair"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
