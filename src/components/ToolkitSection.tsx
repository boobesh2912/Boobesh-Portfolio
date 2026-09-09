import Reveal from "@/components/Reveal";

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
    <section id="toolkit" className="bg-grid border-t border-line px-4 py-24 sm:px-8">
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
                      className="rounded-full border border-line bg-paper px-4 py-1.5 font-body text-sm text-ink transition-colors hover:border-coral hover:text-coral-deep"
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
