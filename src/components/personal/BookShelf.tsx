import Link from "next/link";
import { books } from "@/content/books";

/*
  The shelf. Spines stand on a wooden board; the ones that are written lift
  on hover and open a page of their own. The rest are marked as coming soon.
*/
export default function BookShelf() {
  return (
    <section id="shelf" className="relative mt-24">
      <p className="font-hand text-2xl text-ember">the long versions</p>
      <h2 className="mt-1 font-display text-2xl font-semibold text-moon sm:text-[1.75rem]">
        the bookshelf
      </h2>
      <p className="mt-3 font-body text-[15px] leading-[1.8] text-moon/65">
        This page is the short version of me. If you want more about
        something, pick a book.
      </p>

      <div className="mt-10">
        <ul className="flex items-end gap-2 px-2 sm:gap-3 sm:px-4">
          {books.map((b) => {
            const spine = (
              <span
                className="relative flex w-11 items-center justify-center overflow-hidden rounded-t-[5px] shadow-[inset_-3px_0_0_rgba(0,0,0,0.25),inset_3px_0_0_rgba(255,255,255,0.12)] sm:w-14"
                style={{ height: `${b.height}rem`, backgroundColor: b.color }}
              >
                <span className="absolute inset-x-0 top-3 h-px bg-white/30" />
                <span className="absolute inset-x-0 top-[0.9rem] h-px bg-white/20" />
                <span className="absolute inset-x-0 bottom-3 h-px bg-white/30" />
                <span className="[writing-mode:vertical-rl] max-h-[84%] truncate font-display text-[13px] font-semibold tracking-wide text-[#fbf3e2] sm:text-sm">
                  {b.spineTitle ?? b.title}
                </span>
              </span>
            );
            return (
              <li key={b.slug} className="group/book">
                {b.ready ? (
                  <Link
                    href={`/personal/books/${b.slug}`}
                    aria-label={`Open the book: ${b.title}. ${b.minutes} minute read.`}
                    className="block -translate-y-0 transition-transform duration-300 hover:-translate-y-3 focus-visible:-translate-y-3 focus-visible:outline-none"
                  >
                    {spine}
                  </Link>
                ) : (
                  <span
                    aria-label={`${b.title}, coming soon`}
                    title="coming soon"
                    className="block opacity-45 saturate-50"
                  >
                    {spine}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
        {/* the board it all stands on */}
        <div className="h-4 rounded-sm bg-gradient-to-b from-[#8a6a43] to-[#5c4128] shadow-[0_14px_24px_rgba(0,0,0,0.35)]" />
      </div>

      <ul className="mt-8 space-y-3">
        {books
          .filter((b) => b.ready)
          .map((b) => (
            <li key={b.slug}>
              <Link
                href={`/personal/books/${b.slug}`}
                className="block rounded-xl border border-moon/10 bg-white/[0.03] p-5 transition-colors hover:border-ember/50"
              >
                <p className="font-display text-lg font-semibold text-moon">{b.title}</p>
                <p className="mt-1 font-body text-[14px] leading-relaxed text-moon/60">{b.blurb}</p>
                <p className="mt-2 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-ember">
                  {b.minutes} min read
                </p>
              </Link>
            </li>
          ))}
      </ul>
      <p className="mt-4 font-hand text-lg text-moon/45">
        the greyed out ones are still being written
      </p>
    </section>
  );
}
