const campaigns = [
  {
    title: "GariTech: a brand and a website out of nothing",
    tag: "branding + web",
    result: "went from zero web experience to shipping client sites, learning WordPress the same week I promised a client I already knew it",
    accent: "bg-lavender/40",
  },
  {
    title: "Start The Up: a community built on one idea",
    tag: "community + content",
    result: "four webinars in, students actually showing up to think like founders, before the momentum needed a second wind",
    accent: "bg-pink/40",
  },
  {
    title: "the LinkedIn habit that never broke",
    tag: "content, consistently",
    result: "the one platform I never stopped posting on, long enough for it to become the closest thing I have to a personal brand",
    accent: "bg-butter/50",
  },
  {
    title: "backend systems, learned in public",
    tag: "python + fastapi",
    result: "currently interning as a backend developer while building the YCS brand on the side, systems and perception at the same time",
    accent: "bg-sage/40",
  },
];

export default function WorkSection() {
  return (
    <section id="work" className="px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center text-center">
          <p className="font-hand text-2xl text-coral-deep">receipts, not just claims</p>
          <h2 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">
            things I have actually built
          </h2>
          <p className="mt-3 max-w-md font-body text-sm text-ink-soft">
            Real ventures, told the way a marketer would tell them. More
            dispatches on each one going up over time.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {campaigns.map((c) => (
            <div
              key={c.title}
              className="group rounded-3xl border border-line bg-paper p-7 shadow-[0_4px_0_0_var(--line)] transition-transform hover:-translate-y-1"
            >
              <span
                className={`${c.accent} inline-block rounded-full px-3 py-1 font-body text-xs font-bold uppercase tracking-wide text-ink`}
              >
                {c.tag}
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold text-ink">
                {c.title}
              </h3>
              <p className="mt-3 font-body text-sm text-ink-soft">{c.result}</p>
              <span className="mt-5 inline-flex items-center gap-1 font-body text-sm font-bold text-coral-deep">
                read the story
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
