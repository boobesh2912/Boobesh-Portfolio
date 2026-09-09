"use client";

import { useEffect, useState } from "react";
import { isMuted, isRunning, setMuted, start, subscribe } from "@/lib/ambientAudio";

export default function MusicToggle() {
  const [muted, setMutedState] = useState(false);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const sync = () => {
      setMutedState(isMuted());
      setRunning(isRunning());
    };
    const unsub = subscribe(sync);

    // If we arrived here without a click (direct link, refresh), the browser
    // will not let audio start yet. Arm the first interaction instead.
    start();
    sync();

    const kick = () => {
      start();
      sync();
    };
    window.addEventListener("pointerdown", kick, { once: true });
    window.addEventListener("keydown", kick, { once: true });

    const t = setInterval(sync, 1500);
    return () => {
      unsub();
      clearInterval(t);
      window.removeEventListener("pointerdown", kick);
      window.removeEventListener("keydown", kick);
    };
  }, []);

  return (
    <button
      onClick={() => {
        if (!running) start();
        setMuted(!muted);
      }}
      className="flex items-center gap-2 rounded-full border border-moon/20 bg-black/30 px-3 py-2 font-body text-[11px] font-semibold text-moon/90 backdrop-blur transition-colors hover:border-ember/60 hover:text-ember"
      aria-label={muted ? "unmute the music" : "mute the music"}
    >
      <span className="flex h-3 w-3 items-end gap-[2px]" aria-hidden>
        <span
          className={`w-[2px] bg-current ${muted ? "h-1" : "h-2 animate-drift"}`}
        />
        <span
          className={`w-[2px] bg-current ${muted ? "h-1" : "h-3 animate-drift"}`}
          style={{ animationDelay: "0.3s" }}
        />
        <span
          className={`w-[2px] bg-current ${muted ? "h-1" : "h-[6px] animate-drift"}`}
          style={{ animationDelay: "0.6s" }}
        />
      </span>
      {muted ? "music off" : "music on"}
    </button>
  );
}
