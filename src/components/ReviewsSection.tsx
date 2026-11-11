"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Reveal from "@/components/Reveal";
import { reviews } from "@/content/reviews";
import VideoReview from "@/components/VideoReview";
import { tejasviVideo } from "@/content/videos";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/*
  The reviews are laid out in one long row, and the page scrolls them sideways
  for you. The row is pinned to the screen while you scroll down, so the
  vertical scroll is spent moving the cards across, and when the last card has
  arrived the page carries on as normal. Anyone who prefers less motion gets
  an ordinary swipeable row instead.
*/
const EDGE = "max(1rem, calc((100vw - 72rem) / 2 + 2rem))";

export default function ReviewsSection({
  eyebrow = "S1 · E3½ · what people said",
  heading = "Six reviews. All five stars. I did not write any of them.",
}: {
  eyebrow?: string;
  heading?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const track = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);

  // how far the row has to travel: its full width minus one screen
  useEffect(() => {
    const el = row.current;
    if (!el) return;
    const measure = () => setDist(Math.max(0, el.scrollWidth - window.innerWidth));
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });
  const eased = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.0005 });
  const x = useTransform(eased, [0, 1], [0, -dist]);
  const bar = useTransform(eased, [0, 1], ["0%", "100%"]);

  return (
    <section id="reviews" className="bg-rules border-y border-line pt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <Reveal>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.25em] text-coral">
            {eyebrow}
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold leading-[1.15] text-ink sm:text-[2.6rem]">
            {heading}
          </h2>
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

      {/*
        The track is as tall as the sideways journey. Inside it, the stage is
        pinned to the screen and the row slides along as the page scrolls.
      */}
      <div
        ref={track}
        style={reduced ? undefined : { height: `calc(100vh + ${dist}px)` }}
        className="no-scroll-fade relative mt-10"
      >
        <div
          className={
            reduced
              ? "overflow-x-auto pb-6"
              : "sticky top-0 flex h-screen flex-col justify-center overflow-hidden"
          }
        >
          <motion.div
            ref={row}
            style={{ paddingInline: EDGE, ...(reduced ? {} : { x }) }}
            className="group/row flex w-max gap-5"
          >
            {reviews.map((r) => (
              <article
                key={r.name}
                className="flex w-[21rem] shrink-0 flex-col rounded-3xl border border-line bg-paper p-7 shadow-[0_10px_30px_rgba(23,20,15,0.06)] transition-[opacity,translate,scale] duration-300 group-hover/row:opacity-60 hover:!opacity-100 hover:-translate-y-2 hover:scale-[1.02]"
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
          </motion.div>

          {!reduced && (
            <div
              className="mx-auto mt-10 w-full max-w-6xl px-4 sm:px-8"
              aria-hidden
            >
              <div className="h-px w-full bg-line">
                <motion.div style={{ width: bar }} className="h-px bg-coral" />
              </div>
              <p className="mt-3 font-hand text-lg text-ink-soft">keep scrolling, they get better</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
