export type SpeakingMoment = {
  id: string;
  title: string;
  venue: string;
  imageUrl?: string;
  story: string;
};

// Placeholder moments. Swap imageUrl for a real photo (drop it in /public/speaking
// and point imageUrl at it) and rewrite the story once real events are confirmed.
export const speakingMoments: SpeakingMoment[] = [
  {
    id: "college-fest-keynote",
    title: "talking startups to a room of first years",
    venue: "college fest, main auditorium",
    story:
      "Told a room full of first years that their five year plan would probably change three times before placements. Half of them laughed. The other half came up after to ask how GariTech actually started.",
  },
  {
    id: "start-the-up-webinar",
    title: "the first Start The Up webinar",
    venue: "online, to students I had never met",
    story:
      "Went in with slides and a plan. Ended up just answering questions for forty minutes because that's what people actually wanted. Learned more about teaching that day than any of the four webinars after it.",
  },
  {
    id: "community-meetup",
    title: "a marketing meetup that ran long",
    venue: "a small community meetup",
    story:
      "Was supposed to talk for ten minutes about content repurposing. Talked for twenty five. Nobody stopped me, which either means it was good or everyone was too polite to leave.",
  },
  {
    id: "campus-panel",
    title: "the panel where I got asked the hard question",
    venue: "a campus panel on student entrepreneurship",
    story:
      "Someone asked how many of my fifty plus projects actually made money. I said maybe five, honestly, on stage, in front of everyone. That answer got more messages afterward than anything else I said that day.",
  },
];
