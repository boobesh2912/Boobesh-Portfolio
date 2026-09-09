"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { unlock } from "@/lib/ambientAudio";

/*
  The corner door, present on every page except the personal one.
  The click primes audio silently (browsers need a gesture), plays a
  circular expand, then soft navigates. Sound only starts once the
  personal page itself mounts.
*/
export default function PersonalDoor() {
  const [opening, setOpening] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  if (pathname?.startsWith("/personal") || pathname?.startsWith("/admin")) {
    return null;
  }

  const open = () => {
    if (opening) return;
    setOpening(true);
    unlock();
    router.prefetch("/personal");
    setTimeout(() => router.push("/personal"), 640);
  };

  return (
    <>
      <motion.button
        onClick={open}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 15 }}
        whileHover={{ scale: 1.06 }}
        aria-label="open my personal space"
        className="group fixed bottom-7 right-7 z-40 flex h-[88px] w-[88px] items-center justify-center rounded-full bg-ink text-cream shadow-[0_10px_30px_rgba(23,20,15,0.4)]"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-coral/20" />
        <span className="absolute inset-[-6px] rounded-full border border-ink/15" />
        <span className="relative text-center font-hand text-[19px] leading-[1.05]">
          the
          <br />
          real me
        </span>
      </motion.button>

      <AnimatePresence>
        {opening && (
          <motion.div
            className="fixed inset-0 z-[95] bg-night"
            initial={{ clipPath: "circle(0px at calc(100% - 51px) calc(100% - 51px))" }}
            animate={{
              clipPath: "circle(150% at calc(100% - 51px) calc(100% - 51px))",
            }}
            transition={{ duration: 0.78, ease: [0.76, 0, 0.24, 1] }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
