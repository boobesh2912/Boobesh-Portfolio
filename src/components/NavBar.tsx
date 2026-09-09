"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/#about", label: "the marketer" },
  { href: "/#toolkit", label: "toolkit" },
  { href: "/#speaking", label: "stages" },
  { href: "/#work", label: "campaigns" },
  { href: "/blog", label: "dispatches" },
  { href: "/#contact", label: "say hi" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-line bg-paper/90 px-5 py-3 shadow-[0_2px_0_0_var(--line)] backdrop-blur">
        <Link href="/" className="font-display text-lg font-bold text-ink">
          boobesh<span className="text-coral">.</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-body text-sm font-semibold text-ink-soft transition-colors hover:text-coral"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#contact"
          className="hidden rounded-full bg-ink px-4 py-2 font-body text-sm font-bold text-cream transition-transform hover:-translate-y-0.5 md:inline-block"
        >
          let&apos;s talk
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-full border border-line p-2 md:hidden"
          aria-label="toggle menu"
        >
          <span className="block h-0.5 w-5 bg-ink" />
          <span className="mt-1 block h-0.5 w-5 bg-ink" />
        </button>
      </div>

      {open && (
        <div className="mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-3xl border border-line bg-paper p-4 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2 font-body text-sm font-semibold text-ink-soft hover:bg-cream-deep hover:text-coral"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
