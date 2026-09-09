import EventsCarousel from "@/components/EventsCarousel";
import { getEvents } from "@/lib/collections";
import { speakingMoments } from "@/content/speaking";

/*
  Reads the events the admin desk has published. Until there are any, it falls
  back to the written moments so the section is never an empty rail.
*/
export default function SpeakingSection() {
  const events = getEvents();

  return (
    <section id="speaking" className="wash-plum px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-xl">
          <p className="font-hand text-2xl text-coral-deep">
            a mic makes everything better
          </p>
          <h2 className="mt-1 font-display text-3xl font-semibold text-ink sm:text-4xl">
            stages I have stood on
          </h2>
          <p className="mt-3 font-body text-[15px] leading-relaxed text-ink-soft">
            I talk for a living, then go find more rooms to talk in for free.
            Twenty something of them so far.
          </p>
        </div>

        {events.length > 0 ? (
          <EventsCarousel events={events} />
        ) : (
          <>
            <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {speakingMoments.map((m) => (
                <article
                  key={m.id}
                  className="w-[19rem] shrink-0 snap-center rounded-3xl border border-line bg-paper p-6 shadow-[0_10px_30px_rgba(23,20,15,0.06)]"
                >
                  <span className="text-3xl">🎤</span>
                  <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink">
                    {m.title}
                  </h3>
                  <p className="mt-1 font-body text-[11px] font-bold uppercase tracking-[0.16em] text-coral-deep">
                    {m.venue}
                  </p>
                  <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">
                    {m.story}
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-4 font-hand text-lg text-ink-soft">
              the real photos go in from the admin desk, and this rail becomes
              the live gallery the moment they do.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
