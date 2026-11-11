"use client";

import dynamic from "next/dynamic";
import { useTheme } from "@/components/ThemeProvider";

// client only: the animation library needs the browser
const DayNightAnimation = dynamic(() => import("@/components/DayNightAnimation"), {
  ssr: false,
});

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "switch to light mode" : "switch to dark mode"}
      title={theme === "dark" ? "light mode" : "dark mode"}
      // the animation is 480x260, so the button keeps that ratio and the
      // whole scene fits instead of showing a cropped slice
      className={`relative h-[44px] w-[81px] shrink-0 overflow-hidden rounded-full border border-line bg-paper/70 backdrop-blur transition-colors hover:border-coral ${className}`}
    >
      <DayNightAnimation dark={theme === "dark"} />
    </button>
  );
}
