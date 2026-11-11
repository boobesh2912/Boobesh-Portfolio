"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import type { EventItem } from "@/lib/collections";

/*
  The live speaking gallery. Entries come from the admin desk, so adding a new
  one is a form rather than a code change.

  The cards sit in one long row and the page scrolls them sideways for you:
  the row is pinned while you scroll down, and each card swells as it reaches
  the middle of the screen and eases back as it leaves. Anyone who prefers
  less motion gets a plain swipeable row with arrows and drag instead.
*/
const EDGE = "max(1rem, calc((100vw - 72rem) / 2 + 2rem))";

export default function EventsCarousel({ events }: { events: EventItem[] }) {
  const reduced = usePrefersReducedMotion();
  return reduced ? <SwipeRail events={events} /> : <PinnedRail events={events} />;
}

function PinnedRail({ events }: { events: EventItem[] }) {
  const track = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const [pos, setPos] = useState({ start: true, end: false });
  const tick = useMotionValue(0);

  // how far the row has to travel: its full width minus one screen
  useEffect(() => {
    const el = row.current;
    if (!el) return;
    const measure = () => {
      setDist(Math.max(0, el.scrollWidth - window.innerWidth));
      tick.set(tick.get() + 1); // lets every card re-measure its own position
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [tick, events.length]);

  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });
  const eased = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.0005 });
  const x = useTransform(eased, [0, 1], [0, -dist]);
  const bar = useTransform(eased, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setPos({ start: v < 0.02, end: v > 0.98 })
  );

  /* scroll distance and row distance are 1:1, so one card is one step */
  const step = (dir: 1 | -1) => {
    const card = row.current?.querySelector("article");
    const by = card ? card.getBoundingClientRect().width + 20 : 360;
    window.scrollBy({ top: dir * by, behavior: "smooth" });
  };

  const arrow =
    "h-10 w-10 rounded-full border border-line font-body text-ink-soft transition-colors hover:border-coral hover:text-coral disabled:pointer-events-none disabled:opacity-30";

  return (
    <div
      ref={track}
      style={{ height: `calc(100vh + ${dist}px)` }}
      className="no-scroll-fade relative"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pb-4 pt-24">
        <div className="mx-auto mb-4 flex w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-8">
          <p className="font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
            {events.length} stages and counting
          </p>
          <div className="flex items-center gap-2">
            <button onClick={() => step(-1)} disabled={pos.start} aria-label="previous events" className={arrow}>
              ←
            </button>
            <button onClick={() => step(1)} disabled={pos.end} aria-label="more events" className={arrow}>
              →
            </button>
          </div>
        </div>

        <motion.div
          ref={row}
          style={{ paddingInline: EDGE, x }}
          className="relative flex w-max items-center gap-5 py-3"
        >
          {events.map((e, i) => (
            <ZoomCard key={e.slug} x={x} tick={tick}>
              <EventCard e={e} i={i} expanded compact toggle={() => {}} />
            </ZoomCard>
          ))}
        </motion.div>

        <div className="mx-auto mt-4 w-full max-w-6xl px-4 sm:px-8" aria-hidden>
          <div className="h-px w-full bg-line">
            <motion.div style={{ width: bar }} className="h-px bg-coral" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* Grows as the card nears the middle of the screen, shrinks and dims as it leaves. */
function ZoomCard({
  x,
  tick,
  children,
}: {
  x: MotionValue<number>;
  tick: MotionValue<number>;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const away = useTransform([x, tick], ([xv]: number[]) => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return 0;
    const centre = el.offsetLeft + el.offsetWidth / 2 + xv;
    const half = window.innerWidth / 2;
    return Math.min(1, Math.abs(centre - half) / (half * 1.1));
  });
  const scale = useTransform(away, (d) => 1.05 - 0.17 * d);
  const opacity = useTransform(away, (d) => 1 - 0.5 * d * d);

  return (
    <motion.div ref={ref} style={{ scale, opacity }} className="shrink-0 will-change-transform">
      {children}
    </motion.div>
  );
}

function SwipeRail({ events }: { events: EventItem[] }) {
  const strip = useRef<HTMLDivElement>(null);
  const drag = useRef({ on: false, moved: false, x: 0, left: 0 });
  const [open, setOpen] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState({ p: 0, start: true, end: false });

  const measure = useCallback(() => {
    const el = strip.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const p = max > 0 ? el.scrollLeft / max : 0;
    setPos({ p, start: el.scrollLeft < 8, end: max - el.scrollLeft < 8 });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure, events.length]);

  const nudge = (dir: 1 | -1) => {
    const el = strip.current;
    if (!el) return;
    const card = el.querySelector("article");
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  /* mouse drag on desktop. Touch already scrolls natively. */
  const down = (ev: React.PointerEvent<HTMLDivElement>) => {
    if (ev.pointerType !== "mouse" || ev.button !== 0) return;
    if ((ev.target as HTMLElement).closest("button")) return;
    const el = strip.current;
    if (!el) return;
    drag.current = { on: true, moved: false, x: ev.clientX, left: el.scrollLeft };
  };
  const move = (ev: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const el = strip.current;
    if (!d.on || !el) return;
    const dx = ev.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true;
      /* switch snapping off at once, not after a re-render */
      el.style.scrollSnapType = "none";
      el.style.scrollBehavior = "auto";
      setDragging(true);
    }
    if (d.moved) el.scrollTo({ left: d.left - dx, behavior: "instant" });
  };
  const up = () => {
    drag.current.on = false;
    const el = strip.current;
    if (drag.current.moved && el) {
      el.style.scrollSnapType = "";
      el.style.scrollBehavior = "";
      setDragging(false);
    }
  };

  const arrow =
    "h-10 w-10 rounded-full border border-line font-body text-ink-soft transition-colors hover:border-coral hover:text-coral disabled:pointer-events-none disabled:opacity-30";

  return (
    <>
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
          {events.length} stages and counting
        </p>
        <div className="flex items-center gap-2">
          <button onClick={() => nudge(-1)} disabled={pos.start} aria-label="previous events" className={arrow}>
            ←
          </button>
          <button onClick={() => nudge(1)} disabled={pos.end} aria-label="more events" className={arrow}>
            →
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={strip}
          onScroll={measure}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerLeave={up}
          onClickCapture={(ev) => {
            if (drag.current.moved) {
              ev.preventDefault();
              ev.stopPropagation();
              drag.current.moved = false;
            }
          }}
          tabIndex={0}
          aria-label="speaking events, scroll sideways"
          className={`flex gap-5 overflow-x-auto scroll-smooth px-1 pb-6 outline-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            dragging
              ? "cursor-grabbing select-none snap-none scroll-auto"
              : "cursor-grab snap-x snap-mandatory"
          }`}
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

        {/* soft edges that tell you there is more either side */}
        <div
          className={`pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-cream to-transparent transition-opacity ${
            pos.start ? "opacity-0" : "opacity-100"
          }`}
        />
        <div
          className={`pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-cream to-transparent transition-opacity ${
            pos.end ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>

      <div className="mx-1 mt-1 h-1 overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-coral transition-[width] duration-150"
          style={{ width: `${Math.max(12, pos.p * 100)}%` }}
        />
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
  compact = false,
}: {
  e: EventItem;
  i: number;
  expanded: boolean;
  toggle: () => void;
  /** pinned rail: shorter picture so the card fits one screen, full text, no toggle */
  compact?: boolean;
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
      className="w-[min(21rem,82vw)] shrink-0 snap-start scroll-ml-1 overflow-hidden rounded-3xl border border-line bg-paper shadow-[0_10px_30px_rgba(23,20,15,0.06)]"
    >
      <div
        className={`relative w-full overflow-hidden bg-cream-deep ${
          compact ? "h-[clamp(10.5rem,28vh,20rem)]" : "h-[24rem]"
        }`}
      >
        {cur?.video ? (
          <video
            key={cur.video}
            src={cur.video}
            poster={cur.src}
            controls
            playsInline
            preload="metadata"
            aria-label={cur.alt}
            className="relative h-full w-full bg-black object-contain"
          />
        ) : cur ? (
          <>
            {e.fit === "contain" && (
              /* eslint-disable-next-line @next/next/no-img-element --
                 blurred copy that fills the frame behind a whole picture */
              <img
                src={cur.src}
                alt=""
                aria-hidden
                loading="lazy"
                draggable={false}
                className="absolute inset-0 h-full w-full scale-125 object-cover opacity-70 blur-2xl"
              />
            )}
            {/* eslint-disable-next-line @next/next/no-img-element --
                paths are written by the admin desk at runtime */}
            <img
              key={cur.src}
              src={cur.src}
              alt={cur.alt}
              loading="lazy"
              draggable={false}
              className={`relative h-full w-full ${
                e.fit === "cover" ? "object-cover object-[50%_30%]" : "object-contain"
              }`}
            />
          </>
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
              className="absolute left-2 top-[40%] h-8 w-8 -translate-y-1/2 rounded-full bg-paper/85 text-ink backdrop-blur transition-colors hover:bg-paper"
            >
              ←
            </button>
            <button
              onClick={() => step(1)}
              aria-label="next photo"
              className="absolute right-2 top-[40%] h-8 w-8 -translate-y-1/2 rounded-full bg-paper/85 text-ink backdrop-blur transition-colors hover:bg-paper"
            >
              →
            </button>
            <div className="absolute inset-x-0 top-14 flex justify-center gap-1.5">
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
        {!compact && e.description.length > 110 && (
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
