"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    const res = await fetch("/api/admin/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, excerpt, tags, body }),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      setStatus(`published as ${data.slug}, the site will redeploy shortly`);
      setTitle("");
      setExcerpt("");
      setTags("");
      setBody("");
    } else {
      setStatus(`could not publish: ${data.error}`);
    }
  };

  const logout = async () => {
    document.cookie = "boobesh_admin_session=; Max-Age=0; path=/";
    router.push("/admin/login");
  };

  return (
    <main className="min-h-screen flex-1 bg-cream px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-hand text-2xl text-coral-deep">the admin desk</p>
            <h1 className="font-display text-3xl font-bold text-ink">
              write a new dispatch
            </h1>
          </div>
          <button
            onClick={logout}
            className="rounded-full border border-line px-4 py-2 font-body text-xs font-bold text-ink-soft hover:border-coral hover:text-coral"
          >
            log out
          </button>
        </div>

        <form
          onSubmit={submit}
          className="mt-8 space-y-4 rounded-3xl border border-line bg-paper p-8 shadow-[0_6px_0_0_var(--line)]"
        >
          <div>
            <label className="block font-body text-xs font-bold uppercase tracking-wide text-ink-soft">
              title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 w-full rounded-xl border border-line bg-cream px-4 py-2 font-body text-ink focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-body text-xs font-bold uppercase tracking-wide text-ink-soft">
              excerpt
            </label>
            <input
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="mt-1 w-full rounded-xl border border-line bg-cream px-4 py-2 font-body text-ink focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-body text-xs font-bold uppercase tracking-wide text-ink-soft">
              tags, comma separated
            </label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="strategy, content"
              className="mt-1 w-full rounded-xl border border-line bg-cream px-4 py-2 font-body text-ink focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-body text-xs font-bold uppercase tracking-wide text-ink-soft">
              body, markdown
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows={12}
              className="mt-1 w-full rounded-xl border border-line bg-cream px-4 py-2 font-body text-ink focus:outline-none"
            />
          </div>

          {status && (
            <p className="font-body text-sm font-semibold text-coral-deep">{status}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-ink px-5 py-3 font-body text-sm font-bold text-cream transition-transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            {loading ? "publishing..." : "publish to the blog"}
          </button>
        </form>

        <p className="mt-4 text-center font-body text-xs text-ink-soft">
          publishing commits the post straight to the repo via the GitHub
          API, needs GITHUB_TOKEN set in the deployment environment.
        </p>
      </div>
    </main>
  );
}
