import fs from "fs";
import path from "path";
import matter from "gray-matter";

/*
  Small file backed collections. The admin desk writes these straight into the
  repo through the GitHub API, exactly like blog posts do, so there is no
  database to run and every change is a commit you can undo.
*/

const CONTENT = path.join(process.cwd(), "content");

export type EventItem = {
  slug: string;
  title: string;
  organizer: string;
  date: string;
  image: string;
  alt: string;
  description: string;
};

export type SiteItem = {
  slug: string;
  title: string;
  url: string;
  image: string;
  alt: string;
  blurb: string;
  stack: string[];
  year: string;
};

/* how long a card can run before it stops looking like a card */
export const EVENT_DESCRIPTION_LIMIT = 220;
export const SITE_BLURB_LIMIT = 180;

function readDir(dir: string): { slug: string; data: Record<string, unknown> }[] {
  const full = path.join(CONTENT, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(full, f), "utf8");
      const { data } = matter(raw);
      return { slug: f.replace(/\.md$/, ""), data: data as Record<string, unknown> };
    });
}

const str = (v: unknown, fallback = "") =>
  typeof v === "string" ? v : fallback;

export function getEvents(): EventItem[] {
  return readDir("events")
    .map(({ slug, data }) => ({
      slug,
      title: str(data.title),
      organizer: str(data.organizer),
      date: str(data.date),
      image: str(data.image),
      alt: str(data.alt, str(data.title)),
      description: str(data.description).slice(0, EVENT_DESCRIPTION_LIMIT),
    }))
    .filter((e) => e.title)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getSites(): SiteItem[] {
  return readDir("sites")
    .map(({ slug, data }) => ({
      slug,
      title: str(data.title),
      url: str(data.url),
      image: str(data.image),
      alt: str(data.alt, str(data.title)),
      blurb: str(data.blurb).slice(0, SITE_BLURB_LIMIT),
      stack: Array.isArray(data.stack) ? (data.stack as string[]) : [],
      year: str(data.year),
    }))
    .filter((s) => s.title)
    .sort((a, b) => (a.year < b.year ? 1 : -1));
}
