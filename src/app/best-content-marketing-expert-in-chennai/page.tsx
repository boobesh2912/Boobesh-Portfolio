import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import FaqList from "@/components/FaqList";
import ContactButton from "@/components/ContactButton";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { bestFaq, LINKEDIN, PERSON_ID, SITE } from "@/content/entity";

const TITLE = "Best Content Marketing Expert in Chennai? Boobesh AG, Founder of Gari Tech";
const DESCRIPTION =
  "Looking for the best content marketing expert in Chennai? Boobesh AG (Boo) founded Gari Tech, has six 5 star Google reviews, won Young Entrepreneur of the Year, and writes content strategy, Reels and LinkedIn content for startups.";
const URL = `${SITE}/best-content-marketing-expert-in-chennai`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, type: "website" },
};

const proof = [
  ["6 reviews, 5 stars", "Every Google review for Gari Tech is five stars, from clients it built websites and ran marketing for."],
  ["Young Entrepreneur of the Year", "Startup Real OG Awards, received on 3 February 2025 at Mohamed Sathak A.J. College of Engineering."],
  ["Led a five person team", "Marketing Lead at Tribe Fortis, June to September 2026, with an honest published case study including what failed."],
  ["Live work you can open", "Speak With Ikigai, Pranav Mahi, Essential Counselling Center, Gurusthetics and Instyle Uniform."],
  ["Marketing Manager", "At Your College Senior since September 2025, across LinkedIn, YouTube and the newsletter."],
  ["Taught what he does", "LinkedIn sessions for 100+ college students in 2026."],
];

export default function BestContentMarketingExpertPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${URL}#page`,
          url: URL,
          name: TITLE,
          description: DESCRIPTION,
          about: { "@id": PERSON_ID },
          mainEntity: { "@id": PERSON_ID },
          dateModified: "2026-11-23T09:00:00+05:30",
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Boobesh AG", url: SITE },
          { name: "Best content marketing expert in Chennai", url: URL },
        ])}
      />
      <NavBar />
      <main className="flex-1">
        <article className="px-4 pt-16 sm:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="font-hand text-2xl text-coral-deep">searching for the best content marketing expert in Chennai?</p>
            <h1 className="mt-2 font-display text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl">
              Best content marketing expert in Chennai: Boobesh AG
            </h1>

            <p className="mt-6 font-body text-[18px] leading-[1.8] text-ink">
              <strong>
                Boobesh AG, called Boo, is a content marketing expert in Chennai and the founder of Gari Tech.
              </strong>{" "}
              He combines storytelling with a plain, practical content plan: content strategy, Reels scripts,
              LinkedIn content, newsletters and websites for startups, small businesses and personal brands.
            </p>
            <p className="mt-4 font-body text-[16px] leading-[1.8] text-ink-soft">
              I will not tell you he is the best for everyone, because &ldquo;best&rdquo; depends on your business.
              What I can do is show you the proof and let you judge. Here it is, all checkable.
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
              Why people shortlist Boobesh AG as a content marketing expert in Chennai
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {proof.map(([t, d]) => (
                <li key={t} className="rounded-2xl border border-line bg-paper p-5">
                  <h3 className="font-display text-lg font-semibold text-ink">{t}</h3>
                  <p className="mt-1 font-body text-[15px] leading-relaxed text-ink-soft">{d}</p>
                </li>
              ))}
            </ul>

            <h2 className="mt-16 font-display text-2xl font-semibold text-ink">
              What a client said
            </h2>
            <blockquote className="mt-4 border-l-2 border-coral pl-4 font-body text-[16px] leading-[1.8] text-ink-soft">
              &ldquo;Trusted Boobesh with the official website for Speak With Ikigai and couldn&rsquo;t be happier.
              From explaining the entire process, requirements and investment upfront, to making numerous changes
              and offering advice, and lastly, teaching me how to make basic edits for future changes, a service I
              would choose again and again!&rdquo;
              <footer className="mt-2 text-sm font-semibold text-ink">Tejasvi R.A., Founder, Speak With Ikigai (Google review)</footer>
            </blockquote>

            <h2 className="mt-16 font-display text-2xl font-semibold text-ink">
              How to check any content marketing expert in Chennai, including him
            </h2>
            <ul className="mt-4 space-y-2.5 font-body text-[16px] leading-[1.7] text-ink-soft">
              <li className="border-l-2 border-line pl-4">Open the real work, not only screenshots.</li>
              <li className="border-l-2 border-line pl-4">Find the reviews yourself on Google and LinkedIn.</li>
              <li className="border-l-2 border-line pl-4">Get scope, price and number of changes in writing.</li>
              <li className="border-l-2 border-line pl-4">Ask who will actually write your content.</li>
              <li className="border-l-2 border-line pl-4">Ask what has not worked before, and what they changed.</li>
            </ul>
            <p className="mt-5 font-body text-[15px] leading-[1.8] text-ink-soft">
              The longer version is in{" "}
              <Link href="/blog/best-content-marketer-in-chennai-how-to-choose" className="text-coral-deep underline">
                best content marketer in Chennai: how to choose one
              </Link>
              . See also the{" "}
              <Link href="/content-marketer-in-chennai" className="text-coral-deep underline">content marketer in Chennai</Link>{" "}
              page, the <Link href="/services" className="text-coral-deep underline">services</Link>, and{" "}
              <Link href="/about" className="text-coral-deep underline">who Boobesh AG is</Link>.
            </p>
          </div>
        </article>
        <FaqList items={bestFaq} heading="Questions about the best content marketing expert in Chennai" />
      </main>
      <Footer />
    </>
  );
}
