"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

/*
  Socials as a sheet of postage stamps. Perforated edges, a postmark, and
  they lift off the page when you hover. Beats another row of round icons.
*/

const stamps = [
  {
    label: "LinkedIn",
    handle: "in/boobesh2912",
    href: "https://www.linkedin.com/in/boobesh2912",
    value: "₹5",
    note: "the one I never quit",
    ink: "text-coral-deep",
    wash: "from-coral/20 to-butter/15",
    art: (
      <>
        <rect x="18" y="30" width="8" height="26" rx="1.5" fill="currentColor" />
        <circle cx="22" cy="21" r="4.5" fill="currentColor" />
        <path d="M34 56V30h8v4c2-3 5-5 9-5 7 0 11 5 11 13v14h-8V44c0-5-2-7-6-7s-6 3-6 7v12z" fill="currentColor" />
      </>
    ),
  },
  {
    label: "Instagram",
    handle: "@boobeshganesan",
    href: "https://www.instagram.com/boobeshganesan",
    value: "₹3",
    note: "visual side of it",
    ink: "text-lavender",
    wash: "from-lavender/25 to-pink/20",
    art: (
      <>
        <rect x="18" y="18" width="42" height="42" rx="12" fill="none" stroke="currentColor" strokeWidth="5" />
        <circle cx="39" cy="39" r="11" fill="none" stroke="currentColor" strokeWidth="5" />
        <circle cx="52" cy="26" r="3.5" fill="currentColor" />
      </>
    ),
  },
  {
    label: "X",
    handle: "@buildwithboo",
    href: "https://www.x.com/buildwithboo",
    value: "₹2",
    note: "thinking out loud",
    ink: "text-ink",
    wash: "from-ink/12 to-sage/15",
    art: (
      <>
        <path d="M20 18h10l14 19 12-19h9L47 42l18 24H55L40 46 27 66h-9l21-27z" fill="currentColor" />
      </>
    ),
  },
  {
    label: "YouTube",
    handle: "@dreamsofboo",
    href: "https://www.youtube.com/@dreamsofboo",
    value: "₹7",
    note: "long form, eventually",
    ink: "text-coral",
    wash: "from-butter/25 to-coral/15",
    art: (
      <>
        <rect x="14" y="24" width="50" height="32" rx="9" fill="none" stroke="currentColor" strokeWidth="5" />
        <path d="M34 33l14 7-14 7z" fill="currentColor" />
      </>
    ),
  },
];

export default function StampSocials() {
  return (
    <section className="wash-clay border-t border-line px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.25em] text-coral">
            postage
          </p>
          <h2 className="mt-6 max-w-xl font-display text-3xl font-semibold leading-[1.15] text-ink sm:text-[2.6rem]">
            Written from Chennai, sent everywhere.
          </h2>
          <p className="mt-4 max-w-md font-body text-[15px] leading-relaxed text-ink-soft">
            Four places I actually post. Pick one and it opens.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {stamps.map((s, i) => (
            <Reveal key={s.label} delay={0.07 * i}>
              <motion.a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -8, rotate: i % 2 ? 2.5 : -2.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group block"
              >
                <div
                  className={`relative bg-gradient-to-br p-3 ${s.wash} [filter:drop-shadow(0_8px_16px_rgba(23,20,15,0.14))]`}
                  style={{
                    // the perforated edge
                    WebkitMask:
                      "radial-gradient(circle 5px at 0 12px, transparent 98%, #000) 0 0/100% 24px, radial-gradient(circle 5px at 100% 12px, transparent 98%, #000) 0 0/100% 24px, radial-gradient(circle 5px at 12px 0, transparent 98%, #000) 0 0/24px 100%, radial-gradient(circle 5px at 12px 100%, transparent 98%, #000) 0 0/24px 100%",
                    WebkitMaskComposite: "source-in",
                    mask: "radial-gradient(circle 5px at 0 12px, transparent 98%, #000) 0 0/100% 24px, radial-gradient(circle 5px at 100% 12px, transparent 98%, #000) 0 0/100% 24px, radial-gradient(circle 5px at 12px 0, transparent 98%, #000) 0 0/24px 100%, radial-gradient(circle 5px at 12px 100%, transparent 98%, #000) 0 0/24px 100%",
                    maskComposite: "intersect",
                  }}
                >
                  <div className="border border-dashed border-ink/20 bg-paper/70 px-3 pb-3 pt-4 text-center">
                    <div className="flex items-start justify-between">
                      <span className="font-display text-[13px] font-semibold text-ink/60">
                        {s.value}
                      </span>
                      <span className="font-body text-[8px] uppercase tracking-[0.15em] text-ink/40">
                        India
                      </span>
                    </div>

                    <svg
                      viewBox="0 0 78 78"
                      className={`mx-auto my-2 h-14 w-14 ${s.ink}`}
                      aria-hidden
                    >
                      {s.art}
                    </svg>

                    <p className="font-display text-sm font-semibold text-ink">
                      {s.label}
                    </p>
                    <p className="mt-0.5 truncate font-body text-[10px] text-ink-soft">
                      {s.handle}
                    </p>

                    {/* postmark, only once you hover */}
                    <span className="pointer-events-none absolute right-2 top-6 rotate-[-16deg] rounded-full border-2 border-coral/50 px-2 py-1 font-body text-[7px] font-bold uppercase tracking-widest text-coral/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      posted
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-center font-hand text-base text-ink-soft">
                  {s.note}
                </p>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
