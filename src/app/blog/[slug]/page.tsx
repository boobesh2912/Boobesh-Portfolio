import { format } from "date-fns";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";

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
    title: `${post.title} — Boobesh`,
    description: post.excerpt,
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

  return (
    <>
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

          <div className="mt-14 rounded-3xl border border-line bg-paper p-6 text-center shadow-[0_4px_0_0_var(--line)]">
            <p className="font-hand text-xl text-coral-deep">
              that&apos;s the dispatch for now
            </p>
            <Link
              href="/blog"
              className="mt-3 inline-block rounded-full bg-ink px-5 py-2 font-body text-sm font-bold text-cream"
            >
              read another one
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
