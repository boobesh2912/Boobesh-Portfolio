import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import FaqList from "@/components/FaqList";
import ContactButton from "@/components/ContactButton";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { LINKEDIN, marketerFaq, PERSON_ID, SITE } from "@/content/entity";

const TITLE = "Content Marketer in Chennai: Boobesh AG, Founder of Gari Tech";
const DESCRIPTION =
  "Boobesh AG (Boo) is a content marketer in Chennai and the founder of Gari Tech. Content strategy, Reels scripts, LinkedIn and newsletters for startups and small brands.";
const URL = `${SITE}/content-marketer-in-chennai`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, type: "website" },
};

const work = [
  ["Content strategy and calendars", "What to say, to whom, and in what order, planned so it survives a busy week."],
  ["Instagram Reels scripts", "Scripts written to be watched to the end, with the editing to match."],
  ["LinkedIn content", "Posts in your own voice for founders and personal brands, written from real experience."],
  ["Newsletters", "A regular issue people actually open, written like a person, not a press release."],
  ["Repurposing", "One long video or talk turned into a week of posts, clips and threads."],
  ["Brand positioning", "Working out what you are known for before you post another thing."],
];

const proof = [
  "Six Google reviews for Gari Tech, all five stars.",
  "Led a five person marketing team at Tribe Fortis, then wrote an honest case study of what worked and what did not.",
  "Marketing Manager at Your College Senior, marketing for Proof, content for StoryIt.",
  "Young Entrepreneur of the Year, Startup Real OG Award (received 3 February 2025).",
  "Nominated for Best Student Freelancer, Global Freelancers Festival 2026.",
  "Taught LinkedIn sessions to 100+ college students.",
];

