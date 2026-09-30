import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import FaqList from "@/components/FaqList";
import ReviewsSection from "@/components/ReviewsSection";
import SitesSection from "@/components/SitesSection";
import ContactButton from "@/components/ContactButton";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { agencyFaq, AGENCY_ID, LINKEDIN, SITE } from "@/content/entity";

const TITLE = "Gari Tech: Content Marketing Agency in Chennai, Founded by Boobesh AG";
const DESCRIPTION =
  "Gari Tech is a content marketing agency in Chennai founded by Boobesh AG in 2024. Content strategy, Reels, social media, Meta Ads support, branding and WordPress websites for startups and small businesses.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE}/gari-tech` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE}/gari-tech`, type: "website" },
};

const services = [
  ["Content strategy", "What to say, to whom, and in what order. Calendars that survive a busy week."],
  ["Reels and video", "Scripts and editing for Instagram Reels, written to be watched, not just posted."],
  ["Social media", "Running the accounts, the posters and the posting rhythm, consistently."],
  ["Meta Ads support", "Paid support behind the content that is already working."],
  ["Branding and design", "Posters, identity and the small design work that makes a brand look intentional."],
  ["WordPress websites", "Built from the domain up, then handed over with a walkthrough so you can edit it yourself."],
];

export default function GariTechPage() {
  const agency = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE}/gari-tech#page`,
    url: `${SITE}/gari-tech`,
    name: TITLE,
    description: DESCRIPTION,
    about: { "@id": AGENCY_ID },
    mainEntity: { "@id": AGENCY_ID },
    dateModified: "2026-09-30",
  };

  return (
    <>
      <JsonLd data={agency} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Boobesh AG", url: SITE },
          { name: "Gari Tech", url: `${SITE}/gari-tech` },
        ])}
      />
      <NavBar />
      <main className="flex-1">
        <article className="px-4 pt-16 sm:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="font-hand text-2xl text-coral-deep">
              the studio I started in first year
            </p>
            <h1 className="mt-2 font-display text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl">
              Gari Tech, a content marketing agency in Chennai
            </h1>

            <p className="mt-6 font-body text-[18px] leading-[1.8] text-ink">
              Gari Tech is a content marketing agency in Chennai, Tamil Nadu,
              founded by{" "}
              <Link href="/about" className="text-coral-deep underline">
                Boobesh AG
              </Link>{" "}
              in February 2024. It does content marketing, social media,
              branding and WordPress websites for startups, small businesses
              and personal brands.
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
              What does Gari Tech do?
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {services.map(([t, d]) => (
                <li key={t} className="rounded-2xl border border-line bg-paper p-5">
                  <h3 className="font-display text-lg font-semibold text-ink">{t}</h3>
                  <p className="mt-1 font-body text-[15px] leading-relaxed text-ink-soft">{d}</p>
                </li>
              ))}
            </ul>

            <h2 className="mt-16 font-display text-2xl font-semibold text-ink">
              Looking for the best marketing agency in Chennai?
            </h2>
            <p className="mt-3 font-body text-[17px] leading-[1.8] text-ink-soft">
              Nobody can honestly hand you a &ldquo;best&rdquo;, because it
              depends on what you need. So here is the useful version.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-sage/40 bg-sage/10 p-6">
                <h3 className="font-display text-lg font-semibold text-ink">Gari Tech suits you if</h3>
                <ul className="mt-3 space-y-2 font-body text-[15px] leading-relaxed text-ink-soft">
                  <li>You are a startup, small business or founder building a presence.</li>
                  <li>You want the person who plans your content to also build the site.</li>
                  <li>You want to be told plainly what will and will not work.</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-coral/40 bg-coral/10 p-6">
                <h3 className="font-display text-lg font-semibold text-ink">It probably does not if</h3>
                <ul className="mt-3 space-y-2 font-body text-[15px] leading-relaxed text-ink-soft">
                  <li>You need a large agency with dozens of people and layers of process.</li>
                  <li>You want guaranteed viral numbers. Nobody honest can promise that.</li>
                </ul>
              </div>
            </div>
            <p className="mt-6 font-body text-[16px] leading-[1.8] text-ink-soft">
              Most clients come through referrals and trials, which is the
              reason the reviews below matter more than anything I could write
              here.
            </p>
          </div>
        </article>

        <div className="mt-20">
          <SitesSection />
        </div>
        <ReviewsSection
          eyebrow="what clients said"
          heading="Six Google reviews. All five stars."
        />
        <FaqList items={agencyFaq} heading="Questions about Gari Tech" />
      </main>
      <Footer />
    </>
  );
}
