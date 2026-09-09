# boobesh.com

Personal site, positioned as a content marketer's corner of the internet.
Built with Next.js (App Router), TypeScript, Tailwind CSS v4 and Framer
Motion.

## What's here

- **Loading intro** — `src/components/LoadingScreen.tsx`, plays once per
  session (`sessionStorage`).
- **Homepage** — hero, about, toolkit, timeline, campaigns and a blog
  teaser, assembled in `src/app/page.tsx`.
- **Blog ("dispatches")** — Markdown files in `content/blog/*.md`, parsed
  in `src/lib/blog.ts`, rendered at `/blog` and `/blog/[slug]`.

## Adding a blog post today

Drop a new `.md` file into `content/blog/` with frontmatter:

```md
---
title: "post title"
excerpt: "one or two sentences for the card and SEO description"
date: "2026-06-02"
tags: ["strategy", "content"]
---

Body in Markdown.
```

It shows up automatically, newest first, no code changes needed.

## Roadmap: personal CRM

The plan is to replace the flat Markdown files with a small Python
(FastAPI) backend that stores posts, work/education entries and skills in
a database, exposed behind a custom-URL admin so posts can be added from
anywhere without touching code. `src/lib/blog.ts` is the single place
that would swap from reading the filesystem to calling that API, so the
rest of the site does not need to change.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploying

Built for Vercel: push to a branch, import the repo in Vercel, no extra
config needed. Point `boobesh.com` at the Vercel project once it's live.
