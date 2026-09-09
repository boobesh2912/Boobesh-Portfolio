"use client";

import { useState } from "react";
import { speakingMoments } from "@/content/speaking";

const gradients = [
  "from-coral to-lavender",
  "from-sage to-butter",
  "from-lavender to-pink",
  "from-butter to-coral",
];

export default function SpeakingSection() {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  const toggle = (id: string) =>
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section id="speaking" className="px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="font-hand text-2xl text-coral-deep">a mic makes everything better</p>
          <h2 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">
            stages I have stood on
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-body text-sm text-ink-soft">
            I talk for a living, and then I go find more rooms to talk in for
            free. Tap a card for the story behind it.
          </p>
        </div>

        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {speakingMoments.map((m, i) => {
            const isFlipped = !!flipped[m.id];
            return (
              <button
                key={m.id}
                onClick={() => toggle(m.id)}
                className="relative h-80 w-64 shrink-0 snap-center [perspective:1200px]"
                aria-label={`read the story behind ${m.title}`}
              >
                <div
                  className="relative h-full w-full rounded-3xl shadow-[0_4px_0_0_var(--line)] transition-transform duration-500 [transform-style:preserve-3d]"
                  style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
                >
                  <div
                    className={`absolute inset-0 flex flex-col justify-end rounded-3xl bg-gradient-to-br ${gradients[i % gradients.length]} p-5 [backface-visibility:hidden]`}
                  >
                    <span className="mb-2 text-3xl">🎤</span>
                    <h3 className="font-display text-lg font-bold text-[#0a1120]">
                      {m.title}
                    </h3>
                    <p className="mt-1 font-body text-xs font-bold uppercase tracking-wide text-[#0a1120]/70">
                      {m.venue}
                    </p>
                    <p className="mt-3 font-hand text-sm text-[#0a1120]/70">
                      tap for the story →
                    </p>
                  </div>

                  <div
                    className="absolute inset-0 flex flex-col justify-center rounded-3xl border border-line bg-paper p-6 text-left [backface-visibility:hidden]"
                    style={{ transform: "rotateY(180deg)" }}
                  >
                    <p className="font-body text-sm leading-relaxed text-ink-soft">
                      {m.story}
                    </p>
                    <p className="mt-4 font-hand text-sm text-coral-deep">
                      tap to flip back
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-center font-hand text-lg text-ink-soft">
          real photos from real stages coming soon, this gallery updates the
          day I get them.
        </p>
      </div>
    </section>
  );
}
