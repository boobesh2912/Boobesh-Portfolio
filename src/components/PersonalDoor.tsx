"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { start } from "@/lib/ambientAudio";

/*
  The corner door. Clicking it starts the music (this click is the user
  gesture browsers require), plays a circular expand over the whole screen,
  then soft-navigates to /personal, which fades in underneath.
*/
export default function PersonalDoor() {
  const [opening, setOpening] = useState(false);
  const router = useRouter();

  const open = () => {
    if (opening) return;
    setOpening(true);
    start();
    router.prefetch("/personal");
    setTimeout(() => router.push("/personal"), 620);
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
        className="group fixed bottom-6 right-6 z-40 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-ink text-cream shadow-[0_6px_20px_rgba(23,20,15,0.35)]"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-coral/25" />
        <span className="relative text-center font-hand text-[15px] leading-[1.05]">
          the
          <br />
          real me
        </span>
      </motion.button>

      <AnimatePresence>
        {opening && (
          <motion.div
            className="fixed inset-0 z-[95] bg-night"
            initial={{ clipPath: "circle(0px at calc(100% - 41px) calc(100% - 41px))" }}
            animate={{
              clipPath: "circle(150% at calc(100% - 41px) calc(100% - 41px))",
            }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
