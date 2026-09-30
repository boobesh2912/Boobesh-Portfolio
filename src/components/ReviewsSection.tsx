"use client";

import { useRef } from "react";
import Reveal from "@/components/Reveal";
import { reviews } from "@/content/reviews";

/*
  A Netflix style row: the cards scroll sideways, snap, and the one under the
  pointer lifts while its neighbours dim. Arrows for people without a trackpad.
*/
export default function ReviewsSection() {
  const row = useRef<HTMLDivElement>(null);
  const nudge = (d: 1 | -1) =>
    row.current?.scrollBy({ left: d * row.current.clientWidth * 0.7, behavior: "smooth" });

  return (
    <section id="reviews" className="bg-rules border-y border-line py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <Reveal>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.25em] text-coral">
            S1 · E3½ — what people said
          </p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-xl font-display text-3xl font-semibold leading-[1.15] text-ink sm:text-[2.6rem]">
              Six reviews. All five stars. I did not write any of them.
            </h2>
            <div className="flex gap-2">
              {(["←", "→"] as const).map((a, i) => (
                <button
                  key={a}
                  onClick={() => nudge(i ? 1 : -1)}
                  aria-label={i ? "next reviews" : "previous reviews"}
                  className="h-10 w-10 rounded-full border border-line text-ink-soft transition-colors hover:border-coral hover:text-coral"
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <div
        ref={row}
        /* lines the first card up with the heading, then scrolls to the edge */
        style={{ paddingInline: "max(1rem, calc((100vw - 72rem) / 2 + 2rem))", scrollPaddingInline: "max(1rem, calc((100vw - 72rem) / 2 + 2rem))" }}
        className="group/row mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((r) => (
          <article
            key={r.name}
            className="flex w-[21rem] shrink-0 snap-start flex-col rounded-3xl border border-line bg-paper p-7 shadow-[0_10px_30px_rgba(23,20,15,0.06)] transition-all duration-300 group-hover/row:opacity-60 hover:!opacity-100 hover:-translate-y-2 hover:scale-[1.02]"
          >
            <p className="text-lg tracking-widest text-butter" aria-label="5 out of 5 stars">
              ★★★★★
            </p>
            <p className="mt-4 flex-1 font-body text-[15px] leading-[1.75] text-ink">
              &ldquo;{r.text}&rdquo;
            </p>
            <div className="mt-6 border-t border-line pt-4">
              <p className="font-display text-base font-semibold text-ink">{r.name}</p>
              <p className="font-body text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
                {r.about} · Google
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
