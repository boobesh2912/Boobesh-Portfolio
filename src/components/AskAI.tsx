"use client";

import { useState } from "react";
import confetti from "canvas-confetti";

const QUESTION = "Who is Boobesh AG";

const targets = [
  {
    id: "chatgpt",
    label: "ask chatgpt",
    href: `https://chatgpt.com/?q=${encodeURIComponent(QUESTION)}&hint=chat`,
    bg: "bg-sage/50",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M12 2c1.7 0 3.2.9 4.1 2.3 1.7-.2 3.4.6 4.3 2.2.9 1.5.8 3.4-.2 4.8.9 1.5 1 3.3.1 4.8-.9 1.6-2.6 2.4-4.3 2.2C15.2 19.7 13.7 20.6 12 20.6c-1.7 0-3.2-.9-4.1-2.3-1.7.2-3.4-.6-4.3-2.2-.9-1.5-.8-3.4.2-4.8-.9-1.5-1-3.3-.1-4.8C4.6 4.9 6.3 4.1 8 4.3 8.8 2.9 10.3 2 12 2Zm0 2.1c-.9 0-1.7.5-2.2 1.3l-.3.6-.7-.1a2.9 2.9 0 0 0-2.6 1.5c-.5.8-.5 1.9 0 2.7l.4.6-.4.6a2.9 2.9 0 0 0 0 2.7 2.9 2.9 0 0 0 2.6 1.5l.7-.1.3.6c.5.8 1.3 1.3 2.2 1.3.9 0 1.7-.5 2.2-1.3l.3-.6.7.1c1 .1 2-.5 2.6-1.5.5-.8.5-1.9 0-2.7l-.4-.6.4-.6a2.9 2.9 0 0 0 0-2.7 2.9 2.9 0 0 0-2.6-1.5l-.7.1-.3-.6C13.7 4.6 12.9 4.1 12 4.1Z" />
      </svg>
    ),
  },
  {
    id: "claude",
    label: "ask claude",
    href: `https://claude.ai/new?q=${encodeURIComponent(QUESTION)}`,
    bg: "bg-coral/40",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M12 2 5 20h3.2l1.4-3.8h4.8L15.8 20H19L12 2Zm0 6.4 1.7 4.5h-3.4L12 8.4Z" />
      </svg>
    ),
  },
];

export default function AskAI() {
  const [hovered, setHovered] = useState<string | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 40,
      spread: 55,
      startVelocity: 28,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      colors: ["#4f8dff", "#f5c24c", "#8b7cf6", "#2dd4bf"],
    });
  };

  return (
    <div className="mx-auto mt-6 flex w-fit flex-col items-center gap-2">
      <p className="font-hand text-lg text-ink-soft rotate-[-1deg]">
        not sure who I am yet? ask the robots
      </p>
      <div className="flex gap-3">
        {targets.map((t) => (
          <a
            key={t.id}
            href={t.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            onMouseEnter={() => setHovered(t.id)}
            onMouseLeave={() => setHovered(null)}
            className={`relative flex items-center gap-2 rounded-full ${t.bg} border border-ink/10 px-4 py-2 font-body text-xs font-bold uppercase tracking-wide text-ink transition-transform hover:-translate-y-1 hover:rotate-2`}
          >
            {t.icon}
            {t.label}
            <span
              className={`pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-3 py-1 font-body text-[10px] font-bold text-cream transition-opacity ${
                hovered === t.id ? "opacity-100" : "opacity-0"
              }`}
            >
              &quot;who is Boobesh AG&quot; →
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
