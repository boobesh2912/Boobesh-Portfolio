import Reveal from "@/components/Reveal";

const services = [
  {
    n: "01",
    title: "Content strategy",
    body: "Deciding what to say, to whom, and in what order. Calendars that survive a busy week, not just a planning session.",
  },
  {
    n: "02",
    title: "Scripts and writing",
    body: "Reels scripts, LinkedIn posts, newsletters, captions. Short form that sounds like a person talking, not a brand announcing.",
  },
  {
    n: "03",
    title: "Repurposing",
    body: "One long video becomes a week of content. This is the single highest leverage thing most teams skip.",
  },
  {
    n: "04",
    title: "Brand positioning",
    body: "Working out what a company actually stands for before writing a word of copy for it.",
  },
  {
    n: "05",
    title: "Running the team",
    body: "Briefs, deadlines, editors, follow ups. Making sure the thing that was planned actually ships.",
  },
  {
    n: "06",
    title: "Websites when needed",
    body: "Five years of WordPress and web work behind me, so I can build the landing page instead of waiting on one.",
  },
];

export default function WhatIDoSection() {
  return (
    <section id="services" className="bg-dots border-y border-line bg-cream-deep/40 px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.25em] text-coral">
            02 — what I do
          </p>
          <h2 className="mt-6 max-w-2xl font-display text-3xl font-semibold leading-[1.15] text-ink sm:text-[2.6rem]">
            The actual work, in plain words.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.n} delay={0.06 * i}>
              <div className="group border-t border-line pt-5 transition-colors hover:border-coral">
                <span className="font-body text-[11px] font-semibold tracking-[0.2em] text-coral/70">
                  {s.n}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 font-body text-[15px] leading-[1.7] text-ink-soft">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
