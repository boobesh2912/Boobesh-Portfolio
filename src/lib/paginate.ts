import type { BookBlock } from "@/content/books";

/*
  Lays a book out as pages. The page is a fixed size, so this estimates how
  many lines each block takes and fills pages the way a printer would, with
  long paragraphs running on from one page to the next. Photos, videos and
  headings are never split.
*/

export type PageItem =
  | { type: "h"; text: string }
  | { type: "p"; text: string; drop: boolean; cont: boolean }
  | { type: "quote"; text: string }
  | { type: "link"; href: string; text: string }
  | { type: "photos"; items: { src: string; alt: string }[]; wide?: boolean }
  | { type: "videos"; items: { src: string; poster: string; caption: string; alt: string }[] };

export type Page = { items: PageItem[] };

const CHARS_PER_LINE = 40;
const CAPACITY = 16;
const GAP = 0.7;

const plain = (t: string) => t.replace(/\*\*/g, "");
const textLines = (t: string) => Math.ceil(plain(t).length / CHARS_PER_LINE);
/* headings are bigger type, so fewer characters fit on a line */
const headLines = (t: string) => Math.ceil(t.length / 23) * 1.1 + 1;

function height(it: PageItem): number {
  switch (it.type) {
    case "h":
      return headLines(it.text);
    case "quote":
      return textLines(it.text) + 3;
    case "link":
      return 2.2;
    case "p":
      return textLines(it.text) + GAP;
    case "photos":
      return it.wide ? 7 : it.items.length === 1 ? 9.5 : 8.6;
    case "videos":
      return it.items.length === 1 ? 11.5 : 10.8;
  }
}

/* sentence ends outside a **highlight**, where a paragraph can safely break */
function breakPoints(t: string): number[] {
  const pts: number[] = [];
  const re = /[.!?]["')]?\s+/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(t))) {
    const end = m.index + m[0].length;
    const marks = (t.slice(0, end).match(/\*\*/g) ?? []).length;
    if (marks % 2 === 0) pts.push(end);
  }
  return pts;
}

export function paginate(blocks: BookBlock[]): Page[] {
  const pages: Page[] = [];
  let cur: PageItem[] = [];
  let used = 0;
  let afterHeading = true;

  const flush = () => {
    if (cur.length) pages.push({ items: cur });
    cur = [];
    used = 0;
  };

  const push = (it: PageItem) => {
    const h = height(it);
    if (used + h > CAPACITY && cur.length) flush();
    cur.push(it);
    used += h;
  };

  for (let bi = 0; bi < blocks.length; bi++) {
    const b = blocks[bi];
    if (b.type === "h") {
      // a heading never sits alone at the bottom of a page: it needs room
      // for at least a few lines of what follows it
      const nx = blocks[bi + 1];
      const need =
        headLines(b.text) +
        (!nx
          ? 0
          : nx.type === "p"
          ? Math.min(textLines(nx.text) + GAP, 4.7)
          : nx.type === "photos"
          ? nx.wide
            ? 7
            : nx.items.length === 1
            ? 9.5
            : 8.6
          : 4);
      if (used + need > CAPACITY) flush();
      push({ type: "h", text: b.text });
      afterHeading = true;
      continue;
    }
    if (b.type === "photos" && b.items.length >= 3) {
      // two portraits side by side, then the rest as a wide strip, so each
      // can land where it fits
      push({ type: "photos", items: b.items.slice(0, 2) });
      push({ type: "photos", items: b.items.slice(2), wide: true });
      afterHeading = false;
      continue;
    }
    if (b.type !== "p") {
      push(b as PageItem);
      afterHeading = false;
      continue;
    }

    let rest = b.text;
    let first = true;
    while (rest) {
      const room = CAPACITY - used - GAP;
      if (textLines(rest) <= room) {
        push({ type: "p", text: rest, drop: afterHeading && first, cont: !first });
        rest = "";
      } else {
        const fit = breakPoints(rest).filter((p) => textLines(rest.slice(0, p)) <= room);
        const cut = fit.length ? fit[fit.length - 1] : 0;
        if (cut > 0 && room >= 3) {
          push({ type: "p", text: rest.slice(0, cut).trim(), drop: afterHeading && first, cont: !first });
          rest = rest.slice(cut).trim();
          flush();
        } else if (cur.length) {
          flush();
        } else {
          // one unbreakable paragraph longer than a page: let it run
          push({ type: "p", text: rest, drop: afterHeading && first, cont: !first });
          rest = "";
        }
      }
      first = false;
      afterHeading = false;
    }
  }
  flush();
  return pages;
}
