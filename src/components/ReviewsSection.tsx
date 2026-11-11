"use client";

import { useRef } from "react";
import Reveal from "@/components/Reveal";
import { reviews } from "@/content/reviews";
import VideoReview from "@/components/VideoReview";
import { tejasviVideo } from "@/content/videos";

/*
  A Netflix style row: the cards scroll sideways, snap, and the one under the
  pointer lifts while its neighbours dim. Arrows for people without a trackpad.
*/
export default function ReviewsSection({
  eyebrow = "S1 · E3½ · what people said",
  heading = "Six reviews. All five stars. I did not write any of them.",
}: {
  eyebrow?: string;
  heading?: string;
}) {
  const row = useRef<HTMLDivElement>(null);
  const nudge = (d: 1 | -1) =>
    row.current?.scrollBy({ left: d * row.current.clientWidth * 0.7, behavior: "smooth" });

  return (
    <section id="reviews" className="bg-rules border-y border-line py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <Reveal>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.25em] text-coral">
            {eyebrow}
          </p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-xl font-display text-3xl font-semibold leading-[1.15] text-ink sm:text-[2.6rem]">
              {heading}
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

      {/* the one review that is a video gets room to breathe */}
      <div className="mx-auto mt-12 max-w-6xl px-4 sm:px-8">
        <div className="grid items-center gap-10 rounded-3xl border border-line bg-paper p-6 sm:p-10 md:grid-cols-[minmax(0,300px)_1fr]">
          <VideoReview
            src={tejasviVideo.src}
            poster={tejasviVideo.poster}
            label={tejasviVideo.label}
          />
          <div>
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.25em] text-coral">
              watch, with sound
            </p>
            <blockquote className="mt-4 font-display text-3xl font-semibold leading-[1.15] text-ink sm:text-[2.6rem]">
              She liked the website enough to record a video about it.
            </blockquote>
            <p className="mt-5 font-body text-[15px] font-semibold text-ink">
              Tejasvi R.A.
            </p>
            <p className="font-body text-sm text-ink-soft">
              Founder, Speak With Ikigai. We built her official website. Her
              written review is in the row below.
            </p>
          </div>
        </div>
      </div>

      <div
        ref={row}
        /* lines the first card up with the heading, then scrolls to the edge */
        style={{ paddingInline: "max(1rem, calc((100vw - 72rem) / 2 + 2rem))", scrollPaddingInline: "max(1rem, calc((100vw - 72rem) / 2 + 2rem))" }}
        className="group/row mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
