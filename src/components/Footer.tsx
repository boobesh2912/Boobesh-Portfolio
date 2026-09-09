"use client";

import Link from "next/link";
import confetti from "canvas-confetti";

const stamps = [
  { label: "linkedin", href: "https://www.linkedin.com/in/boobesh2912" },
  { label: "x", href: "https://www.x.com/buildwithboo" },
  { label: "instagram", href: "https://www.instagram.com/boobeshganesan" },
  { label: "youtube", href: "https://www.youtube.com/@dreamsofboo" },
];

export default function Footer() {
  const burst = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 55,
      spread: 65,
      startVelocity: 30,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      colors: ["#c0563a", "#d9a441", "#5e6b47", "#7c5a6b", "#c98b7a"],
    });
  };

  return (
    <footer id="contact" className="border-t border-line bg-cream">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
        <div className="grid gap-14 sm:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="font-hand text-2xl text-coral-deep">
              got something to build?
            </p>
            <h2 className="mt-2 max-w-md font-display text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl">
              Let&apos;s make something people actually read.
            </h2>
            <a
              href="mailto:dreamsofboo@gmail.com"
              onClick={burst}
              className="mt-8 inline-block rounded-full bg-ink px-7 py-3.5 font-body text-sm font-semibold text-cream transition-transform hover:-translate-y-0.5"
            >
              dreamsofboo@gmail.com
            </a>
          </div>

          <div className="flex flex-col gap-4 sm:items-end">
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.25em] text-ink-soft">
              elsewhere
            </p>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              {stamps.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-line px-4 py-2 font-body text-[11px] font-semibold uppercase tracking-wider text-ink-soft transition-colors hover:border-coral hover:text-coral-deep"
                >
                  {s.label}
                </a>
              ))}
            </div>
            <Link
              href="/personal"
              className="font-hand text-xl text-coral-deep hover:underline"
            >
              or read the honest version →
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-line pt-7 font-body text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} boobesh.com. still a marketer,
            still shipping.
          </p>
          <p className="font-hand text-base text-coral-deep">
            written, edited and overthought by me.
          </p>
        </div>
      </div>
    </footer>
  );
}
