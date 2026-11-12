import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Marked from "@/components/Marked";
import ThemeToggle from "@/components/ThemeToggle";
import { books, getBook } from "@/content/books";

export function generateStaticParams() {
  return books.filter((b) => b.ready).map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) return {};
  const url = `https://boobesh.com/personal/books/${slug}`;
  return {
    title: `${book.title} | Boobesh AG`,
    description: book.blurb,
    alternates: { canonical: url },
    openGraph: { title: book.title, description: book.blurb, url, type: "article" },
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();

  return (
    <div className="min-h-screen bg-night text-moon">
      <div className="fixed right-5 top-5 z-30">
        <ThemeToggle />
      </div>

      <article className="mx-auto max-w-2xl px-6 pb-24 pt-16 sm:px-8">
        <Link
          href="/personal#shelf"
          className="font-hand text-xl text-ember hover:underline"
        >
          ← back to the shelf
        </Link>

        {/* the cover */}
        <header
          className="mt-8 rounded-r-2xl border border-moon/10 bg-white/[0.03] p-8"
          style={{ borderLeft: `14px solid ${book.color}` }}
        >
          <p className="font-body text-[10px] font-semibold uppercase tracking-[0.28em] text-ember">
            a book by Boobesh AG · {book.minutes} min read
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold leading-[1.1] text-moon sm:text-5xl">
            {book.title}
          </h1>
          <p className="mt-4 font-body text-[16px] leading-[1.8] text-moon/65">{book.blurb}</p>
        </header>

        <div className="mt-12 space-y-5">
          {book.blocks.map((b, i) => {
            if (b.type === "h") {
              return (
                <h2 key={i} className="pt-6 font-display text-2xl font-semibold text-moon">
                  {b.text}
                </h2>
              );
            }
            if (b.type === "p") {
              return (
                <p key={i} className="font-body text-[17px] leading-[1.85] text-moon/75">
                  <Marked text={b.text} markClass="mark-clay" />
                </p>
              );
            }
            if (b.type === "photos") {
              return (
                <div key={i} className="grid grid-cols-2 gap-3 py-2">
                  {b.items.map((ph, n) => (
                    // eslint-disable-next-line @next/next/no-img-element -- static file in /public
                    <img
                      key={ph.src}
                      src={ph.src}
                      alt={ph.alt}
                      loading="lazy"
                      className={`w-full rounded-xl border border-moon/10 object-cover ${
                        n >= 2 ? "col-span-2 aspect-[21/9]" : "aspect-[3/4]"
                      }`}
                    />
                  ))}
                </div>
              );
            }
            return (
              <div key={i} className="flex flex-wrap justify-center gap-6 py-2">
                {b.items.map((v) => (
                  <figure key={v.src} className="w-full max-w-[16rem]">
                    <video
                      src={v.src}
                      poster={v.poster}
                      controls
                      playsInline
                      preload="none"
                      aria-label={v.alt}
                      className="aspect-[9/16] w-full rounded-xl border border-moon/10 bg-black object-cover"
                    />
                    <figcaption className="mt-2 text-center font-hand text-lg text-moon/60">
                      {v.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            );
          })}
        </div>

        <div className="mt-16 border-t border-moon/10 pt-8 text-center">
          <Link href="/personal#shelf" className="font-hand text-2xl text-ember hover:underline">
            put it back on the shelf
          </Link>
        </div>
      </article>
    </div>
  );
}
