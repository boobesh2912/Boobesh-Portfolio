"use client";

import { useCallback, useState } from "react";

/*
  Renders an image if the file exists, otherwise an elegant placeholder
  naming the exact file to drop in. No code change needed later.

  The ref callback matters: when the file is missing, the browser fails the
  request before React hydrates, so onError never fires. Checking
  naturalWidth on mount catches that case.
*/
export default function ImageSlot({
  src,
  alt,
  label,
  className = "",
  rounded = "rounded-2xl",
}: {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  rounded?: string;
}) {
  const [failed, setFailed] = useState(false);

  const check = useCallback((node: HTMLImageElement | null) => {
    if (node && node.complete && node.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-1.5 border border-dashed border-line bg-cream-deep/50 p-4 text-center ${rounded} ${className}`}
      >
        <span className="font-display text-xl text-ink-soft/40" aria-hidden>
          ◳
        </span>
        <p className="font-hand text-base leading-tight text-ink-soft">
          {label ?? "image goes here"}
        </p>
        <code className="font-body text-[9px] tracking-tight text-ink-soft/60">
          {src}
        </code>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={check}
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={`object-cover ${rounded} ${className}`}
    />
  );
}
