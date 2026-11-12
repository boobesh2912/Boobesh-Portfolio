import GariTechLogo from "@/components/GariTechLogo";
import ImageSlot from "@/components/ImageSlot";
import Reveal from "@/components/Reveal";

const ventures = [
  {
    name: "Gari Tech",
    status: "mine, since Feb 2024",
    body: "Started as a Canva shop in first year. Now websites, branding and content for people who need to look like they mean it.",
    shot: null,
    logo: true,
    href: "/gari-tech",
  },
  {
    name: "Proof",
    status: "I run the marketing",
    body: "A place where engineers keep a public log instead of a résumé. My job is getting it in front of the right people on LinkedIn and X, which is harder than it sounds when the product's whole pitch is that résumés are dead.",
    shot: "/shots/proof.png",
    logo: false,
    href: "https://proof.zeromaintenanceengineer.in/",
  },
  {
    name: "StoryIt",
    status: "content side",
    body: "I work on the content here, with a team that cares about the story being right before anything gets posted.",
    shot: null,
    logo: false,
    href: "https://storyit.in",
  },
  {
    name: "Vizhva",
    status: "paused on purpose, Jun 2025 → Jan 2026",
    body: "A learning initiative about how Gen Z actually studies. Good idea, wrong time. I stopped it to build better systems first.",
    shot: null,
    logo: false,
    href: null,
  },
  {
    name: "Start The Up",
    status: "ran in 2025",
    body: "A student community for startup thinking. Four webinars, real turnout, then the momentum ran out. Still counts.",
    shot: null,
    logo: false,
    href: null,
  },
  {
    name: "The next one",
    status: "probably starts at 2am",
    body: "There's always one. I have 50+ projects on my drive and this is the part where I admit that.",
    shot: null,
    logo: false,
    href: null,
  },
];

export default function VenturesSection() {
  return (
    <section className="theme-ink bg-diagonal px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-hand text-3xl text-butter">the rest of the cast</p>
          <h2 className="mt-1 max-w-xl font-display text-3xl font-semibold leading-[1.15] text-ink sm:text-[2.6rem]">
            Things I started. Some are still breathing.
          </h2>
        </Reveal>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ventures.map((v, i) => (
            <Reveal key={v.name} delay={0.06 * i}>
              <div className="group relative flex h-full flex-col rounded-2xl border border-dashed border-ink-soft/50 bg-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:border-butter hover:shadow-[0_0_0_1px_var(--butter),0_18px_40px_rgba(242,194,90,0.12)] before:absolute before:-left-2 before:top-1/2 before:h-4 before:w-4 before:-translate-y-1/2 before:rounded-full before:bg-cream after:absolute after:-right-2 after:top-1/2 after:h-4 after:w-4 after:-translate-y-1/2 after:rounded-full after:bg-cream">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-ink">
                      {v.name}
                    </h3>
                    <p className="mt-0.5 font-body text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
                      {v.status}
                    </p>
                  </div>
                  {v.logo && <GariTechLogo />}
                </div>

                <p className="mt-3 flex-1 font-body text-[15px] leading-[1.7] text-ink-soft">
                  {v.body}
                </p>

                {v.shot && (
                  <ImageSlot
                    src={v.shot}
                    alt={`${v.name} homepage`}
                    label={`screenshot of ${v.name}`}
                    className="mt-4 h-36 w-full"
                    rounded="rounded-xl"
                  />
                )}

                {v.href && (
                  <a
                    href={v.href}
                    {...(v.href.startsWith("/")
                      ? {}
                      : { target: "_blank", rel: "noopener noreferrer" })}
                    className="mt-4 font-body text-sm font-semibold text-coral-deep hover:underline"
                  >
                    open {v.name} →
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
