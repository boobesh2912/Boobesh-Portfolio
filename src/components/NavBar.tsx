"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/#about", label: "who I am" },
  { href: "/#work", label: "work" },
  { href: "/#experience", label: "experience" },
  { href: "/blog", label: "writing" },
  { href: "/personal", label: "the real me" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-8">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-6 py-3 transition-all duration-300 ${
          scrolled
            ? "border border-line bg-paper/85 shadow-[0_8px_30px_rgba(23,20,15,0.07)] backdrop-blur-md"
            : "border border-transparent"
        }`}
      >
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-ink"
        >
          boobesh<span className="text-coral">.</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-body text-[13px] font-medium text-ink-soft transition-colors hover:text-coral-deep"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <a
            href="mailto:dreamsofboo@gmail.com"
            className="rounded-full bg-ink px-5 py-2.5 font-body text-[13px] font-semibold text-cream transition-transform hover:-translate-y-0.5"
          >
            say hi
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
        <button
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-full border border-line"
          aria-label="toggle menu"
          aria-expanded={open}
        >
          <span
            className={`h-px w-4 bg-ink transition-transform ${
              open ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-4 bg-ink transition-transform ${
              open ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </button>
        </div>
      </div>

      {open && (
        <div className="mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-3xl border border-line bg-paper p-4 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-2.5 font-body text-sm font-medium text-ink-soft hover:bg-cream-deep hover:text-coral-deep"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="mailto:dreamsofboo@gmail.com"
            className="mt-1 rounded-xl bg-ink px-4 py-2.5 text-center font-body text-sm font-semibold text-cream"
          >
            say hi
          </a>
        </div>
      )}
    </header>
  );
}
