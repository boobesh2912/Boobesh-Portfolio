"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/*
  A guess, then the real number. Sits in the middle of the money chapter,
  where the reader has just been told there was a business but not how small
  it actually was.
*/
export default function GuessGame() {
  const [guess, setGuess] = useState(3000);
  const [revealed, setRevealed] = useState(false);

  const actual = 900;
  const off = Math.abs(guess - actual);
  const verdict =
    off <= 300
      ? "Close. Uncomfortably close."
      : guess > actual
        ? "Higher than the truth. Everyone guesses high."
        : "Lower than the truth, which is a first.";

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mt-16 rounded-2xl border border-[rgba(var(--card-skin),0.12)] bg-[rgba(var(--card-skin),0.04)] p-7"
    >
      <p className="font-body text-[10px] font-semibold uppercase tracking-[0.28em] text-ember">
        quick one
      </p>
      <h3 className="mt-3 font-display text-xl font-semibold text-moon sm:text-2xl">
        Guess what my first month of reselling made me.
      </h3>

      <div className="mt-7">
        <p className="font-display text-4xl font-semibold tabular-nums text-moon">
          ₹{guess.toLocaleString("en-IN")}
        </p>
        <input
          type="range"
          min={100}
          max={10000}
          step={100}
          value={guess}
          disabled={revealed}
          onChange={(e) => setGuess(Number(e.target.value))}
          aria-label="your guess in rupees"
          className="mt-4 w-full accent-[var(--ember)]"
        />
        <div className="flex justify-between font-body text-[11px] text-moon/40">
          <span>₹100</span>
          <span>₹10,000</span>
        </div>
      </div>

      {revealed ? (
        <div className="mt-7 border-t border-[rgba(var(--card-skin),0.12)] pt-6">
          <p className="font-hand text-2xl text-ember">₹{actual}. Nine hundred.</p>
          <p className="mt-2 font-body text-[15px] leading-[1.8] text-moon/70">
            {verdict} It was nine hundred rupees and I have never been that
            proud of a number since. Not because of the money. Because
            somebody I had never met sent it to me for something I did.
          </p>
        </div>
      ) : (
        <button
          onClick={() => setRevealed(true)}
          className="mt-7 rounded-full border border-ember/50 px-6 py-2.5 font-body text-sm font-semibold text-ember transition-colors hover:bg-ember hover:text-night"
        >
          lock it in
        </button>
      )}
    </motion.section>
  );
}
