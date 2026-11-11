"use client";

/* eslint-disable react-hooks/refs -- useLottie returns a plain instance object, not a ref; the rule misreads it as one */

import { useEffect, useRef } from "react";
import { useLottie } from "lottie-react";

/*
  The uploaded day/night animation. Frame 0 is daytime and the last frame is
  night. It is loaded by URL so the 700kb of JSON stays out of the page bundle.

  Nothing here may touch the playhead until the file has finished loading: a
  seek before that is silently ignored, which is what used to leave the toggle
  on the sun while the page was already dark. So it waits for the state to
  leave "loading", puts the playhead on the end that matches the page, and
  from then on plays only when the theme really changes.
*/
const LAST_FRAME = 134;

export default function DayNightAnimation({ dark }: { dark: boolean }) {
  const lottie = useLottie({
    src: "/lottie/daynight.json",
    autoplay: false,
    loop: false,
  });
  const shown = useRef<boolean | null>(null);
  const ready = lottie.state !== "loading" && lottie.state !== "error";

  useEffect(() => {
    if (!ready) return;

    if (shown.current === null) {
      // first sight of it: jump to the right end, no animation
      shown.current = dark;
      lottie.seek(dark ? LAST_FRAME : 0);
      lottie.pause();
      return;
    }
    if (shown.current !== dark) {
      shown.current = dark;
      lottie.setDirection(dark ? "forward" : "reverse");
      lottie.play();
    }
    // `lottie` is a new object every render; the flags above are the real triggers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, dark]);

  return (
    <div
      ref={lottie.setDisplayRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
