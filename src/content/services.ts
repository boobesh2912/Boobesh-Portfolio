import type { Faq } from "@/content/entity";

/*
  One entry per service Gari Tech really offers. Each becomes its own page at
  /services/<slug>, because a person searching for "social media management
  in Chennai" should land on a page about exactly that. Copy sticks to what
  is true: no invented prices, results or client counts.
*/
export type Service = {
  slug: string;
  name: string; // short label for cards and breadcrumbs
  title: string; // <title> and h1 style phrase
  description: string;
  lead: string;
  gets: [string, string][];
  how: string[];
  fit: string[];
  notFit: string[];
  related: { href: string; label: string }[];
  faq: Faq[];
};

export const services: Service[] = [
  {
    slug: "content-marketing-service-in-chennai",
    name: "Content marketing",
    title: "Content marketing service in Chennai",
    description:
      "Content strategy, calendars, scripts and publishing support from Gari Tech, a content marketing agency in Chennai founded by Boobesh AG.",
    lead: "Content marketing is deciding what your business should say, to whom and in what order, then making sure it actually gets made and published. Gari Tech does that for startups, small businesses and personal brands in Chennai.",
    gets: [
      ["A content strategy", "Who you are talking to, what they worry about, and the few topics you will be known for."],
      ["A content calendar", "A month planned in advance, built to survive a busy week rather than only a planning meeting."],
      ["The writing", "Posts, scripts, newsletters and captions that sound like a person talking, written from your real experience."],
      ["Repurposing", "One long video, talk or article turned into a week of posts, clips and threads."],
    ],
    how: [
      "A first call to understand your business, your customers and what you want content to do.",
      "Agreeing the goal, two or three numbers to track, the scope and the number of changes, in writing.",
      "A calendar for the first month, then content made and published on a steady rhythm.",
      "A short review each month: what worked, what did not, and what to change.",
    ],
    fit: [
      "You are a startup, small business or founder who wants a steady content rhythm.",
      "You want to work with the person who writes your content.",
      "You are happy to share real stories, because good content comes from them.",
    ],
    notFit: [
      "You need a large agency with many layers.",
      "You want guaranteed viral numbers. Nobody honest can promise that.",
    ],
    related: [
      { href: "/blog/content-marketing-strategy-for-startups", label: "Content marketing strategy for startups" },
      { href: "/blog/what-is-content-marketing", label: "What is content marketing" },
      { href: "/blog/marketer-in-chennai-first-30-days", label: "What the first 30 days with a marketer should look like" },
    ],
    faq: [
      {
        q: "What does a content marketing service in Chennai include?",
        a: "A strategy, a calendar, the actual writing and scripts, publishing support and a regular review. Gari Tech agrees the scope in writing before work starts so you know exactly what you are getting.",
      },
      {
        q: "How is content marketing different from social media marketing?",
        a: "Social media marketing is about running your accounts. Content marketing decides what you should say and then makes it work across channels, so one idea can become a LinkedIn post, a Reel, a newsletter and a page on your website.",
      },
      {
        q: "How long before content marketing shows results?",
        a: "It builds over months, not days. Early on you should see better engagement and clearer enquiries. Anyone who promises fast, guaranteed numbers is selling something.",
      },
      {
        q: "Who will actually write my content?",
        a: "For small brands you work directly with Boobesh AG, who runs Gari Tech. You always know who is writing your content.",
      },
    ],
  },
  {
    slug: "social-media-management-in-chennai",
    name: "Social media management",
    title: "Social media management in Chennai",
    description:
      "Social media management for small businesses and personal brands in Chennai: planning, posts, captions and consistent publishing from Gari Tech.",
    lead: "Social media management means someone plans, writes and publishes for your accounts so they stay active and sound like you. Gari Tech manages social media for small businesses and personal brands in Chennai.",
    gets: [
      ["A posting plan", "What goes out, when, and why, planned around your goals rather than the calendar of trending days."],
      ["Posts and captions", "Written in your voice, with a clear point for one clear reader."],
      ["Reels and short video support", "Scripts and editing coordination for short videos, so your video content is not an afterthought."],
      ["Consistent publishing", "A steady rhythm, because a quiet account looks like a closed shop."],
    ],
    how: [
      "We pick the one or two platforms that matter for your customers instead of spreading thin across five.",
      "You approve the plan, then content is prepared in batches.",
      "Posts go out on the agreed rhythm, and replies and ideas from your audience feed the next batch.",
      "A short monthly review shows what people responded to.",
    ],
    fit: [
      "You are a small business or personal brand with no time to post regularly.",
      "You want a consistent presence without a large agency.",
      "You can share real work, photos or stories to base content on.",
    ],
    notFit: [
      "You want followers bought or promised overnight.",
      "You need a round the clock customer service team on your accounts.",
    ],
    related: [
      { href: "/blog/content-marketing-vs-social-media-marketing", label: "Content marketing vs social media marketing" },
      { href: "/blog/do-i-need-a-website-or-is-instagram-enough-small-business-chennai", label: "Do I need a website or is Instagram enough" },
      { href: "/blog/content-calendars-out-of-spreadsheets", label: "Content calendars out of spreadsheets" },
    ],
    faq: [
      {
        q: "What does social media management include?",
        a: "Planning, writing posts and captions, coordinating short video, and publishing on a steady rhythm. The exact list is agreed in writing before work starts.",
      },
      {
        q: "Which platforms do you manage?",
        a: "Mainly Instagram and LinkedIn, where Gari Tech has most experience. The right choice depends on where your customers spend time.",
      },
      {
        q: "Can you guarantee followers or reach?",
        a: "No, and be careful with anyone who does. What can be promised is consistent, honest content and a clear review of what works.",
      },
      {
        q: "Is this the same as a Reels or video service?",
        a: "It overlaps. Short video is part of social media management here, and there is also a separate page on Reels scripts and video editing.",
      },
    ],
  },
  {
    slug: "reels-script-and-video-editing-in-chennai",
    name: "Reels scripts and video editing",
    title: "Instagram Reels scripts and video editing in Chennai",
    description:
      "Instagram Reels scripts and short video editing in Chennai from Gari Tech, for businesses, creators and founders who want video that is watched to the end.",
    lead: "A Reel lives or dies in the first seconds. Gari Tech writes Reels scripts and coordinates the editing so your short videos have a clear hook, a clear point and a reason to watch to the end.",
    gets: [
      ["Scripts", "A hook, the point and a close, written to be spoken naturally."],
      ["Editing support", "Cuts, captions and pacing so the video holds attention."],
      ["Repurposing", "Long videos and talks turned into several short clips instead of one."],
      ["A repeatable format", "A structure your team can reuse, so every Reel does not start from a blank page."],
    ],
    how: [
      "You tell us the topic, the audience and the goal of the video.",
      "A script is written and approved before anything is filmed.",
      "The footage is edited with captions and a clear structure.",
      "We review which videos held attention and adjust the next ones.",
    ],
    fit: [
      "You have something worth saying and want it told clearly on video.",
      "You are a founder, coach, fitness brand or small business starting with Reels.",
    ],
    notFit: [
      "You want a big film production crew.",
      "You expect every video to go viral. Some will, most will not, and that is normal.",
    ],
    related: [
      { href: "/blog/instagram-reels-script-framework", label: "Instagram Reels script framework" },
      { href: "/blog/the-hook-is-not-the-strategy", label: "The hook is not the strategy" },
    ],
    faq: [
      {
        q: "What does a Reels script service include?",
        a: "A written script with a hook, the main point and a closing line, ready for you to film or for a team to shoot.",
      },
      {
        q: "Do you also edit the videos?",
        a: "Editing support is part of the service, including cuts, captions and pacing. Gari Tech works with editors so the script and the final video stay consistent.",
      },
      {
        q: "How long should a Reel be?",
        a: "As long as it needs to be and no longer. A clear idea in the first seconds matters more than the exact length.",
      },
      {
        q: "Can you turn one long video into many Reels?",
        a: "Yes. Repurposing a single talk, podcast or interview into several short clips is one of the highest value things most teams skip.",
      },
    ],
  },
  {
    slug: "wordpress-website-development-in-chennai",
    name: "WordPress websites",
    title: "WordPress website development in Chennai",
    description:
      "WordPress websites built from the domain up in Chennai by Gari Tech, with a walkthrough so you can edit the site yourself afterwards.",
    lead: "Gari Tech builds WordPress websites for small businesses, personal brands and service professionals in Chennai. You get a clear, fast site and a walkthrough, so you can make basic edits without calling anyone.",
    gets: [
      ["A website built from the domain up", "Domain, hosting setup, design and build, with the domain registered in your name."],
      ["A clear structure", "Home, services, about, proof and a contact or booking page, written in the words your customers use."],
      ["Booking if you need it", "Online booking for service businesses such as counselling and coaching."],
      ["A handover walkthrough", "You are shown how to edit your own site, which is the part most people skip."],
    ],
    how: [
      "We agree what the site needs to do, the pages, the price and the number of changes, in writing.",
      "You send content and examples. We help with the words if you want.",
      "The site is built and reviewed with you over a few rounds of changes.",
      "At launch you get a walkthrough on editing it yourself.",
    ],
    fit: [
      "You are a small business, coach, counsellor or personal brand that needs a credible website.",
      "You want to own your domain and be able to edit your own pages.",
    ],
    notFit: [
      "You need a large custom web application or a big online store.",
      "You want the cheapest possible template with no thought for the content.",
    ],
    related: [
      { href: "/blog/wordpress-website-chennai-what-to-ask", label: "What to ask before getting a WordPress website built in Chennai" },
      { href: "/blog/gari-tech-case-studies", label: "Gari Tech case studies" },
      { href: "/blog/do-i-need-a-website-or-is-instagram-enough-small-business-chennai", label: "Do I need a website or is Instagram enough" },
    ],
    faq: [
      {
        q: "How much does a WordPress website cost in Chennai?",
        a: "It depends on the pages, features like booking, and how much writing you need help with. Gari Tech gives a total in writing before work starts, including the domain, hosting, number of pages, number of changes and any yearly costs.",
      },
      {
        q: "Will I own the website and the domain?",
        a: "Yes. The domain should be registered in your name, and the site is yours.",
      },
      {
        q: "Can I edit the website myself?",
        a: "Yes. A walkthrough at handover is part of the work. Clients have said this was one of the things they valued.",
      },
      {
        q: "Can I see websites you have built?",
        a: "Yes. Live examples include Speak With Ikigai, Pranav Mahi, Essential Counselling Center, Gurusthetics and Instyle Uniform. They are listed on the Gari Tech page.",
      },
    ],
  },
  {
    slug: "personal-branding-for-founders-in-chennai",
    name: "Personal branding and LinkedIn",
    title: "Personal branding and LinkedIn content for founders in Chennai",
    description:
      "Personal branding and LinkedIn content for founders, consultants and professionals in Chennai, written in your own voice from your real experience.",
    lead: "People buy from people they recognise. Gari Tech helps founders, consultants and professionals build a personal brand on LinkedIn with content that sounds like them and comes from real experience.",
    gets: [
      ["A clear positioning", "A one sentence answer to who you help and why you, so your content has a point."],
      ["LinkedIn posts in your voice", "Written from your stories and opinions, not a template."],
      ["A profile that backs it up", "Headline, about section and featured content that match what you post."],
      ["A steady rhythm", "A weekly plan you can keep up, because consistency beats bursts."],
    ],
    how: [
      "We talk through your work, your customers and the stories you tell in conversation.",
      "We settle your positioning and a few themes to be known for.",
      "Posts are drafted from your answers, you approve, and they go out on a steady rhythm.",
      "We review what got responses and do more of it.",
    ],
    fit: [
      "You are a founder, coach, consultant or professional whose customers check you out on LinkedIn.",
      "You are willing to share real experience and a point of view.",
    ],
    notFit: [
      "You want a ghostwriter who invents stories you did not live.",
      "You want thousands of followers without anyone who actually needs your work.",
    ],
    related: [
      { href: "/blog/linkedin-personal-branding-for-founders", label: "LinkedIn personal branding for founders" },
      { href: "/blog/why-your-linkedin-is-not-getting-you-internships", label: "Why your LinkedIn is not getting you internships" },
      { href: "/blog/how-to-get-clients-online-counsellor-coach-consultant-india", label: "How to get clients online as a counsellor, coach or consultant" },
    ],
    faq: [
      {
        q: "What is personal branding for founders?",
        a: "It is being known for something specific, so the right people think of you when they need it. In practice that is a clear positioning plus regular content that shows how you think.",
      },
      {
        q: "Will the posts sound like me?",
        a: "That is the aim. Posts are drafted from your own stories and answers, and you approve everything before it goes out.",
      },
      {
        q: "How often should a founder post on LinkedIn?",
        a: "A rhythm you can keep. One useful post a week, held for months, does more than a burst followed by silence.",
      },
      {
        q: "Have you taught LinkedIn before?",
        a: "Yes. Boobesh AG taught LinkedIn sessions to 100+ college students in 2026 and runs a paid LinkedIn bootcamp for students.",
      },
    ],
  },
  {
    slug: "graphic-design-and-branding-in-chennai",
    name: "Graphic design and branding",
    title: "Graphic design and branding in Chennai",
    description:
      "Posters, social media creatives and basic branding for small businesses in Chennai from Gari Tech, which started as a Canva design shop.",
    lead: "Gari Tech began as a Canva design shop in Boobesh's first year of college. Design is still part of the work: posters, social media creatives and simple branding that make a small business look like it means it.",
    gets: [
      ["Social media creatives", "Post and carousel designs that match your brand and are easy to reuse."],
      ["Posters and event material", "Clear, readable designs for events, launches and offers."],
      ["Basic branding", "Colours, fonts and a simple set of rules so everything looks like it belongs together."],
      ["Editable files", "Templates you can edit yourself, so small changes do not need a new order."],
    ],
    how: [
      "You share what you need, who it is for and any examples you like.",
      "A first design is made, then refined over an agreed number of changes.",
      "Final files are delivered in the formats you need.",
    ],
    fit: [
      "You are a small business, creator or community that needs consistent, clean designs.",
      "You want templates you can reuse.",
    ],
    notFit: [
      "You need a full brand identity project with a long research phase.",
    ],
    related: [
      { href: "/blog/how-i-started-gari-tech-student-entrepreneur-chennai", label: "How I started Gari Tech" },
      { href: "/blog/content-calendars-out-of-spreadsheets", label: "Content calendars out of spreadsheets" },
    ],
    faq: [
      {
        q: "Do you design logos?",
        a: "Gari Tech does simple branding such as colours, fonts and basic marks. For a full identity project with deep research, check whether it is the right fit first.",
      },
      {
        q: "What file formats do I get?",
        a: "The formats you need for social media and print, plus editable files where possible.",
      },
      {
        q: "How many changes can I ask for?",
        a: "The number is agreed in writing before work starts, so there are no surprises on either side.",
      },
    ],
  },
  {
    slug: "meta-ads-support-in-chennai",
    name: "Meta Ads support",
    title: "Meta Ads support for small businesses in Chennai",
    description:
      "Help setting up and running Meta (Facebook and Instagram) ads for small businesses in Chennai, alongside the content that makes ads work.",
    lead: "Ads send people to your content and your website, so they work best when those are ready. Gari Tech supports small businesses with Meta Ads setup alongside the content and pages the ads point to.",
    gets: [
      ["Ads account setup", "Business account, pixel and basics set up properly so tracking works."],
      ["Ad creatives and copy", "Designs and words for the ads, built from your real offer."],
      ["Landing page advice", "Pointing ads to a page that answers the customer, not just the homepage."],
      ["Simple reporting", "A plain explanation of what the numbers mean for your business."],
    ],
    how: [
      "We first check the offer, the page and the content the ads will lead to.",
      "A small test budget is agreed and the ads are set up.",
      "We review what the ads produced and adjust.",
    ],
    fit: [
      "You already have a clear offer and a website or page that explains it.",
      "You want help alongside content, not ads on their own.",
    ],
    notFit: [
      "You want to spend on ads before the website or offer is ready.",
      "You want a large performance marketing team.",
    ],
    related: [
      { href: "/blog/do-i-need-a-website-or-is-instagram-enough-small-business-chennai", label: "Do I need a website or is Instagram enough" },
      { href: "/blog/content-marketing-strategy-for-startups", label: "Content marketing strategy for startups" },
    ],
    faq: [
      {
        q: "Is Meta Ads support a full performance marketing service?",
        a: "No. It is support for small businesses, alongside content and website work. Gari Tech is a content marketing agency first, and says so plainly.",
      },
      {
        q: "Should I run ads before I have a website?",
        a: "Usually no. Ads send people somewhere, and a weak page wastes the money. Get the offer and the page right first.",
      },
      {
        q: "Can you promise leads?",
        a: "No. What can be promised is careful setup, clear creatives and an honest explanation of the results.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
