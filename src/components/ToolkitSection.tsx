const toolkit = [
  {
    group: "strategy",
    accent: "bg-lavender/40",
    items: ["brand positioning", "go to market plans", "audience research", "content strategy"],
  },
  {
    group: "content",
    accent: "bg-pink/40",
    items: ["copywriting", "storytelling", "social content", "email that gets opened", "video scripts"],
  },
  {
    group: "growth",
    accent: "bg-sage/40",
    items: ["SEO", "funnel thinking", "campaign reporting", "A/B testing", "community building"],
  },
  {
    group: "toolbox",
    accent: "bg-butter/50",
    items: ["Figma", "Notion", "HubSpot", "GA4", "Canva", "a very organized spreadsheet"],
  },
];

export default function ToolkitSection() {
  return (
    <section id="toolkit" className="px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="font-hand text-2xl text-coral-deep">what I actually work with</p>
          <h2 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">
            the marketer&apos;s toolkit
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {toolkit.map((group) => (
            <div
              key={group.group}
              className="rounded-3xl border border-line bg-paper p-6 shadow-[0_4px_0_0_var(--line)]"
            >
              <p className="mb-4 font-body text-xs font-bold uppercase tracking-[0.25em] text-ink-soft">
                {group.group}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item, i) => (
                  <span
                    key={item}
                    className={`${group.accent} ${
                      i % 2 === 0 ? "rotate-[-2deg]" : "rotate-[2deg]"
                    } rounded-full border border-ink/10 px-4 py-2 font-body text-sm font-semibold text-ink transition-transform hover:rotate-0 hover:scale-105`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
