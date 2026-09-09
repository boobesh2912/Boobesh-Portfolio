const campaigns = [
  {
    title: "the rebrand that actually got read",
    tag: "positioning + launch",
    result: "3x more time on page after the new messaging went live",
    accent: "bg-lavender/40",
  },
  {
    title: "a content calendar people looked forward to",
    tag: "content strategy",
    result: "engagement up quarter over quarter, four quarters straight",
    accent: "bg-pink/40",
  },
  {
    title: "the email series nobody unsubscribed from",
    tag: "lifecycle + copy",
    result: "open rates that made the whole team ask what changed",
    accent: "bg-butter/50",
  },
  {
    title: "a launch built on one good hook",
    tag: "campaign strategy",
    result: "the kind of week where the metrics dashboard is actually fun to open",
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
            selected campaigns
          </h2>
          <p className="mt-3 max-w-md font-body text-sm text-ink-soft">
            A few of the things I have shipped. Placeholder stories for now,
            real case studies going up one dispatch at a time.
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
