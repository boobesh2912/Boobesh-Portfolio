"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ImageSlot from "@/components/ImageSlot";
import Reveal from "@/components/Reveal";
import PathSpine from "@/components/PathSpine";

const featured = [
  {
    name: "Your College Senior",
    role: "Marketing Manager",
    since: "Sep 2025 → now",
    site: "youtube.com/@yourcollegesenior",
    href: "https://www.youtube.com/@yourcollegesenior",
    shot: "/shots/ycs.png",
    blurb:
      "A channel that helps students figure out careers. I own content marketing across LinkedIn, YouTube and the newsletter, mostly by turning long videos into everything else.",
    points: [
      "Lead content strategy across LinkedIn, YouTube and newsletter",
      "Turn podcasts and long videos into social content that travels",
      "Write posts, newsletters and captions for students",
      "Keep publishing consistent by working closely with editors",
    ],
    tint: "from-sage/18 to-lavender/12",
  },
  {
    name: "Gari Tech",
    role: "Founder",
    since: "Feb 2024 → now",
    site: "the one that is mine",
    href: "https://www.linkedin.com/in/boobesh2912",
    shot: "/shots/gari-tech.png",
    blurb:
      "Started as a Canva shop in my first year of college and turned into a content and web studio. It runs on referrals and trials, which is a polite way of saying we earn every client twice.",
    points: [
      "Content marketing, personal branding and social growth for founders",
      "WordPress builds, from the domain up",
      "Positioning work, which is the part most people skip",
      "A small team I have to actually manage now",
    ],
    tint: "from-butter/20 to-coral/12",
  },
  {
    name: "Tribe Fortis",
    role: "Marketing Lead",
    since: "Jun to Sep 2026, ended",
    site: "tribefortis.com",
    href: "https://tribefortis.com",
    more: { href: "/blog/tribe-fortis-marketing-case-study", label: "read the honest case study" },
    shot: "/shots/tribe-fortis.png",
    blurb:
      "A fitness company that turns training into a game, with corporate, adult and kids programs. I led marketing here for four months: the team, the Reels scripts, the LinkedIn content and the calendar. It ended on 30 September, and I wrote up what worked, what did not, and what I would change.",
    points: [
      "Led a five person team of a videographer, editors and designers",
      "Wrote Reels scripts for three audiences: corporate, adults and kids",
      "Moved the content mix toward 80% value and 20% selling",
      "Set up no KPI tracker, which is the main thing I would do differently",
    ],
    tint: "from-coral/18 to-butter/12",
  },
];

export default function FeaturedWorkSection() {
  return (
    <section id="work" className="wash-clay px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.25em] text-coral">
            S1 · E3 · where I do it
          </p>
          <h2 className="mt-6 max-w-2xl font-display text-3xl font-semibold leading-[1.15] text-ink sm:text-[2.6rem]">
            Three stops on the route so far.
          </h2>
          <p className="mt-4 max-w-xl font-body text-[17px] leading-[1.8] text-ink-soft">
            Follow the line. It is not a tidy career path, it is the route I
            actually walked. One of these stops has already ended, and I wrote
            up how that went instead of pretending it did not.
          </p>
        </Reveal>

        {/*
          The stops sit along a drawn route. The spine is decorative and sits
          behind everything, off to the left on small screens and down the
          middle once there is room for two columns.
        */}
        <div className="relative mt-16">
          <PathSpine className="-left-2 w-16 sm:left-2 lg:left-1/2 lg:w-24 lg:-translate-x-1/2" />

          <div className="relative space-y-24">
          {featured.map((f, i) => (
            <Reveal key={f.name}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className={`relative grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${
                  i % 2 === 1 ? "lg:[&>figure]:order-2" : ""
                }`}
              >
                {/* the stop marker sitting on the route */}
                <span className="absolute -left-[1.15rem] top-0 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-coral/40 bg-paper font-body text-[11px] font-bold text-coral-deep shadow-[0_4px_14px_rgba(23,20,15,0.10)] sm:left-[0.6rem] lg:left-1/2 lg:-translate-x-1/2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <figure className="relative">
                  <div
                    className={`absolute -inset-4 rounded-[2rem] bg-gradient-to-br ${f.tint} blur-2xl`}
                  />
                  <div className="relative overflow-hidden rounded-2xl border border-line bg-paper p-2 shadow-[0_20px_60px_rgba(23,20,15,0.10)]">
                    <div className="flex items-center gap-1.5 px-3 py-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-coral/50" />
                      <span className="h-2.5 w-2.5 rounded-full bg-butter/60" />
                      <span className="h-2.5 w-2.5 rounded-full bg-sage/50" />
                      <span className="ml-3 truncate font-body text-[11px] text-ink-soft">
                        {f.site}
                      </span>
                    </div>
                    <ImageSlot
                      src={f.shot}
                      alt={`${f.name} homepage`}
                      label={`screenshot of ${f.site}`}
                      className="h-64 w-full sm:h-72"
                      rounded="rounded-xl"
                    />
                  </div>
                </figure>

                <div>
                  <p className="font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-soft">
                    {f.role} · {f.since}
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
                    {f.name}
                  </h3>
                  <p className="mt-4 font-body text-[16px] leading-[1.8] text-ink-soft">
                    {f.blurb}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {f.points.map((p) => (
                      <li
                        key={p}
                        className="flex gap-3 font-body text-[15px] leading-relaxed text-ink-soft"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-coral" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2">
                    <a
                      href={f.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-body text-sm font-semibold text-coral-deep hover:underline"
                    >
                      visit {f.name} <span aria-hidden>→</span>
                    </a>
                    {"more" in f && f.more && (
                      <Link
                        href={f.more.href}
                        className="inline-flex items-center gap-2 font-body text-sm font-semibold text-ink underline decoration-coral/50 underline-offset-4 hover:text-coral"
                      >
                        {f.more.label} <span aria-hidden>→</span>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
