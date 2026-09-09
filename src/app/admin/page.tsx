"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageField from "@/components/admin/ImageField";

/*
  The admin desk. Three things live here now: blog posts, speaking events and
  the sites shelf. Everything writes a markdown file into the repo through the
  GitHub API, so the site rebuilds itself and every change is a commit.
*/

const EVENT_LIMIT = 220;
const SITE_LIMIT = 180;

type Tab = "post" | "event" | "site";

const field =
  "mt-1 w-full rounded-xl border border-line bg-cream px-4 py-2.5 font-body text-[15px] text-ink outline-none transition-colors focus:border-coral";
const labelClass =
  "block font-body text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft";

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("post");
  const [status, setStatus] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  // post
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState("");
  const [body, setBody] = useState("");
  const [thumb, setThumb] = useState("");
  const [thumbAlt, setThumbAlt] = useState("");

  // event
  const [eTitle, setETitle] = useState("");
  const [eOrganizer, setEOrganizer] = useState("");
  const [eDate, setEDate] = useState("");
  const [eDesc, setEDesc] = useState("");
  const [eImage, setEImage] = useState("");
  const [eAlt, setEAlt] = useState("");

  // site
  const [sTitle, setSTitle] = useState("");
  const [sUrl, setSUrl] = useState("");
  const [sBlurb, setSBlurb] = useState("");
  const [sStack, setSStack] = useState("");
  const [sYear, setSYear] = useState("");
  const [sImage, setSImage] = useState("");
  const [sAlt, setSAlt] = useState("");

  const post = async (endpoint: string, payload: unknown, done: () => void) => {
    setLoading(true);
    setStatus(null);
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({ error: "something broke" }));
    setLoading(false);
    if (res.ok) {
      setFailed(false);
      setStatus("published. the site redeploys in a minute or so.");
      done();
    } else {
      setFailed(true);
      setStatus(data.error || "could not publish");
    }
  };

  const logout = async () => {
    document.cookie = "boobesh_admin_session=; Max-Age=0; path=/";
    router.push("/admin/login");
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "post", label: "blog post" },
    { id: "event", label: "speaking event" },
    { id: "site", label: "site I built" },
  ];

  return (
    <main className="min-h-screen flex-1 bg-cream px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-hand text-2xl text-coral-deep">the admin desk</p>
            <h1 className="font-display text-3xl font-bold text-ink">
              add something to the site
            </h1>
          </div>
          <button
            onClick={logout}
            className="rounded-full border border-line px-4 py-2 font-body text-xs font-bold text-ink-soft hover:border-coral hover:text-coral"
          >
            log out
          </button>
        </div>

        <div className="mt-8 flex gap-2 rounded-full border border-line bg-paper p-1.5">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTab(t.id);
                setStatus(null);
              }}
              className={`flex-1 rounded-full px-4 py-2.5 font-body text-[13px] font-semibold transition-colors ${
                tab === t.id
                  ? "bg-ink text-cream"
                  : "text-ink-soft hover:text-coral"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-3xl border border-line bg-paper p-7 shadow-[0_6px_0_0_var(--line)] sm:p-8">
          {tab === "post" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                post(
                  "/api/admin/posts",
                  { title, excerpt, tags, body, thumbnail: thumb, thumbnailAlt: thumbAlt },
                  () => {
                    setTitle("");
                    setExcerpt("");
                    setTags("");
                    setBody("");
                    setThumb("");
                    setThumbAlt("");
                  }
                );
              }}
              className="space-y-5"
            >
              <div>
                <label className={labelClass}>title</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} required className={field} />
              </div>

              <ImageField
                label="thumbnail"
                path={thumb}
                alt={thumbAlt}
                onPath={setThumb}
                onAlt={setThumbAlt}
                nameHint={title}
              />

              <div>
                <label className={labelClass}>excerpt</label>
                <input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className={field} />
              </div>

              <div>
                <label className={labelClass}>tags, comma separated</label>
                <input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="strategy, content"
                  className={field}
                />
              </div>

              <div>
                <label className={labelClass}>body, markdown</label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                  rows={12}
                  className={field}
                />
              </div>

              <Submit loading={loading} label="publish to the blog" />
            </form>
          )}

          {tab === "event" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                post(
                  "/api/admin/events",
                  {
                    title: eTitle,
                    organizer: eOrganizer,
                    date: eDate,
                    description: eDesc,
                    image: eImage,
                    alt: eAlt,
                  },
                  () => {
                    setETitle("");
                    setEOrganizer("");
                    setEDate("");
                    setEDesc("");
                    setEImage("");
                    setEAlt("");
                  }
                );
              }}
              className="space-y-5"
            >
              <div>
                <label className={labelClass}>event name</label>
                <input value={eTitle} onChange={(e) => setETitle(e.target.value)} required className={field} />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>who organised it</label>
                  <input
                    value={eOrganizer}
                    onChange={(e) => setEOrganizer(e.target.value)}
                    required
                    placeholder="college, community, company"
                    className={field}
                  />
                </div>
                <div>
                  <label className={labelClass}>date</label>
                  <input
                    type="date"
                    value={eDate}
                    onChange={(e) => setEDate(e.target.value)}
                    className={field}
                  />
                </div>
              </div>

              <ImageField
                label="event photo"
                path={eImage}
                alt={eAlt}
                onPath={setEImage}
                onAlt={setEAlt}
                nameHint={eTitle}
              />

              <div>
                <label className={labelClass}>
                  short description
                  <span
                    className={`ml-2 font-normal ${
                      eDesc.length > EVENT_LIMIT ? "text-coral" : "text-ink-soft"
                    }`}
                  >
                    {eDesc.length}/{EVENT_LIMIT}
                  </span>
                </label>
                <textarea
                  value={eDesc}
                  onChange={(e) => setEDesc(e.target.value.slice(0, EVENT_LIMIT))}
                  rows={4}
                  placeholder="what the talk was about, or what happened"
                  className={field}
                />
              </div>

              <Submit loading={loading} label="add to the gallery" />
            </form>
          )}

          {tab === "site" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                post(
                  "/api/admin/sites",
                  {
                    title: sTitle,
                    url: sUrl,
                    blurb: sBlurb,
                    stack: sStack,
                    year: sYear,
                    image: sImage,
                    alt: sAlt,
                  },
                  () => {
                    setSTitle("");
                    setSUrl("");
                    setSBlurb("");
                    setSStack("");
                    setSYear("");
                    setSImage("");
                    setSAlt("");
                  }
                );
              }}
              className="space-y-5"
            >
              <div>
                <label className={labelClass}>site name</label>
                <input value={sTitle} onChange={(e) => setSTitle(e.target.value)} required className={field} />
              </div>

              <div>
                <label className={labelClass}>link</label>
                <input
                  type="url"
                  value={sUrl}
                  onChange={(e) => setSUrl(e.target.value)}
                  required
                  placeholder="https://"
                  className={field}
                />
              </div>

              <ImageField
                label="screenshot"
                path={sImage}
                alt={sAlt}
                onPath={setSImage}
                onAlt={setSAlt}
                nameHint={sTitle}
              />

              <div>
                <label className={labelClass}>
                  what it is
                  <span
                    className={`ml-2 font-normal ${
                      sBlurb.length > SITE_LIMIT ? "text-coral" : "text-ink-soft"
                    }`}
                  >
                    {sBlurb.length}/{SITE_LIMIT}
                  </span>
                </label>
                <textarea
                  value={sBlurb}
                  onChange={(e) => setSBlurb(e.target.value.slice(0, SITE_LIMIT))}
                  rows={3}
                  className={field}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>stack, comma separated</label>
                  <input
                    value={sStack}
                    onChange={(e) => setSStack(e.target.value)}
                    placeholder="WordPress, Elementor"
                    className={field}
                  />
                </div>
                <div>
                  <label className={labelClass}>year</label>
                  <input
                    value={sYear}
                    onChange={(e) => setSYear(e.target.value)}
                    placeholder="2026"
                    className={field}
                  />
                </div>
              </div>

              <Submit loading={loading} label="add to the shelf" />
            </form>
          )}

          {status && (
            <p
              className={`mt-5 rounded-xl border px-4 py-3 font-body text-sm font-semibold ${
                failed
                  ? "border-coral/40 bg-coral/10 text-coral-deep"
                  : "border-sage/40 bg-sage/10 text-sage-deep"
              }`}
            >
              {status}
            </p>
          )}
        </div>

        <p className="mt-4 text-center font-body text-xs leading-relaxed text-ink-soft">
          Everything here commits straight to the repo through the GitHub API,
          which needs GITHUB_TOKEN set in the deployment environment.
        </p>
      </div>
    </main>
  );
}

function Submit({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full rounded-full bg-ink px-5 py-3.5 font-body text-sm font-bold text-cream transition-transform hover:-translate-y-0.5 disabled:opacity-50"
    >
      {loading ? "publishing..." : label}
    </button>
  );
}
