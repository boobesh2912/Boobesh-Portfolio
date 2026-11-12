import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Marked from "@/components/Marked";
import BookReader from "@/components/personal/BookReader";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { getBook, getBooks } from "@/content/books";
import { paginate } from "@/lib/paginate";
import { SITE } from "@/content/entity";

export function generateStaticParams() {
  return getBooks().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) return {};
  const url = `${SITE}/personal/books/${slug}`;
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
  const books = getBooks();
  const i = books.findIndex((b) => b.slug === slug);
  if (i < 0) notFound();
  const book = books[i];
  const nextBook = books[(i + 1) % books.length];
  const pages = paginate(book.blocks);

  return (
    <div
      className="min-h-screen text-[#f1d98e]"
      style={{
        backgroundColor: "#15100b",
        backgroundImage:
          "radial-gradient(ellipse 60% 45% at 50% 18%, rgba(255,196,110,0.2), transparent 70%), linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.5)), repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0 2px, transparent 2px 9px)",
      }}
    >
      <JsonLd
        data={breadcrumbSchema([
          { name: "Boobesh AG", url: SITE },
          { name: "The real me", url: `${SITE}/personal` },
          { name: book.title, url: `${SITE}/personal/books/${slug}` },
        ])}
      />
      <main className="mx-auto max-w-5xl px-3 pb-24 pt-8 sm:px-6">
        <Link
          href="/personal#shelf"
          className="ml-2 inline-block font-hand text-xl text-[#f1d98e]/70 hover:text-[#f1d98e]"
        >
          ← back to the shelf
        </Link>

        <div className="mt-8">
          <BookReader
            slug={slug}
            title={book.title}
            blurb={book.blurb}
            color={book.color}
            minutes={book.minutes}
            pages={pages}
            next={{ slug: nextBook.slug, title: nextBook.title }}
          />
        </div>

        {/* the same book as plain text: for screen readers, search engines and anyone who prefers it */}
        <details className="mx-auto mt-16 max-w-2xl rounded-xl border border-[#f1d98e]/15 bg-black/20 p-6">
          <summary className="cursor-pointer font-body text-sm font-semibold text-[#f1d98e]/80">
            read this book as plain text
          </summary>
          <article className="mt-6 space-y-4 font-body text-[16px] leading-[1.8] text-[#f1d98e]/80">
            <h2 className="font-display text-2xl font-semibold text-[#f1d98e]">{book.title}</h2>
            <p className="text-[#f1d98e]/60">{book.blurb}</p>
            {book.blocks.map((b, n) => {
              if (b.type === "h")
                return (
                  <h3 key={n} className="pt-4 font-display text-xl font-semibold text-[#f1d98e]">
                    {b.text}
                  </h3>
                );
              if (b.type === "p")
                return (
                  <p key={n}>
                    <Marked text={b.text} markClass="mark-paper" />
                  </p>
                );
              if (b.type === "quote")
                return (
                  <blockquote key={n} className="border-l-2 border-[#f1d98e]/40 pl-4 italic">
                    {b.text}
                  </blockquote>
                );
              if (b.type === "link")
                return (
                  <p key={n}>
                    <Link href={b.href} className="underline">
                      {b.text}
                    </Link>
                  </p>
                );
              if (b.type === "photos")
                return (
                  <div key={n} className="grid grid-cols-2 gap-2">
                    {b.items.map((ph) => (
                      // eslint-disable-next-line @next/next/no-img-element -- static file in /public
                      <img key={ph.src} src={ph.src} alt={ph.alt} loading="lazy" className="w-full rounded-lg" />
                    ))}
                  </div>
                );
              return (
                <div key={n} className="flex flex-wrap gap-4">
                  {b.items.map((v) => (
                    <video
                      key={v.src}
                      src={v.src}
                      poster={v.poster}
                      controls
                      playsInline
                      preload="none"
                      aria-label={v.alt}
                      className="w-40 rounded-lg"
                    />
                  ))}
                </div>
              );
            })}
          </article>
        </details>
      </main>
    </div>
  );
}
