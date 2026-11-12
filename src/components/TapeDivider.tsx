/*
  A strip of tape across the page between two sections, slightly tilted and
  scrolling. Each one says something different, so the break between sections
  is part of the design rather than empty space.
*/
const tones = {
  ink: "bg-ink text-cream",
  coral: "bg-coral text-[#fff8ec]",
  butter: "bg-butter text-[#241a05]",
  sage: "bg-sage-deep text-[#f6f1e4]",
} as const;

export default function TapeDivider({
  items,
  tone = "ink",
  tilt = -1.6,
  reverse = false,
}: {
  items: string[];
  tone?: keyof typeof tones;
  tilt?: number;
  reverse?: boolean;
}) {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div aria-hidden className="relative z-20 -my-5 overflow-x-clip py-8">
      <div
        className={`relative -mx-6 flex w-[112%] items-center overflow-hidden py-3 shadow-[0_8px_24px_rgba(0,0,0,0.18)] ${tones[tone]}`}
        style={{ transform: `rotate(${tilt}deg)` }}
      >
        <div className="tape-edge pointer-events-none absolute inset-x-0 top-0 h-1 opacity-60" />
        <div
          className={`flex w-max gap-8 whitespace-nowrap ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}
        >
          {[...row, ...row].map((t, i) => (
            <span
              key={i}
              className="font-body text-[12px] font-bold uppercase tracking-[0.3em]"
            >
              {t} <span className="ml-8 opacity-60">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
