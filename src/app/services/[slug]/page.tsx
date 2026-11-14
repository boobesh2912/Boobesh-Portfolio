import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import FaqList from "@/components/FaqList";
import ContactButton from "@/components/ContactButton";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { AGENCY_ID, LINKEDIN, PERSON_ID, SITE } from "@/content/entity";
import { getService, services } from "@/content/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  const title = `${s.title} | Gari Tech`;
  const url = `${SITE}/services/${s.slug}`;
  return {
    title: { absolute: title },
    description: s.description,
    alternates: { canonical: url },
    openGraph: { title, description: s.description, url, type: "website" },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const url = `${SITE}/services/${s.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: s.title,
    description: s.description,
    url,
    serviceType: s.name,
    provider: { "@id": AGENCY_ID },
    areaServed: { "@type": "City", name: "Chennai" },
    offeredBy: { "@id": PERSON_ID },
  };

  return (
    <>
      <JsonLd data={schema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Boobesh AG", url: SITE },
          { name: "Services", url: `${SITE}/services` },
          { name: s.name, url },
        ])}
      />
      <NavBar />
      <main className="flex-1">
        <article className="px-4 pt-16 sm:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="font-body text-[12px] text-ink-soft">
              <Link href="/services" className="underline">Services</Link> / {s.name}
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl">
              {s.title}
            </h1>
            <p className="mt-6 font-body text-[18px] leading-[1.8] text-ink">{s.lead}</p>
            <p className="mt-4 font-body text-[15px] leading-[1.8] text-ink-soft">
              Run by{" "}
              <Link href="/about" className="text-coral-deep underline">Boobesh AG</Link>, founder of{" "}
              <Link href="/gari-tech" className="text-coral-deep underline">Gari Tech</Link>, a content
              marketing agency in Chennai.
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

            <h2 className="mt-16 font-display text-2xl font-semibold text-ink">What you get</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {s.gets.map(([t, d]) => (
                <li key={t} className="rounded-2xl border border-line bg-paper p-5">
                  <h3 className="font-display text-lg font-semibold text-ink">{t}</h3>
                  <p className="mt-1 font-body text-[15px] leading-relaxed text-ink-soft">{d}</p>
                </li>
              ))}
            </ul>

            <h2 className="mt-16 font-display text-2xl font-semibold text-ink">How it works</h2>
            <ol className="mt-5 space-y-3 font-body text-[16px] leading-[1.7] text-ink-soft">
              {s.how.map((h, i) => (
                <li key={h} className="flex gap-4">
                  <span className="font-display text-xl font-semibold text-coral-deep">{i + 1}</span>
                  <span>{h}</span>
                </li>
              ))}
            </ol>

            <h2 className="mt-16 font-display text-2xl font-semibold text-ink">
              Who this is for, and who it is not
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-sage/40 bg-sage/10 p-6">
                <h3 className="font-display text-lg font-semibold text-ink">A good fit if</h3>
                <ul className="mt-3 space-y-2 font-body text-[15px] leading-relaxed text-ink-soft">
                  {s.fit.map((f) => <li key={f}>{f}</li>)}
                </ul>
              </div>
              <div className="rounded-2xl border border-coral/40 bg-coral/10 p-6">
                <h3 className="font-display text-lg font-semibold text-ink">Probably not if</h3>
                <ul className="mt-3 space-y-2 font-body text-[15px] leading-relaxed text-ink-soft">
                  {s.notFit.map((f) => <li key={f}>{f}</li>)}
                </ul>
              </div>
            </div>

            <h2 className="mt-16 font-display text-2xl font-semibold text-ink">Proof you can check</h2>
            <p className="mt-4 font-body text-[16px] leading-[1.8] text-ink-soft">
              Gari Tech has six Google reviews, all five stars, and live websites you can open. Read the{" "}
              <Link href="/blog/gari-tech-case-studies" className="text-coral-deep underline">case studies</Link>{" "}
              and the{" "}
              <Link href="/blog/tribe-fortis-marketing-case-study" className="text-coral-deep underline">
                honest Tribe Fortis case study
              </Link>
              , which includes what did not work.
            </p>

            <h2 className="mt-16 font-display text-2xl font-semibold text-ink">Read more</h2>
            <ul className="mt-4 space-y-2 font-body text-[16px] text-ink-soft">
              {s.related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="text-coral-deep underline">{r.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-coral-deep underline">All Gari Tech services</Link>
              </li>
            </ul>
          </div>
        </article>

        <FaqList items={s.faq} heading={`Questions about ${s.name.toLowerCase()} in Chennai`} />
      </main>
      <Footer />
    </>
  );
}
