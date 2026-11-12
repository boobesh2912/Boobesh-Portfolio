import type { Metadata } from "next";
import PersonalExperience from "@/components/personal/PersonalExperience";
import { getBooks } from "@/content/books";
import { paginate } from "@/lib/paginate";

export const metadata: Metadata = {
  title: "the real me | Boobesh AG",
  description:
    "The unfiltered version. How Boobesh went from reselling kitchen utensils in 10th grade to leading marketing, and everything he is still figuring out.",
  alternates: { canonical: "https://boobesh.com/personal" },
  openGraph: {
    title: "who is Boobesh, actually?",
    description:
      "The unfiltered version, written for whoever reads it and for my future self.",
    url: "https://boobesh.com/personal",
    type: "article",
  },
};

export default function PersonalPage() {
  const dives = Object.fromEntries(
    getBooks().map((b) => [b.slug, { title: b.title, color: b.color, pages: paginate(b.blocks) }])
  );
  return (
    <div className="min-h-screen bg-night">
      <PersonalExperience dives={dives} />
    </div>
  );
}
