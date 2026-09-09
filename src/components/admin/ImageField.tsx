"use client";

import { useRef, useState } from "react";

/*
  Uploads straight into the repo through the admin API and hands back the
  public path. Alt text sits next to it on purpose: an image with no alt is
  invisible to a screen reader and to a crawler, so the forms refuse it.
*/
export default function ImageField({
  path,
  alt,
  onPath,
  onAlt,
  nameHint,
  label = "image",
}: {
  path: string;
  alt: string;
  onPath: (v: string) => void;
  onAlt: (v: string) => void;
  nameHint: string;
  label?: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const upload = async (file: File) => {
    setBusy(true);
    setError("");
    const body = new FormData();
    body.append("file", file);
    body.append("name", nameHint || file.name.replace(/\.[^.]+$/, ""));

    const res = await fetch("/api/admin/upload", { method: "POST", body });
    const data = await res.json().catch(() => ({ error: "upload failed" }));
    setBusy(false);

    if (res.ok) onPath(data.path);
    else setError(data.error || "upload failed");
  };

  return (
    <div className="rounded-2xl border border-line bg-cream p-4">
      <p className="font-body text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
        {label}
      </p>

      <div className="mt-3 flex items-start gap-4">
        <div className="flex h-24 w-32 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-paper">
          {path ? (
            /* eslint-disable-next-line @next/next/no-img-element --
               a just-uploaded runtime path, not a build time asset */
            <img src={path} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="font-hand text-base text-ink-soft">nothing yet</span>
          )}
        </div>

        <div className="flex-1">
          <input
            ref={input}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) upload(f);
            }}
          />
          <button
            type="button"
            onClick={() => input.current?.click()}
            disabled={busy}
            className="rounded-full border border-line px-4 py-2 font-body text-xs font-bold text-ink transition-colors hover:border-coral hover:text-coral disabled:opacity-50"
          >
            {busy ? "uploading..." : path ? "replace" : "choose an image"}
          </button>
          {path && (
            <button
              type="button"
              onClick={() => {
                onPath("");
                onAlt("");
              }}
              className="ml-2 font-body text-xs text-ink-soft hover:text-coral"
            >
              remove
            </button>
          )}

          <p className="mt-2 font-body text-[11px] text-ink-soft">
            jpg, png or webp, under 3MB. It is committed to the repo.
          </p>
          {error && (
            <p className="mt-2 font-body text-xs font-semibold text-coral-deep">
              {error}
            </p>
          )}
        </div>
      </div>

      <label className="mt-4 block font-body text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
        alt text {path && <span className="text-coral">required</span>}
      </label>
      <input
        value={alt}
        onChange={(e) => onAlt(e.target.value)}
        required={!!path}
        placeholder="describe the picture for someone who cannot see it"
        className="mt-1 w-full rounded-xl border border-line bg-paper px-4 py-2 font-body text-[15px] text-ink outline-none focus:border-coral"
      />
    </div>
  );
}
