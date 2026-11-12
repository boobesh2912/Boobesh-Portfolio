"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import Marked from "@/components/Marked";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import type { Page } from "@/lib/paginate";

/*
  Reading a book, not scrolling a page. The book starts closed on the desk,
  the cover swings open, and you turn the pages one at a time, with the next
  page waiting underneath as the leaf lifts. Two pages side by side on a wide
  screen, one on a phone. Arrow keys, clicking a page edge, swiping and the
  buttons all turn the page.
*/

const PAGE_W = 352; // 22rem
const PAGE_H = 504;

type Sheet =
  | { kind: "endpaper" }
  | { kind: "title" }
  | { kind: "content"; page: Page; n: number }
  | { kind: "end" }
  | { kind: "blank" };

type Props = {
  slug: string;
  title: string;
  blurb: string;
  color: string;
  minutes: number;
  pages: Page[];
  /** when the book is in a popup, closing is a callback instead of a link */
  onClose?: () => void;
};

const query = "(min-width: 820px)";
function useWide() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

/* the soft paper sound: a short burst of filtered noise */
let audio: AudioContext | null = null;
function paperSound() {
  try {
    audio ??= new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const ctx = audio;
    if (ctx.state === "suspended") void ctx.resume();
    const len = Math.floor(ctx.sampleRate * 0.22);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      const t = i / len;
      d[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * t) ** 2;
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 2200;
    bp.Q.value = 0.7;
    const g = ctx.createGain();
    g.gain.value = 0.16;
    src.connect(bp).connect(g).connect(ctx.destination);
    src.start();
  } catch {
    /* no audio is fine */
  }
}

const paperBg =
  "linear-gradient(180deg, #f8f1e0 0%, #f2e8d0 100%)";

/* ---------- the faces ---------- */

function Cover({ title, color }: { title: string; color: string }) {
  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-between rounded-r-md px-8 py-10 text-center"
      style={{
        backgroundColor: color,
        backgroundImage:
          "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.14), transparent 55%), repeating-linear-gradient(45deg, rgba(0,0,0,0.05) 0 2px, transparent 2px 5px), linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(255,255,255,0.12) 6%, rgba(0,0,0,0) 14%, rgba(0,0,0,0.18) 100%)",
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.3), 0 30px 50px rgba(0,0,0,0.5)",
      }}
    >
      <div className="pointer-events-none absolute inset-4 rounded-sm border border-[#e8cf8a]/60" />
      <div className="pointer-events-none absolute inset-6 rounded-sm border border-[#e8cf8a]/30" />
      <p className="relative mt-6 font-body text-[10px] font-semibold uppercase tracking-[0.35em] text-[#e8cf8a]/80">
        a book by
      </p>
      <h1
        className="relative font-display text-[1.9rem] font-semibold leading-[1.15] text-[#f1d98e]"
        style={{ textShadow: "0 1px 0 rgba(0,0,0,0.55), 0 0 10px rgba(255,214,120,0.25)" }}
      >
        {title}
      </h1>
      <div className="relative mb-4">
        <div className="mx-auto mb-3 h-px w-16 bg-[#e8cf8a]/60" />
        <p
          className="font-display text-lg italic text-[#f1d98e]"
          style={{ textShadow: "0 1px 0 rgba(0,0,0,0.55)" }}
        >
          Boobesh AG
        </p>
      </div>
    </div>
  );
}

function Endpaper({ color }: { color: string }) {
  return (
    <div
      className="h-full w-full rounded-l-md"
      style={{
        backgroundColor: color,
        backgroundImage:
          "repeating-linear-gradient(45deg, rgba(255,255,255,0.07) 0 1px, transparent 1px 9px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.07) 0 1px, transparent 1px 9px), linear-gradient(270deg, rgba(0,0,0,0.5), rgba(0,0,0,0) 22%)",
      }}
    />
  );
}

function Paper({
  side,
  children,
}: {
  side: "left" | "right";
  children: React.ReactNode;
}) {
  const spine =
    side === "left"
      ? "linear-gradient(270deg, rgba(60,40,15,0.28) 0%, rgba(60,40,15,0.08) 7%, transparent 16%)"
      : "linear-gradient(90deg, rgba(60,40,15,0.28) 0%, rgba(60,40,15,0.08) 7%, transparent 16%)";
  return (
    <div
      className="relative h-full w-full overflow-hidden text-[#2b2118]"
      style={{
        backgroundImage: `${spine}, ${paperBg}`,
        borderRadius: side === "left" ? "6px 2px 2px 6px" : "2px 6px 6px 2px",
        boxShadow:
          side === "left"
            ? "inset 1px 0 0 rgba(255,255,255,0.5), -2px 0 0 #e6dcc4, -4px 0 0 #d8ccb0"
            : "inset -1px 0 0 rgba(255,255,255,0.5), 2px 0 0 #e6dcc4, 4px 0 0 #d8ccb0",
      }}
    >
      {children}
    </div>
  );
}

