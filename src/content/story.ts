/*
  Text wrapped in **double asterisks** gets a hand drawn highlight.
*/

export type StorySection = {
  heading?: string;
  paragraphs: string[];
};

export const storyOpener = [
  "Hey. Yeah, you. You clicked the small circle in the corner instead of closing the tab. Respect. Come in, sit down. This room is darker than the rest of the site on purpose.",
  "I am talking to you here, not writing copy for a crowd. So I am not going to fill this with things I do not mean just to sound impressive. **Only the stuff that is actually true.**",
];

/* What people decide about me, as chips instead of a paragraph. */
export const labels: { text: string; tone: "kind" | "harsh" | "flat" }[] = [
  { text: "a freelancer", tone: "flat" },
  { text: "the startup guy in college", tone: "flat" },
  { text: "fully into business", tone: "flat" },
  { text: "a techie", tone: "flat" },
  { text: "a marketing guy", tone: "flat" },
  { text: "passionate", tone: "kind" },
  { text: "narcissistic", tone: "harsh" },
  { text: "obsessed with money", tone: "harsh" },
  { text: "someone who can mentor them", tone: "kind" },
  { text: "a bad person", tone: "harsh" },
  { text: "a very good person", tone: "kind" },
];

/* The arc, compressed into one glanceable strip. */
export const lifeStrip = [
  { when: "2nd std", what: "my father's touchscreen phone" },
  { when: "4th std", what: "photo edits on an old S-Pen" },
  { when: "5th std", what: "computer institute, then a dead PC" },
  { when: "10th std", what: "sold kitchenware on Sharechat" },
  { when: "1st year", what: "started Gari Tech" },
  { when: "Feb 2025", what: "my first ever award" },
  { when: "2025", what: "Start The Up, then Vizhva" },
  { when: "now", what: "content at YCS and StoryIt, marketing for Proof" },
];

export const driveStats = [
  { value: "50+", label: "projects on my drive" },
  { value: "20-30", label: "of them unfinished" },
  { value: "1", label: "platform I never quit" },
];

export const pullQuotes = {
  money: "The money was small. The lesson was not.",
  wordpress:
    "I told him I knew WordPress. I had never opened it. So technically, I lied.",
  consistency: "I am still working out how to turn curiosity into consistency.",
};

export const storyIntro = [
  "Some people know me as a freelancer. Some know me as the startup guy in college. Some think I am fully into business. Some think I am a techie. Some think I am a marketing guy. Some think I am passionate. Some think I am narcissistic. Some think I am obsessed with money. Some think I can mentor them. Some think I am a bad person. Some think I am a very good person.",
  "So the real question is simple. **Who is Boobesh, actually?** Honestly, I am still figuring that out.",
  "This is not only for you. It is also for my future self. One day I want to come back, read this, and see how much I changed.",
];

