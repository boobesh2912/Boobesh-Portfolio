export type Role = {
  title: string;
  org: string;
  type: string;
  period: string;
  length: string;
  location: string;
  kind: "marketing" | "founder" | "engineering";
  bullets: string[];
  skills?: string[];
  featured?: boolean;
  video?: { src: string; poster: string; label: string };
  link?: { href: string; label: string };
};

export const roles: Role[] = [
  {
    title: "Marketing Manager",
    org: "Your College Senior",
    type: "Full-time",
    period: "Sep 2025 - Present",
    length: "1 yr 1 mo",
    location: "Remote",
    kind: "marketing",
    featured: true,
    bullets: [
      "Leading the content marketing strategy across LinkedIn, YouTube and the newsletter.",
      "Turning long form videos, podcasts and discussions into social content people actually watch.",
      "Writing LinkedIn posts, newsletters, captions and educational content for students and young professionals.",
      "Planning content calendars and working with editors so publishing stays consistent.",
      "Finding content opportunities, improving engagement and supporting campaigns.",
    ],
    skills: ["Marketing", "Script Writing", "Content Strategy", "Newsletters"],
  },
  {
    title: "Founder",
    org: "Gari Tech",
    type: "Full-time",
    period: "Feb 2024 - Present",
    length: "2 yrs 8 mos",
    location: "Chennai, Tamil Nadu · On-site",
    kind: "founder",
    bullets: [
      "Building Gari Tech to help startups and businesses grow their digital presence.",
      "Working with clients on website development, branding and online marketing.",
      "Leading projects across web development, content and business growth.",
      "Managing a team while balancing academics and running the business.",
      "Experimenting with startup ideas, automation systems and scalable digital products.",
    ],
    skills: ["SaaS", "WordPress", "Branding", "Team Management"],
    video: {
      src: "/videos/tejasvi-speak-with-ikigai-review.mp4",
      poster: "/videos/tejasvi-speak-with-ikigai-review.jpg",
      label: "Video review from Tejasvi R.A., Founder of Speak With Ikigai",
    },
  },
  {
    title: "Marketing Lead",
    org: "Tribe Fortis",
    type: "Full-time",
    period: "Jun 2026 - Sep 2026",
    length: "4 mos",
    location: "Chennai, Tamil Nadu · Remote",
    kind: "marketing",
    bullets: [
      "Led a five person marketing team: a videographer, editors, and designers who made the carousels.",
      "Wrote Instagram Reels scripts for three audiences: corporate wellness, adult fitness and kids.",
      "Wrote the brand's LinkedIn content, and moved the content mix from promotional heavy toward 80% value and 20% selling.",
      "Helped plan and scope brand events, including a networking collaboration with a founders' community.",
      "No KPI system was set up, so there is no data to prove what the work did. I wrote up what I learned.",
    ],
    link: {
      href: "/blog/tribe-fortis-marketing-case-study",
      label: "read the honest case study",
    },
  },
  {
    title: "Summer Intern",
    org: "Hexaware Technologies",
    type: "Internship",
    period: "Feb 2026 - Aug 2026",
    length: "7 mos",
    location: "Chennai, Tamil Nadu · Hybrid",
    kind: "engineering",
    bullets: [],
  },
  {
    title: "Founder",
    org: "Vizhva",
    type: "Full-time",
    period: "Jun 2025 - Jan 2026",
    length: "8 mos",
    location: "Remote",
    kind: "founder",
    bullets: [
      "Founded Vizhva, a learning initiative focused on how Gen Z students actually learn.",
      "Worked on product vision, micro learning concepts and user experience ideas.",
      "Researched engaging, practical approaches to modern education.",
      "Paused the project on purpose, to sharpen the vision and build better systems for later.",
    ],
  },
  {
    title: "Software Engineer Intern",
    org: "Agent42 Labs",
    type: "Internship",
    period: "Jun 2025 - Jul 2025",
    length: "2 mos",
    location: "Guindy, Tamil Nadu · Hybrid",
    kind: "engineering",
    bullets: [
      "Worked on the company website during its early development phase.",
      "Helped with website design, structure planning and WordPress development.",
      "Improved the brand's online presence through responsive pages.",
      "Built out layouts, content sections and basic optimisation.",
    ],
    skills: ["WordPress"],
  },
  {
    title: "AI Developer Intern",
    org: "Vulture Lines Tech Management",
    type: "Internship",
    period: "Jun 2025",
    length: "1 mo",
    location: "Chennai, Tamil Nadu · On-site",
    kind: "engineering",
    bullets: [
      "Built an AI web app that turns a single line prompt into a full kids story.",
      "Added full customisation for theme, genre, tone and narrative style.",
      "Integrated AI image generation for personalised story cover art.",
      "Built a narration system that reads the story aloud using voice AI.",
      "Focused on real time generation, UX and creative automation.",
    ],
  },
  {
    title: "Software Engineer",
    org: "Think42 Labs",
    type: "Internship",
    period: "Dec 2024 - Jan 2025",
    length: "2 mos",
    location: "Chennai, Tamil Nadu · On-site",
    kind: "engineering",
    bullets: [
      "Worked on a job portal system as my internship project.",
      "Built phase one of the platform, focusing on the core features.",
      "Developed a resume builder to help users create professional resumes.",
      "Implemented location based job search for finding relevant openings.",
      "Got hands on experience building functional, user centric web apps.",
    ],
    skills: ["WordPress", "PHP"],
  },
  {
    title: "Python Developer",
    org: "Cholamandalam Securities",
    type: "Internship",
    period: "Jun 2024 - Jul 2024",
    length: "2 mos",
    location: "Guindy, Tamil Nadu · On-site",
    kind: "engineering",
    bullets: [
      "Built a Python API that converts PDF files into images efficiently.",
      "Worked on bulk PDF processing automation to cut out manual effort.",
      "Improved the speed and scalability of PDF image extraction.",
      "Tested API endpoints and functionality using Postman.",
      "Worked with the team to keep integration and performance smooth.",
    ],
    skills: ["Python", "Flask", "REST APIs"],
  },
  {
    title: "Web Development Intern",
    org: "CodeBind Technologies",
    type: "Internship",
    period: "Jun 2024",
    length: "1 mo",
    location: "Chennai, Tamil Nadu · On-site",
    kind: "engineering",
    bullets: [
      "Built an employee leave management system as the internship project.",
      "Worked with HTML, CSS, JavaScript, PHP and MySQL.",
      "Took part in AI focused workshops and technical sessions.",
      "Sharpened problem solving and aptitude through assessments.",
    ],
    skills: ["Web Development"],
  },
];
