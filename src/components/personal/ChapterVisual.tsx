"use client";

import { motion } from "framer-motion";
import ImageSlot from "@/components/ImageSlot";

/*
  A drawn object that slides in beside a chapter, so the page is not just
  paragraph after paragraph. Where a real logo is needed, an ImageSlot sits
  there waiting for the file.
*/

const reveal = {
  initial: { opacity: 0, y: 30, rotate: -3 },
  whileInView: { opacity: 1, y: 0, rotate: 0 },
  viewport: { once: true, margin: "-90px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
};

function Frame({
  caption,
  children,
}: {
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <motion.figure {...reveal} className="mt-10">
      <div className="flex items-center justify-center rounded-2xl border border-moon/10 bg-white/[0.03] p-8">
        {children}
      </div>
      <figcaption className="mt-3 text-center font-hand text-lg text-moon/45">
        {caption}
      </figcaption>
    </motion.figure>
  );
}

/* The candybar touchscreen phone with the old stylus. */
function PhoneAndStylus() {
  return (
    <svg viewBox="0 0 260 200" className="h-48 w-auto" role="img" aria-label="a touchscreen phone with a stylus">
      <defs>
        <linearGradient id="screenG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2b3444" />
          <stop offset="1" stopColor="#0e1219" />
        </linearGradient>
        <linearGradient id="penG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8e8e93" />
          <stop offset="0.5" stopColor="#d8d8dc" />
          <stop offset="1" stopColor="#7a7a80" />
        </linearGradient>
      </defs>

      {/* body */}
      <rect x="52" y="16" width="96" height="168" rx="14" fill="#1b1b1f" stroke="#43434a" strokeWidth="1.5" />
      {/* earpiece */}
      <rect x="88" y="26" width="24" height="3.5" rx="1.75" fill="#3d3d44" />
      {/* screen */}
      <rect x="60" y="38" width="80" height="112" rx="4" fill="url(#screenG)" />
      {/* the little duos badge */}
      <circle cx="72" cy="33" r="2" fill="#e0a13a" />
      {/* brand line */}
      <rect x="86" y="155" width="28" height="3" rx="1.5" fill="#55555d" />
      {/* three keys */}
      <rect x="64" y="166" width="16" height="8" rx="4" fill="#2a2a30" />
      <rect x="90" y="164" width="20" height="12" rx="6" fill="#2a2a30" />
      <rect x="120" y="166" width="16" height="8" rx="4" fill="#2a2a30" />

      {/* stylus */}
      <g transform="rotate(14 200 100)">
        <rect x="194" y="30" width="7" height="128" rx="3.5" fill="url(#penG)" />
        <ellipse cx="197.5" cy="28" rx="9" ry="7" fill="#2c2c31" />
        <path d="M194 158 l3.5 14 l3.5 -14 z" fill="#1d1d21" />
      </g>

      {/* the screen glow, the bit that made it feel like magic */}
      <circle cx="100" cy="94" r="26" fill="#7fb4f0" opacity="0.12" />
    </svg>
  );
}

/* The 4GB desktop that died of too much software. */
function DeadPC() {
  return (
    <svg viewBox="0 0 260 180" className="h-44 w-auto" role="img" aria-label="an old desktop computer">
      <rect x="34" y="20" width="150" height="104" rx="6" fill="#1b1b1f" stroke="#43434a" strokeWidth="1.5" />
      <rect x="42" y="28" width="134" height="88" rx="3" fill="#11151c" />
      {/* the crash */}
      <path d="M60 100 l16 -26 l12 18 l18 -34 l14 26 l20 -16 l18 32" stroke="#c96a4a" strokeWidth="2" fill="none" opacity="0.75" />
      <text x="109" y="60" textAnchor="middle" fill="#8d8d96" fontFamily="monospace" fontSize="11">
        not responding
      </text>
      {/* stand */}
      <rect x="96" y="124" width="26" height="14" fill="#26262b" />
      <rect x="72" y="138" width="74" height="7" rx="3.5" fill="#2f2f36" />
      {/* tower */}
      <rect x="196" y="46" width="34" height="99" rx="4" fill="#1b1b1f" stroke="#43434a" strokeWidth="1.5" />
      <circle cx="213" cy="58" r="3" fill="#c96a4a" />
      <rect x="202" y="70" width="22" height="3" rx="1.5" fill="#33333a" />
      <rect x="202" y="78" width="22" height="3" rx="1.5" fill="#33333a" />
    </svg>
  );
}

/* Sharechat to Meesho: where the orders came from, and where the stock did. */
function ResellFlow() {
  return (
    <div className="flex w-full flex-col items-center gap-5 sm:flex-row sm:justify-center">
      <div className="text-center">
        <ImageSlot
          src="/shots/sharechat.png"
          alt="Sharechat"
          label="sharechat logo"
          className="mx-auto h-20 w-24 bg-white/90 p-2"
          rounded="rounded-2xl"
          fit="contain"
        />
        <p className="mt-2 font-body text-[11px] uppercase tracking-wider text-moon/45">
          where the buyers were
        </p>
      </div>

      <div className="flex flex-col items-center text-moon/35">
        <span className="font-hand text-lg text-ember">orders</span>
        <span className="text-2xl" aria-hidden>
          →
        </span>
      </div>

      <div className="text-center">
        <ImageSlot
          src="/shots/meesho.png"
          alt="Meesho"
          label="meesho logo"
          className="mx-auto h-20 w-24 bg-white/90 p-2"
          rounded="rounded-2xl"
          fit="contain"
        />
        <p className="mt-2 font-body text-[11px] uppercase tracking-wider text-moon/45">
          where the stock came from
        </p>
      </div>
    </div>
  );
}

const visuals: Record<string, { node: React.ReactNode; caption: string }> = {
  "it started with curiosity": {
    node: <PhoneAndStylus />,
    caption: "the phone, and the S-Pen that started all of it",
  },
  "then computers entered my life": {
    node: <DeadPC />,
    caption: "4GB of RAM, and far too many downloads",
  },
  "then money entered the picture": {
    node: <ResellFlow />,
    caption: "post on Sharechat, source from Meesho, keep the difference",
  },
};

export default function ChapterVisual({ heading }: { heading: string }) {
  const v = visuals[heading];
  if (!v) return null;
  return <Frame caption={v.caption}>{v.node}</Frame>;
}
