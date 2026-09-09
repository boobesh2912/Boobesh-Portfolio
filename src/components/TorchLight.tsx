"use client";

import { useEffect, useRef, useState } from "react";

/*
  An optional flashlight. Off by default, because forcing it on people
  trying to read would be rude. The toggle sits wherever you place it.
*/
export default function TorchLight({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const [on, setOn] = useState(false);
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!on) return;
    const el = layer.current;
    if (!el) return;

    const move = (e: PointerEvent) => {
      el.style.setProperty("--torch-x", `${e.clientX}px`);
      el.style.setProperty("--torch-y", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [on]);

  const chip =
    tone === "dark"
      ? "border-moon/20 bg-black/30 text-moon/90 hover:border-ember/60 hover:text-ember"
      : "border-line bg-paper/80 text-ink-soft hover:border-coral hover:text-coral-deep";

  return (
    <>
      {on && (
        <div
          ref={layer}
          aria-hidden
          className="torch-layer pointer-events-none fixed inset-0 z-[70]"
        />
      )}
      <button
        onClick={() => setOn((v) => !v)}
        aria-pressed={on}
        className={`flex items-center gap-2 rounded-full border px-3.5 py-2 font-body text-[11px] font-semibold backdrop-blur transition-colors ${chip} ${className}`}
      >
        <span aria-hidden>{on ? "🔦" : "💡"}</span>
        {on ? "torch on" : "torch"}
      </button>
    </>
  );
}
