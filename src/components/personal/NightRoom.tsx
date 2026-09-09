"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const raindrops = Array.from({ length: 46 }, (_, i) => ({
  left: `${(i * 21.7) % 100}%`,
  duration: 1.3 + ((i * 13) % 11) / 10,
  delay: ((i * 7) % 25) / 10,
  height: 26 + ((i * 17) % 46),
  opacity: 0.18 + ((i * 11) % 5) / 14,
}));

const stars = Array.from({ length: 34 }, (_, i) => ({
  left: `${(i * 29.3) % 100}%`,
  top: `${(i * 37.1) % 92}%`,
  size: 1 + ((i * 7) % 3) * 0.6,
  delay: ((i * 5) % 30) / 10,
}));

/*
  Fixed atmosphere behind the personal page: night sky, moon through a
  window, warm lamp glow from the corner, and rain on the glass.
*/
export default function NightRoom() {
  const { scrollYProgress } = useScroll();
  const moonY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const reduced = usePrefersReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden bg-night">
      {/* deep sky wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_-10%,#241d16_0%,#14100c_55%,#0d0a07_100%)]" />

      {/* stars */}
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-moon/50 animate-drift"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {/* the moon */}
      <motion.div
        style={{ y: reduced ? 0 : moonY }}
        className="absolute right-[8%] top-[6%] h-28 w-28 rounded-full bg-moon/85 blur-[1px] sm:h-36 sm:w-36"
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fffdf6,#cfc7b4)]" />
        <div className="absolute -inset-16 rounded-full bg-moon/10 blur-3xl" />
      </motion.div>

      {/* warm lamp glow from the reading corner */}
      <motion.div
        style={{ y: reduced ? 0 : glowY }}
        className="absolute -bottom-32 left-1/2 h-[70vh] w-[80vh] -translate-x-1/2 rounded-full bg-ember/20 blur-[140px]"
      />
      <div className="absolute bottom-0 right-0 h-[45vh] w-[45vh] rounded-full bg-[#8a3f22]/20 blur-[120px]" />

      {/* rain */}
      <div className="absolute inset-0 overflow-hidden">
        {raindrops.map((d, i) => (
          <span
            key={i}
            className="absolute top-[-12%] w-px bg-gradient-to-b from-transparent via-moon to-transparent"
            style={{
              left: d.left,
              height: `${d.height}px`,
              opacity: d.opacity,
              animation: reduced
                ? undefined
                : `rainfall ${d.duration}s linear ${d.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* vignette so the text always sits on something calm */}
      <div className="absolute inset-0 bg-[radial-gradient(100%_70%_at_50%_50%,transparent_35%,rgba(8,6,4,0.75)_100%)]" />
      <div className="grain grain-light absolute inset-0" />
    </div>
  );
}
