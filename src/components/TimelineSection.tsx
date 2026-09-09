type Entry = {
  year: string;
  kind: "work" | "hustle" | "school";
  title: string;
  place: string;
  note: string;
};

const dotColor: Record<Entry["kind"], string> = {
  work: "bg-coral",
  hustle: "bg-butter",
  school: "bg-sage",
};

const kindLabel: Record<Entry["kind"], string> = {
  work: "on the job",
  hustle: "the hustle",
  school: "in school",
};

const entries: Entry[] = [
  {
    year: "now",
    kind: "work",
    title: "Backend Development Engineer Intern",
    place: "Python + FastAPI, virtual internship",
    note: "Learning how backend systems actually hold up in real projects, while building the YCS brand on the side. Systems on one hand, perception on the other.",
  },
  {
    year: "since first year of college",
    kind: "work",
    title: "Founder, GariTech",
    place: "design + web presence agency",
    note: "Started as a Canva design shop, grew into full web development after I told a client I knew WordPress before I had ever opened it. Learned it that same week.",
  },
  {
    year: "2025",
    kind: "work",
    title: "Start The Up",
    place: "a community I built, not a job I had",
    note: "Built a community to get students thinking like founders. Ran four webinars. Engagement dropped after, and it stopped. Still counts as real work.",
  },
  {
    year: "10th standard",
    kind: "hustle",
    title: "the Sharechat resell hustle",
    place: "kitchen utilities, sold to housewives on Sharechat",
    note: "Small money, first real lesson in sales. Where the curiosity for tech started mixing with an instinct for business.",
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
                className={`absolute -left-[2.55rem] top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-cream ${dotColor[entry.kind]}`}
              />
              <div
                className={`rounded-2xl border border-line bg-paper p-6 shadow-[0_4px_0_0_var(--line)] ${
                  i % 2 === 0 ? "rotate-[-0.5deg]" : "rotate-[0.5deg]"
                }`}
              >
                <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
                  {entry.year} · {kindLabel[entry.kind]}
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

        <p className="mt-10 text-center font-hand text-xl text-ink-soft">
          there is a lot more behind this timeline than four boxes can hold.{" "}
          <span className="text-coral-deep">that&apos;s what the corner is for.</span>
        </p>
      </div>
    </section>
  );
}
