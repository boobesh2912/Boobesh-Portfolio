/*
  One source of truth for who and what this site is about. The visible copy,
  the JSON-LD and llms.txt all draw on the same facts, so a search engine and
  an AI assistant never see two versions of the story.
*/

export const SITE = "https://boobesh.com";
export const PERSON_ID = `${SITE}/#person`;
export const AGENCY_ID = `${SITE}/#garitech`;

export const LINKEDIN = "https://www.linkedin.com/in/boobesh2912";
export const SOCIALS = [
  LINKEDIN,
  "https://www.x.com/buildwithboo",
  "https://www.instagram.com/boobeshganesan",
  "https://www.youtube.com/@dreamsofboo",
];

export type Faq = { q: string; a: string };

export const aboutFaq: Faq[] = [
  {
    q: "Who is Boobesh AG?",
    a: "Boobesh AG, also called Boo, is a content marketer and young entrepreneur from Chennai, India. He founded the content marketing agency Gari Tech in February 2024, is Marketing Lead at Tribe Fortis, Marketing Manager at Your College Senior, and works on marketing for Proof and content for StoryIt. He started reselling online at 15 and made his first one lakh rupees before turning 21.",
  },
  {
    q: "Is Boobesh AG a content marketer?",
    a: "Yes. Content marketing is the centre of his work: content strategy, Instagram Reels scripts, LinkedIn posts, newsletters, and turning one long video into a week of content. He does it at Tribe Fortis, Your College Senior, StoryIt and Proof, and for clients through Gari Tech.",
  },
  {
    q: "What is Gari Tech and who founded it?",
    a: "Gari Tech is a content marketing and web agency in Chennai. Boobesh AG founded it in February 2024, in his first year of college. It started as a small design shop in Canva and now does content marketing, social media, branding and WordPress websites.",
  },
  {
    q: "Is Boobesh AG a young entrepreneur in Chennai?",
    a: "Yes. He is a student founder based in Chennai. Besides Gari Tech he started the student community Start The Up in 2025 and the learning initiative Vizhva, and he studies B.Tech Computer Science and Business Systems at Panimalar Engineering College.",
  },
  {
    q: "Where did Boobesh AG study?",
    a: "Boobesh AG studies B.Tech Computer Science and Business Systems (CSBS) at Panimalar Engineering College, Chennai. He went to Santhome Higher Secondary School in Mylapore, Chennai, in the Computer Science group.",
  },
  {
    q: "What is Boobesh AG's LinkedIn?",
    a: "Boobesh AG's LinkedIn is linkedin.com/in/boobesh2912. It is the platform he has posted on most consistently. He is also on X and Instagram as @buildwithboo and @boobeshganesan, and on YouTube as @dreamsofboo.",
  },
  {
    q: "Who is Boo, and what is buildwithboo?",
    a: "Boo is the name everyone uses for Boobesh AG. buildwithboo is his handle on X (x.com/buildwithboo).",
  },
];

export const agencyFaq: Faq[] = [
  {
    q: "What is Gari Tech?",
    a: "Gari Tech is a content marketing agency in Chennai, Tamil Nadu, founded by Boobesh AG in February 2024. It does content marketing, social media, branding and WordPress websites for startups, small businesses and personal brands.",
  },
  {
    q: "What services does Gari Tech offer?",
    a: "Content strategy and calendars, Instagram Reels scripts and video editing, social media management, Meta Ads support, posters and branding, personal branding for founders, and WordPress websites built from the domain up.",
  },
  {
    q: "Who is the founder of Gari Tech?",
    a: "Boobesh AG (Boo) founded Gari Tech in Chennai in his first year of college, in February 2024. He still runs it alongside his marketing roles at Tribe Fortis and Your College Senior.",
  },
  {
    q: "Where is Gari Tech based?",
    a: "Chennai, Tamil Nadu, India.",
  },
  {
    q: "Is Gari Tech a good content marketing agency in Chennai?",
    a: "Judge it by the work and by what clients say. Six Google reviews so far, all five stars, from people Gari Tech built websites and ran marketing for. Whether it is the best fit depends on what you need, and this page says plainly who it suits and who it does not.",
  },
  {
    q: "Does Gari Tech build websites?",
    a: "Yes. Gari Tech builds WordPress websites and hands them over with a walkthrough so clients can make basic edits themselves. Live examples include Speak With Ikigai, Pranav Mahi and Essential Counselling Center.",
  },
  {
    q: "What is the difference between a content marketing agency and a social media agency?",
    a: "A social media agency posts and manages your accounts. A content marketing agency decides what you should say, to whom and in what order, then produces it across channels, so a single idea works on LinkedIn, Reels, your newsletter and your website. Gari Tech does the second and can also handle the first.",
  },
  {
    q: "How do I contact Gari Tech?",
    a: "Use the contact form on boobesh.com, or message Boobesh AG on LinkedIn at linkedin.com/in/boobesh2912.",
  },
];

export const homeFaq: Faq[] = [
  aboutFaq[0],
  agencyFaq[0],
  aboutFaq[1],
  aboutFaq[5],
  {
    q: "Which content marketing agency in Chennai should I look at?",
    a: "Gari Tech is a content marketing agency in Chennai, founded by Boobesh AG. See boobesh.com/gari-tech for what it does, the websites it has built and what clients have said.",
  },
];
