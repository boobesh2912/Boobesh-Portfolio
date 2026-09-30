"use client";

import { useEffect, useRef } from "react";

/*
  A dot that tracks exactly and a ring that follows a beat behind.

  The ring is drawn in two tones, a dark line with a light halo outside it, so
  it reads on cream, on the dark hero and in either theme. (The old version
  used mix-blend-mode, which has nothing to blend with inside a fixed, stacked
  layer, so it rendered plain white and vanished on light pages.)

  It reacts to what is underneath:
    links and buttons   the ring swells and fills
    data-cursor="word"  the ring swells and says the word (read, drag, open...)
    external links      says "open"
    mouse down          the ring tightens
    text fields         the custom cursor steps aside for the native one

  Desktop only, and it does nothing if the visitor prefers reduced motion.
*/
const INTERACTIVE = "a, button, summary, label, [role='button'], [data-cursor]";
const TEXTY = "input, textarea, select, [contenteditable='true']";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;
    let seen = false;

    const show = (on: boolean) => {
      const v = on ? "1" : "0";
      if (dot.current) dot.current.style.opacity = v;
      if (ring.current) ring.current.style.opacity = v;
    };

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!seen) {
        // start the ring under the pointer instead of sliding in from centre
        seen = true;
        rx = x;
        ry = y;
      }
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0)`;
      }
      show(true);
    };

    const tick = () => {
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const setState = (state: "idle" | "link" | "label" | "text", text = "") => {
      const r = ring.current;
      if (!r) return;
      r.dataset.state = state;
      if (label.current) label.current.textContent = text;
      // the native cursor takes over inside fields
      if (dot.current) dot.current.style.display = state === "text" ? "none" : "";
      r.style.display = state === "text" ? "none" : "";
      root.classList.toggle("cursor-native", state === "text");
    };

    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t?.closest) return;

      if (t.closest(TEXTY)) return setState("text");

      const el = t.closest(INTERACTIVE) as HTMLElement | null;
      if (!el) return setState("idle");

      const custom = el.closest<HTMLElement>("[data-cursor]")?.dataset.cursor;
      if (custom) return setState("label", custom);

      const a = el.closest("a");
      if (a?.href && a.target === "_blank") return setState("label", "open");

      setState("link");
    };

    const down = () => ring.current?.classList.add("is-pressed");
    const up = () => ring.current?.classList.remove("is-pressed");
    const leave = () => show(false);

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.addEventListener("pointerleave", leave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("pointerleave", leave);
      root.classList.remove("has-custom-cursor", "cursor-native");
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[999] hidden md:block">
      <div
        ref={ring}
        data-state="idle"
        className="cursor-ring absolute left-0 top-0 flex items-center justify-center rounded-full opacity-0"
      >
        <span ref={label} className="cursor-label" />
      </div>
      <div
        ref={dot}
        className="cursor-dot absolute left-0 top-0 h-2 w-2 rounded-full opacity-0"
      />
    </div>
  );
}
