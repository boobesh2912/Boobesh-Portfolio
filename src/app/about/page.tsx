import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import FaqList from "@/components/FaqList";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { aboutFaq, LINKEDIN, PERSON_ID, SITE, SOCIALS } from "@/content/entity";
import { roles } from "@/content/experience";

const TITLE = "Boobesh AG (Boo): Content Marketer and Founder of Gari Tech, Chennai";
const DESCRIPTION =
  "Boobesh AG, known as Boo, is a content marketer and young entrepreneur from Chennai. Founder of Gari Tech, Marketing Lead at Tribe Fortis, Marketing Manager at Your College Senior. Panimalar Engineering College, B.Tech CSBS.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE}/about` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE}/about`, type: "profile" },
};

const facts: [string, React.ReactNode][] = [
  ["Full name", "Boobesh AG"],
  ["Also known as", "Boo, Boobesh, Boobesh Ganesan, buildwithboo"],
  ["Based in", "Chennai, Tamil Nadu, India"],
  ["What he does", "Content marketing, founder"],
  [
    "Founder of",
    <Link key="g" href="/gari-tech" className="text-coral-deep underline">
      Gari Tech
    </Link>,
  ],
  ["Currently", "Marketing Lead at Tribe Fortis, Marketing Manager at Your College Senior, marketing for Proof, content at StoryIt"],
  ["Studying", "B.Tech Computer Science and Business Systems, Panimalar Engineering College, Chennai"],
  ["School", "Santhome Higher Secondary School, Mylapore, Chennai"],
  [
    "LinkedIn",
    <a key="l" href={LINKEDIN} rel="me noopener" target="_blank" className="text-coral-deep underline">
      linkedin.com/in/boobesh2912
    </a>,
  ],
];

export default function AboutPage() {
  const profile = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: { "@id": PERSON_ID },
    url: `${SITE}/about`,
    name: TITLE,
    about: { "@id": PERSON_ID },
    dateModified: "2026-09-30",
    sameAs: SOCIALS,
  };

  return (
    <>
      <JsonLd data={profile} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Boobesh AG", url: SITE },
          { name: "About", url: `${SITE}/about` },
        ])}
      />
      <NavBar />
      <main className="flex-1">
        <article className="px-4 pt-16 sm:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="font-hand text-2xl text-coral-deep">the searchable version of me</p>
            <h1 className="mt-2 font-display text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl">
              Boobesh AG, content marketer and founder of Gari Tech in Chennai
            </h1>

            <p className="mt-6 font-body text-[18px] leading-[1.8] text-ink">
              Boobesh AG, called Boo by everyone, is a content marketer and
              young entrepreneur from Chennai. He founded the content marketing
              agency{" "}
              <Link href="/gari-tech" className="text-coral-deep underline">
                Gari Tech
              </Link>{" "}
              in February 2024, and he is Marketing Lead at Tribe Fortis and
              Marketing Manager at Your College Senior. He also does marketing
              for Proof and content for StoryIt. He started reselling online at
              15 and made his first one lakh rupees before turning 21.
            </p>

            <p className="mt-4 font-body text-[16px] leading-[1.8] text-ink-soft">
              This page is the plain, factual version. For the honest version,
              with the failures, read{" "}
              <Link href="/personal" className="text-coral-deep underline">
                who Boobesh is, actually
              </Link>
              .
            </p>

            <h2 className="mt-14 font-display text-2xl font-semibold text-ink">
              Boobesh AG at a glance
            </h2>
            <dl className="mt-5 divide-y divide-line border-y border-line">
              {facts.map(([k, v]) => (
                <div key={k} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="font-body text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
                    {k}
                  </dt>
                  <dd className="font-body text-[16px] leading-relaxed text-ink">{v}</dd>
                </div>
              ))}
            </dl>

            <h2 className="mt-14 font-display text-2xl font-semibold text-ink">
              What does Boobesh AG do?
            </h2>
            <p className="mt-3 font-body text-[17px] leading-[1.8] text-ink-soft">
              He does content marketing. That means content strategy and
              calendars, Instagram Reels scripts, LinkedIn posts, newsletters,
              brand positioning, and turning one long video into a week of
              content. He also leads small marketing teams and builds WordPress
              websites through Gari Tech, and he is learning backend
              development with Python and FastAPI.
            </p>

            <h2 className="mt-14 font-display text-2xl font-semibold text-ink">
              Boobesh AG&apos;s experience
            </h2>
            <ol className="mt-5 space-y-5">
              {roles.map((r) => (
                <li key={`${r.org}-${r.title}`} className="border-l-2 border-line pl-5">
                  <p className="font-display text-lg font-semibold text-ink">
                    {r.title}, {r.org}
                  </p>
                  <p className="font-body text-[12px] font-semibold uppercase tracking-wider text-ink-soft">
                    {r.period} · {r.location}
                  </p>
                </li>
              ))}
            </ol>

            <h2 className="mt-14 font-display text-2xl font-semibold text-ink">
              Where to find Boobesh AG online
            </h2>
            <ul className="mt-4 space-y-2 font-body text-[16px] text-ink-soft">
              <li>
                Boobesh LinkedIn:{" "}
                <a href={LINKEDIN} rel="me noopener" target="_blank" className="text-coral-deep underline">
                  linkedin.com/in/boobesh2912
                </a>
              </li>
              <li>
                X:{" "}
                <a href="https://www.x.com/buildwithboo" rel="me noopener" target="_blank" className="text-coral-deep underline">
                  @buildwithboo
                </a>
              </li>
              <li>
                Instagram:{" "}
                <a href="https://www.instagram.com/boobeshganesan" rel="me noopener" target="_blank" className="text-coral-deep underline">
                  @boobeshganesan
                </a>
              </li>
              <li>
                YouTube:{" "}
                <a href="https://www.youtube.com/@dreamsofboo" rel="me noopener" target="_blank" className="text-coral-deep underline">
                  @dreamsofboo
                </a>
              </li>
            </ul>
          </div>
        </article>

        <FaqList items={aboutFaq} heading="Questions about Boobesh AG" />
      </main>
      <Footer />
    </>
  );
}
