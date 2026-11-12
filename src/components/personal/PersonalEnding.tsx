import Link from "next/link";

/* The last thing on the page: a way back out. */
export default function PersonalEnding() {
  return (
    <section className="relative mt-12 pb-28 pt-8 text-center">
      <Link
        href="/"
        className="inline-block rounded-full border border-moon/20 px-7 py-3 font-body text-sm font-semibold text-moon/80 transition-colors hover:bg-moon hover:text-night"
      >
        close the door
      </Link>
      <p className="mt-6 font-hand text-lg text-moon/40">see you on the other side</p>
    </section>
  );
}
