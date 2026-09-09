const platforms = [
  {
    label: "Instagram",
    handle: "@boobeshganesan",
    href: "https://www.instagram.com/boobeshganesan",
    accent: "bg-pink/40",
    note: "visual content, behind the scenes",
  },
  {
    label: "LinkedIn",
    handle: "boobesh2912",
    href: "https://www.linkedin.com/in/boobesh2912",
    accent: "bg-lavender/40",
    note: "the platform I never stopped posting on",
  },
];

export default function ContentFeedSection() {
  return (
    <section className="px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-hand text-2xl text-coral-deep">wherever I&apos;m actually posting</p>
            <h2 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">
              the content feed
            </h2>
          </div>
          <span className="rounded-full border border-dashed border-line px-3 py-1 font-body text-xs font-bold uppercase tracking-wide text-ink-soft">
            live sync arrives with the CRM
          </span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {platforms.map((p) => (
            <a
              key={p.label}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between rounded-3xl border border-line bg-paper p-7 shadow-[0_4px_0_0_var(--line)] transition-transform hover:-translate-y-1"
            >
              <div>
                <span
                  className={`${p.accent} inline-block rounded-full px-3 py-1 font-body text-xs font-bold uppercase tracking-wide text-ink`}
                >
                  {p.label}
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold text-ink">
                  {p.handle}
                </h3>
                <p className="mt-2 font-body text-sm text-ink-soft">{p.note}</p>
              </div>
              <span className="mt-5 inline-flex items-center gap-1 font-body text-sm font-bold text-coral-deep">
                see the latest posts
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          ))}
        </div>

        <p className="mt-6 text-center font-hand text-lg text-ink-soft">
          once the personal CRM backend is live, this section pulls posts in
          on its own, no copy pasting required.
        </p>
      </div>
    </section>
  );
}
