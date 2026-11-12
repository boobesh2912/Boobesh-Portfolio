"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

/*
  A pinboard of real frames from the last year, as polaroids that drop onto
  the page one after another and straighten up when you reach for them.
*/
const frames = [
  {
    src: "/uploads/startup-real-og-award-handover.jpg",
    alt: "Boobesh receiving the Young Entrepreneur of the Year award on stage",
    caption: "my first award",
    when: "Feb 2025",
    rot: -5,
    up: 0,
    pos: "object-[35%_50%]",
  },
  {
    src: "/uploads/pace-cultural-fest-dance-1.webp",
    alt: "Boobesh dancing on the PACE stage with stage smoke",
    caption: "dancing. badly.",
    when: "Sep 2025",
    rot: 4,
    up: 28,
    pos: "object-top",
  },
  {
    src: "/uploads/celas-speak-with-ikigai-2026-03-15.jpg",
    alt: "Boobesh speaking into a microphone in front of colourful curtains",
    caption: "CELAS, my own frameworks",
    when: "Mar 2026",
    rot: -3,
    up: 8,
    pos: "object-[50%_30%]",
  },
  {
    src: "/uploads/d3-meetup-yuniq-taramani-2026-01-24.jpg",
    alt: "Boobesh pitching a hackathon at the D3 Community Meetup",
    caption: "pitching a hackathon",
    when: "Jan 2026",
    rot: 5,
    up: 36,
    pos: "object-center",
  },
  {
    src: "/uploads/think-like-a-founder-panimalar-2025-08-05.jpg",
    alt: "Boobesh speaking beside a slide about thinking like a founder",
    caption: "Start The Up, the talk",
    when: "Aug 2025",
    rot: -4,
    up: 4,
    pos: "object-[62%_50%]",
  },
  {
    src: "/uploads/codesapiens-tamilpreneur-m2p-problem.jpg",
    alt: "Boobesh speaking to an audience about building products",
    caption: "build more than a product",
    when: "Apr 2026",
    rot: 3,
    up: 30,
    pos: "object-center",
  },
];

export default function Scrapbook() {
  return (
    <section className="bg-halftone relative px-4 py-24 sm:px-8" aria-label="Photos from the last year">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-hand text-3xl text-coral-deep">a few frames from the last year</p>
          <h2 className="mt-1 max-w-xl font-display text-3xl font-semibold leading-[1.1] text-ink sm:text-5xl">
            the pinboard
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-2">
          {frames.map((f, i) => (
            <motion.figure
              key={f.src}
              initial={{ opacity: 0, y: -60, rotate: f.rot * 3 }}
              whileInView={{ opacity: 1, y: f.up * 0.5, rotate: f.rot }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring", stiffness: 90, damping: 11, delay: i * 0.09 }}
              whileHover={{ rotate: 0, scale: 1.08, y: 0, zIndex: 30 }}
              className="relative bg-[#fffdf7] p-2.5 pb-9 shadow-[0_14px_30px_rgba(23,20,15,0.22)] lg:-mx-1"
              style={{ zIndex: 1 }}
            >
              {/* the tape that holds it up */}
              <span
                aria-hidden
                className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 rotate-[-4deg] bg-butter/70 shadow-sm"
              />
              {/* eslint-disable-next-line @next/next/no-img-element -- static file in /public */}
              <img
                src={f.src}
                alt={f.alt}
                loading="lazy"
                className={`aspect-[4/5] w-full object-cover ${f.pos}`}
              />
              <figcaption className="absolute inset-x-2 bottom-1.5 text-center font-hand text-[17px] leading-tight text-[#3a2f22]">
                {f.caption}
                <span className="block font-body text-[9px] font-semibold uppercase tracking-[0.2em] text-[#9a8a74]">
                  {f.when}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
