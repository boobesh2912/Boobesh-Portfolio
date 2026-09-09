"use client";

import { useEffect, useRef } from "react";

const EMOJIS = ["✦", "✧", "◦", "•"];

export default function CursorSparkles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSpawn = useRef(0);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const handleMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastSpawn.current < 60) return;
      lastSpawn.current = now;

      const el = document.createElement("span");
      el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      el.style.position = "fixed";
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      el.style.pointerEvents = "none";
      el.style.fontSize = `${10 + Math.random() * 8}px`;
      el.style.color = ["#ff7a59", "#f4c95d", "#b9a8f0", "#8fa98a"][
        Math.floor(Math.random() * 4)
      ];
      el.style.zIndex = "9999";
      el.style.transform = "translate(-50%, -50%)";
      el.style.transition = "transform 0.6s ease-out, opacity 0.6s ease-out";
      el.style.opacity = "0.9";

      containerRef.current?.appendChild(el);

      requestAnimationFrame(() => {
        el.style.transform = `translate(-50%, -50%) translateY(-24px) scale(0.4)`;
        el.style.opacity = "0";
      });

      setTimeout(() => el.remove(), 650);
    };

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return <div ref={containerRef} aria-hidden="true" />;
}
