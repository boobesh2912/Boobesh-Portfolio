import Reveal from "@/components/Reveal";

const stickers = [
  "bg-coral/20 border-coral/60 -rotate-2",
  "bg-butter/35 border-butter rotate-1",
  "bg-sage/25 border-sage/70 -rotate-1",
  "bg-lavender/25 border-lavender/70 rotate-2",
];

const toolkit = [
  {
    group: "strategy",
    items: [
      "content strategy",
      "brand positioning",
      "go to market (learning)",
      "product marketing (learning)",
    ],
  },
  {
    group: "writing",
    items: [
      "reels scripts",
      "linkedin posts",
      "newsletters",
      "hooks",
      "repurposing",
    ],
  },
  {
    group: "growth",
    items: [
      "social media management",
      "community",
      "campaign planning",
      "leading small teams",
    ],
  },
  {
    group: "tools",
    items: [
      "WordPress",
      "Canva",
      "Meta Business",
      "Clay",
      "Mailchimp",
      "Google Analytics",
      "Python",
      "FastAPI",
    ],
  },
];

export default function ToolkitSection() {
  return (
    <section id="toolkit" className="bg-halftone border-t border-line px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.25em] text-coral">
            what I work with
          </p>
          <h2 className="mt-6 max-w-xl font-display text-3xl font-semibold leading-[1.15] text-ink sm:text-[2.6rem]">
            No 40-skill wall. Just what I reach for on a normal Tuesday.
          </h2>
        </Reveal>

        <div className="mt-12 space-y-8">
          {toolkit.map((group, i) => (
            <Reveal key={group.group} delay={0.06 * i}>
              <div className="grid gap-4 border-t border-line pt-6 sm:grid-cols-[130px_1fr]">
                <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-soft">
                  {group.group}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className={`cursor-default rounded-lg border-2 px-4 py-1.5 font-body text-sm font-semibold text-ink shadow-[2px_2px_0_var(--ink)] transition-transform duration-200 hover:-translate-y-1 hover:rotate-0 hover:scale-110 ${stickers[(i + item.length) % stickers.length]}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
