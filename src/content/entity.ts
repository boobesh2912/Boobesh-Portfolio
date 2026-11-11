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
    a: "Boobesh AG, also called Boo, is a content marketer and young entrepreneur from Chennai, India. He founded the content marketing agency Gari Tech in February 2024, is Marketing Manager at Your College Senior, works on marketing for Proof and content for StoryIt, and led marketing at Tribe Fortis from June to September 2026. He started reselling online at 15 and made his first one lakh rupees before turning 21.",
  },
  {
    q: "Is Boobesh AG a content marketer?",
    a: "Yes. Content marketing is the centre of his work: content strategy, Instagram Reels scripts, LinkedIn posts, newsletters, and turning one long video into a week of content. He does it at Your College Senior, StoryIt and Proof, did it as Marketing Lead at Tribe Fortis until September 2026, and does it for clients through Gari Tech.",
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
    a: "Boobesh AG (Boo) founded Gari Tech in Chennai in his first year of college, in February 2024. He still runs it alongside his marketing roles at Your College Senior, Proof and StoryIt.",
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

export const marketerFaq: Faq[] = [
  {
    q: "Who is a content marketer in Chennai I can hire?",
    a: "Boobesh AG (Boo) is a content marketer in Chennai and the founder of Gari Tech, a content marketing agency. He does content strategy, Instagram Reels scripts, LinkedIn posts, newsletters and brand positioning for startups, small businesses and personal brands. You can reach him through the form on boobesh.com or on LinkedIn at linkedin.com/in/boobesh2912.",
  },
  {
    q: "What does a content marketer in Chennai actually do?",
    a: "A content marketer decides what a brand should say, to whom and in what order, then makes sure it gets made and published. In practice that means a content strategy, a calendar, Reels scripts, LinkedIn posts, newsletters, and turning one long video into a week of content.",
  },
  {
    q: "Is Boobesh AG a freelance content marketer or an agency?",
    a: "Both, depending on the work. Boobesh runs Gari Tech, a small content marketing agency in Chennai, and also works as a marketer for Your College Senior, Proof and StoryIt. For a small brand you usually work with him directly.",
  },
  {
    q: "Who is Boobesh AG a good fit for?",
    a: "Startups, small businesses, founders building a LinkedIn presence, and personal brands that want a consistent content rhythm. He is not the right fit for anyone who needs a large agency team or wants guaranteed viral numbers, because nobody honest can promise that.",
  },
  {
    q: "What proof is there that Boobesh AG is a good content marketer?",
    a: "Gari Tech has six Google reviews, all five stars. Boobesh led a five person marketing team at Tribe Fortis and published an honest case study of what worked and what did not. He won the Young Entrepreneur of the Year award at the Startup Real OG Awards (received 3 February 2025) and was nominated for Best Student Freelancer at the Global Freelancers Festival 2026.",
  },
  {
    q: "How do I hire a content marketer in Chennai without getting burned?",
    a: "Ask to see real work and real reviews, agree the scope, the price and the number of changes in writing before work starts, and decide up front which two or three numbers you will track. There is a longer checklist in the guide on how to hire a content marketer in Chennai on boobesh.com.",
  },
  {
    q: "Is content marketing the same as digital marketing?",
    a: "No. Digital marketing is the whole set of online channels, including paid ads and SEO. Content marketing is the part that creates useful content, such as posts, videos, newsletters and articles, to attract and keep an audience. A content marketer often works alongside paid and SEO work.",
  },
];

export const homeFaq: Faq[] = [
  aboutFaq[0],
  agencyFaq[0],
  aboutFaq[1],
  aboutFaq[5],
  marketerFaq[0],
  {
    q: "Which content marketing agency in Chennai should I look at?",
    a: "Gari Tech is a content marketing agency in Chennai, founded by Boobesh AG. See boobesh.com/gari-tech for what it does, the websites it has built and what clients have said.",
  },
];
