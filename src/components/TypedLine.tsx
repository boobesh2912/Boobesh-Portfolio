"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/*
  Types a line out once it scrolls into view, then leaves a blinking caret
  behind. The full text is always in the DOM for screen readers and crawlers,
  so nothing here costs us anything on the SEO side.
*/
export default function TypedLine({
  text,
  className = "",
  speed = 26,
  startDelay = 300,
}: {
  text: string;
  className?: string;
  speed?: number;
  startDelay?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const host = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(0);
  const [started, setStarted] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const el = host.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (!started || reduced) return;
    let i = 0;
    const begin = setTimeout(() => {
      const tick = setInterval(() => {
        i += 1;
        setShown(i);
        if (i >= text.length) clearInterval(tick);
      }, speed);
      timer.current = tick;
    }, startDelay);
    return () => {
      clearTimeout(begin);
      if (timer.current) clearInterval(timer.current);
    };
  }, [started, reduced, text, speed, startDelay]);

  const done = reduced || shown >= text.length;

  return (
    <span ref={host} className={className}>
      <span aria-hidden>{reduced ? text : text.slice(0, shown)}</span>
      <span className="sr-only">{text}</span>
      <span
        aria-hidden
        className={`ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.12em] bg-current ${
          done ? "animate-caret" : ""
        }`}
      />
    </span>
  );
}
