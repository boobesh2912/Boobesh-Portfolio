export type Schooling = {
  stage: string;
  place: string;
  where: string;
  course: string;
  detail: string;
};

export const schooling: Schooling[] = [
  {
    stage: "School",
    place: "Santhome Higher Secondary School",
    where: "Mylapore, Chennai",
    course: "Computer Science group",
    detail:
      "Picked Computer Science because the lab mattered more to me than the playground. This is also roughly when I broke my first PC by installing too much software on it.",
  },
  {
    stage: "College",
    place: "Panimalar Engineering College",
    where: "Chennai",
    course: "B.Tech, Computer Science and Business Systems",
    detail:
      "CSBS is half engineering, half business, which is unfairly close to how my head already worked. Started Gari Tech in first year and have been running it beside classes ever since.",
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
