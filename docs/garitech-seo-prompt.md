# Prompt: make garitech.co.in the first result for content marketing in Chennai

Copy everything below the line into a new Claude Code session opened in the garitech.co.in repository.

---

You are working on **garitech.co.in**, the website of **Gari Tech**, a content marketing agency in Chennai, Tamil Nadu, India, founded by **Boobesh AG (Boo)** in February 2024. Your job is to do for this site what we have already done for his personal site, boobesh.com: SEO, GEO (AI answer engine visibility), local SEO, accessibility, image optimisation, performance, sitemap, indexing and a large body of useful blog content, so that Gari Tech appears first when someone searches for a problem it solves or for an agency.

Work directly on `main`. Commit in small, clear commits and push each one. Never force push. Never commit secrets, tokens or passwords.

## 0. The goal, in plain words

When any of these are searched on Google, Bing, ChatGPT, Claude, Perplexity or Google AI Overviews, garitech.co.in (or one of its blog posts) should be the answer, or among the first:

- content marketing agency in Chennai
- marketing agency in Chennai
- best marketing agency in Mylapore
- marketing agency in Mylapore
- digital marketing agency in Mylapore / Chennai (only if honest, see rules)
- social media management in Chennai
- Instagram Reels script writer / video editing in Chennai
- WordPress website development in Chennai
- website for a small business / counsellor / coach in Chennai
- personal branding and LinkedIn content for founders in Chennai
- and the questions people ask before hiring: how much does a website cost in Chennai, do I need a website or is Instagram enough, how to get clients online as a counsellor or coach, how to choose a marketing agency in Chennai, content ideas for small businesses, why is my Instagram not growing

Nobody can guarantee rank 1, and you must never claim it. The job is to do every legitimate thing that makes ranking first possible, then measure.

## 1. Hard rules (read twice)

1. **Do not invent facts.** No fake clients, reviews, numbers, awards, prices, addresses, team members, years or results. If a fact is not in this prompt or in the repository, ask the owner before using it. If you must leave a gap, leave a clearly marked TODO in a file, not invented copy on the live site.
2. **No keyword stuffing and no hidden text.** No white-on-white text, no text hidden with CSS, no invisible keyword blocks, no comment spam, no repeating a phrase unnaturally. Every keyword must sit in visible, natural, useful copy. If you are tempted to hide something, write a visible sentence instead.
3. **No em dashes anywhere on the site.** Use commas, full stops or colons.
4. **Honest tone.** The brand voice is warm, plain and a little casual. It says plainly who Gari Tech is for and who it is not for. It does not promise viral numbers or guaranteed rankings. "Best" is something to earn, not to claim: write "how to choose" content and let proof do the work.
5. **Never promise or imply a physical Mylapore office unless the owner confirms the address.** Ask for the real address, whether it is a service-area business or has a public office, and the opening hours. Until then, write "serving businesses in Mylapore and across Chennai", not "located in Mylapore".
6. **Respect the existing design.** The site has its own look. Do not redesign unless something is broken. Improve content, structure, speed and accessibility.
7. **Show your work.** Before and after: run Lighthouse, record scores in the final report. Do not claim a score you did not measure.
8. **Privacy.** Do not put the owner's personal phone number or private email in new places unless they are already public on the site.

## 2. Facts you may use (all verified)

