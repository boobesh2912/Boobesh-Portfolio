import Reveal from "@/components/Reveal";
import { getSites } from "@/lib/collections";

/*
  Sites shipped. Managed from the admin desk, so a new build is a form entry
  rather than a deploy. The empty state says what to do instead of pretending
  the shelf is full.
*/
export default function SitesSection() {
  const sites = getSites();

  return (
    <section id="sites" className="bg-diagonal border-y border-line px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.25em] text-coral">
            things that are live
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-[1.15] text-ink sm:text-[2.6rem]">
            Sites I built that people actually use.
          </h2>
          <p className="mt-4 max-w-xl font-body text-[17px] leading-[1.8] text-ink-soft">
            I told a client I knew WordPress before I had opened it once. Ten
            or so builds later, that is not a lie any more.
          </p>
        </Reveal>

        {sites.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-dashed border-line bg-paper/60 p-12 text-center">
            <p className="font-hand text-2xl text-coral-deep">
              this shelf fills from the admin desk
            </p>
            <p className="mx-auto mt-2 max-w-md font-body text-sm leading-relaxed text-ink-soft">
              Add a site at /admin and it appears here with its screenshot,
              stack and link. Nothing to redeploy by hand.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sites.map((s, i) => (
              <Reveal key={s.slug} delay={0.06 * (i % 3)}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-paper shadow-[0_10px_30px_rgba(23,20,15,0.06)] transition-transform hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden bg-cream-deep">
                    {/* a small browser bar so the screenshot reads as a live site */}
                    <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
                      <span className="h-2 w-2 rounded-full bg-coral/60" />
                      <span className="h-2 w-2 rounded-full bg-butter/70" />
                      <span className="h-2 w-2 rounded-full bg-sage/60" />
                      <span className="ml-2 truncate font-body text-[10px] text-ink-soft">
                        {s.url.replace(/^https?:\/\//, "")}
                      </span>
                    </div>
                    {s.image ? (
                      /* eslint-disable-next-line @next/next/no-img-element --
                         runtime path from the admin desk */
                      <img
                        src={s.image}
                        alt={s.alt}
                        className="h-44 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-44 items-center justify-center font-hand text-lg text-ink-soft">
                        no screenshot yet
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-lg font-semibold text-ink">
                        {s.title}
                      </h3>
                      {s.year && (
                        <span className="font-body text-[11px] font-bold text-ink-soft">
                          {s.year}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-ink-soft">
                      {s.blurb}
                    </p>
                    {s.stack.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {s.stack.map((t) => (
                          <span
                            key={t}
                            className="rounded-full bg-cream-deep px-3 py-1 font-body text-[11px] font-bold text-ink-soft"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="mt-5 inline-flex items-center gap-1 font-body text-sm font-bold text-coral-deep">
                      visit
                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
