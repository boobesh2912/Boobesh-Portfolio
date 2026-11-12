import { award } from "@/content/award";
import { getEvents } from "@/lib/collections";
import { storyDance, storyDanceVideos, storyLoves, storySections } from "@/content/story";

/*
  The bookshelf on the personal page. The page itself stays short; each book
  holds the long version of one part of the story. Add a book here and it
  shows up on the shelf and gets its own page, laid out as real pages.
  Text wrapped in **double asterisks** gets the highlighter.
*/

export type BookBlock =
  | { type: "h"; text: string }
  | { type: "p"; text: string }
  | { type: "quote"; text: string }
  | { type: "link"; href: string; text: string }
  | { type: "photos"; items: { src: string; alt: string }[]; wide?: boolean }
  | { type: "videos"; items: { src: string; poster: string; caption: string; alt: string }[] };

export type Book = {
  slug: string;
  title: string;
  /** shorter title for the spine, if the full one is too long */
  spineTitle?: string;
  /** one line shown on the shelf and in search results */
  blurb: string;
  minutes: number;
  /** cloth colour, spine height in rem and spine width in rem */
  color: string;
  height: number;
  width: number;
  blocks: BookBlock[];
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function nice(iso: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  return m ? `${Number(m[3])} ${MONTHS[Number(m[2]) - 1]} ${m[1]}` : iso;
}

/* every chapter of the old long page, by its heading, as paragraph blocks */
function chapter(heading: string, title = heading): BookBlock[] {
  const s = storySections.find((x) => x.heading === heading);
  if (!s) return [];
  return [
    { type: "h", text: title },
    ...s.paragraphs.map((text) => ({ type: "p" as const, text })),
  ];
}

export function getBooks(): Book[] {
  const events = getEvents();

  const speaking: BookBlock[] = [
    { type: "p", text: storyLoves.paragraphs[0] },
    {
      type: "p",
      text: "Here are the rooms, newest first. Some I planned for weeks. Some I said yes to and figured out on the way.",
    },
    ...events.flatMap((e): BookBlock[] => [
      { type: "h", text: e.title },
      {
        type: "p",
        text: `${e.organizer}${e.venue ? `, ${e.venue}` : ""}. ${nice(e.date)}. ${e.description}`,
      },
      ...(e.images[0] ? [{ type: "photos" as const, items: [e.images[0]], wide: true }] : []),
    ]),
    { type: "link", href: "/press", text: "speaker bio and media kit" },
  ];

  return [
    {
      slug: "dance",
      title: "Dancing Badly, On Purpose",
      spineTitle: "Dancing Badly",
      blurb: "A stage with 3000+ people, a dance academy found by accident, and why I keep choosing the uncomfortable thing.",
      minutes: 4,
      color: "#8a3a55",
      height: 15,
      width: 3.4,
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
      minutes: 7,
      color: "#2f5d62",
      height: 15.5,
      width: 3.9,
      blocks: speaking,
    },
    {
      slug: "award",
      title: "The Award, and the Smile I Forgot",
      spineTitle: "The Award",
      blurb: "Young Entrepreneur of the Year, the night before, and the photo where I forgot to smile.",
      minutes: 4,
      color: "#1f3a5f",
      height: 13.5,
      width: 3,
      blocks: [
        ...chapter("then I got an award, and forgot to smile", award.title),
        {
          type: "p",
          text: `The certificate reads ${award.name} ${award.certificateYear}, empowered by ${award.empoweredBy}. I received it on ${award.received} at ${award.venue}.`,
        },
        { type: "photos", items: [award.handover, award.certificate] },
        {
          type: "videos",
          items: [{ src: award.video.src, poster: award.video.poster, caption: "the ceremony", alt: award.video.label }],
        },
      ],
    },
    {
      slug: "communities",
      title: "Rooms That Changed Me",
      blurb: "Think Digital, Start The Up, and an introvert learning to talk.",
      minutes: 4,
      color: "#5b3f7a",
      height: 14.5,
      width: 3.2,
      blocks: [
        ...chapter("then a community made me talk", "Think Digital"),
        { type: "h", text: "Start The Up" },
        {
          type: "p",
          text: "In 2025 I started a community called Start The Up. Simple idea, get students thinking like founders. We ran four webinars. Then engagement dropped, and it stopped. Just like that.",
        },
        { type: "link", href: "/blog/how-to-start-a-student-startup-community", text: "how to start a student startup community, and why mine stopped" },
      ],
    },
    {
      slug: "first-clients",
      title: "First Clients",
      blurb: "A Canva shop, one client who trusted me with no portfolio, and one I should have said no to.",
      minutes: 6,
      color: "#6b4a2f",
      height: 13,
      width: 3.5,
      blocks: [
        ...chapter("then gari tech happened", "the Canva shop"),
        { type: "h", text: "the first one" },
        {
          type: "p",
          text: "My first client was Aldo Einsty, a psychologist and the founder of Mindful Mindvoice. I had no portfolio, so I posted a free website offer in a Chennai freelancers WhatsApp group. **She replied.**",
        },
        {
          type: "p",
          text: "Once we talked, her needs were clearly more than a free offer could cover, and I told her so. We agreed on a price, a low one even for then, and she trusted me anyway. My first payment was 1,500 rupees for the website. She liked it a lot, and later she became my social media client: 3 Reels scripts, 2 edited videos and 20 posts for her Instagram page.",
        },
        { type: "h", text: "the one I should have said no to" },
        {
          type: "p",
          text: "I will not say who. I took the project because I had no other client. Low price again, and then the pressure: every tiny alignment, every minute change. A deal for four pages slowly became nearly nine.",
        },
        {
          type: "p",
          text: "I do not regret it, because I learned how to choose a client, and how **small things at the start lead to a whole path.**",
        },
        ...chapter("things changed later", "a friend, and a split"),
        { type: "link", href: "/blog/how-to-start-freelancing-as-a-student-in-india", text: "how to start freelancing as a student in India" },
        { type: "link", href: "/gari-tech", text: "what Gari Tech does today" },
      ],
    },
    {
      slug: "where-it-started",
      title: "Where It Started",
      blurb: "A touchscreen phone, a dead computer, Sharechat and a lot of curiosity.",
      minutes: 6,
      color: "#3f6b4a",
      height: 14,
      width: 3.6,
      blocks: [
        ...chapter("it started with curiosity"),
        ...chapter("then computers entered my life"),
        ...chapter("then money entered the picture"),
        ...chapter("then linkedin entered my life"),
      ],
    },
    {
      slug: "unfinished",
      title: "The Unfinished Pile",
      spineTitle: "Unfinished",
      blurb: "More than 50 projects on my drive, and what that says about me.",
      minutes: 3,
      color: "#a24b2a",
      height: 12,
      width: 2.8,
      blocks: [
        ...chapter("the ones I started and stopped"),
        { type: "p", text: "The numbers, since you asked: **50+** projects on my drive, **20 to 30** of them unfinished, and **1** platform I never quit. That one is LinkedIn." },
        ...chapter("maybe this sounds familiar"),
        { type: "quote", text: "I am still working out how to turn curiosity into consistency." },
      ],
    },
    {
      slug: "college",
      title: "College, Honestly",
      blurb: "Being the different one in the family, and why I still care about my grades.",
      minutes: 3,
      color: "#56606b",
      height: 12.5,
      width: 3,
      blocks: [
        ...chapter("the different one in the family"),
        ...chapter("and yes, I still care about my grades"),
      ],
    },
  ];
}

export function getBook(slug: string) {
  return getBooks().find((b) => b.slug === slug);
}
