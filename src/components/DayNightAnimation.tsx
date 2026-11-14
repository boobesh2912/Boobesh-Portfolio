"use client";

/* eslint-disable react-hooks/refs -- useLottie returns a plain instance object, not a ref; the rule misreads it as one */

import { useEffect, useRef, useState } from "react";
import { useLottie } from "lottie-react";

/*
  The uploaded day/night animation. Frame 0 is daytime and the last frame is
  night. The 700kb of JSON is fetched once, shared by every toggle on the
  page, and only after the page has gone idle so it never competes with the
  content people came to read.

  Nothing may touch the playhead until the data is in: a seek before that is
  silently ignored, which used to leave the toggle on the sun while the page
  was already dark. So the player mounts only once the data has arrived, puts
  the playhead on the end that matches the page, and from then on plays only
  when the theme really changes.
*/
const LAST_FRAME = 134;

let dataPromise: Promise<object> | null = null;
function loadData() {
  dataPromise ??= fetch("/lottie/daynight.json").then((r) => r.json());
  return dataPromise;
}

export default function DayNightAnimation({ dark }: { dark: boolean }) {
  const [data, setData] = useState<object | null>(null);

  useEffect(() => {
    let live = true;
    const go = () => loadData().then((d) => live && setData(d)).catch(() => {});
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number })
      .requestIdleCallback;
    const t = idle ? idle(go, { timeout: 4000 }) : window.setTimeout(go, 2500);
    return () => {
      live = false;
      if (!idle) window.clearTimeout(t);
    };
  }, []);

  return data ? <Player data={data} dark={dark} /> : null;
}

function Player({ data, dark }: { data: object; dark: boolean }) {
  const lottie = useLottie({ src: data, autoplay: false, loop: false });
  const shown = useRef<boolean | null>(null);

  useEffect(() => {
    if (shown.current === null) {
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
    // `lottie` is a new object every render; the flag above is the real trigger
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dark]);

  return (
    <div
      ref={lottie.setDisplayRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
