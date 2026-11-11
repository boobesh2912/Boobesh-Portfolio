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
        {events.map((e, i) => (
          <EventCard
            key={e.slug}
            e={e}
            i={i}
            expanded={open === e.slug}
            toggle={() => setOpen(open === e.slug ? null : e.slug)}
          />
        ))}
      </div>
    </>
  );
}


const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/* 2026-04-11 becomes 11 Apr 2026. Done by hand so server and browser agree. */
function niceDate(iso: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return iso;
  return `${Number(m[3])} ${MONTHS[Number(m[2]) - 1]} ${m[1]}`;
}

function EventCard({
  e,
  i,
  expanded,
  toggle,
}: {
  e: EventItem;
  i: number;
  expanded: boolean;
  toggle: () => void;
}) {
  const [shot, setShot] = useState(0);
  const many = e.images.length > 1;
  const cur = e.images[shot];
  const step = (d: 1 | -1) =>
    setShot((n) => (n + d + e.images.length) % e.images.length);

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: 0.05 * (i % 4) }}
      className="w-[21rem] shrink-0 snap-center overflow-hidden rounded-3xl border border-line bg-paper shadow-[0_10px_30px_rgba(23,20,15,0.06)]"
    >
      <div className="relative h-56 w-full overflow-hidden bg-cream-deep">
        {cur ? (
          /* eslint-disable-next-line @next/next/no-img-element --
             paths are written by the admin desk at runtime */
          <img
            key={cur.src}
            src={cur.src}
            alt={cur.alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-hand text-xl text-ink-soft">
            no photo yet
          </div>
        )}

        {e.date && (
          <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 font-body text-[10px] font-bold uppercase tracking-[0.16em] text-ink backdrop-blur">
            {niceDate(e.date)}
          </span>
        )}

        {many && (
          <>
            <button
              onClick={() => step(-1)}
              aria-label="previous photo"
              className="absolute left-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-paper/85 text-ink backdrop-blur transition-colors hover:bg-paper"
            >
              ←
            </button>
            <button
              onClick={() => step(1)}
              aria-label="next photo"
              className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-paper/85 text-ink backdrop-blur transition-colors hover:bg-paper"
            >
              →
            </button>
            <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
              {e.images.map((im, n) => (
                <button
                  key={im.src}
                  onClick={() => setShot(n)}
                  aria-label={`photo ${n + 1} of ${e.images.length}`}
                  className={`h-1.5 rounded-full transition-all ${
                    n === shot ? "w-5 bg-paper" : "w-1.5 bg-paper/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-6">
        <h3 className="font-display text-lg font-semibold leading-snug text-ink">
          {e.title}
        </h3>
        <p className="mt-1 font-body text-[11px] font-bold uppercase tracking-[0.16em] text-coral-deep">
          organised by {e.organizer}
        </p>
        {e.venue && (
          <p className="mt-1 font-body text-[12px] text-ink-soft">{e.venue}</p>
        )}
        <p
          className={`mt-3 font-body text-sm leading-relaxed text-ink-soft ${
            expanded ? "" : "line-clamp-3"
          }`}
        >
          {e.description}
        </p>
        {e.description.length > 110 && (
          <button
            onClick={toggle}
            className="mt-3 font-hand text-lg text-coral-deep hover:underline"
          >
            {expanded ? "less" : "read the rest"}
          </button>
        )}
      </div>
    </motion.article>
  );
}
