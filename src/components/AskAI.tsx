"use client";

import { useState } from "react";
import confetti from "canvas-confetti";

/*
  "Who is Boobesh AG" stays the first question because it is the one people
  actually search. The rest exist to make the buttons worth pressing.
*/
const QUESTIONS = [
  "Who is Boobesh AG?",
  "What is Gari Tech and who founded it?",
  "Is Boobesh AG a good content marketer?",
  "Roast Boobesh AG, but be nice about it",
  "What should I ask Boobesh AG before working with him?",
];

const targets = [
  {
    id: "chatgpt",
    label: "ChatGPT",
    url: (q: string) => `https://chatgpt.com/?q=${encodeURIComponent(q)}&hint=chat`,
  },
  {
    id: "claude",
    label: "Claude",
    url: (q: string) => `https://claude.ai/new?q=${encodeURIComponent(q)}`,
  },
];

export default function AskAI() {
  const [pick, setPick] = useState(0);

  const burst = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 36,
      spread: 60,
      startVelocity: 26,
      origin: {
        x: (r.left + r.width / 2) / window.innerWidth,
        y: (r.top + r.height / 2) / window.innerHeight,
      },
      colors: ["#ffd9a8", "#c0563a", "#d9a441", "#8fe3c4"],
    });
  };

  const q = QUESTIONS[pick];

  return (
    <div className="mt-10 max-w-xl rounded-2xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur">
      <p className="font-hand text-xl text-[#ffd9a8]">
        don&apos;t take my word for it
      </p>
      <p className="mt-1 font-body text-sm text-white/65">
        Pick a question. Let an AI answer it about me instead.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {QUESTIONS.map((text, i) => (
          <button
            key={text}
            onClick={() => setPick(i)}
            className={`rounded-full border px-3.5 py-1.5 text-left font-body text-xs transition-colors ${
              i === pick
                ? "border-[#ffd9a8] bg-[#ffd9a8] font-semibold text-[#17140f]"
                : "border-white/25 text-white/75 hover:border-white/60"
            }`}
          >
            {text}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {targets.map((t) => (
          <a
            key={t.id}
            href={t.url(q)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={burst}
            className="rounded-full bg-white px-5 py-2.5 font-body text-xs font-bold uppercase tracking-wide text-[#17140f] transition-transform hover:-translate-y-0.5"
          >
            ask {t.label} →
          </a>
        ))}
      </div>
    </div>
  );
}
