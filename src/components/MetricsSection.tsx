"use client";

import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import Assemble, { type Side } from "@/components/Assemble";

/*
  Two years of building, counted. Deliberately not padded with vanity numbers
  like impressions, which nobody can verify and everybody inflates.

  Each box arrives from a different side as you scroll and locks into the
  grid, like pieces being put together.
*/
const metrics: { to: number; suffix: string; label: string; note: string; from: Side }[] = [
  { to: 20, suffix: "+", label: "clients served", note: "mostly by referral", from: "tl" },
  { to: 10, suffix: "+", label: "websites shipped", note: "WordPress, mostly", from: "top" },
  { to: 20, suffix: "+", label: "speaking events", note: "give me a mic", from: "tr" },
  { to: 100, suffix: "+", label: "students taught", note: "some still text me", from: "bl" },
  { to: 3, suffix: "", label: "ventures and communities founded", note: "one is still alive", from: "bottom" },
  { to: 2, suffix: "", label: "published eBooks", note: "yes, actually published", from: "br" },
];

export default function MetricsSection() {
  return (
    <section
      id="numbers"
      className="bg-grid overflow-x-clip border-y border-line px-4 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.25em] text-coral">
            impact, in numbers
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-[1.15] text-ink sm:text-[2.6rem]">
            What two years of building actually looks like.
          </h2>
          <p className="mt-4 max-w-xl font-body text-[17px] leading-[1.8] text-ink-soft">
            No impressions, no reach, no numbers I cannot back up in a call.
            Just the things that happened.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((m) => (
            <Assemble key={m.label} from={m.from} className="h-full">
              <div className="group h-full rounded-2xl border border-line bg-paper p-8 shadow-[0_8px_24px_rgba(23,20,15,0.05)] transition-colors hover:border-coral/50 hover:bg-cream-deep">
                <p className="font-display text-5xl font-semibold tabular-nums text-ink sm:text-6xl">
                  <CountUp to={m.to} suffix={m.suffix} />
                </p>
                <p className="mt-3 font-body text-sm font-semibold text-ink">
                  {m.label}
                </p>
                <p className="mt-1 font-hand text-lg text-coral-deep opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {m.note}
                </p>
              </div>
            </Assemble>
          ))}
        </div>
      </div>
    </section>
  );
}