function Face({
  sheet,
  side,
  title,
  color,
  slug,
  onClose,
}: {
  sheet: Sheet;
  side: "left" | "right";
  title: string;
  color: string;
  slug: string;
  onClose?: () => void;
}) {
  if (sheet.kind === "endpaper") return <Endpaper color={color} />;
  if (sheet.kind === "blank") return <Paper side={side}>{null}</Paper>;

  if (sheet.kind === "title") {
    return (
      <Paper side={side}>
        <div className="flex h-full flex-col items-center justify-center px-10 text-center">
          <div className="h-px w-10 bg-[#8a6a43]/50" />
          <h2 className="mt-6 font-display text-[1.7rem] font-semibold leading-[1.15]">{title}</h2>
          <p className="mt-5 font-display text-base italic text-[#5c4a36]">Boobesh AG</p>
          <div className="mt-6 h-px w-10 bg-[#8a6a43]/50" />
          <p className="mt-10 font-body text-[10px] uppercase tracking-[0.3em] text-[#8a7a66]">
            boobesh.com
          </p>
        </div>
      </Paper>
    );
  }

  if (sheet.kind === "end") {
    return (
      <Paper side={side}>
        <div className="flex h-full flex-col items-center justify-center gap-5 px-10 text-center">
          <p className="font-display text-2xl italic text-[#5c4a36]">the end</p>
          <div className="h-px w-10 bg-[#8a6a43]/50" />
          {onClose ? (
            <button onClick={onClose} className="font-hand text-2xl text-[#a24b2a] hover:underline">
              close the book
            </button>
          ) : (
            <Link href="/personal" className="font-hand text-2xl text-[#a24b2a] hover:underline">
              back to the story
            </Link>
          )}
          <span className="sr-only">{slug}</span>
        </div>
      </Paper>
    );
  }

  const { page, n } = sheet;
  return (
    <Paper side={side}>
      <div className="flex h-full flex-col px-7 pb-3 pt-8 font-display text-[15px] leading-[1.65]">
        <p className="mb-3 text-center font-body text-[9px] font-semibold uppercase tracking-[0.3em] text-[#9a8a74]">
          {title}
        </p>
        <div className="flex-1 overflow-hidden">
          {page.items.map((it, i) => {
            if (it.type === "h")
              return (
                <h3 key={i} className="mb-3 mt-1 text-[1.35rem] font-semibold leading-[1.2]">
                  {it.text}
                </h3>
              );
            if (it.type === "p")
              return (
                <p
                  key={i}
                  className={`mb-[0.7em] text-justify hyphens-auto ${
                    it.cont ? "" : ""
                  } ${
                    it.drop
                      ? "first-letter:float-left first-letter:mr-1.5 first-letter:mt-1 first-letter:text-[3rem] first-letter:font-semibold first-letter:leading-[0.8]"
                      : ""
                  }`}
                  lang="en"
                >
                  <Marked text={it.text} markClass="mark-paper" />
                </p>
              );
            if (it.type === "quote")
              return (
                <blockquote
                  key={i}
                  className="my-4 border-l-2 border-[#a24b2a]/60 pl-4 text-lg italic leading-[1.4]"
                >
                  {it.text}
                </blockquote>
              );
            if (it.type === "link")
              return (
                <p key={i} className="my-1 font-hand text-xl text-[#a24b2a]">
                  <Link href={it.href} className="hover:underline">
                    → {it.text}
                  </Link>
                </p>
              );
            if (it.type === "photos") {
              const n2 = it.items.length;
              return (
                <div key={i} className="my-2 grid grid-cols-2 gap-2">
                  {it.items.map((ph) => (
                    // eslint-disable-next-line @next/next/no-img-element -- static file in /public
                    <img
                      key={ph.src}
                      src={ph.src}
                      alt={ph.alt}
                      loading="lazy"
                      className={`w-full rounded-[3px] border border-[#2b2118]/15 object-cover object-top shadow-[0_2px_6px_rgba(0,0,0,0.2)] ${
                        it.wide
                          ? "col-span-2 aspect-[16/9]"
                          : n2 === 1
                          ? "col-span-2 aspect-[4/3]"
                          : "aspect-[3/4]"
                      }`}
                    />
                  ))}
                </div>
              );
            }
            return (
              <div
                key={i}
                className={`my-2 grid gap-2 ${it.items.length > 1 ? "grid-cols-2" : "mx-auto w-[9.5rem] grid-cols-1"}`}
              >
                {it.items.map((v) => (
                  <figure key={v.src}>
                    <video
                      src={v.src}
                      poster={v.poster}
                      controls
                      playsInline
                      preload="none"
                      aria-label={v.alt}
                      className="aspect-[9/14] w-full rounded-[3px] border border-[#2b2118]/20 bg-black object-cover"
                    />
                    <figcaption className="mt-0.5 text-center font-hand text-[15px] leading-tight text-[#6b5a45]">
                      {v.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            );
          })}
        </div>
        <p className="mt-1 text-center font-body text-[11px] text-[#9a8a74]">{n}</p>
      </div>
    </Paper>
  );
}

/* ---------- the book ---------- */

export default function BookReader({ slug, title, color, pages, onClose }: Props) {
  const wide = useWide();
  const reduced = usePrefersReducedMotion();

  const all: Sheet[] = [
    { kind: "endpaper" },
    { kind: "title" },
    ...pages.map((page, i) => ({ kind: "content" as const, page, n: i + 1 })),
    { kind: "end" },
  ];
  if (all.length % 2) all.push({ kind: "blank" });
  const single = all.filter((s) => s.kind !== "endpaper" && s.kind !== "blank");

  const [opened, setOpened] = useState(false);
  const [coverGone, setCoverGone] = useState(false);
  const [pos, setPos] = useState(0); // spread index when wide, sheet index when narrow
  const [flip, setFlip] = useState<null | 1 | -1>(null);
  const [sound, setSound] = useState(true);

  const total = wide ? all.length / 2 : single.length;
  const bookW = wide ? PAGE_W * 2 : PAGE_W;

  // scale the whole book down to fit narrow screens, so the layout never reflows
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fit = () => setScale(Math.min(1, (window.innerWidth - 24) / bookW));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [bookW]);

  // opening: a beat on the closed cover, then it swings open
  useEffect(() => {
    const t = setTimeout(() => setOpened(true), reduced ? 0 : 1100);
    return () => clearTimeout(t);
  }, [reduced]);

  // switching between wide and narrow keeps you near the same page
  const lastWide = useRef(wide);
  useEffect(() => {
    if (lastWide.current !== wide) {
      lastWide.current = wide;
      setPos(0);
      setFlip(null);
    }
  }, [wide]);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (!opened || !coverGone || flip) return;
      const nxt = pos + dir;
      if (nxt < 0 || nxt >= total) return;
      if (sound) paperSound();
      if (reduced) {
        setPos(nxt);
        return;
      }
      setFlip(dir);
    },
    [opened, coverGone, flip, pos, total, sound, reduced]
  );

  const landed = () => {
    if (flip) setPos((p) => p + flip);
    setFlip(null);
  };

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [go]);

  const touch = useRef<number | null>(null);

  const face = (s: Sheet | undefined, side: "left" | "right") =>
    s ? <Face sheet={s} side={side} title={title} color={color} slug={slug} onClose={onClose} /> : null;

  /* what is under the turning leaf, and what the leaf shows on each side */
  const eased = [0.4, 0.05, 0.2, 1] as const;
  let content: React.ReactNode;

  if (wide) {
    const L = (i: number) => all[2 * i];
    const R = (i: number) => all[2 * i + 1];
    const leftBase = flip === -1 ? L(pos - 1) : L(pos);
    const rightBase = flip === 1 ? R(pos + 1) : R(pos);
    content = (
      <>
        <div className="absolute left-0 top-0 h-full w-1/2" style={{ opacity: coverGone || opened ? 1 : 0 }}>
          {face(leftBase, "left")}
        </div>
        <div className="absolute right-0 top-0 h-full w-1/2">{face(rightBase, "right")}</div>

        {flip === 1 && (
          <motion.div
            className="absolute right-0 top-0 z-20 h-full w-1/2"
            style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: -180 }}
            transition={{ duration: 0.85, ease: eased }}
            onAnimationComplete={landed}
          >
            <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
              {face(R(pos), "right")}
            </div>
            <div
              className="absolute inset-0"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              {face(L(pos + 1), "left")}
            </div>
          </motion.div>
        )}
        {flip === -1 && (
          <motion.div
            className="absolute left-0 top-0 z-20 h-full w-1/2"
            style={{ transformOrigin: "right center", transformStyle: "preserve-3d" }}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 180 }}
            transition={{ duration: 0.85, ease: eased }}
            onAnimationComplete={landed}
          >
            <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
              {face(L(pos), "left")}
            </div>
            <div
              className="absolute inset-0"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              {face(R(pos - 1), "right")}
            </div>
          </motion.div>
        )}
      </>
    );
  } else {
    const cur = single[pos];
    const under = flip === 1 ? single[pos + 1] : cur;
    content = (
      <>
        <div className="absolute inset-0">{face(under, "right")}</div>
        {flip === 1 && (
          <motion.div
            className="absolute inset-0 z-20"
            style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: -150 }}
            transition={{ duration: 0.7, ease: eased }}
            onAnimationComplete={landed}
          >
            <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
              {face(cur, "right")}
            </div>
          </motion.div>
        )}
        {flip === -1 && (
          <motion.div
            className="absolute inset-0 z-20"
            style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
            initial={{ rotateY: -150 }}
            animate={{ rotateY: 0 }}
            transition={{ duration: 0.7, ease: eased }}
            onAnimationComplete={landed}
          >
            <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
              {face(single[pos - 1], "right")}
            </div>
          </motion.div>
        )}
      </>
    );
  }

  const pageNo = (() => {
    const s = wide ? all[2 * pos + 1] : single[pos];
    return s?.kind === "content" ? s.n : null;
  })();

  const btn =
    "rounded-full border border-[#f1d98e]/30 px-5 py-2 font-body text-sm font-semibold text-[#f1d98e]/90 transition-colors hover:bg-[#f1d98e]/10 disabled:opacity-30 disabled:hover:bg-transparent";

  return (
    <div className="flex flex-col items-center">
      <div style={{ width: bookW * scale, height: PAGE_H * scale }} className="relative">
        <div
          style={{
            width: bookW,
            height: PAGE_H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            perspective: 2400,
          }}
          className="absolute left-0 top-0"
          onPointerDown={(e) => {
            touch.current = e.pointerType === "touch" ? e.clientX : null;
          }}
          onPointerUp={(e) => {
            if (touch.current !== null) {
              const dx = e.clientX - touch.current;
              if (dx < -45) go(1);
              if (dx > 45) go(-1);
              touch.current = null;
            }
          }}
        >
          {/* the shadow it casts on the desk */}
          <div
            className="pointer-events-none absolute -bottom-6 left-[4%] h-10 w-[92%] rounded-[50%] bg-black/60 blur-2xl"
            style={{ transform: opened ? "none" : `translateX(${wide ? -PAGE_W / 2 : 0}px)` }}
          />

          <motion.div
            className="relative h-full w-full"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ x: opened || !wide ? 0 : -PAGE_W / 2 }}
            transition={{ duration: reduced ? 0 : 1.1, ease: [0.4, 0.05, 0.2, 1] }}
          >
            {/* pages. Clicking the outer edge turns the page. */}
            <div
              className="absolute inset-0"
              onClick={(e) => {
                if ((e.target as HTMLElement).closest("video,a,button")) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                if (x > 0.7) go(1);
                else if (x < 0.3) go(-1);
              }}
            >
              {content}
            </div>

            {/* the cover, until it has swung open */}
            {!coverGone && (
              <motion.div
                className="absolute top-0 z-30 h-full"
                style={{
                  right: 0,
                  width: wide ? "50%" : "100%",
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d",
                }}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: opened ? (wide ? -180 : -160) : 0, opacity: opened && !wide ? 0 : 1 }}
                transition={{
                  rotateY: { duration: reduced ? 0 : 1.1, ease: [0.4, 0.05, 0.2, 1] },
                  opacity: { duration: 0.5, delay: opened ? 0.6 : 0 },
                }}
                onAnimationComplete={() => opened && setCoverGone(true)}
                onClick={() => setOpened(true)}
              >
                <div className="absolute inset-0 cursor-pointer" style={{ backfaceVisibility: "hidden" }}>
                  <Cover title={title} color={color} />
                </div>
                <div
                  className="absolute inset-0"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <Endpaper color={color} />
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* controls */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <button onClick={() => go(-1)} disabled={pos === 0 || !coverGone} className={btn}>
          ← previous
        </button>
        <span className="min-w-[6rem] text-center font-hand text-lg text-[#f1d98e]/70">
          {pageNo ? `page ${pageNo}` : " "}
        </span>
        <button onClick={() => go(1)} disabled={pos >= total - 1 || !coverGone} className={btn}>
          next →
        </button>
      </div>
      <div className="mt-4 flex items-center gap-5 font-body text-[12px] text-[#f1d98e]/50">
        {onClose ? (
          <button onClick={onClose} className="hover:text-[#f1d98e]">
            close the book
          </button>
        ) : (
          <Link href="/personal" className="hover:text-[#f1d98e]">
            back to the story
          </Link>
        )}
        <button onClick={() => setSound((s) => !s)} className="hover:text-[#f1d98e]">
          page sound: {sound ? "on" : "off"}
        </button>
        <span className="hidden sm:inline">use ← → to turn pages</span>
      </div>
    </div>
  );
}
