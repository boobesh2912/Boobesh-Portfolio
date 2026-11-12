import { storyDance, storyDanceVideos } from "@/content/story";

/*
  The bookshelf on the personal page. The page itself stays short; each book
  holds the long version of one part of the story. Add a book here and it
  shows up on the shelf and gets its own page.
*/

export type BookBlock =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "photos"; items: { src: string; alt: string }[] }
  | { type: "videos"; items: { src: string; poster: string; caption: string; alt: string }[] };

export type Book = {
  slug: string;
  title: string;
  /** one line shown on the shelf and in search results */
  blurb: string;
  minutes: number;
  /** shorter title for the spine, if the full one is too long */
  spineTitle?: string;
  /** spine colour and height in rem */
  color: string;
  height: number;
  /** false means it is on the shelf but not written yet */
  ready: boolean;
  blocks: BookBlock[];
};

export const books: Book[] = [
  {
    slug: "dance",
    title: "Dancing Badly, On Purpose",
    blurb: "A stage with 3000+ people, a dance academy found by accident, and why I keep choosing the uncomfortable thing.",
    minutes: 3,
    color: "#8a3a55",
    height: 15,
    ready: true,
    blocks: [
      { type: "h", text: "the PACE stage" },
      ...storyDance.pace.paragraphs.map((text) => ({ type: "p" as const, text })),
      { type: "photos", items: storyDance.pace.photos },
      { type: "h", text: "Revel Dance Academy" },
      ...storyDance.revel.paragraphs.map((text) => ({ type: "p" as const, text })),
      { type: "videos", items: storyDanceVideos },
    ],
  },
  {
    slug: "speaking",
    title: "Stages I Have Stood On",
    blurb: "Every room I have talked in, and what I said in each.",
    minutes: 4,
    color: "#2f5d62",
    height: 13,
    ready: false,
    blocks: [],
  },
  {
    slug: "award",
    title: "The Award, and the Smile I Forgot",
    spineTitle: "The Award",
    blurb: "Young Entrepreneur of the Year, the night before, and the photo.",
    minutes: 3,
    color: "#a8802e",
    height: 14,
    ready: false,
    blocks: [],
  },
  {
    slug: "communities",
    title: "Rooms That Changed Me",
    blurb: "Think Digital, Start The Up, and an introvert learning to talk.",
    minutes: 4,
    color: "#3d4f7c",
    height: 15.5,
    ready: false,
    blocks: [],
  },
  {
    slug: "first-clients",
    title: "First Clients",
    blurb: "One who trusted me with no portfolio, and one I should have said no to.",
    minutes: 4,
    color: "#6b4a2f",
    height: 13.5,
    ready: false,
    blocks: [],
  },
  {
    slug: "where-it-started",
    title: "Where It Started",
    blurb: "A touchscreen phone, a dead computer, Sharechat and a lot of curiosity.",
    minutes: 6,
    color: "#4f6b3d",
    height: 14.5,
    ready: false,
    blocks: [],
  },
];

export const getBook = (slug: string) => books.find((b) => b.slug === slug && b.ready);
