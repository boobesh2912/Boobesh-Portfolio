import Reveal from "@/components/Reveal";
import { award } from "@/content/award";

/*
  A section of its own, because an award is not a talk. Handover photo, the
  certificate itself, and the ceremony video.
*/
export default function AwardSection() {
  return (
    <section id="award" className="border-y border-line bg-cream-deep/40 px-4 py-20 sm:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="font-hand text-2xl text-coral-deep">a shiny thing on a shelf</p>
          <h2 className="mt-1 font-display text-3xl font-semibold leading-[1.1] text-ink sm:text-5xl">
            {award.title}
          </h2>
          <p className="mt-3 font-body text-[12px] font-bold uppercase tracking-[0.18em] text-coral-deep">
            {award.name}
          </p>

          <p className="mt-6 max-w-md font-body text-[16px] leading-[1.8] text-ink-soft">
            {award.citation} The certificate says {award.certificateYear}. I
            collected it on {award.received}.
          </p>

          <dl className="mt-7 max-w-md divide-y divide-line border-y border-line font-body text-sm">
            <div className="grid grid-cols-[6.5rem_1fr] gap-3 py-3">
              <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">Received</dt>
              <dd className="text-ink">{award.received}</dd>
            </div>
            <div className="grid grid-cols-[6.5rem_1fr] gap-3 py-3">
              <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">Where</dt>
              <dd className="text-ink">{award.venue}</dd>
            </div>
            <div className="grid grid-cols-[6.5rem_1fr] gap-3 py-3">
              <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">Empowered by</dt>
              <dd className="text-ink">{award.empoweredBy}</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid gap-4 sm:grid-cols-[1.25fr_1fr]">
            {/* eslint-disable-next-line @next/next/no-img-element -- static file in /public */}
            <img
              src={award.handover.src}
              alt={award.handover.alt}
              loading="lazy"
              className="h-full max-h-[26rem] w-full rounded-3xl border border-line object-cover object-[35%_50%] shadow-[0_10px_30px_rgba(23,20,15,0.08)] sm:row-span-2"
            />
            {/* eslint-disable-next-line @next/next/no-img-element -- static file in /public */}
            <img
              src={award.certificate.src}
              alt={award.certificate.alt}
              loading="lazy"
              className="w-full rounded-3xl border border-line object-cover shadow-[0_10px_30px_rgba(23,20,15,0.08)]"
            />
            <video
              src={award.video.src}
              poster={award.video.poster}
              controls
              playsInline
              preload="none"
              aria-label={award.video.label}
              className="aspect-[4/5] w-full rounded-3xl border border-line bg-black object-cover shadow-[0_10px_30px_rgba(23,20,15,0.08)] sm:col-start-2"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