export const storySections: StorySection[] = [
  {
    heading: "it started with curiosity",
    paragraphs: [
      "I got near tech very early. Maybe 2nd or 3rd standard. My father had a touchscreen phone when almost nobody in my family had one, back when touchscreen phones were still rare. So yes, I used to flex it. But more than flexing, **I explored it.** Settings. Random options. Features nobody told me about.",
      "In 4th standard I started playing with the photo editing tools on a Samsung phone that had an old S-Pen. Not the one you see today, an older one. You could stretch faces, add filters, make silly edits. That was the first time technology felt interesting to me. I knew nothing about programming or careers. I just liked opening things to see what was inside.",
    ],
  },
  {
    heading: "then computers entered my life",
    paragraphs: [
      "During my 5th standard holidays I joined a computer training institute, even though computers were already a subject in school. I joined because I liked computers. To be honest, I also played a lot of games on those systems. But something else was happening quietly. Curiosity. I was never a sports person. I liked screens more than playgrounds.",
      "Around then my parents bought me a second hand computer, and **I broke it in about a year and a half.** Not by dropping it. By installing too much software. It was a 4GB RAM machine and I kept adding random tools, testing things, opening everything, until it gave up. The computer died. The curiosity did not.",
    ],
  },
  {
    heading: "then money entered the picture",
    paragraphs: [
      "10th standard. Corona time. My parents bought me a tablet for online classes, and I used it for a lot more than classes. I started watching videos about programming. That is where I first heard about Python. I did not really learn it then, but I understood that programming languages exist. I also kept seeing Byju's and Vedantu ads everywhere, and even though I never joined them, those ads quietly showed me what EdTech was.",
      "Then one day I searched the thing almost every student searches. **How to make money online.** That search changed something. I found reselling. Sharechat was trending at the time, and after some digging I noticed kitchen utilities were selling well, mostly to housewives, and housewives were very active on Sharechat.",
      "So I tried it. Posting pictures of kitchen products, taking orders, reselling them. The money was small. The lesson was not. That was my first taste of sales, and the point where tech curiosity started mixing with business.",
    ],
  },
  {
    heading: "then linkedin entered my life",
    paragraphs: [
      "After watching a lot of videos, I installed LinkedIn. At first I barely used it. Then slowly I started posting, and somehow **LinkedIn became the one thing I stayed consistent with.** I still do not fully know why. Something about that platform kept pulling me back.",
    ],
  },
  {
    heading: "then gari tech happened",
    paragraphs: [
      "First year of college, I wanted to start something again. That is how Gari Tech was born, first as a small design shop making things in Canva. Later my friend Charan Kumar joined, we added services and split the work. He took marketing, I said I would take design and web development. One small problem. I had never opened WordPress in my life, but I had already told him I knew it. **So technically, I lied.**",
      "Then I asked my parents for a laptop. They bought it. I asked for hosting and a domain. They gave it. My parents rarely say no when it is about learning. And only after buying the hosting did I install WordPress for the first time and start from zero. That is how it began.",
    ],
  },
  {
    heading: "the different one in the family",
    paragraphs: [
      "Everyone in my family is on the arts side. So one reason I picked engineering is simple: **I did not want to be the same.** Same story with business. Everyone around me works a job, so I wanted to try building something instead.",
      "Before college I thought I had to be a topper. Then I got in, saw the reality, and changed the plan. College became a pathway to a degree, a decent pass with a decent grade. The rest of my energy went into building. A lot of what I watched on YouTube back then changed how I saw business, and slowly freelancing turned into a company.",
    ],
  },
  {
    heading: "then I got an award, and forgot to smile",
    paragraphs: [
      "In February 2025 I got my first ever award. **Young Entrepreneur of the Year**, at the Startup Real OG Awards. The certificate says 2024, I collected it in 2025.",
      "I was deep into manifesting back then. Every night I would lie there and rehearse it. How I would walk when they call my name. What I would say. How I would receive it. How I would smile. Every single night, till their team got back to me.",
      "Then the message came. I was selected in the first round, they asked for more about me, I sent my details, and the day before the event I heard I was a finalist. I was so excited. **It was my first award, and my first award for my business too**, and I take my business way too personally. I told my parents and took them with me.",
      "Even after all that manifesting, when they announced the category I was sitting there thinking, is this real, or am I imagining it? Then they called Boobesh AG and played the kind of award music I had only ever seen on TV. I cannot explain that feeling. On stage my hands were shaking, even while shaking hands with the guests. And if you look at the photo on my LinkedIn, **I did not even smile**, because I was still processing whether it was true. A little smile would have been nicer.",
      "It still has its own place in my heart, and I am very, very happy it happened. The photos and the video are on the home page.",
    ],
  },
  {
    heading: "then a community made me talk",
    paragraphs: [
      "The same day as the award, I also joined a student community called Think Digital. That one was an accident. I was searching for student communities, filled in a form I honestly do not remember filling, and one day got a link to join a group. They welcomed me by name, knew I was from Panimalar, even knew I wanted an internship. My first reaction was, who are you and why are you inviting me? I did not even join the first onboarding meeting.",
      "I was an introvert who only spoke to a small group I was comfortable with. Then came the casual English meets where the only rule was to talk in English, rant, whatever. A weekly showcase where you show what you built, which meant I built something every week, even when I had nothing, just to have something to show. And the offline meetups. **Nobody judged my grammar.**",
      "Now I go to events almost every week, startup events, engineering events, whatever is on, and I talk to random people. That community gave me four things I later put on a slide in my own talks: identity, network, exposure and awareness. One mentor there never gives straight answers. The questions do the work until you answer yourself.",
    ],
  },
  {
    heading: "things changed later",
    paragraphs: [
      "In my third year, my friend and I decided to go in different directions. He is more into marketing, so he started his own thing, and honestly I am happy for him. It let me go deeper into Gari Tech. Right now most of our clients come through referrals and trials.",
    ],
  },
  {
    heading: "the ones I started and stopped",
    paragraphs: [
      "In 2025 I started a community called Start The Up. Simple idea, get students thinking like founders. We ran four webinars. Then engagement dropped, and it stopped. Just like that. Around the same time I started Vizhva, a learning initiative about how Gen Z actually learns, and I paused that one too.",
      "If you open my laptop's project drive today, you will find **more than 50 projects, and 20 to 30 of them unfinished.** That says something about me. I start fast. I get excited fast. And sometimes I jump to the next idea before finishing the last one. Maybe it is shiny object syndrome. Maybe I just like new things more than repeating old ones.",
    ],
  },
  {
    heading: "maybe this sounds familiar",
    paragraphs: [
      "Maybe you also have folders full of ideas. Projects you started with full excitement, told your friends about, genuinely believed in. And then slowly, you stopped. Not because you are lazy. Because something new caught your eye. A new idea, a new chance, a new direction. Suddenly the old thing feels boring. So you move again.",
      "If that sounds like you, you are not alone. I am still working out **how to turn curiosity into consistency.**",
    ],
  },
  {
    heading: "and yes, I still care about my grades",
    paragraphs: [
      "I keep a decent score on purpose. First, because of the people around me. Second, because I want my family stable before I go all in on my own thing. And third, because for on campus placements the first filter is CGPA. Off campus, companies mostly look at skills, experience and what you have built.",
      "So I will not tell you grades are useless, and I will not tell you a startup is the only way. Some people do better with a 9 to 5 and a salary every month. Business gave me freedom, but some months I earn good money and some months I earn almost nothing. **Both paths are fine. It depends on your passion and your mindset.**",
    ],
  },
  {
    heading: "what I am doing right now",
    paragraphs: [
      "Right now I run content marketing at Your College Senior and StoryIt, do marketing for Proof, and keep Gari Tech going. Until the end of September I also led marketing at Tribe Fortis, which did not go as well as I wanted, and I wrote about it honestly on the blog. I am also interning as a backend developer, mostly Python and FastAPI, learning how systems hold up in real projects.",
      "So I am learning two things at once. **How to build systems, and how to build the story around them.** Engineering on one side, brand on the other. Somewhere in the middle, I am still working out how the two connect.",
    ],
  },
];