**Gari Tech**
- Content marketing agency in Chennai, Tamil Nadu, India. Website: https://garitech.co.in
- Founded by Boobesh AG (Boo) in February 2024, in his first year of college. It started as a Canva design shop and grew into content, social media and web work.
- Services: content strategy and calendars, Instagram Reels scripts and video editing, social media management, Meta Ads support, posters and branding, personal branding and LinkedIn content for founders, WordPress websites built from the domain up with a walkthrough so clients can edit their own sites.
- Works mostly through referrals and trials. Six Google reviews, all five stars.
- Live websites it built: Speak With Ikigai (speakwithikigai.com, 2026, WordPress and Elementor), Pranav Mahi (pranavmahi.com, 2025, WordPress and Elementor), Essential Counselling Center (essentialcounselling.in, 2025, WordPress with online booking), Gurusthetics (gurusthetics.com, 2025, a fitness creator's site, WordPress, Elementor, Rank Math SEO), Instyle Uniform (instyleuniform.com, 2024, a uniform manufacturer), XY Digital Axis (an agency website, reviewed in August 2025), and Gari Tech's own site.
- Marketing support: Zancafe Ramapuram.
- Client quote (Tejasvi R.A., Founder, Speak With Ikigai, Google review): "Trusted Boobesh with the official website for Speak With Ikigai and couldn't be happier. From explaining the entire process, requirements and investment upfront, to making numerous changes and offering advice, and lastly, teaching me how to make basic edits for future changes, a service I would choose again and again!" She also recorded a video review.
- Client quote (Balasubramani K, XY Digital Axis, Google review, August 2025): "Really happy with Gari Tech, Growth Lab for creating our agency website (XY Digital Axis). The whole process was easy and simple, and the website looks great. I truly appreciate their work and the support from the team."
- First ever client: Aldo Einsty, a psychologist and founder of Mindful Mindvoice (named with permission). Found through a free website offer in a Chennai freelancers WhatsApp group. First payment 1,500 rupees for the website, which was too little. Later: social media management, 3 Reel scripts, 2 edited videos and 20 posts.

**Founder**
- Boobesh AG, called Boo, Chennai. Content marketer and young entrepreneur. Marketing Manager at Your College Senior (since September 2025), marketing for Proof, content for StoryIt. Marketing Lead at Tribe Fortis from June to September 2026 (led a five person team, wrote an honest case study of what worked and what did not). Started reselling online at 15. Studies B.Tech Computer Science and Business Systems at Panimalar Engineering College, Chennai.
- Young Entrepreneur of the Year, Startup Real OG Awards, received 3 February 2025 (the certificate says 2024). Nominated for Best Student Freelancer, Global Freelancers Festival 2026. Finalist, National Entrepreneurship Challenge, E-Cell IIT Bombay, December 2025.
- Taught LinkedIn sessions to 100+ college students in 2026.
- Personal site: https://boobesh.com (link to it where natural, and make sure boobesh.com links back to garitech.co.in with the same entity name).
- LinkedIn: https://www.linkedin.com/in/boobesh2912

If you need something not listed here, ask.

## 3. Step 1: audit before you touch anything

1. Identify the stack (framework, router, how pages are rendered, hosting, how blog content is stored). **This matters a lot.** If the site is a client-side rendered single page app (for example Vite with React and no server rendering), search engines and AI crawlers may see an almost empty HTML file. In that case the first and most important task is to make every page return real HTML with its own title, description, canonical, headings, body text and JSON-LD: static prerendering, server rendering or moving key pages to a framework such as Next.js. Choose the smallest change that works, explain the choice, and verify with `curl` that the raw HTML contains the content.
2. Crawl every route. Produce a table: URL, title, meta description, canonical, H1, word count, images without alt, status code, in sitemap yes/no, indexable yes/no.
3. Run Lighthouse for mobile and desktop on the home page and two inner pages. Save the scores.
4. Check domain setup: is the apex (garitech.co.in) the primary, and does www redirect to it (or the other way round) with a single 301/308? Canonicals, sitemap, schema and internal links must all use the same version. Mismatches cause "Couldn't fetch" sitemap errors and "Page with redirect" reports.
5. Check robots.txt, sitemap.xml, llms.txt, favicon, 404 page, HTTPS and security headers.
6. List everything missing against sections 4 to 11, and fix it in order of impact.

## 4. Step 2: technical SEO

- **One H1 per page**, containing the page's main topic in natural words. Logical H2 and H3 below it.
- **Unique title (about 50 to 60 characters) and meta description (about 140 to 160)** for every page, each written for a person and including the primary keyword once. Use the form "Primary keyword: what it is | Gari Tech".
- **Canonical URL** on every page, absolute, matching the primary host.
- **Open Graph and Twitter cards** on every page, with a real image (1200x630, WebP or JPG, under 200 KB) per important page.
- **sitemap.xml**: every indexable URL, absolute URLs on the primary host, real `lastmod` dates that change only when the page really changes (never "now" on every build), priority and changefreq sensible. Reference it in robots.txt. If the site is very small, one file is enough, no sitemap index needed.
- **robots.txt**: allow everything public, disallow admin and API paths, list the sitemap. Explicitly allow the AI search and citation crawlers: OAI-SearchBot, ChatGPT-User, GPTBot, Claude-SearchBot, Claude-User, ClaudeBot, PerplexityBot, Perplexity-User, Google-Extended, Applebot, Applebot-Extended, Bingbot, CCBot, cohere-ai. Remember that a named user-agent group replaces the wildcard group, so repeat the disallow lines in it.
- **llms.txt** at the root: a Markdown file starting with an H1, a one paragraph summary, short direct answers to the common questions, a facts list, and a Links section where every entry is a proper Markdown link `- [Title](https://url)`. Lighthouse's agentic audit fails if there are no links. Keep it in sync with the site.
- **Security headers** (in the host's config): Strict-Transport-Security with includeSubDomains and preload, X-Frame-Options SAMEORIGIN, Content-Security-Policy `frame-ancestors 'self'`, Cross-Origin-Opener-Policy `same-origin-allow-popups`, X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin. Do not add a strict CSP without testing the analytics script.
- **404 page** that is useful and returns a real 404 status.
- **Clean URLs**: lowercase, hyphenated, descriptive, no query strings for content, no trailing slash inconsistencies.
- **Internal linking**: every blog post links to 2 to 4 relevant services or posts; every service page links to relevant posts, the case studies and the contact page; the home page links to all service pages. No orphan pages.

## 5. Step 3: structured data (JSON-LD, only what is visible on the page)

- Site-wide `@graph`: `Organization`/`ProfessionalService` for Gari Tech with `name`, `alternateName` ("GariTech"), `url`, `logo`, `image`, `description`, `foundingDate` 2024-02, `founder` (link to the Person), `areaServed` (City: Chennai; also AdministrativeArea Tamil Nadu; add Mylapore as a `Place`/neighbourhood in the description or `areaServed` only if appropriate), `knowsAbout`, `sameAs` (LinkedIn page, Instagram, boobesh.com, any Google Business Profile URL once it exists), and `contactPoint`. Add `address` and `geo` only with a confirmed real address. Add `aggregateRating` only if the six Google reviews can be shown on the page and the ratings are accurate (6 reviews, 5 stars). If in doubt, leave it out.
- `Person` for Boobesh AG on the About/founder page, with `sameAs` pointing to boobesh.com and LinkedIn, matching the entity on boobesh.com so the two sites reinforce each other.
- `Service` for each service page, with `provider`, `areaServed`, `serviceType`, `description`.
- `BreadcrumbList` on every inner page.
- `FAQPage` on pages that have a visible FAQ (answers must match visible text).
- `BlogPosting` on posts: `headline`, `description`, `image`, `datePublished` and `dateModified` as **full ISO 8601 datetimes with a timezone** (for example `2026-11-15T09:00:00+05:30`, date-only values cause Search Console warnings), `author`, `publisher`, `mainEntityOfPage`.
- `Review`/`Rating` only for real reviews shown on the page.
- Validate with Google's Rich Results Test and the Schema.org validator logic; fix any error.

## 6. Step 4: local SEO (Chennai and Mylapore)

- Create dedicated, genuinely useful pages, not thin doorway pages:
  - `/content-marketing-agency-in-chennai` (the main money page)
  - `/marketing-agency-in-mylapore` (explain honestly how Gari Tech serves Mylapore businesses: shops, clinics, counsellors, coaching centres, restaurants, tuition and training centres, boutiques. Mention real local context only if true, and never invent landmarks, offices or clients in Mylapore.)
  - Optionally one page per other Chennai area ONLY if there is real, different content for each (for example T Nagar, Adyar, Alwarpet, Anna Nagar). If the pages would be near copies of each other, do not create them.
- Each local page needs: a clear H1, a direct answer in the first 2 sentences, what the agency does for businesses in that area, who it is for and not for, relevant proof and case studies, a short FAQ, internal links to the matching service pages and posts, and a contact call to action.
- Add NAP consistency rules (name, address, phone) across site, schema, footer and profiles once the address is confirmed.
- Write a step by step guide for the owner (a short markdown file in `docs/`) for: creating and verifying the Google Business Profile (service area business if no public office), choosing categories (Marketing agency, Internet marketing service, Social media agency, Website designer), adding services, photos, posts and Q&A, collecting and replying to reviews, and getting the six existing reviewers to leave the same review on the Business Profile. Also: Bing Places, and a list of honest citation sources (JustDial, Sulekha, IndiaMART where relevant, Clutch, GoodFirms, LinkedIn company page, Instagram, Crunchbase).
- Link Gari Tech's site from every owned profile, and ask the owner for any community or event pages where Gari Tech or Boobesh is mentioned so a link can be requested (real mentions only).

## 7. Step 5: service pages

Create one page per real service, each a proper landing page (about 600 to 1,000 words of unique copy, not a template with swapped words):

1. Content marketing service in Chennai
2. Social media management in Chennai
3. Instagram Reels scripts and video editing in Chennai
4. WordPress website development in Chennai
5. Personal branding and LinkedIn content for founders in Chennai
6. Graphic design and branding in Chennai
7. Meta Ads support in Chennai (keep it modest: support alongside content, not a full performance team)

Do NOT add services Gari Tech does not offer (for example SEO, PPC or email marketing) unless the owner confirms. Each service page structure: H1, lead answer, what you get, how it works step by step, who it is for and not for, proof and case studies, related posts, FAQ with schema, call to action. Add a `/services` index page and a `/contact` page. Put services in the main navigation and footer.

## 8. Step 6: blog content (the big one)

Write **at least 24 posts**, then keep a backlog of 30 more. Every post must be long, detailed and genuinely useful: **1,500 to 2,500 words**, written by someone who actually does this work, using the real facts above, real examples and honest lessons, including mistakes. Write in first person as Boobesh or "we" as Gari Tech where natural. Plain, warm, slightly casual. No filler, no padding, no AI-sounding phrases ("in today's fast-paced world", "unlock", "delve", "game-changer").

**Structure of every post**
1. Title written as the question or problem the reader typed, with the primary keyword.
2. A bold "The short answer" paragraph in the first 100 words that fully answers the question (this is what Google and AI assistants quote).
3. A short, honest note on bias where relevant ("I run an agency, so I am biased, here is how to judge anyone").
4. H2 sections that are themselves questions or clear steps, each starting with the answer.
5. At least one real example from Gari Tech's work (Speak With Ikigai, Essential Counselling Center, Pranav Mahi, Gurusthetics, Instyle Uniform, Zancafe, Aldo's story, Tribe Fortis lessons) used only as far as the facts above allow. No results or numbers that are not in this prompt.
6. A "mistakes people make" or "red flags" section.
7. A simple checklist or step by step plan the reader can use today.
8. A 5 to 8 question FAQ at the end (also output as FAQPage schema).
9. Internal links to 3 to 5 other pages (services, case studies, related posts) and 1 or 2 authoritative external links where useful.
10. Author box linking to Boobesh's profile and boobesh.com.
11. Meta title, meta description, slug, excerpt, tags, a featured image (WebP) with real alt text, and `datePublished` spread across realistic dates (do not backdate before 2026-11 or fake older posts).

**Topic list (start here; adjust to search demand)**

*Agency and local intent*
1. Content marketing agency in Chennai: what you actually get and what it costs to ask
2. How to choose a marketing agency in Chennai (10 questions to ask, red flags)
3. Marketing agency in Mylapore: what local businesses should look for
4. Content marketing vs digital marketing vs social media marketing: which does a small business need first
5. How to hire a content marketer in Chennai without getting burned
6. Freelancer, small agency or in-house marketer: how to decide
7. What the first 30 days with a marketing agency should look like

*Problems small businesses search*
8. Why your Instagram is not growing (and what to fix first)
9. Do I need a website or is Instagram enough
10. How to get more enquiries for a small business without ads
11. Content ideas for small businesses: 50 ideas by business type
12. How to plan a month of content in one afternoon (calendar template)
13. Why your posts get likes but no customers
14. How to repurpose one video into a week of content
15. Instagram Reels script framework: hook, point, close, with examples

*Websites*
16. How much does a website cost in Chennai: what changes the price (no invented prices, explain factors and how to compare quotes)
17. What to ask before getting a WordPress website built in Chennai
18. WordPress vs Wix vs custom code for a small business
19. Website for a counsellor, coach or clinic: what it needs
20. Website checklist before launch (SEO, speed, mobile, booking, backups)

*Personal branding and LinkedIn*
21. LinkedIn personal branding for founders: a 30 day plan
22. How to get clients online as a counsellor, coach or consultant in India
23. Founder branding mistakes that cost you trust

*Proof and story*
24. Gari Tech case studies: what we built and what clients said (update the existing one)
25. How a Canva shop became a content marketing agency in Chennai (founder story)
26. What I got wrong with my first client (Aldo's story, honest lessons)
27. What the Tribe Fortis marketing case study taught us

Use keyword research honestly: look at the autocomplete, "People also ask" and related searches for each topic, and fold the real questions into the H2s and FAQ. Do not make up search volumes.

## 9. Step 7: images

- Convert all raster images to WebP (or AVIF with fallback), resize to the largest displayed size times 2, quality about 75 to 80. Keep each image under about 100 KB, hero under about 150 KB.
- Every `<img>` has meaningful `alt` text describing what is in it (decorative images get empty alt), explicit `width` and `height` to prevent layout shift, `decoding="async"`, and `loading="lazy"` except the single largest above-the-fold image, which gets `fetchpriority="high"` and no lazy loading.
- Descriptive file names (`speak-with-ikigai-website.webp`, not `IMG_2034.png`).
- Screenshots of client websites: real screenshots, cropped without browser chrome, with alt like "Screenshot of the Speak With Ikigai website, built by Gari Tech".
- Add `images` to sitemap entries or an image sitemap for important pages.
- A proper favicon set, an apple-touch-icon and a 1200x630 Open Graph image for the home page and each service page.
- Remove unused images from the repository and fix any 404 image requests (check the browser console).

## 10. Step 8: performance and accessibility

Targets, measured with Lighthouse on mobile and desktop: Performance 90 or higher (aim higher), Accessibility 100, Best Practices 100, SEO 100, and Agentic browsing passing.

- Fix LCP: preload or prioritise the hero image, serve it as WebP at the right size, avoid lazy loading it, avoid a long intro or loading screen that hides the page.
- Fix TBT and main thread work: code split, load third party scripts (analytics, chat widgets) after the page is idle, remove unused JavaScript and libraries, avoid heavy animation libraries on first load, defer large JSON or animation files.
- Inline critical CSS or reduce render blocking CSS where the framework allows.
- Fonts: self-host or use the framework's font optimisation, `font-display: swap`, subset to the needed characters.
- Fix layout shift: dimensions on all images and embeds, reserved space for late content.
- Avoid non-composited animations (animate transform and opacity, not background-position or layout properties).
- Colour contrast at least 4.5:1 for normal text including small labels and text on coloured backgrounds. Do not use scroll-driven fade effects that start text at very low opacity. Check text over images and on coloured strips.
- Add captions (a `<track kind="captions">`) to any video with speech, or a full transcript on the page.
- Keyboard navigation and visible focus states, labelled buttons and form fields, landmark elements, skip link, one H1, no heading level jumps, `lang="en-IN"`.
- No console errors, no failed network requests.

## 11. Step 9: indexing and measurement

Set these up, or write exact click by click instructions for the owner where an account login is needed:

1. **Google Search Console**: add the domain property, verify (DNS or HTML tag), submit `https://garitech.co.in/sitemap.xml`, use URL Inspection and Request indexing for the home page, every service page and each new post. Check the Page indexing report for "Page with redirect" or "Crawled, currently not indexed" and fix causes.
2. **Bing Webmaster Tools**: import from Search Console, submit the sitemap. Bing's index feeds ChatGPT search and Copilot, so this matters for AI visibility.
3. **IndexNow**: generate a key, host `https://garitech.co.in/<key>.txt`, and add a script (`npm run indexnow`) that reads the live sitemap and POSTs all URLs to `https://api.indexnow.org/indexnow`. Run it after each deploy. Explain that Google does not use IndexNow.
4. **Analytics**: keep the existing Google tag but load it after the page is idle.
5. **Tracking sheet** in `docs/seo-tracking.md`: target keyword, target URL, date published, date indexed, impressions, clicks, average position, updated monthly from Search Console.
6. A **four week and twelve week plan** for the owner: publish cadence (two posts a week at first), Business Profile review requests, backlink outreach to real communities, events and directories, and when to check Search Console.

## 12. Step 10: GEO (AI answer engines)

- Every important page leads with a direct, quotable answer in its first two sentences. Use clear definitions ("Gari Tech is a content marketing agency in Chennai, founded by Boobesh AG in February 2024").
- Keep one consistent entity description everywhere: same name, same spelling (Gari Tech, also written GariTech), same founder, same founding date, same service list, same sameAs links.
- Add an About page and a founder section that state who runs the agency, with real credentials.
- Publish original, specific, experience-based content (real case studies, honest mistakes, checklists). AI systems cite pages that contain facts they cannot find elsewhere.
- Cross-link garitech.co.in and boobesh.com in text and in JSON-LD so the two reinforce each other.
- Keep llms.txt and sitemap current.

## 13. How to work

1. Start with Step 1 and show me the audit summary and your plan (stack findings, biggest problems, the order you will work in) before large changes. If the site is a client-rendered SPA, say so first and propose the fix.
2. Then work through the steps in order of impact: indexability and rendering first, then technical SEO and structured data, then service and local pages, then images and performance, then blog content in batches of 4 to 6 posts, committing and pushing after each batch.
3. For each batch, run lint, the build, and a local check of the pages (no horizontal overflow on mobile at 390px width, no console errors, no broken links, no em dashes).
4. After each push, tell me in two or three lines what changed and what I need to do (for example "request indexing for these URLs").
5. Ask me before: adding any fact not listed in section 2, changing the visual design, publishing the Mylapore address or phone, removing existing pages, or adding any service not listed.
6. Finish with a report: before and after Lighthouse scores, pages added, posts published, issues fixed, and a short list of things only I can do (Search Console and Bing verification, Google Business Profile, reviews, directory listings, backlinks).

Begin with the audit.