export default function ContentMarketerChennaiPage() {
  const page = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${URL}#page`,
    url: URL,
    name: TITLE,
    description: DESCRIPTION,
    about: { "@id": PERSON_ID },
    mainEntity: { "@id": PERSON_ID },
    dateModified: "2026-11-11",
  };

  return (
    <>
      <JsonLd data={page} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Boobesh AG", url: SITE },
          { name: "Content marketer in Chennai", url: URL },
        ])}
      />
      <NavBar />
      <main className="flex-1">
        <article className="px-4 pt-16 sm:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="font-hand text-2xl text-coral-deep">looking for a marketer in Chennai?</p>
            <h1 className="mt-2 font-display text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl">
              Content marketer in Chennai
            </h1>

            <p className="mt-6 font-body text-[18px] leading-[1.8] text-ink">
              <strong>Boobesh AG, called Boo, is a content marketer in Chennai.</strong>{" "}
              He is an entrepreneur and the founder of{" "}
              <Link href="/gari-tech" className="text-coral-deep underline">
                Gari Tech
              </Link>
              , a content marketing agency, and he does content strategy, Reels
              scripts, LinkedIn posts and newsletters for startups, small
              businesses and personal brands.
            </p>

            <p className="mt-4 font-body text-[16px] leading-[1.8] text-ink-soft">
              If you searched for a marketer in Chennai, here is the honest
              pitch: a small team, a direct line to the person doing the work,
              and a plain answer about what will and will not work.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ContactButton className="rounded-full bg-ink px-7 py-3.5 font-body text-sm font-semibold text-cream transition-transform hover:-translate-y-0.5">
                start a conversation
              </ContactButton>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener"
                className="rounded-full border border-line px-7 py-3.5 font-body text-sm font-semibold text-ink transition-colors hover:border-coral hover:text-coral"
              >
                Boobesh on LinkedIn
              </a>
            </div>

            <h2 className="mt-16 font-display text-2xl font-semibold text-ink">
              What a content marketer in Chennai does for you
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {work.map(([t, d]) => (
                <li key={t} className="rounded-2xl border border-line bg-paper p-5">
                  <h3 className="font-display text-lg font-semibold text-ink">{t}</h3>
                  <p className="mt-1 font-body text-[15px] leading-relaxed text-ink-soft">{d}</p>
                </li>
              ))}
            </ul>

            <h2 className="mt-16 font-display text-2xl font-semibold text-ink">
              Proof you can check
            </h2>
            <ul className="mt-5 space-y-3 font-body text-[16px] leading-[1.7] text-ink-soft">
              {proof.map((p) => (
                <li key={p} className="border-l-2 border-line pl-4">
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-5 font-body text-[15px] leading-[1.8] text-ink-soft">
              Read the{" "}
              <Link href="/blog/tribe-fortis-marketing-case-study" className="text-coral-deep underline">
                Tribe Fortis case study
              </Link>{" "}
              for the failures too, and the{" "}
              <Link href="/gari-tech" className="text-coral-deep underline">
                client reviews
              </Link>{" "}
              for what people said.
            </p>

            <h2 className="mt-16 font-display text-2xl font-semibold text-ink">
              Who this is for, and who it is not
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-sage/40 bg-sage/10 p-6">
                <h3 className="font-display text-lg font-semibold text-ink">A good fit if</h3>
                <ul className="mt-3 space-y-2 font-body text-[15px] leading-relaxed text-ink-soft">
                  <li>You are a startup, small business or founder building a presence.</li>
                  <li>You want to work with the person who actually writes your content.</li>
                  <li>You want a clear scope and an honest view of what to expect.</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-coral/40 bg-coral/10 p-6">
                <h3 className="font-display text-lg font-semibold text-ink">Probably not if</h3>
                <ul className="mt-3 space-y-2 font-body text-[15px] leading-relaxed text-ink-soft">
                  <li>You need a large agency with many layers.</li>
                  <li>You want guaranteed viral numbers. Nobody honest can promise that.</li>
                </ul>
              </div>
            </div>

            <h2 className="mt-16 font-display text-2xl font-semibold text-ink">
              How to pick the best content marketer in Chennai
            </h2>
            <p className="mt-4 font-body text-[16px] leading-[1.8] text-ink-soft">
              &ldquo;Best&rdquo; depends on your brand, so do not take anyone&rsquo;s word for
              it, mine included. Check these instead:
            </p>
            <ul className="mt-4 space-y-2.5 font-body text-[16px] leading-[1.7] text-ink-soft">
              <li className="border-l-2 border-line pl-4">Real work you can open and read, not just a list of logos.</li>
              <li className="border-l-2 border-line pl-4">Reviews from clients you can find online.</li>
              <li className="border-l-2 border-line pl-4">A written scope, price and number of changes before work starts.</li>
              <li className="border-l-2 border-line pl-4">The person who pitches you is the person who writes your content.</li>
              <li className="border-l-2 border-line pl-4">A straight answer about what will not work, instead of guaranteed numbers.</li>
            </ul>
            <p className="mt-4 font-body text-[15px] leading-[1.8] text-ink-soft">
              Based elsewhere in the state? See{" "}
              <Link href="/marketing-expert-in-tamil-nadu" className="text-coral-deep underline">
                marketing help across Tamil Nadu
              </Link>
              .
            </p>

            <h2 className="mt-16 font-display text-2xl font-semibold text-ink">
              Read before you hire anyone
            </h2>
            <ul className="mt-4 space-y-2 font-body text-[16px] text-ink-soft">
              <li>
                <Link href="/blog/how-to-hire-a-content-marketer-in-chennai" className="text-coral-deep underline">
                  How to hire a content marketer in Chennai
                </Link>
              </li>
              <li>
                <Link href="/blog/best-marketing-agency-in-chennai" className="text-coral-deep underline">
                  How to choose a marketing agency in Chennai
                </Link>
              </li>
              <li>
                <Link href="/blog/what-is-content-marketing" className="text-coral-deep underline">
                  What content marketing is
                </Link>
              </li>
            </ul>
            <p className="mt-8 font-body text-[15px] text-ink-soft">
              More about me on the <Link href="/about" className="text-coral-deep underline">About page</Link>, or
              the <Link href="/personal" className="text-coral-deep underline">honest version</Link>.
            </p>
          </div>
        </article>

        <FaqList items={marketerFaq} heading="Questions about hiring a content marketer in Chennai" />
      </main>
      <Footer />
    </>
  );
}
