import GariTechLogo from "@/components/GariTechLogo";
import ImageSlot from "@/components/ImageSlot";
import Reveal from "@/components/Reveal";

const ventures = [
  {
    name: "Gari Tech",
    status: "running since Feb 2024",
    body: "My agency. Websites, branding and content for startups who need a digital presence that does not look thrown together.",
    shot: null,
    logo: true,
    href: null,
  },
  {
    name: "Proof",
    status: "part of the team",
    body: "A platform I help push on LinkedIn and X. Screenshot drops in the moment you add the file.",
    shot: "/shots/proof.png",
    logo: false,
    href: "https://proof.zeromaintenanceengineer.in/",
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
];

export default function VenturesSection() {
  return (
    <section className="px-4 pb-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-hand text-2xl text-coral-deep">
            and the ones I started myself
          </p>
        </Reveal>

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          {ventures.map((v, i) => (
            <Reveal key={v.name} delay={0.06 * i}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-paper p-6 transition-colors hover:border-coral/40">
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
                    target="_blank"
                    rel="noopener noreferrer"
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
