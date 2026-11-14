import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ContactButton from "@/components/ContactButton";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { SITE } from "@/content/entity";
import { services } from "@/content/services";

const TITLE = "Content marketing, website and social media services in Chennai | Gari Tech";
const DESCRIPTION =
  "Everything Gari Tech does in Chennai: content marketing, social media management, Reels scripts and editing, WordPress websites, personal branding, design and Meta Ads support.";
const URL = `${SITE}/services`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, type: "website" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Boobesh AG", url: SITE },
          { name: "Services", url: URL },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Gari Tech services in Chennai",
          itemListElement: services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: s.title,
            url: `${SITE}/services/${s.slug}`,
          })),
        }}
      />
      <NavBar />
      <main className="flex-1 px-4 pb-24 pt-16 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="font-hand text-2xl text-coral-deep">what Gari Tech does</p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl">
            Services in Chennai
          </h1>
          <p className="mt-6 max-w-2xl font-body text-[17px] leading-[1.8] text-ink-soft">
            <Link href="/gari-tech" className="text-coral-deep underline">Gari Tech</Link> is a content marketing
            agency in Chennai founded by <Link href="/about" className="text-coral-deep underline">Boobesh AG</Link>.
            Pick the service you are looking for, or{" "}
            <Link href="/contact" className="text-coral-deep underline">get in touch</Link> and we will work out
            the right mix together.
          </p>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-paper p-6 transition-colors hover:border-coral/50"
                >
                  <h2 className="font-display text-xl font-semibold text-ink">{s.title}</h2>
                  <p className="mt-2 flex-1 font-body text-[15px] leading-[1.7] text-ink-soft">{s.description}</p>
                  <span className="mt-4 font-body text-sm font-semibold text-coral-deep">
                    read more <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-14">
            <ContactButton className="rounded-full bg-ink px-7 py-3.5 font-body text-sm font-semibold text-cream transition-transform hover:-translate-y-0.5">
              start a conversation
            </ContactButton>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
