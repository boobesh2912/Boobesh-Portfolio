"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

/*
  Counts up once the number scrolls into view. Indian grouping, so
  100000 reads as 1,00,000 rather than 100,000.
*/
export default function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 2.2,
  className = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {new Intl.NumberFormat("en-IN").format(value)}
      {suffix}
    </span>
  );
}
