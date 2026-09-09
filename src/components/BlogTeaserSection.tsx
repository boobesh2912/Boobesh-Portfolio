import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { format } from "date-fns";

export default function BlogTeaserSection() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section className="px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-hand text-2xl text-coral-deep">from the desk</p>
            <h2 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">
              latest dispatches
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
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-3xl border border-line bg-paper p-6 shadow-[0_4px_0_0_var(--line)] transition-transform hover:-translate-y-1"
            >
              <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
                {format(new Date(post.date), "MMM d, yyyy")} · {post.readingTime}
              </p>
              <h3 className="mt-3 font-display text-xl font-bold text-ink">
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
