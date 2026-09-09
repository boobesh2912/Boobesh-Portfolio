import Link from "next/link";
import Reveal from "@/components/Reveal";

const loves = [
  {
    icon: "🎤",
    title: "Talking to a room",
    body: "Not small talk. The kind with a mic, in front of people who did not ask to be pitched to. Give me a stage and I will say yes.",
  },
  {
    icon: "💃",
    title: "Dancing, badly",
    body: "Started recently. I am not good at it. I needed one thing in my life with nothing to do with growth or money.",
  },
  {
    icon: "🎧",
    title: "One song, for months",
    body: "Kadhaippoma from Oh My Kadavule. I do not fully know why. Some lines just move in and never leave.",
  },
  {
    icon: "🗂️",
    title: "Starting things",
    body: "50+ projects on my drive, half unfinished. It is a flaw and a feature and I have stopped apologising for it.",
  },
];

export default function WhatILoveSection() {
  return (
    <section className="border-t border-line bg-cream-deep/40 px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.25em] text-coral">
            06 — what I love
          </p>
          <h2 className="mt-6 max-w-2xl font-display text-3xl font-semibold leading-[1.15] text-ink sm:text-[2.6rem]">
            The parts that are not on a resume.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {loves.map((l, i) => (
            <Reveal key={l.title} delay={0.06 * i}>
              <div className="flex h-full gap-4 rounded-2xl border border-line bg-paper p-6">
                <span className="text-2xl" aria-hidden>
                  {l.icon}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {l.title}
                  </h3>
                  <p className="mt-1.5 font-body text-[15px] leading-[1.7] text-ink-soft">
                    {l.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="relative mt-10 overflow-hidden rounded-2xl bg-ink p-9 text-center">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-coral/25 blur-3xl" />
            <div className="absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-butter/15 blur-3xl" />
            <p className="relative font-hand text-2xl text-butter">
              there is a longer, messier version of all this
            </p>
            <h3 className="relative mt-2 font-display text-2xl font-semibold text-cream sm:text-3xl">
              who is Boobesh, actually?
            </h3>
            <p className="relative mx-auto mt-3 max-w-md font-body text-[15px] leading-relaxed text-cream/70">
              I wrote the honest version. The unfinished projects, the lie
              about knowing WordPress, the stuff I am still working out. It
              lives behind its own door.
            </p>
            <Link
              href="/personal"
              className="relative mt-7 inline-block rounded-full bg-cream px-7 py-3 font-body text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              open the personal space →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
