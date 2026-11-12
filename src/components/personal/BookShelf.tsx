import Link from "next/link";
import { getBooks, type Book } from "@/content/books";

/*
  The shelf. Cloth spines with foil titles and a pale edge of pages on top,
  standing on a wooden board inside a wooden case. Hover lifts a book out of
  line; clicking opens it.
*/

const FOIL = "#f1d98e";

function Spine({ b, lean }: { b: Book; lean?: boolean }) {
  return (
    <Link
      href={`/personal/books/${b.slug}`}
      aria-label={`Open the book: ${b.title}. ${b.minutes} minute read.`}
      className="group/spine relative block origin-bottom outline-none transition-transform duration-300 ease-out hover:-translate-y-3 hover:rotate-[-1.5deg] focus-visible:-translate-y-3"
      style={{
        width: `${b.width}rem`,
        height: `${b.height}rem`,
        transform: lean ? "rotate(5deg)" : undefined,
        marginRight: lean ? "0.9rem" : undefined,
      }}
    >
      {/* the pale edge of the pages along the top */}
      <span className="absolute inset-x-[2px] -top-[3px] h-[4px] rounded-t-[2px] bg-gradient-to-b from-[#fbf3e0] to-[#e3d6b8]" />
      <span
        className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-t-[3px] rounded-b-[1px]"
        style={{
          backgroundColor: b.color,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.05) 0 1px, transparent 1px 3px), linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(255,255,255,0.22) 14%, rgba(255,255,255,0) 34%, rgba(0,0,0,0.12) 66%, rgba(0,0,0,0.55) 100%)",
          boxShadow:
            "inset 0 0 0 1px rgba(0,0,0,0.25), 3px 0 8px rgba(0,0,0,0.35), -2px 0 4px rgba(0,0,0,0.25)",
        }}
      >
        {/* gold bands */}
        <span className="absolute inset-x-0 top-[0.7rem] h-[3px]" style={{ backgroundColor: FOIL, opacity: 0.7 }} />
        <span className="absolute inset-x-0 top-[1.05rem] h-px" style={{ backgroundColor: FOIL, opacity: 0.5 }} />
        <span className="absolute inset-x-0 bottom-[1.05rem] h-px" style={{ backgroundColor: FOIL, opacity: 0.5 }} />
        <span className="absolute inset-x-0 bottom-[0.7rem] h-[3px]" style={{ backgroundColor: FOIL, opacity: 0.7 }} />
        <span
          className="max-h-[78%] truncate font-display text-[13px] font-semibold tracking-wide [writing-mode:vertical-rl] sm:text-sm"
          style={{ color: FOIL, textShadow: "0 1px 0 rgba(0,0,0,0.6), 0 0 6px rgba(255,214,120,0.25)" }}
        >
          {b.spineTitle ?? b.title}
        </span>
      </span>
      <span className="pointer-events-none absolute -top-9 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-black/80 px-2.5 py-1 font-body text-[11px] text-[#f1d98e] opacity-0 transition-opacity group-hover/spine:opacity-100 sm:block">
        {b.minutes} min read
      </span>
    </Link>
  );
}

function Row({ items, leanIndex }: { items: Book[]; leanIndex?: number }) {
  return (
    <div
      className="relative rounded-sm px-4 pt-6"
      style={{
        backgroundColor: "#2a1c11",
        backgroundImage:
          "linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.25)), repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 6px)",
        boxShadow: "inset 0 10px 18px rgba(0,0,0,0.6), inset 0 -2px 0 rgba(0,0,0,0.4)",
      }}
    >
      <ul className="flex items-end justify-center gap-[3px] sm:gap-1.5">
        {items.map((b, i) => (
          <li key={b.slug}>
            <Spine b={b} lean={i === leanIndex} />
          </li>
        ))}
      </ul>
      {/* the board they stand on */}
      <div
        className="-mx-4 mt-0 h-5 rounded-b-sm"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(0,0,0,0.08) 0 2px, transparent 2px 11px), linear-gradient(180deg, #a07d52 0%, #8a6a43 45%, #5c4128 100%)",
          boxShadow: "0 12px 20px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.25)",
        }}
      />
    </div>
  );
}

export default function BookShelf() {
  const books = getBooks();
  const top = books.slice(0, 4);
  const bottom = books.slice(4);

  return (
    <section id="shelf" className="relative mt-24">
      <p className="font-hand text-2xl text-ember">the long versions</p>
      <h2 className="mt-1 font-display text-2xl font-semibold text-moon sm:text-[1.75rem]">
        the bookshelf
      </h2>
      <p className="mt-3 font-body text-[15px] leading-[1.8] text-moon/65">
        This page is the short version of me. Pick a book to read the long
        one, page by page.
      </p>

      <div
        className="mt-10 space-y-8 rounded-md p-3 sm:p-4"
        style={{
          backgroundColor: "#4b3320",
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(0,0,0,0.12) 0 2px, transparent 2px 13px), linear-gradient(180deg, #5a3f28, #3b2616)",
          boxShadow: "0 24px 40px rgba(0,0,0,0.35), inset 0 0 0 2px rgba(255,255,255,0.06)",
        }}
      >
        <Row items={top} leanIndex={3} />
        <Row items={bottom} />
      </div>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {books.map((b) => (
          <li key={b.slug}>
            <Link
              href={`/personal/books/${b.slug}`}
              className="flex h-full gap-4 rounded-xl border border-moon/10 bg-white/[0.03] p-4 transition-colors hover:border-ember/50"
            >
              <span
                className="mt-0.5 h-14 w-2 shrink-0 rounded-sm"
                style={{ backgroundColor: b.color }}
                aria-hidden
              />
              <span>
                <span className="block font-display text-base font-semibold text-moon">{b.title}</span>
                <span className="mt-1 block font-body text-[13px] leading-relaxed text-moon/60">{b.blurb}</span>
                <span className="mt-2 block font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-ember">
                  {b.minutes} min read
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
