"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const MAILBOX = "dreamsofboo@gmail.com";

export default function LetterWidget() {
  const [open, setOpen] = useState(false);
  const [from, setFrom] = useState("");
  const [text, setText] = useState("");

  const send = () => {
    const body = `${text || "..."}

— ${from || "someone who read your page"}`;
    window.location.href = `mailto:${MAILBOX}?subject=${encodeURIComponent(
      "a letter for Boo"
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="fixed bottom-5 right-5 z-30">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: 3, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, rotate: -1, scale: 1 }}
            exit={{ opacity: 0, y: 20, rotate: 3, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="mb-4 w-[19rem] rounded-sm bg-[#f6efdd] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.55)] sm:w-[21rem]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(transparent, transparent 27px, rgba(23,20,15,0.07) 28px)",
            }}
          >
            <p className="font-hand text-2xl text-[#8a3f22]">write me a letter</p>
            <p className="mt-1 font-body text-[11px] leading-relaxed text-[#5c5344]">
              Say anything you want. I read all of them, and I write back.
            </p>

            <input
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="your name"
              className="mt-4 w-full border-b border-[#17140f]/20 bg-transparent pb-1 font-hand text-lg text-[#17140f] placeholder:text-[#17140f]/30 focus:border-[#8a3f22] focus:outline-none"
            />

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={5}
              placeholder="dear boo,"
              className="mt-3 w-full resize-none bg-transparent font-hand text-lg leading-[28px] text-[#17140f] placeholder:text-[#17140f]/30 focus:outline-none"
            />

            <button
              onClick={send}
              className="mt-2 w-full rounded-full bg-[#17140f] py-2.5 font-body text-xs font-bold uppercase tracking-widest text-[#f6efdd] transition-transform hover:-translate-y-0.5"
            >
              seal and send
            </button>
            <p className="mt-2 text-center font-body text-[10px] text-[#5c5344]">
              opens your mail app, addressed to me
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="write me a letter"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-ember text-2xl shadow-[0_8px_24px_rgba(224,138,74,0.4)] transition-transform hover:scale-105"
      >
        {open ? "✕" : "✉"}
      </button>
    </div>
  );
}
