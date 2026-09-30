import JsonLd, { faqSchema } from "@/components/JsonLd";
import type { Faq } from "@/content/entity";

/*
  Visible Q&A with matching FAQPage markup. Answers lead with the answer, in
  a sentence or two, which is the shape both people and answer engines lift.
  Native details elements: the text is in the HTML whether or not it is open.
*/
export default function FaqList({
  items,
  heading = "Questions people ask",
}: {
  items: Faq[];
  heading?: string;
}) {
  return (
    <section className="px-4 py-20 sm:px-8">
      <JsonLd data={faqSchema(items)} />
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          {heading}
        </h2>
        <div className="mt-8 divide-y divide-line border-y border-line">
          {items.map((f, i) => (
            <details key={f.q} className="group py-5" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden
                  className="mt-1 text-coral transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl font-body text-[16px] leading-[1.8] text-ink-soft">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
