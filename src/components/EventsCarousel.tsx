"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { EventItem } from "@/lib/collections";

/*
  The live speaking gallery. Entries come from the admin desk, so adding a new
  one is a form rather than a code change. Arrows and a drag both work, and
  the strip snaps so a card is never left half off the edge.
*/
export default function EventsCarousel({ events }: { events: EventItem[] }) {
  const strip = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<string | null>(null);

  const nudge = (dir: 1 | -1) => {
    const el = strip.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <>
      <div className="mb-5 flex items-center justify-end gap-2">
        <button
          onClick={() => nudge(-1)}
          aria-label="previous events"
          className="h-10 w-10 rounded-full border border-line font-body text-ink-soft transition-colors hover:border-coral hover:text-coral"
        >
          ←
        </button>
        <button
          onClick={() => nudge(1)}
          aria-label="more events"
          className="h-10 w-10 rounded-full border border-line font-body text-ink-soft transition-colors hover:border-coral hover:text-coral"
        >
          →
        </button>
      </div>

      <div
        ref={strip}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {events.map((e, i) => {
          const expanded = open === e.slug;
          return (
            <motion.article
              key={e.slug}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.05 * (i % 4) }}
              className="w-[19rem] shrink-0 snap-center overflow-hidden rounded-3xl border border-line bg-paper shadow-[0_10px_30px_rgba(23,20,15,0.06)]"
            >
              <div className="relative h-44 w-full overflow-hidden bg-cream-deep">
                {e.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element --
                     paths are written by the admin desk at runtime */
                  <img
                    src={e.image}
                    alt={e.alt}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center font-hand text-xl text-ink-soft">
                    no photo yet
                  </div>
                )}
                {e.date && (
                  <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 font-body text-[10px] font-bold uppercase tracking-[0.16em] text-ink backdrop-blur">
                    {e.date}
                  </span>
                )}
              </div>

              <div className="p-6">
                <h3 className="font-display text-lg font-semibold leading-snug text-ink">
                  {e.title}
                </h3>
                <p className="mt-1 font-body text-[11px] font-bold uppercase tracking-[0.16em] text-coral-deep">
                  organised by {e.organizer}
                </p>
                <p
                  className={`mt-3 font-body text-sm leading-relaxed text-ink-soft ${
                    expanded ? "" : "line-clamp-3"
                  }`}
                >
                  {e.description}
                </p>
                {e.description.length > 110 && (
                  <button
                    onClick={() => setOpen(expanded ? null : e.slug)}
                    className="mt-3 font-hand text-lg text-coral-deep hover:underline"
                  >
                    {expanded ? "less" : "read the rest"}
                  </button>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>
    </>
  );
}
