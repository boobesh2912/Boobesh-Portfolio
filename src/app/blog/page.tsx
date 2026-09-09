import Link from "next/link";
import { format } from "date-fns";
import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Dispatches — Boobesh",
  description: "Notes on marketing, content and campaigns, written by a marketer, for anyone who still reads.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <NavBar />
      <main className="flex-1 px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <p className="font-hand text-3xl text-coral-deep rotate-[-1deg]">
              from the desk of a marketer
            </p>
            <h1 className="mt-2 font-display text-4xl font-bold text-ink sm:text-5xl">
              dispatches
            </h1>
            <p className="mx-auto mt-4 max-w-lg font-body text-base text-ink-soft">
              Notes on campaigns, content and the thinking behind both. Written
              from the marketer&apos;s seat, not the sidelines.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`group rounded-3xl border border-line bg-paper p-7 shadow-[0_4px_0_0_var(--line)] transition-transform hover:-translate-y-1 ${
                  i % 2 === 0 ? "sm:rotate-[-0.4deg]" : "sm:rotate-[0.4deg]"
                }`}
              >
                <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
                  {format(new Date(post.date), "MMMM d, yyyy")} · {post.readingTime}
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold text-ink">
                  {post.title}
                </h2>
                <p className="mt-2 font-body text-sm text-ink-soft">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-cream-deep px-3 py-1 font-body text-xs font-bold text-ink-soft"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 font-body text-sm font-bold text-coral-deep">
                    read
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            ))}

            {posts.length === 0 && (
              <p className="text-center font-body text-ink-soft">
                nothing here yet, first dispatch is coming soon.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
