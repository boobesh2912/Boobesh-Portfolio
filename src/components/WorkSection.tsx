import GariTechLogo from "@/components/GariTechLogo";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";

const campaigns = [
  {
    title: "GariTech: a brand and a website out of nothing",
    tag: "branding + content marketing agency",
    result: "started as a Canva design shop, learned WordPress the same week I promised a client I already knew it, now runs on referrals and trials",
    accent: "bg-lavender/40",
    logo: true,
    span: true,
  },
  {
    title: "YCS: growing a YouTube channel's whole content engine",
    tag: "marketing manager",
    result: "owned content marketing end to end for Your College Senior, with a focus on repurposing content for more consistency and reach",
    accent: "bg-pink/40",
    thumbSlot: "/public/ycs-thumbnail.jpg",
  },
  {
    title: "Tribe Fortis: marketing for a fitness company that gamifies fitness",
    tag: "marketing lead",
    result: "led the team on script writing and creative strategy across kids, adults and corporate programs, kept the output consistent across all three",
    accent: "bg-butter/50",
    thumbSlot: "/public/tribe-fortis-thumbnail.jpg",
  },
  {
    title: "Start The Up: a community built on one idea",
    tag: "community + content",
    result: "four webinars in, students actually showing up to think like founders, before the momentum needed a second wind",
    accent: "bg-sage/40",
  },
];

const elsewhere = [
  { label: "Proof · LinkedIn", href: "#" },
  { label: "Proof · X", href: "#" },
];

export default function WorkSection() {
  return (
    <section id="work" className="px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-10 flex flex-col items-center text-center">
          <p className="font-hand text-2xl text-coral-deep">receipts, not just claims</p>
          <h2 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">
            things I have actually built
          </h2>
          <p className="mt-3 max-w-md font-body text-sm text-ink-soft">
            Not case studies with numbers I made up. Real ventures, some
            still messy, told straight.
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-3">
          {campaigns.map((c, i) => (
            <Reveal
              key={c.title}
              delay={0.08 * i}
              className={c.span ? "sm:col-span-3" : "sm:col-span-1"}
            >
              <TiltCard>
                <div
                  className={`group h-full rounded-3xl border border-line bg-paper p-7 shadow-[0_4px_0_0_var(--line)] ${
                    c.span ? "sm:flex sm:items-center sm:gap-8" : ""
                  }`}
                >
                  <div className={c.span ? "sm:flex-1" : ""}>
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
                  {c.thumbSlot && (
                    <div className="mt-5 flex h-24 items-center justify-center rounded-2xl border border-dashed border-ink/20 bg-white/5 px-3 text-center font-hand text-xs text-ink-soft">
                      channel thumbnail drops here, {c.thumbSlot}
                    </div>
                  )}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-8 flex flex-col items-center gap-3">
          <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
            also part of
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {elsewhere.map((e) => (
              <a
                key={e.label}
                href={e.href}
                className="rounded-full border border-dashed border-line px-4 py-2 font-body text-xs font-bold text-ink-soft transition-colors hover:border-coral hover:text-coral"
              >
                {e.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
