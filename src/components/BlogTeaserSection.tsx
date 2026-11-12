import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { format } from "date-fns";

export default function BlogTeaserSection() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section className="theme-ink border-y-4 border-double border-ink-soft/40 px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-body text-[11px] font-bold uppercase tracking-[0.35em] text-butter">vol. 1 · printed on my laptop</p>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-tight text-ink sm:text-6xl">
              The Boo Gazette
            </h2>
          </div>
          <Link
            href="/blog"
            className="font-body text-sm font-bold text-coral-deep hover:underline"
          >
            read them all →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative flex flex-col border-t-4 border-ink bg-paper p-6 transition-transform duration-300 hover:-translate-y-1.5 hover:rotate-[-0.6deg]"
            >
              <span className="outline-num font-display text-5xl font-bold leading-none">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-3 font-body text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
                {format(new Date(post.date), "MMM d, yyyy")} · {post.readingTime}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                {post.title}
              </h3>
              <p className="mt-2 flex-1 font-body text-sm text-ink-soft">
                {post.excerpt}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 font-body text-sm font-bold text-coral-deep">
                read
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
