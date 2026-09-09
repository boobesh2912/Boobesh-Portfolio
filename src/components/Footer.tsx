"use client";

import confetti from "canvas-confetti";

const stamps = [
  { label: "linkedin", href: "https://linkedin.com" },
  { label: "twitter/x", href: "https://twitter.com" },
  { label: "instagram", href: "https://instagram.com" },
  { label: "email", href: "mailto:hello@boobesh.com" },
];

export default function Footer() {
  const burst = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 60,
      spread: 70,
      startVelocity: 32,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      colors: ["#ff7a59", "#f4c95d", "#b9a8f0", "#8fa98a", "#f6a6b2"],
    });
  };

  return (
    <footer id="contact" className="mt-24 border-t border-line bg-cream-deep">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <div className="grid gap-12 sm:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="font-hand text-2xl text-coral-deep rotate-[-1deg]">
              new campaign brief?
            </p>
            <h2 className="mt-2 font-display text-4xl font-bold text-ink sm:text-5xl">
              let&apos;s make something
              <br /> people actually read.
            </h2>
            <a
              href="mailto:hello@boobesh.com"
              onClick={burst}
              className="mt-6 inline-block rounded-full bg-ink px-6 py-3 font-body text-sm font-bold text-cream transition-transform hover:-translate-y-0.5"
            >
              hello@boobesh.com
            </a>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <p className="font-body text-xs font-bold uppercase tracking-[0.25em] text-ink-soft">
              find me around the internet
            </p>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              {stamps.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rotate-[-2deg] rounded-lg border-2 border-dashed border-ink-soft/40 px-3 py-1.5 font-body text-xs font-bold uppercase tracking-wide text-ink-soft transition-all hover:rotate-0 hover:border-coral hover:text-coral"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-line/70 pt-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} boobesh.com. still a marketer, still shipping.</p>
          <p className="font-hand text-base text-coral-deep">
            written, edited and overthought by me.
          </p>
        </div>
      </div>
    </footer>
  );
}
