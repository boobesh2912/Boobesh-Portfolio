"use client";

import { useEffect, useRef } from "react";

/*
  A dot that tracks exactly, and a ring that lags behind it. The ring grows
  and turns hollow over anything clickable. Desktop only, and it bows out
  entirely if the visitor prefers reduced motion.
*/
export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("has-custom-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
        dot.current.style.opacity = "1";
      }
      if (ring.current) ring.current.style.opacity = "1";
    };

    const tick = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const interactive = "a, button, input, textarea, select, [role='button']";
    const over = (e: PointerEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(interactive);
      ring.current?.classList.toggle("cursor-ring-active", !!el);
    };

    const leave = () => {
      if (dot.current) dot.current.style.opacity = "0";
      if (ring.current) ring.current.style.opacity = "0";
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    document.addEventListener("pointerleave", leave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[999] hidden md:block">
      <div
        ref={ring}
        className="cursor-ring absolute left-0 top-0 h-9 w-9 rounded-full opacity-0"
      />
      <div
        ref={dot}
        className="cursor-dot absolute left-0 top-0 h-1.5 w-1.5 rounded-full opacity-0"
      />
    </div>
  );
}
