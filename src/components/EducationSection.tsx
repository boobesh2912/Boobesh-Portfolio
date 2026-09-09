import ImageSlot from "@/components/ImageSlot";
import Reveal from "@/components/Reveal";
import { schooling, teachers } from "@/content/education";

export default function EducationSection() {
  return (
    <section id="education" className="px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.25em] text-coral">
            05 — where I learned
          </p>
          <h2 className="mt-6 max-w-2xl font-display text-3xl font-semibold leading-[1.15] text-ink sm:text-[2.6rem]">
            School taught me some of it. The internet taught me the rest.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {schooling.map((s, i) => (
            <Reveal key={s.stage} delay={0.08 * i}>
              <div className="h-full rounded-2xl border border-line bg-paper p-7">
                <p className="font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-soft">
                  {s.stage}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-ink">
                  {s.place}
                </h3>
                <p className="font-body text-[13px] text-ink-soft">{s.where}</p>
                <p className="mt-3 inline-block rounded-full border border-coral/30 bg-coral/10 px-3 py-1 font-body text-[12px] font-semibold text-coral-deep">
                  {s.course}
                </p>
                <p className="mt-4 font-body text-[15px] leading-[1.75] text-ink-soft">
                  {s.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16">
            <p className="font-hand text-2xl text-coral-deep">
              but honestly, most of it came from these people
            </p>
            <p className="mt-2 max-w-xl font-body text-[15px] leading-relaxed text-ink-soft">
              None of them have met me. I still count them as teachers,
              because almost everything I know about marketing, building and
              publishing came from watching how they do it.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {teachers.map((t, i) => (
            <Reveal key={t.name} delay={0.06 * i}>
              <div className="group h-full rounded-2xl border border-line bg-paper p-5 transition-colors hover:border-coral/50">
                <ImageSlot
                  src={t.image}
                  alt={t.name}
                  label="photo"
                  className="h-20 w-20"
                  rounded="rounded-full"
                />
                <h4 className="mt-4 font-display text-lg font-semibold text-ink">
                  {t.name}
                </h4>
                <p className="font-body text-[11px] font-semibold uppercase tracking-wider text-coral">
                  {t.known}
                </p>
                <p className="mt-2 font-body text-[14px] leading-[1.7] text-ink-soft">
                  {t.taught}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
