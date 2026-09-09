"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { roles, type Role } from "@/content/experience";

const dot: Record<Role["kind"], string> = {
  marketing: "bg-coral",
  founder: "bg-butter",
  engineering: "bg-sage",
};

const chip: Record<Role["kind"], string> = {
  marketing: "text-coral-deep border-coral/35 bg-coral/10",
  founder: "text-ink border-butter/50 bg-butter/20",
  engineering: "text-sage-deep border-sage/35 bg-sage/10",
};

export default function ExperienceSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="experience"
      className="border-y border-line bg-cream-deep/40 px-4 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.25em] text-coral">
            04 — what I did
          </p>
          <h2 className="mt-6 font-display text-3xl font-semibold leading-[1.15] text-ink sm:text-[2.6rem]">
            Ten rooms I learned in.
          </h2>
          <p className="mt-4 max-w-lg font-body text-[15px] leading-relaxed text-ink-soft">
            Marketing, founding, engineering. Tap any of them to see what the
            work actually was.
          </p>
        </Reveal>

        <div className="mt-12">
          {roles.map((role, i) => {
            const isOpen = open === i;
            const hasDetail = role.bullets.length > 0;

            return (
              <Reveal key={`${role.org}-${role.title}`} delay={0.03 * i}>
                <div className="border-t border-line last:border-b">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-start gap-4 py-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${dot[role.kind]}`}
                    />

                    <span className="flex-1">
                      <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="font-display text-xl font-semibold text-ink transition-colors group-hover:text-coral-deep sm:text-2xl">
                          {role.title}
                        </span>
                        <span className="font-body text-sm font-semibold text-ink-soft">
                          {role.org}
                        </span>
                      </span>
                      <span className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-[12px] text-ink-soft/80">
                        <span>{role.period}</span>
                        <span aria-hidden>·</span>
                        <span>{role.length}</span>
                        <span aria-hidden>·</span>
                        <span>{role.location}</span>
                      </span>
                    </span>

                    <span
                      className={`shrink-0 rounded-full border px-2.5 py-1 font-body text-[10px] font-semibold uppercase tracking-wider ${chip[role.kind]}`}
                    >
                      {role.type}
                    </span>

                    {hasDetail && (
                      <span
                        className={`mt-1 shrink-0 font-body text-ink-soft transition-transform ${
                          isOpen ? "rotate-45" : ""
                        }`}
                        aria-hidden
                      >
                        +
                      </span>
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && hasDetail && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-7 pl-[26px]">
                          <ul className="space-y-2.5">
                            {role.bullets.map((b) => (
                              <li
                                key={b}
                                className="flex gap-3 font-body text-[15px] leading-[1.7] text-ink-soft"
                              >
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-coral/60" />
                                {b}
                              </li>
                            ))}
                          </ul>

                          {role.skills && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {role.skills.map((s) => (
                                <span
                                  key={s}
                                  className="rounded-full border border-line bg-paper px-3 py-1 font-body text-[11px] font-semibold text-ink-soft"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
