import type { Metadata } from "next";
import PersonalExperience from "@/components/personal/PersonalExperience";

export const metadata: Metadata = {
  title: "the real me — Boobesh AG",
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
  return (
    <div className="min-h-screen bg-night">
      <PersonalExperience />
    </div>
  );
}
