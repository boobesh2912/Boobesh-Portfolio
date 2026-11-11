import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { getEvents } from "@/lib/collections";
import { LINKEDIN, PERSON_ID, SITE } from "@/content/entity";
import { award } from "@/content/award";

const TITLE = "Boobesh AG: Speaker Bio and Media Kit";
const DESCRIPTION =
  "Short and long bio, topics, past talks, photo and links for Boobesh AG, a content marketer and entrepreneur in Chennai and the founder of Gari Tech.";
const URL = `${SITE}/press`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, type: "profile" },
};

const shortBio =
  "Boobesh AG, known as Boo, is a content marketer and entrepreneur from Chennai. He is the founder of Gari Tech, a content marketing agency, and Marketing Manager at Your College Senior. He started reselling online at 15 and has been building things ever since.";

const longBio =
  "Boobesh AG, known as Boo, is a content marketer and entrepreneur from Chennai, India. He founded Gari Tech, a content marketing agency, in February 2024 during his first year of college, and today he is Marketing Manager at Your College Senior, does marketing for Proof and works on content for StoryIt. He previously led a five person marketing team at Tribe Fortis and published an honest case study about it. He studies B.Tech Computer Science and Business Systems at Panimalar Engineering College, writes the Build With Boo newsletter, and has taught LinkedIn sessions to 100+ college students. He received the Young Entrepreneur of the Year award at the Startup Real OG Awards and was nominated for Best Student Freelancer at the Global Freelancers Festival 2026.";

const topics = [
  "LinkedIn for students and early careers",
  "Product building and entrepreneurship",
  "How to think like a founder",
  "How students can build income streams before placement",
  "Starting freelancing in college",
  "Content marketing for startups and personal brands",
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function nice(iso: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  return m ? `${Number(m[3])} ${MONTHS[Number(m[2]) - 1]} ${m[1]}` : iso;
}

export default function PressPage() {
  const talks = getEvents();
  const page = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
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
          { name: "Speaker bio and media kit", url: URL },
        ])}
      />
      <NavBar />
      <main className="flex-1">
        <article className="px-4 pb-20 pt-16 sm:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="font-hand text-2xl text-coral-deep">for organisers and writers</p>
            <h1 className="mt-2 font-display text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl">
              Boobesh AG, speaker bio and media kit
            </h1>
            <p className="mt-5 font-body text-[17px] leading-[1.8] text-ink-soft">
              Everything you need to introduce Boobesh AG (Boo) at an event, in
              a newsletter or in an article, with links you can check. Copy
              what is useful.
            </p>

            <div className="mt-10 grid gap-8 sm:grid-cols-[12rem_1fr]">
              {/* eslint-disable-next-line @next/next/no-img-element -- static file in /public */}
              <img
                src="/shots/boobesh.jpg"
                alt="Boobesh AG, content marketer and founder of Gari Tech, Chennai"
                className="h-56 w-48 rounded-2xl border border-line object-cover"
              />
              <div>
                <h2 className="font-display text-xl font-semibold text-ink">Facts</h2>
                <dl className="mt-3 divide-y divide-line border-y border-line font-body text-[15px]">
                  {[
                    ["Name", "Boobesh AG (also Boo, Boobesh)"],
                    ["Based in", "Chennai, Tamil Nadu, India"],
                    ["Does", "Content marketing, entrepreneurship"],
                    ["Founder of", "Gari Tech, a content marketing agency (2024)"],
                    ["Studying", "B.Tech CSBS, Panimalar Engineering College"],
                  ].map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[6rem_1fr] gap-3 py-2.5">
                      <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">{k}</dt>
                      <dd className="text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
                <a
                  href="/shots/boobesh.jpg"
                  download
                  className="mt-4 inline-block font-hand text-lg text-coral-deep hover:underline"
                >
                  download the photo
                </a>
              </div>
            </div>

            <h2 className="mt-14 font-display text-2xl font-semibold text-ink">Short bio</h2>
            <p className="mt-3 font-body text-[16px] leading-[1.8] text-ink">{shortBio}</p>

            <h2 className="mt-10 font-display text-2xl font-semibold text-ink">Longer bio</h2>
            <p className="mt-3 font-body text-[16px] leading-[1.8] text-ink">{longBio}</p>

            <h2 className="mt-14 font-display text-2xl font-semibold text-ink">Topics he speaks on</h2>
            <ul className="mt-4 list-disc space-y-1.5 pl-5 font-body text-[16px] text-ink-soft">
              {topics.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>

            <h2 className="mt-14 font-display text-2xl font-semibold text-ink">Recent talks</h2>
            <ul className="mt-4 space-y-4 font-body text-[15px] leading-relaxed text-ink-soft">
              {talks.map((e) => (
                <li key={e.slug} className="border-l-2 border-line pl-4">
                  <p className="font-semibold text-ink">{e.title}</p>
                  <p>
                    {e.organizer}
                    {e.venue ? `, ${e.venue}` : ""}. {nice(e.date)}.
                  </p>
                </li>
              ))}
            </ul>

            <h2 className="mt-14 font-display text-2xl font-semibold text-ink">Recognition</h2>
            <ul className="mt-4 space-y-2 font-body text-[16px] text-ink-soft">
              <li>
                {award.title}, {award.name} (received {award.received}), {award.venue}.
              </li>
              <li>Nominated for Best Student Freelancer, Global Freelancers Festival 2026, IITM Research Park, Chennai.</li>
            </ul>

            <h2 className="mt-14 font-display text-2xl font-semibold text-ink">Links</h2>
            <ul className="mt-4 space-y-2 font-body text-[16px] text-ink-soft">
              <li>
                Website: <Link href="/" className="text-coral-deep underline">boobesh.com</Link>
              </li>
              <li>
                LinkedIn:{" "}
                <a href={LINKEDIN} rel="me noopener" target="_blank" className="text-coral-deep underline">
                  linkedin.com/in/boobesh2912
                </a>
              </li>
              <li>
                Gari Tech:{" "}
                <a href="https://garitech.co.in" rel="noopener" target="_blank" className="text-coral-deep underline">
                  garitech.co.in
                </a>
              </li>
              <li>
                <Link href="/about" className="text-coral-deep underline">About</Link>,{" "}
                <Link href="/content-marketer-in-chennai" className="text-coral-deep underline">content marketer in Chennai</Link>,{" "}
                <Link href="/personal" className="text-coral-deep underline">the honest version</Link>
              </li>
            </ul>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
