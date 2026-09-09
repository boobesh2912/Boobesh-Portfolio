type Entry = {
  year: string;
  kind: "work" | "school";
  title: string;
  place: string;
  note: string;
};

const entries: Entry[] = [
  {
    year: "now",
    kind: "work",
    title: "Content Marketer",
    place: "your current company",
    note: "Owning the content engine end to end, from the first idea to the report that proves it worked.",
  },
  {
    year: "before that",
    kind: "work",
    title: "Marketing Associate",
    place: "previous company",
    note: "Learned that a good campaign is one part idea, three parts follow through.",
  },
  {
    year: "earlier",
    kind: "school",
    title: "Degree in your field",
    place: "your college",
    note: "Where the curiosity about why people click on some things and not others started.",
  },
];

export default function TimelineSection() {
  return (
    <section id="timeline" className="px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <p className="font-hand text-2xl text-coral-deep">how I got here</p>
          <h2 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">
            the timeline, roughly
          </h2>
        </div>

        <div className="relative border-l-2 border-dashed border-line pl-8">
          {entries.map((entry, i) => (
            <div key={entry.title} className="relative mb-10 last:mb-0">
              <span
                className={`absolute -left-[2.55rem] top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-cream text-xs ${
                  entry.kind === "work" ? "bg-coral" : "bg-sage"
                }`}
              />
              <div
                className={`rounded-2xl border border-line bg-paper p-6 shadow-[0_4px_0_0_var(--line)] ${
                  i % 2 === 0 ? "rotate-[-0.5deg]" : "rotate-[0.5deg]"
                }`}
              >
                <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
                  {entry.year} · {entry.kind === "work" ? "on the job" : "in school"}
                </p>
                <h3 className="mt-1 font-display text-xl font-bold text-ink">
                  {entry.title}
                </h3>
                <p className="font-body text-sm font-semibold text-coral-deep">
                  {entry.place}
                </p>
                <p className="mt-2 font-body text-sm text-ink-soft">{entry.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