export const storyLoves: StorySection = {
  heading: "things I love that are not work",
  paragraphs: [
    "I love talking. Not small talk, the other kind. The kind you do with a mic in your hand in front of a room that did not ask to be pitched to. Give me a stage and I will find a reason to say yes.",
    "And music. Mostly one song on repeat, for months, which is the one playing right now if you have not muted me yet.",
  ],
};

/* Dancing, told in two parts: the PACE stage, then Revel Dance Academy. */
export const storyDance = {
  heading: "and then there is the dancing",
  pace: {
    paragraphs: [
      "**I am bad at dancing.** The only dancing I had ever done was at marriage functions with my friends, and it was bad there too.",
      "On 13 September 2025 I danced on the PACE stage, the annual cultural festival at Panimalar Engineering College, in front of 3000+ students. First time ever on a stage.",
      "I was in third year and I knew college was ending. Fourth year would be busy, and in two years I had done nothing like this in college. So I thought, let me just try it. Somehow I danced, I guess. It was funny. **I did not try it again for a year.**",
    ],
    photos: [
      {
        src: "/uploads/pace-cultural-fest-dance-1.webp",
        alt: "Boobesh dancing on the PACE stage at Panimalar Engineering College, smiling, with stage smoke around him",
      },
      {
        src: "/uploads/pace-cultural-fest-dance-2.webp",
        alt: "Boobesh dancing on stage in a pose under purple lights at the PACE cultural festival",
      },
      {
        src: "/uploads/pace-cultural-fest-dance-3.webp",
        alt: "Three dancers on the PACE stage under purple and pink lights at Panimalar's annual cultural festival",
      },
    ],
  },
  revel: {
    paragraphs: [
      "Then in September 2026 I randomly saw an ad for Revel Dance Academy on Instagram. I always have the urge to try something new, so I went for a trial class. I paid for the next class, and ended up joining for a month.",
      "On the first day I honestly thought, can I even make it? But I always put myself in uncomfortable spaces on purpose, so I stayed. We shot a video of me dancing in class. And one day the academy asked all of us students to choreograph something together and dance to it. We did, and **I enjoyed that whole phase.**",
    ],
  },
};

