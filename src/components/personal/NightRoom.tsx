"use client";

import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useTheme } from "@/components/ThemeProvider";

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

const clouds = [
  { left: "8%", top: "12%", scale: 1, delay: 0 },
  { left: "62%", top: "8%", scale: 1.3, delay: 2 },
  { left: "38%", top: "26%", scale: 0.8, delay: 4 },
];

/*
  The room behind the personal page. Fixed and still on purpose: parallax on
  the sky made the page feel like it was sliding while you read. Same room by
  day and by night, the sky and the light source swap.
*/
export default function NightRoom() {
  const reduced = usePrefersReducedMotion();
  const { theme } = useTheme();
  const night = theme === "dark";

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden bg-night transition-colors duration-700">
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_-10%,var(--sky-top)_0%,var(--sky-bottom)_60%,var(--sky-bottom)_100%)]" />

      {/* the darkening that keeps the reading column calm */}
      <div className="veil absolute inset-0" />

      {night
        ? stars.map((s, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-moon/45"
              style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
            />
          ))
        : clouds.map((c, i) => (
            <span
              key={i}
              className={`absolute h-16 w-40 rounded-full bg-white/45 blur-2xl ${
                reduced ? "" : "animate-drift"
              }`}
              style={{
                left: c.left,
                top: c.top,
                transform: `scale(${c.scale})`,
                animationDelay: `${c.delay}s`,
              }}
            />
          ))}

      {/* moon by night, sun by day, same spot */}
      <div className="absolute right-[7%] top-[5%] h-28 w-28 sm:h-36 sm:w-36">
        <div
          className="absolute -inset-16 rounded-full blur-3xl transition-opacity duration-700"
          style={{ background: `rgba(var(--orb-glow), ${night ? 0.09 : 0.35})` }}
        />
        <div
          className="absolute inset-0 rounded-full transition-all duration-700"
          style={{
            background: night
              ? "radial-gradient(circle at 35% 30%, #fffdf6, #d8d1c0 70%, #bdb5a2)"
              : "radial-gradient(circle at 40% 35%, #fffdf0, #ffdf9c 60%, #f6b757)",
            boxShadow: night
              ? "0 0 60px rgba(217,211,196,0.28)"
              : "0 0 90px rgba(246,183,87,0.45)",
          }}
        />
      </div>

      {/* lamp light low on the wall */}
      <div
        className="absolute -bottom-40 left-1/2 h-[60vh] w-[85vh] -translate-x-1/2 rounded-full blur-[150px] transition-opacity duration-700"
        style={{ background: "rgba(224,138,74,0.14)", opacity: night ? 1 : 0.5 }}
      />

      {night && !reduced && (
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
