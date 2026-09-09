"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import type { LottieHandle } from "lottie-react";
import { useTheme } from "@/components/ThemeProvider";

const Lottie = dynamic(() => import("lottie-react").then((m) => m.Lottie), {
  ssr: false,
});

/*
  The uploaded day/night animation. Frame 0 is daytime and the end is night,
  so it plays forward into dark and in reverse back into light. Passing a URL
  as src keeps the 700kb of JSON out of the page bundle.
*/
const LAST_FRAME = 134;

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const lottie = useRef<LottieHandle>(null);
  const primed = useRef(false);

  useEffect(() => {
    const api = lottie.current;
    if (!api) return;

    // First paint: sit at the correct end without animating there.
    if (!primed.current) {
      primed.current = true;
      api.seek(theme === "dark" ? LAST_FRAME : 0);
      api.pause();
      return;
    }

    api.play();
  }, [theme]);

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "switch to light mode" : "switch to dark mode"}
      title={theme === "dark" ? "light mode" : "dark mode"}
      // the animation is 480x260, so the button keeps that ratio and the
      // whole scene fits instead of showing a cropped slice
      className={`relative h-[44px] w-[81px] shrink-0 overflow-hidden rounded-full border border-line bg-paper/70 backdrop-blur transition-colors hover:border-coral ${className}`}
    >
      <Lottie
        lottieRef={lottie}
        src="/lottie/daynight.json"
        autoplay={false}
        loop={false}
        direction={theme === "dark" ? "forward" : "reverse"}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
    </button>
  );
}
