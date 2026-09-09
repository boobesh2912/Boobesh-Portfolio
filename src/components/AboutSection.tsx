import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";

const stats = [
  {
    value: "3 teams",
    label: "marketing at Tribe Fortis, content at YCS, my own at Gari Tech",
    tone: "bg-coral/12 border-coral/30",
  },
  {
    value: "50+",
    label: "projects on my drive, and yes, about half are unfinished",
    tone: "bg-sage/15 border-sage/35",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="wash-butter px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.25em] text-coral">
            01 — who I am
          </p>
        </Reveal>

        <div className="mt-8 grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Reveal>
            <h2 className="max-w-lg font-display text-3xl font-semibold leading-[1.15] text-ink sm:text-[2.6rem]">
              I am a marketer. That is the whole thing, not a phase.
            </h2>

            <div className="mt-7 space-y-5 font-body text-[17px] leading-[1.8] text-ink-soft">
              <p>
                Not a designer who drifted into marketing. Not a writer who
                fell into growth. A marketer. It is the lens I put on
                everything, from one line of a Reel script to a full quarter
                of content.
              </p>
              <p className="border-l-2 border-coral pl-5 font-medium text-ink">
                Most brands do not need more ideas. They need someone who
                stays consistent long enough for one idea to work. That is
                most of the job.
              </p>
              <p>
                I learned that the slow way. Reselling on Sharechat at 15.
                Building websites for clients before I knew WordPress.
                Starting a community, watching it die, starting another one.
                The wins came from showing up after week two, when it stopped
                being exciting.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4">
            <Reveal>
              <TiltCard>
                <div className="rounded-2xl border border-butter/40 bg-butter/25 p-6">
                  <p className="font-display text-4xl font-semibold tabular-nums text-ink sm:text-5xl">
                    <CountUp to={100000} prefix="₹" />
                  </p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">
                    my first one lakh, made before I turned 21
                  </p>
                </div>
              </TiltCard>
            </Reveal>

            {stats.map((s, i) => (
              <Reveal key={s.value} delay={0.1 * (i + 1)}>
                <TiltCard>
                  <div
                    className={`rounded-2xl border ${s.tone} p-6 backdrop-blur-sm`}
                  >
                    <p className="font-display text-3xl font-semibold text-ink">
                      {s.value}
                    </p>
                    <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">
                      {s.label}
                    </p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
