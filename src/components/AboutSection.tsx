import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";

const stats = [
  { value: "5+", label: "years hustling since 10th grade", rotate: "-rotate-3", bg: "bg-butter/60" },
  { value: "10+", label: "websites built before I pivoted to content", rotate: "rotate-2", bg: "bg-pink/50" },
  { value: "₹1L+", label: "earned solo, one WordPress project at a time", rotate: "-rotate-1", bg: "bg-sage/40" },
];

export default function AboutSection() {
  return (
    <section id="about" className="px-4 py-20 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <Reveal>
          <div className="relative rounded-[2rem] border border-line bg-paper p-8 shadow-[0_6px_0_0_var(--line)] sm:p-10">
            <p className="font-hand text-2xl text-coral-deep rotate-[-1deg]">
              field notes, entry one
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
              the short version: I&apos;m a marketer, top to bottom.
            </h2>

            <div className="mt-6 space-y-4 font-body text-base leading-relaxed text-ink-soft">
              <p>
                Not a designer who dabbles in marketing. Not a writer who
                fell into growth. A marketer. It is the lens I use for
                everything, from a single headline to a full quarter&apos;s
                content calendar.
              </p>
              <p className="border-l-2 border-coral pl-4 font-semibold text-ink">
                Most brands do not need more ideas. They need someone who
                stays consistent long enough for one idea to actually work.
                That is most of the job, honestly.
              </p>
              <p>
                I got here by testing a lot of it in public and watching
                what people actually stopped scrolling for. Some campaigns
                worked because of a clever hook. Most worked because nobody
                quit on the strategy after week two.
              </p>
              <p>
                These days it is positioning, writing content that sounds
                like a person and reporting back on what moved the needle.
                This site is the running log, mess included.
              </p>
            </div>

            <p className="mt-8 inline-block rounded-full bg-ink px-5 py-2 font-display text-sm font-bold text-cream">
              currently: marketer, always. job title changes, this doesn&apos;t.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={0.1 * (i + 1)}>
              <TiltCard>
                <div
                  className={`${s.bg} ${s.rotate} rounded-3xl border border-ink/10 p-6 shadow-[0_4px_0_0_rgba(0,0,0,0.06)]`}
                >
                  <p className="font-display text-4xl font-bold text-ink">{s.value}</p>
                  <p className="mt-1 font-body text-sm font-semibold text-ink-soft">
                    {s.label}
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