/* Added as they arrive. Each is a portrait clip with a poster frame. */
export const storyDanceVideos = [
  {
    src: "/uploads/revel-dance-academy-class.mp4",
    poster: "/uploads/revel-dance-academy-class-poster.jpg",
    caption: "in class at Revel Dance Academy",
    alt: "Boobesh dancing in a Revel Dance Academy class while classmates stand behind him and clap",
  },
  {
    src: "/uploads/revel-dance-academy-choreography.mp4",
    poster: "/uploads/revel-dance-academy-choreography-poster.jpg",
    caption: "the choreography all the students put together",
    alt: "Four students performing a group choreography in the Revel Dance Academy studio",
  },
];

export const storySong = {
  movie: "Oh My Kadavule",
  title: "Kadhaippoma",
  intro:
    "There is a song from Oh My Kadavule called Kadhaippoma that has been stuck in my head for months. I do not fully know why. Some lines just move in and never leave.",
  lines: [
    "உன்னை இன்று பார்த்ததும்",
    "என்னை நானே கேட்க்கிறேன்",
    "வைரம் ஒன்றை கையில் வைத்து",
    "எங்கே தேடி அலைந்தாயோ",
  ],
  gloss:
    "Roughly: the moment I saw you today, I asked myself, with a diamond already in my hand, where was I wandering, searching?",
};

export const storyPositioning = [
  "As of today, **I am a marketer.** That is not me being vague, that is the actual answer. I am not going to pretend I do not know what I am just to sound deep.",
  "But water does not stop moving just because you gave the river a name. It keeps flowing, finds new ground, sometimes ends up somewhere nobody expected. So marketer is the answer for now. **Ask me again in a year.**",
];

export const storyClosing = [
  "If you read this far, I have one question for you, and I actually mean it. Who are you, really? Not what your bio says. Not what your college calls you. Not what people decide about you in the first five minutes.",
  "Who are you when nobody is watching? Because honestly, I am still figuring that out too.",
];

export const storySignOff = "Signing off, Boobesh AG (aka) Boo";

export const thankYouNames = [
  "Ganesan A",
  "Bhuvaneshwari G",
  "Akshaya AG",
  "Charan Kumar SP",
  "Suja K",
  "Arivu Selvan DV",
  "Aldo Einsty",
  "G Surendar Thina",
  "Deepak Kumar",
  "Musha Ahamaed RY",
  "Abinandhan",
  "Bharanivelan",
  "Aparana",
  "Jaya Shakathi Kannan",
  "CK Kumaravel",
  "Venkatesh",
  "Balaji Soundarajan",
  "Radha Krishanan",
  "Sneha",
  "Niranjan",
  "Abishua",
  "Shanshank",
  "Sameer",
  "Divaakar",
  "Arunachalam",
  "Tejavi",
  "Sanjay",
  "Naveen Kumar",
  "Anil Nair",
];
