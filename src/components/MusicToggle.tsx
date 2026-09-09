"use client";

import { useEffect, useState } from "react";
import {
  isMuted,
  isPlaying,
  play,
  setMuted,
  stop,
  subscribe,
} from "@/lib/ambientAudio";

/*
  Owns the audio lifecycle for the personal page: starts it on mount,
  stops it on unmount, so nothing keeps playing once you go back outside.
*/
export default function MusicToggle() {
  const [muted, setMutedState] = useState(false);
  const [playingState, setPlayingState] = useState(false);

  useEffect(() => {
    const sync = () => {
      setMutedState(isMuted());
      setPlayingState(isPlaying());
    };
    const unsub = subscribe(sync);

    play();
    sync();

    // If we arrived without a click, the browser blocks audio until the
    // visitor touches something. Try again on their first interaction.
    const kick = () => {
      if (!isPlaying()) play();
    };
    window.addEventListener("pointerdown", kick);
    window.addEventListener("keydown", kick);

    return () => {
      unsub();
      window.removeEventListener("pointerdown", kick);
      window.removeEventListener("keydown", kick);
      stop();
    };
  }, []);

  const label = muted ? "music off" : playingState ? "music on" : "tap for music";

  return (
    <button
      onClick={() => {
        if (!playingState) play();
        setMuted(!muted);
      }}
      className="flex items-center gap-2 rounded-full border border-moon/20 bg-black/30 px-3.5 py-2 font-body text-[11px] font-semibold text-moon/90 backdrop-blur transition-colors hover:border-ember/60 hover:text-ember"
      aria-label={muted ? "unmute the music" : "mute the music"}
    >
      <span className="flex h-3 w-3 items-end gap-[2px]" aria-hidden>
        <span
          className={`w-[2px] bg-current ${
            muted || !playingState ? "h-1" : "h-2 animate-drift"
          }`}
        />
        <span
          className={`w-[2px] bg-current ${
            muted || !playingState ? "h-1" : "h-3 animate-drift"
          }`}
          style={{ animationDelay: "0.3s" }}
        />
        <span
          className={`w-[2px] bg-current ${
            muted || !playingState ? "h-1" : "h-[6px] animate-drift"
          }`}
          style={{ animationDelay: "0.6s" }}
        />
      </span>
      {label}
    </button>
  );
}
