import Link from "next/link";
import { LINKEDIN } from "@/content/entity";

/*
  The short, quotable answer sits near the top of the page: a definition in
  the first couple of sentences, then the links a person (or an assistant
  checking who this is) would follow next.
*/
export default function QuickFacts() {
  return (
    <section className="px-4 pt-10 sm:px-8" aria-label="Boobesh AG in brief">
      <div className="mx-auto max-w-6xl rounded-2xl border border-line bg-paper px-6 py-6 sm:px-8">
        <p className="font-body text-[16px] leading-[1.8] text-ink">
          <strong className="font-semibold">Boobesh AG</strong> (Boo) is a
          content marketer and young entrepreneur from Chennai. He founded the
          content marketing agency{" "}
          <Link href="/gari-tech" className="font-semibold text-coral-deep underline">
            Gari Tech
          </Link>
          , is Marketing Lead at Tribe Fortis and Marketing Manager at Your
          College Senior, and studies at Panimalar Engineering College.
        </p>
        <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-body text-sm text-ink-soft">
          <Link href="/about" className="underline hover:text-coral">
            about Boobesh AG
          </Link>
          <Link href="/gari-tech" className="underline hover:text-coral">
            Gari Tech, content marketing agency in Chennai
          </Link>
          <a href={LINKEDIN} target="_blank" rel="me noopener" className="underline hover:text-coral">
            Boobesh LinkedIn
          </a>
        </p>
      </div>
    </section>
  );
}
