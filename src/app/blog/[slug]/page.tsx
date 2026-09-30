import { format } from "date-fns";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { getAllPosts, getAllSlugs, getPostBySlug } from "@/lib/blog";
import { LINKEDIN } from "@/content/entity";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://boobesh.com/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      url: `https://boobesh.com/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  // Related reading: posts sharing a tag first, then the most recent, so no
  // post is ever a dead end and every one links to three others.
  const related = getAllPosts()
    .filter((p) => p.slug !== slug)
    .map((p) => ({ p, shared: p.tags.filter((t) => post.tags.includes(t)).length }))
    .sort((a, b) => b.shared - a.shared || (a.p.date < b.p.date ? 1 : -1))
    .slice(0, 3)
    .map((x) => x.p);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@id": "https://boobesh.com/#person" },
    publisher: { "@id": "https://boobesh.com/#person" },
    mainEntityOfPage: `https://boobesh.com/blog/${slug}`,
    inLanguage: "en-IN",
    ...(post.thumbnail
      ? { image: `https://boobesh.com${post.thumbnail}` }
      : {}),
    url: `https://boobesh.com/blog/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NavBar />
      <main className="flex-1 px-4 py-16 sm:px-8">
        <article className="mx-auto max-w-2xl">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-1 font-body text-sm font-bold text-ink-soft hover:text-coral-deep"
          >
            ← back to dispatches
          </Link>

          <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
            {format(new Date(post.date), "MMMM d, yyyy")} · {post.readingTime}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 font-body text-sm text-ink-soft">
            By{" "}
            <Link href="/about" className="font-semibold text-coral-deep underline">
              Boobesh AG
            </Link>
            , founder of{" "}
            <Link href="/gari-tech" className="font-semibold text-coral-deep underline">
              Gari Tech
            </Link>
            , content marketing agency in Chennai
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-cream-deep px-3 py-1 font-body text-xs font-bold text-ink-soft"
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            className="prose prose-post mt-10 max-w-none font-body text-ink"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <aside className="mt-14 rounded-3xl border border-line bg-paper p-6 shadow-[0_4px_0_0_var(--line)]">
            <p className="font-hand text-xl text-coral-deep">who wrote this</p>
            <p className="mt-2 font-body text-[15px] leading-[1.75] text-ink-soft">
              I&apos;m{" "}
              <Link href="/about" className="font-semibold text-ink underline">
                Boobesh AG
              </Link>
              , a content marketer in Chennai. I founded{" "}
              <Link href="/gari-tech" className="font-semibold text-ink underline">
                Gari Tech
              </Link>{" "}
              in 2024, and I lead marketing at Tribe Fortis and Your College
              Senior. Find me on{" "}
              <a href={LINKEDIN} target="_blank" rel="me noopener" className="font-semibold text-ink underline">
                LinkedIn
              </a>
              .
            </p>
          </aside>

          {related.length > 0 && (
            <nav aria-label="keep reading" className="mt-12">
              <p className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-ink-soft">
                keep reading
              </p>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/blog/${r.slug}`}
                      className="block py-4 font-display text-lg font-semibold text-ink transition-colors hover:text-coral-deep"
                    >
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
