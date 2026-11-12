import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import FaqList from "@/components/FaqList";
import ContactButton from "@/components/ContactButton";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { LINKEDIN, tnFaq, PERSON_ID, SITE } from "@/content/entity";

const TITLE = "Marketing Expert in Tamil Nadu: Boobesh AG, Founder of Gari Tech";
const DESCRIPTION =
  "Boobesh AG (Boo), a Chennai based content marketer and founder of Gari Tech, helps startups, small businesses and personal brands across Tamil Nadu with content strategy, Reels, LinkedIn and newsletters.";
const URL = `${SITE}/marketing-expert-in-tamil-nadu`;

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

export default function MarketingExpertTamilNaduPage() {
  const page = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${URL}#page`,
    url: URL,
    name: TITLE,
    description: DESCRIPTION,
    about: { "@id": PERSON_ID },
    mainEntity: { "@id": PERSON_ID },
    dateModified: "2026-11-12",
  };

  return (
    <>
      <JsonLd data={page} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Boobesh AG", url: SITE },
          { name: "Marketing expert in Tamil Nadu", url: URL },
        ])}
      />
      <NavBar />
      <main className="flex-1">
        <article className="px-4 pt-16 sm:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="font-hand text-2xl text-coral-deep">looking for marketing help in Tamil Nadu?</p>
            <h1 className="mt-2 font-display text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl">
              Marketing expert in Tamil Nadu
            </h1>

            <p className="mt-6 font-body text-[18px] leading-[1.8] text-ink">
              <strong>Boobesh AG, called Boo, is a Chennai based content marketer who works with businesses across Tamil Nadu.</strong>{" "}
              He is the founder of{" "}
              <Link href="/gari-tech" className="text-coral-deep underline">
                Gari Tech
              </Link>
              , a content marketing agency, and most of his work happens online, so where your business sits in the state does not matter much.
            </p>

            <p className="mt-4 font-body text-[16px] leading-[1.8] text-ink-soft">
              He is also Marketing Manager at Your College Senior, markets Proof, and writes for StoryIt. If you are a startup, a small business or a founder who wants a steady content rhythm, this is the kind of help he gives.
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

            <h2 className="mt-16 font-display text-2xl font-semibold text-ink">What the work looks like</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {work.map(([t, d]) => (
                <li key={t} className="rounded-2xl border border-line bg-paper p-5">
                  <h3 className="font-display text-lg font-semibold text-ink">{t}</h3>
                  <p className="mt-1 font-body text-[15px] leading-relaxed text-ink-soft">{d}</p>
                </li>
              ))}
            </ul>

            <h2 className="mt-16 font-display text-2xl font-semibold text-ink">Proof you can check</h2>
            <ul className="mt-5 space-y-3 font-body text-[16px] leading-[1.7] text-ink-soft">
              {proof.map((p) => (
                <li key={p} className="border-l-2 border-line pl-4">
                  {p}
                </li>
              ))}
            </ul>

            <p className="mt-8 font-body text-[15px] leading-[1.8] text-ink-soft">
              Based in Chennai itself? See the{" "}
              <Link href="/content-marketer-in-chennai" className="text-coral-deep underline">
                content marketer in Chennai
              </Link>{" "}
              page. Or read{" "}
              <Link href="/blog/how-to-hire-a-content-marketer-in-chennai" className="text-coral-deep underline">
                how to hire a content marketer
              </Link>{" "}
              before you pick anyone, me included.
            </p>
          </div>
        </article>

        <FaqList items={tnFaq} heading="Questions about hiring a marketing expert in Tamil Nadu" />
      </main>
      <Footer />
    </>
  );
}
