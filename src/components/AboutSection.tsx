const stats = [
  { value: "5+", label: "years thinking in campaigns", rotate: "-rotate-2", bg: "bg-butter/60" },
  { value: "40+", label: "brands I have found a voice for", rotate: "rotate-2", bg: "bg-pink/50" },
  { value: "1000s", label: "pieces of content shipped", rotate: "-rotate-1", bg: "bg-sage/40" },
];

export default function AboutSection() {
  return (
    <section id="about" className="px-4 py-20 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="relative rounded-[2rem] border border-line bg-paper p-8 shadow-[0_6px_0_0_var(--line)] sm:p-10">
          <p className="font-hand text-2xl text-coral-deep rotate-[-1deg]">
            field notes, entry one
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
            the short version: I&apos;m a marketer, top to bottom.
          </h2>

          <div className="mt-6 space-y-4 font-body text-base leading-relaxed text-ink-soft">
            <p>
              Not a designer who dabbles in marketing. Not a writer who fell
              into growth. A marketer. It is the lens I use for everything,
              from a single headline to a full quarter&apos;s content
              calendar.
            </p>
            <p>
              I got here by testing a lot of ideas in public, watching what
              people actually stop scrolling for and building a habit out of
              it. Some campaigns worked because of a clever hook. Most
              worked because the strategy underneath was doing the real
              lifting.
            </p>
            <p>
              These days I split my time between shaping positioning,
              writing content that sounds like a person and reporting back
              on what moved the needle. This site is the running log of
              that work.
            </p>
          </div>

          <p className="mt-8 inline-block rounded-full bg-ink px-5 py-2 font-display text-sm font-bold text-cream">
            currently: marketer, always. job title changes, this doesn&apos;t.
          </p>
        </div>

        <div className="grid gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className={`${s.bg} ${s.rotate} rounded-3xl border border-ink/10 p-6 shadow-[0_4px_0_0_rgba(0,0,0,0.06)] transition-transform hover:rotate-0`}
            >
              <p className="font-display text-4xl font-bold text-ink">{s.value}</p>
              <p className="mt-1 font-body text-sm font-semibold text-ink-soft">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
