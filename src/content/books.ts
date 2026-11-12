import { award } from "@/content/award";
import { getEvents } from "@/lib/collections";
import { storyDance, storyDanceVideos, storyLoves, storySections } from "@/content/story";

/*
  The bookshelf on the personal page. The page itself stays short; each book
  holds the long version of one part of the story. Add a book here and it
  shows up on the shelf and gets its own page, laid out as real pages.
  Text wrapped in **double asterisks** gets the highlighter.
*/

export type BookBlock =
  | { type: "h"; text: string }
  | { type: "p"; text: string }
  | { type: "quote"; text: string }
  | { type: "link"; href: string; text: string }
  | { type: "photos"; items: { src: string; alt: string }[]; wide?: boolean }
  | { type: "videos"; items: { src: string; poster: string; caption: string; alt: string }[] };

export type Book = {
  slug: string;
  title: string;
  /** shorter title for the spine, if the full one is too long */
  spineTitle?: string;
  /** one line shown on the shelf and in search results */
  blurb: string;
  minutes: number;
  /** cloth colour, spine height in rem and spine width in rem */
  color: string;
  height: number;
  width: number;
  blocks: BookBlock[];
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function nice(iso: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  return m ? `${Number(m[3])} ${MONTHS[Number(m[2]) - 1]} ${m[1]}` : iso;
}

/* every chapter of the old long page, by its heading, as paragraph blocks */
function chapter(heading: string, title = heading): BookBlock[] {
  const s = storySections.find((x) => x.heading === heading);
  if (!s) return [];
  return [
    { type: "h", text: title },
    ...s.paragraphs.map((text) => ({ type: "p" as const, text })),
  ];
}

export function getBooks(): Book[] {
  const events = getEvents();

  const speaking: BookBlock[] = [
    { type: "p", text: storyLoves.paragraphs[0] },
    {
      type: "p",
      text: "Here are the rooms, newest first. Some I planned for weeks. Some I said yes to and figured out on the way.",
    },
    ...events.flatMap((e): BookBlock[] => [
      { type: "h", text: e.title },
      {
        type: "p",
        text: `${e.organizer}${e.venue ? `, ${e.venue}` : ""}. ${nice(e.date)}. ${e.description}`,
      },
      ...(e.images[0] ? [{ type: "photos" as const, items: [e.images[0]], wide: true }] : []),
    ]),
    { type: "link", href: "/press", text: "speaker bio and media kit" },
  ];

  return [
    {
      slug: "dance",
      title: "Dancing Badly, On Purpose",
      spineTitle: "Dancing Badly",
      blurb: "A stage with 3000+ people, a dance academy found by accident, and why I keep choosing the uncomfortable thing.",
      minutes: 4,
      color: "#8a3a55",
      height: 15,
      width: 3.4,
      blocks: [
        { type: "h", text: "the PACE stage" },
        ...storyDance.pace.paragraphs.map((text) => ({ type: "p" as const, text })),
        { type: "photos", items: storyDance.pace.photos },
        { type: "h", text: "Revel Dance Academy" },
        ...storyDance.revel.paragraphs.map((text) => ({ type: "p" as const, text })),
        { type: "videos", items: storyDanceVideos },
      ],
    },
    {
      slug: "speaking",
      title: "Stages I Have Stood On",
      blurb: "Every room I have talked in, and what I said in each.",
      minutes: 7,
      color: "#2f5d62",
      height: 15.5,
      width: 3.9,
      blocks: speaking,
    },
    {
      slug: "bombay",
      title: "We Went to Bombay to Win",
      spineTitle: "Bombay",
      blurb: "A 1000 km train ride, the national finals at IIT Bombay in December 2025, and the day we lost. The whole trip, told in order.",
      minutes: 10,
      color: "#6b1f2a",
      height: 16,
      width: 4.4,
      blocks: [
        { type: "h", text: "the message" },
        { type: "p", text: "\"Meet you guys in BOMBAYYYY!!\" That is how it started. Our NEC team had made it to the finals of the National Entrepreneurship Challenge, run by E-Cell IIT Bombay. Twenty of us. A finalist badge. A whole new city to look forward to." },
        { type: "p", text: "But I have to tell you something before the trip begins. This time we did not have the support we expected. Not even from the people whose job is to guide teams like ours." },
        { type: "p", text: "So we planned everything on our own. Managed everything on our own. And somehow we made it to the finals purely with our effort and consistency." },
        { type: "p", text: "**When support does not come from where it is supposed to, you learn to become your own support.**" },
        { type: "p", text: "I had no idea how much I would need that line. The finals were still a very long train ride away." },

        { type: "h", text: "the train" },
        { type: "p", text: "We were 24 members, one of them a mentor, travelling from Chennai to IIT Bombay. More than 1000 kilometres." },
        { type: "p", text: "I thought IIT Bombay would teach me entrepreneurship. But even before we reached, the journey had started teaching me." },
        { type: "p", text: "I tried to be productive on the train. I opened my laptop. Closed it. Opened it again. Closed it again. Nothing productive happened." },
        { type: "p", text: "Something better did. Conversations. Games. Observations." },
        { type: "p", text: "We played UNO for the first time. Sounds small. But it clicked. **You cannot predict every move. You respond.**" },
        { type: "p", text: "Entrepreneurship is not about controlling everything. It is about adapting when things change. I did not know yet how soon that would be tested, or that the first thing to slip out of my control would be my own bag." },

        { type: "h", text: "Mumbai" },
        { type: "p", text: "Then came Mumbai. None of us knew Hindi except Sayantani. Without being asked, she became our translator everywhere. That alone showed me what stepping up actually looks like." },
        { type: "p", text: "She was also the one who helped me find my bag at the railway station. And when I ended up in a situation with the police where I could have seriously messed up, she was there. I would have been in real trouble without her." },
        { type: "p", text: "We reached the IIT Bombay campus exhausted but ready. We had no idea what the finals would look like. We assumed it would be a quiz, or a group discussion." },
        { type: "p", text: "That assumption was about to be the first thing to break." },

        { type: "h", text: "Day 1: the round that did not exist" },
        { type: "p", text: "10 December was officially Day 1 of the finals. For the first round, only three members were needed from each team. We assumed a quiz or a GD. That assumption shaped our whole preparation, just like it does for most teams." },
        { type: "p", text: "Our three were Sayantani, Abdul Fadhil and Hari Chakkaravarthy. One tech mindset, one business mindset, one entrepreneurship mindset. On paper, the combination made sense." },
        { type: "p", text: "They came back with a reality check. It was not a quiz. It was not a GD. It was a full case study where they had to analyse a problem and build a PPT on the spot. Limited time. Unfamiliar problem. Real pressure. And they handled it well." },
        { type: "p", text: "Standing outside the hall, something uncomfortable hit me. We had prepared answers. But the round tested how fast they could find the right questions." },
        { type: "p", text: "Day 1 was not an elimination round, and that gave everyone a small sense of relief. But it also showed the weight of what came next. The next round would be elimination. Only two members allowed. Our plan said Jamal and I would go." },
        { type: "p", text: "I will not pretend I was calm. The fear came instantly. Not the fear of losing. The fear of being exposed." },
        { type: "quote", text: "Fear does not mean you are unprepared. Sometimes it just means you care deeply about the outcome." },
        { type: "p", text: "That evening we sat through a session by Acharya Prashant. Not loud motivation. Just quiet thoughts about life, attachment and outcomes. The kind of talk that sits with you instead of exciting you." },
        { type: "p", text: "By night we were exhausted but not ready to sleep. We walked around the IIT Bombay campus until nearly 3 AM. Talking less. Processing more." },
        { type: "p", text: "We are trained to perform when the rules are clear. But growth starts when the rules disappear. And the next morning, the rules disappeared completely." },

        { type: "h", text: "Day 2: nobody told us anything" },
        { type: "p", text: "This was the day Jamal and I represented our team in the elimination round. My mindset was surprisingly calm. Not because I was sure we would win. Because we had decided one thing: we will show up fully, no matter what the result is." },
        { type: "p", text: "Then they told us nothing. No instructions. No outline. Nothing to prepare for. We walked in completely blank." },
        { type: "p", text: "The first round turned out to be a crossword, based on the E-Summit itself. We did not even know it would be related to that. Not because we ignored it, but because things kept changing around us. Venues changed. Timings changed. Information came late. Still, we somehow managed it." },
        { type: "p", text: "The second round was a quiz, and it surprised us again. The people sitting in the front had been given books. Later we were told the quiz would be based on those books." },
        { type: "p", text: "At that moment, clarity was still missing. But momentum was not." },
        { type: "p", text: "After our rounds, Jamal and I just walked around the campus. No analysing answers. No overthinking the result. Just letting the experience settle." },
        { type: "p", text: "As the day went on, the team decided to go to Sameer Hills. The competition slowly turned into a small journey. We trekked for around 25 minutes. Halfway through, I was honestly scared. Forest. No people. A first time for me. I even said, \"Can we go back?\"" },
        { type: "p", text: "We did not." },
        { type: "p", text: "At the top, the view changed everything. On one side, slum areas. On the other, massive buildings standing tall. Two different lives. Same city. Same frame. **If we had waited to feel safe, we would never have seen that view.**" },
        { type: "p", text: "Later that night, still inside IIT Bombay, Gopika and I managed to get into a live Shark Tank style pitch. We had been told entry was closed. No timing had been shared earlier. Still, we found a way in. A startup secured 35 lakh rupees right in front of us. It felt very different from watching it on a screen. Messy. Human. Decisions made in real time." },
        { type: "p", text: "By the end of Day 2, one belief felt weaker than before: that clarity must come first. Movement creates clarity. Action reveals direction. And sometimes, staying halfway is the only real loss." },
        { type: "p", text: "By the time Day 3 started, we already knew the result." },

        { type: "h", text: "Day 3: we lost" },
        { type: "p", text: "We did not make it to the top 15." },
        { type: "p", text: "That was it. The competition was over for us. There was disappointment, yes. But something else followed very quickly. Space." },
        { type: "p", text: "No more rounds to prepare for. No more mental pressure. No more trying to prove anything. And that is when the experience actually opened up." },
        { type: "p", text: "We walked through the Startup Expo, talking to founders and builders. Not to impress. Not to pitch ourselves. Just to understand what people were building and why. Bernad, Gopika and I even did some casual vlogging with a few startups. Unplanned conversations felt more real. That is when I noticed something. **When you stop competing, you start listening better.**" },
        { type: "p", text: "Then the keynotes. Seeing Dr. A. Velumani live was special. I had watched his talks before, but hearing him in person felt sharper. One line stayed with me." },
        { type: "quote", text: "If you want to decide, don't discuss." },
        { type: "p", text: "Simple and direct. At that time I thought, okay, nice line, and moved on. I did not know how long it would take to hit." },
        { type: "p", text: "We also listened to Ankur Warikoo's life story, followed by Nandita Sinha, CEO of Myntra, and Benedetto Vigna, CEO of Ferrari. Different industries. Different paths. Same clarity in thinking." },
        { type: "p", text: "One thing became obvious: language matters more than we admit. Some talks were mostly in Hindi. At a national level event, that created invisible walls. It made me realise how easily access to insight can shrink when inclusivity is accidental." },
        { type: "p", text: "After the sessions, we slowed down. We went to Powai Lake, inside the IIT Bombay campus. It felt unreal. Is this a college campus, or somewhere you go to explore? Hills around us. A calm lake. Sunset without urgency. For the first time since the competition began, my mind felt quiet." },
        { type: "p", text: "We danced randomly. Thanks to Preethisri and Shivani for teaching me. We shot a few reels. We laughed without thinking about outcomes. I also met Karthikaa Kannan and Prabhu Explorer, creators I had admired for a long time." },
        { type: "p", text: "**Losing did not reduce the experience. It removed the noise.** When the pressure to win disappeared, learning became deeper, conversations became honest, and the place finally revealed itself." },
        { type: "p", text: "Sometimes losing does not take you out of the journey. It changes how you see it." },
        { type: "p", text: "There was still one more day. And it had nothing to do with the competition." },

        { type: "h", text: "Day 4: the city" },
        { type: "p", text: "Day 4 was for exploring Mumbai. We went to Juhu Beach and Marine Drive, and even a simple cab ride passed SBI, NSE, NSDL and LIC." },
        { type: "p", text: "That cab ride gave a silent reminder. **Big things exist. And they are built by people who once started small.**" },
        { type: "p", text: "Then it was over, faster than I expected. I had wanted to post daily updates. But I chose to stay present instead of posting in a hurry. Now I was back in Chennai, and I did not want those moments to stay only as memories." },
        { type: "p", text: "So I started documenting it properly, day by day, from the NEC finals to the E-Summit and everything in between." },
        { type: "p", text: "But one line from Day 3 was still waiting for me." },

        { type: "h", text: "months later" },
        { type: "p", text: "In March 2026, a few months after the trip, I finally understood that line from IIT Bombay." },
        { type: "p", text: "I realised I was delaying a lot of decisions. Not because I did not know what to do, but because I kept asking people. \"What do you think?\" \"Is this good?\" \"Should I do this or that?\" More opinions, more confusion, more delay. I thought I was being careful. But actually I was just avoiding the decision." },
        { type: "p", text: "Then I made one small change. I do not discuss to decide anymore. I decide first. Then I ask for feedback to improve it. And honestly, things started moving faster. More clarity. Less overthinking." },
        { type: "p", text: "End of the day, it is your decision. So you might as well take it." },

        { type: "h", text: "the people" },
        { type: "p", text: "This is where it becomes more than a trip. This becomes gratitude." },
        { type: "p", text: "**Karthik Rajendran**, our EDC President. Without you, this would not have happened. **Abdul Fadhil**, Vice President. No senior pressure, just real, relaxed brotherhood vibes." },
        { type: "p", text: "**Gopika V**, the person who made this entire journey happen. You took the campus ambassador role seriously and actually brought us to Bombay. That matters more than anything." },
        { type: "p", text: "**G Sayantani**, my broski. The bag, the police, the Hindi, all of it. **Jamal Mohammed R**, full bro vibe, someone I enjoyed representing the team with." },
        { type: "p", text: "**Bernad Ebenazer**, my classmate and roommate at IIT Bombay. Because of you I slept only 2 to 3 hours some nights, because we kept talking till 2 or 3 AM. **Tamilneyan SV**, the most organised person there. You made sure things actually worked." },
        { type: "p", text: "**Shivani Tamarai** and **Preethisri Parthasarathy**. From UNO to teaching me how to dance to late night talks, I did not expect any of it, and it was really good. **Barveen Kumar**, our mentor. Without you, this journey would not have happened." },
        { type: "p", text: "And everyone else on that train. Thank you." },

        { type: "h", text: "what stayed" },
        { type: "p", text: "This journey was not about IIT Bombay. It was about everything around it. The unplanned moments. The late night conversations. The people who showed up at the right time." },
        { type: "p", text: "I went there expecting entrepreneurship from sessions. I came back learning it from people and experiences." },
        { type: "p", text: "Even the unplanned trekking, where we were a little scared at first, ended up being one of the most enjoyable moments for all of us." },
        { type: "p", text: "Nothing was perfectly planned. But everything felt right." },
        { type: "quote", text: "Not every important lesson comes from structured work. Some come from journeys like this." },
        { type: "p", text: "Love you all. Signing off, Boobesh AG, aka BOO." },
        { type: "link", href: "https://www.linkedin.com/pulse/happened-almost-3-months-ago-i-still-havent-come-back-boobesh-ag-wxjqc", text: "the original article on LinkedIn" },
      ],
    },
    {
      slug: "award",
      title: "The Award, and the Smile I Forgot",
      spineTitle: "The Award",
      blurb: "Young Entrepreneur of the Year, the night before, and the photo where I forgot to smile.",
      minutes: 4,
      color: "#1f3a5f",
      height: 13.5,
      width: 3,
      blocks: [
        ...chapter("then I got an award, and forgot to smile", award.title),
        {
          type: "p",
          text: `The certificate reads ${award.name} ${award.certificateYear}, empowered by ${award.empoweredBy}. I received it on ${award.received} at ${award.venue}.`,
        },
        { type: "photos", items: [award.handover, award.certificate] },
        {
          type: "videos",
          items: [{ src: award.video.src, poster: award.video.poster, caption: "the ceremony", alt: award.video.label }],
        },
      ],
    },
    {
      slug: "communities",
      title: "Rooms That Changed Me",
      blurb: "Think Digital, Start The Up, and an introvert learning to talk.",
      minutes: 4,
      color: "#5b3f7a",
      height: 14.5,
      width: 3.2,
      blocks: [
        ...chapter("then a community made me talk", "Think Digital"),
        { type: "h", text: "Start The Up" },
        {
          type: "p",
          text: "In 2025 I started a community called Start The Up. Simple idea, get students thinking like founders. We ran four webinars. Then engagement dropped, and it stopped. Just like that.",
        },
        { type: "link", href: "/blog/how-to-start-a-student-startup-community", text: "how to start a student startup community, and why mine stopped" },
      ],
    },
    {
      slug: "first-clients",
      title: "First Clients",
      blurb: "A Canva shop, one client who trusted me with no portfolio, and one I should have said no to.",
      minutes: 6,
      color: "#6b4a2f",
      height: 13,
      width: 3.5,
      blocks: [
        ...chapter("then gari tech happened", "the Canva shop"),
        { type: "h", text: "the first one" },
        {
          type: "p",
          text: "My first client was Aldo Einsty, a psychologist and the founder of Mindful Mindvoice. I had no portfolio, so I posted a free website offer in a Chennai freelancers WhatsApp group. **She replied.**",
        },
        {
          type: "p",
          text: "Once we talked, her needs were clearly more than a free offer could cover, and I told her so. We agreed on a price, a low one even for then, and she trusted me anyway. My first payment was 1,500 rupees for the website. She liked it a lot, and later she became my social media client: 3 Reels scripts, 2 edited videos and 20 posts for her Instagram page.",
        },
        { type: "h", text: "the one I should have said no to" },
        {
          type: "p",
          text: "I will not say who. I took the project because I had no other client. Low price again, and then the pressure: every tiny alignment, every minute change. A deal for four pages slowly became nearly nine.",
        },
        {
          type: "p",
          text: "I do not regret it, because I learned how to choose a client, and how **small things at the start lead to a whole path.**",
        },
        ...chapter("things changed later", "a friend, and a split"),
        { type: "link", href: "/blog/how-to-start-freelancing-as-a-student-in-india", text: "how to start freelancing as a student in India" },
        { type: "link", href: "/gari-tech", text: "what Gari Tech does today" },
      ],
    },
    {
      slug: "where-it-started",
      title: "Where It Started",
      blurb: "A touchscreen phone, a dead computer, Sharechat and a lot of curiosity.",
      minutes: 6,
      color: "#3f6b4a",
      height: 14,
      width: 3.6,
      blocks: [
        ...chapter("it started with curiosity"),
        ...chapter("then computers entered my life"),
        ...chapter("then money entered the picture"),
        ...chapter("then linkedin entered my life"),
      ],
    },
    {
      slug: "unfinished",
      title: "The Unfinished Pile",
      spineTitle: "Unfinished",
      blurb: "More than 50 projects on my drive, and what that says about me.",
      minutes: 3,
      color: "#a24b2a",
      height: 12,
      width: 2.8,
      blocks: [
        ...chapter("the ones I started and stopped"),
        { type: "p", text: "The numbers, since you asked: **50+** projects on my drive, **20 to 30** of them unfinished, and **1** platform I never quit. That one is LinkedIn." },
        ...chapter("maybe this sounds familiar"),
        { type: "quote", text: "I am still working out how to turn curiosity into consistency." },
      ],
    },
    {
      slug: "college",
      title: "College, Honestly",
      blurb: "Being the different one in the family, and why I still care about my grades.",
      minutes: 3,
      color: "#56606b",
      height: 12.5,
      width: 3,
      blocks: [
        ...chapter("the different one in the family"),
        ...chapter("and yes, I still care about my grades"),
      ],
    },
  ];
}

export function getBook(slug: string) {
  return getBooks().find((b) => b.slug === slug);
}
