"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import BookReader from "@/components/personal/BookReader";
import type { Page } from "@/lib/paginate";

/*
  A "read more" inside the story. Click it and the long version opens in a
  popup, as a book you turn page by page. The link is a real link to the
  story's own page, so it still works without scripts and can be found.
*/
export default function DiveCard({
  slug,
  title,
  color,
  pages,
  label,
  sub,
}: {
  slug: string;
  title: string;
  color: string;
  pages: Page[];
  label: string;
  sub: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", key);
    };
  }, [open]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="mt-8"
      >
        <Link
          href={`/personal/books/${slug}`}
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
          className="group flex items-center gap-4 rounded-2xl border border-moon/15 bg-white/[0.04] p-4 transition-colors hover:border-ember/60"
        >
          <span
            className="flex h-16 w-12 shrink-0 items-center justify-center rounded-[3px] shadow-[3px_3px_0_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:-rotate-6"
            style={{ backgroundColor: color }}
            aria-hidden
          >
            <span className="h-10 w-px bg-[#f1d98e]/60" />
          </span>
          <span className="min-w-0">
            <span className="block font-display text-lg font-semibold leading-snug text-moon">
              {label}
            </span>
            <span className="mt-0.5 block font-hand text-lg text-ember">{sub}</span>
          </span>
          <span className="ml-auto text-xl text-ember transition-transform group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </Link>
      </motion.div>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="fixed inset-0 z-[400] overflow-y-auto"
            style={{
              backgroundColor: "#15100b",
              backgroundImage:
                "radial-gradient(ellipse 60% 45% at 50% 18%, rgba(255,196,110,0.2), transparent 70%), linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.5))",
            }}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="close"
              className="fixed right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#f1d98e]/30 bg-black/40 text-lg text-[#f1d98e] backdrop-blur transition-colors hover:bg-[#f1d98e]/15"
            >
              ✕
            </button>
            <div className="mx-auto max-w-5xl px-3 pb-16 pt-14 sm:px-6">
              <BookReader
                slug={slug}
                title={title}
                blurb=""
                color={color}
                minutes={0}
                pages={pages}
                onClose={() => setOpen(false)}
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
