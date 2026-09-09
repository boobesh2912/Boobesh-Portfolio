import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";

/*
  Two years of building, counted. Deliberately not padded with vanity numbers
  like impressions, which nobody can verify and everybody inflates.
*/
const metrics = [
  { to: 20, suffix: "+", label: "clients served", note: "mostly by referral" },
  { to: 10, suffix: "+", label: "websites shipped", note: "WordPress, mostly" },
  { to: 20, suffix: "+", label: "speaking events", note: "give me a mic" },
  { to: 100, suffix: "+", label: "students taught", note: "some still text me" },
  { to: 3, suffix: "", label: "ventures and communities founded", note: "one is still alive" },
  { to: 2, suffix: "", label: "published eBooks", note: "yes, actually published" },
];

export default function MetricsSection() {
  return (
    <section id="numbers" className="bg-grid border-y border-line px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.25em] text-coral">
            impact, in numbers
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-[1.15] text-ink sm:text-[2.6rem]">
            What two years of building actually looks like.
          </h2>
          <p className="mt-4 max-w-xl font-body text-[17px] leading-[1.8] text-ink-soft">
            No impressions, no reach, no numbers I cannot back up in a call.
            Just the things that happened.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={0.06 * i}>
              <div className="group h-full bg-paper p-8 transition-colors hover:bg-cream-deep">
                <p className="font-display text-5xl font-semibold tabular-nums text-ink sm:text-6xl">
                  <CountUp to={m.to} suffix={m.suffix} />
                </p>
                <p className="mt-3 font-body text-sm font-semibold text-ink">
                  {m.label}
                </p>
                <p className="mt-1 font-hand text-lg text-coral-deep opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {m.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
