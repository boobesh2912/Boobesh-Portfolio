import GariTechLogo from "@/components/GariTechLogo";

const campaigns = [
  {
    title: "GariTech: a brand and a website out of nothing",
    tag: "branding + content marketing agency",
    result: "started as a Canva design shop, learned WordPress the same week I promised a client I already knew it, now runs on referrals and trials",
    accent: "bg-lavender/40",
    logo: true,
  },
  {
    title: "YCS: growing a YouTube channel's whole content engine",
    tag: "marketing manager",
    result: "owned content marketing end to end for Your College Senior, with a focus on repurposing content for more consistency and reach",
    accent: "bg-pink/40",
  },
  {
    title: "Tribe Fortis: marketing for a fitness company that gamifies fitness",
    tag: "marketing lead",
    result: "led the team on script writing and creative strategy across kids, adults and corporate programs, kept the output consistent across all three",
    accent: "bg-butter/50",
  },
  {
    title: "Start The Up: a community built on one idea",
    tag: "community + content",
    result: "four webinars in, students actually showing up to think like founders, before the momentum needed a second wind",
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
              <div className="flex items-center justify-between">
                <span
                  className={`${c.accent} inline-block rounded-full px-3 py-1 font-body text-xs font-bold uppercase tracking-wide text-ink`}
                >
                  {c.tag}
                </span>
                {c.logo && <GariTechLogo />}
              </div>
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
