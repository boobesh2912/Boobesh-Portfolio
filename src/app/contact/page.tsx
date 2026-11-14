import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ContactButton from "@/components/ContactButton";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { LINKEDIN, PERSON_ID, SITE } from "@/content/entity";

const TITLE = "Contact Boobesh AG and Gari Tech, Chennai";
const DESCRIPTION =
  "How to contact Boobesh AG (Boo), content marketer in Chennai and founder of Gari Tech: the contact form, LinkedIn and what to include in your first message.";
const URL = `${SITE}/contact`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, type: "website" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "@id": `${URL}#page`,
          url: URL,
          name: TITLE,
          about: { "@id": PERSON_ID },
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Boobesh AG", url: SITE },
          { name: "Contact", url: URL },
        ])}
      />
      <NavBar />
      <main className="flex-1 px-4 pb-24 pt-16 sm:px-8">
        <div className="mx-auto max-w-2xl">
          <p className="font-hand text-2xl text-coral-deep">say hi</p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl">
            Contact Boobesh AG
          </h1>
          <p className="mt-6 font-body text-[17px] leading-[1.8] text-ink">
            I am Boobesh, aka Boo, a content marketer in Chennai and the founder of{" "}
            <Link href="/gari-tech" className="text-coral-deep underline">Gari Tech</Link>. The quickest way to
            reach me is the form below or a message on LinkedIn.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ContactButton className="rounded-full bg-ink px-7 py-3.5 font-body text-sm font-semibold text-cream transition-transform hover:-translate-y-0.5">
              open the contact form
            </ContactButton>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener"
              className="rounded-full border border-line px-7 py-3.5 font-body text-sm font-semibold text-ink transition-colors hover:border-coral hover:text-coral"
            >
              Message on LinkedIn
            </a>
          </div>

          <h2 className="mt-14 font-display text-2xl font-semibold text-ink">What to put in your first message</h2>
          <ul className="mt-4 space-y-2.5 font-body text-[16px] leading-[1.7] text-ink-soft">
            <li className="border-l-2 border-line pl-4">What your business does and who it is for.</li>
            <li className="border-l-2 border-line pl-4">What you want help with, for example content, a website or social media.</li>
            <li className="border-l-2 border-line pl-4">Your timeline, and anything you have already tried.</li>
          </ul>
          <p className="mt-6 font-body text-[15px] leading-[1.8] text-ink-soft">
            I will tell you honestly whether I am the right fit. See{" "}
            <Link href="/services" className="text-coral-deep underline">everything Gari Tech does</Link>, or read{" "}
            <Link href="/blog/how-to-hire-a-content-marketer-in-chennai" className="text-coral-deep underline">
              how to hire a content marketer in Chennai
            </Link>{" "}
            before you decide.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
