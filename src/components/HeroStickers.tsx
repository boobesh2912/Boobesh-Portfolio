"use client";

import { motion } from "framer-motion";

/*
  Stickers stuck over the hero photo. They bob gently out of phase and tilt on
  hover, and every one is a true fact, not decoration.
*/
const stickers = [
  { t: "reselling since 15", cls: "right-[22%] top-[9%] bg-butter text-[#241a05]", rot: -8, d: 0 },
  { t: "6 × 5★ on Google", cls: "right-[2%] top-[22%] bg-[#fff8ec] text-[#241a05]", rot: 7, d: 0.6 },
  { t: "Young Entrepreneur of the Year", cls: "right-[30%] bottom-[24%] bg-coral text-[#fff8ec]", rot: -5, d: 1.1 },
  { t: "NEC finalist, IIT Bombay", cls: "right-[3%] bottom-[12%] bg-[#8fe3c4] text-[#0d2b21]", rot: 6, d: 1.7 },
];

export default function HeroStickers() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
      {stickers.map((s) => (
        <motion.span
          key={s.t}
          initial={{ opacity: 0, scale: 0.4, rotate: s.rot * 3 }}
          animate={{ opacity: 1, scale: 1, rotate: s.rot, y: [0, -9, 0] }}
          transition={{
            opacity: { delay: 0.9 + s.d * 0.3, duration: 0.5 },
            scale: { delay: 0.9 + s.d * 0.3, type: "spring", stiffness: 160, damping: 11 },
            rotate: { delay: 0.9 + s.d * 0.3, type: "spring", stiffness: 120, damping: 10 },
            y: { delay: 1.6 + s.d, duration: 4.5, repeat: Infinity, ease: "easeInOut" },
          }}
          className={`pointer-events-auto absolute rounded-md px-3.5 py-2 font-hand text-[19px] font-semibold leading-none shadow-[0_8px_20px_rgba(0,0,0,0.35)] ring-2 ring-white/20 ${s.cls}`}
        >
          {s.t}
        </motion.span>
      ))}
    </div>
  );
}
