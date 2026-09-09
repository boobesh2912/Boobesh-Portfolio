import Reveal from "@/components/Reveal";

const toolkit = [
  {
    group: "strategy",
    accent: "bg-lavender/40",
    items: ["content strategy", "go to market plans (learning)", "product marketing (learning)", "creative ideation"],
  },
  {
    group: "content",
    accent: "bg-pink/40",
    items: ["script writing", "content hooks", "content repurposing", "content distribution", "personal branding"],
  },
  {
    group: "growth",
    accent: "bg-sage/40",
    items: ["social media management", "social growth", "team handling", "leading small teams"],
  },
  {
    group: "toolbox",
    accent: "bg-butter/50",
    items: ["WordPress", "Canva", "Meta business tools", "Clay", "Mailchimp", "Google Analytics"],
  },
];

export default function ToolkitSection() {
  return (
    <section id="toolkit" className="px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-10 text-center">
          <p className="font-hand text-2xl text-coral-deep">what I actually work with</p>
          <h2 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">
            the marketer&apos;s toolkit
          </h2>
          <p className="mx-auto mt-2 max-w-md font-body text-sm text-ink-soft">
            No 47-skill wall. Just what I actually reach for on a normal
            Tuesday.
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2">
          {toolkit.map((group, gi) => (
            <Reveal
              key={group.group}
              delay={0.08 * gi}
              className={gi % 3 === 0 ? "sm:rotate-[-0.4deg]" : "sm:rotate-[0.4deg]"}
            >
            <div
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
