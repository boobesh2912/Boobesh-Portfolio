export type Schooling = {
  stage: string;
  place: string;
  detail: string;
};

/*
  Replace `place` with the real names once confirmed.
*/
export const schooling: Schooling[] = [
  {
    stage: "School",
    place: "Add your school name",
    detail:
      "Where the computer lab mattered more to me than the playground. I broke my first PC here by installing too much software.",
  },
  {
    stage: "College",
    place: "Add your college name",
    detail:
      "Started Gari Tech in my first year and have been running it alongside classes ever since. Most of what I know about marketing, I learned outside this classroom.",
  },
];

export type Teacher = {
  name: string;
  known: string;
  taught: string;
  /* Drop a square image at this path and the avatar fills itself in. */
  image: string;
};

export const teachers: Teacher[] = [
  {
    name: "Rahul M",
    known: "YouTube, 7.2L+ followers",
    taught:
      "The one I learned the most from. Watching how he explains things is a large part of how I think about content now.",
    image: "/shots/teacher-rahul.jpg",
  },
  {
    name: "Alex Hormozi",
    known: "Founder, author",
    taught:
      "Offers, pricing, and the idea that most businesses fail on clarity, not effort.",
    image: "/shots/teacher-hormozi.jpg",
  },
  {
    name: "Ali Abdaal",
    known: "YouTube, productivity",
    taught:
      "How to keep publishing without burning out, and how to make learning look easy on camera.",
    image: "/shots/teacher-ali.jpg",
  },
  {
    name: "G Surendar Thina",
    known: "Mentor",
    taught:
      "Straight advice at the points where I was overthinking the next move.",
    image: "/shots/teacher-surendar.jpg",
  },
];
