"use client";

import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const raindrops = Array.from({ length: 34 }, (_, i) => ({
  left: `${(i * 29.4) % 100}%`,
  duration: 1.5 + ((i * 13) % 11) / 10,
  delay: ((i * 7) % 25) / 10,
  height: 24 + ((i * 17) % 40),
  opacity: 0.1 + ((i * 11) % 5) / 22,
}));

const stars = Array.from({ length: 30 }, (_, i) => ({
  left: `${(i * 29.3) % 100}%`,
  top: `${(i * 37.1) % 90}%`,
  size: 1 + ((i * 7) % 3) * 0.5,
}));

/*
  The room behind the personal page. Everything here is fixed and still on
  purpose: parallax on the moon and the lamp made the page feel like it was
  sliding around while you were trying to read it.
*/
export default function NightRoom() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden bg-night">
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_-10%,#241d16_0%,#14100c_55%,#0d0a07_100%)]" />

      {/* darkening sits under the sky, so the moon still reads as bright */}
      <div className="absolute inset-0 bg-[radial-gradient(100%_70%_at_50%_45%,rgba(8,6,4,0.5)_0%,rgba(8,6,4,0.7)_60%,rgba(8,6,4,0.86)_100%)]" />

      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-moon/45"
          style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
        />
      ))}

      {/* moon, fixed in place and above the vignette so it stays lit */}
      <div className="absolute right-[7%] top-[5%] h-28 w-28 sm:h-36 sm:w-36">
        <div className="absolute -inset-16 rounded-full bg-moon/[0.09] blur-3xl" />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fffdf6,#d8d1c0_70%,#bdb5a2)] shadow-[0_0_60px_rgba(217,211,196,0.28)]" />
      </div>

      {/* warm lamp light, low and out of the reading column */}
      <div className="absolute -bottom-40 left-1/2 h-[60vh] w-[85vh] -translate-x-1/2 rounded-full bg-ember/[0.14] blur-[150px]" />
      <div className="absolute -bottom-20 right-[-10%] h-[45vh] w-[45vh] rounded-full bg-[#8a3f22]/15 blur-[130px]" />

      {!reduced && (
        <div className="absolute inset-0 overflow-hidden">
          {raindrops.map((d, i) => (
            <span
              key={i}
              className="absolute top-[-12%] w-px bg-gradient-to-b from-transparent via-moon to-transparent"
              style={{
                left: d.left,
                height: `${d.height}px`,
                opacity: d.opacity,
                animation: `rainfall ${d.duration}s linear ${d.delay}s infinite`,
              }}
            />
          ))}
        </div>
      )}

      <div className="grain grain-light absolute inset-0" />
    </div>
  );
}
