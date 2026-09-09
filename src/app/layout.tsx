import type { Metadata } from "next";
import { Fraunces, Caveat, Manrope } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ContactDialog from "@/components/ContactDialog";
import PersonalDoor from "@/components/PersonalDoor";
import ThemeProvider, { themeInitScript } from "@/components/ThemeProvider";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "variable",
  axes: ["SOFT", "WONK", "opsz"],
});

const caveat = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const TITLE =
  "Boobesh AG — Founder of Gari Tech, Content Marketer in Chennai";
const DESCRIPTION =
  "Boobesh AG (Boo) is a young entrepreneur from Chennai and the founder of Gari Tech, a content marketing agency. Marketing Lead at Tribe Fortis and Marketing Manager at Your College Senior.";

const SOCIALS = [
  "https://www.linkedin.com/in/boobesh2912",
  "https://www.x.com/buildwithboo",
  "https://www.instagram.com/boobeshganesan",
  "https://www.youtube.com/@dreamsofboo",
];

export const metadata: Metadata = {
  metadataBase: new URL("https://boobesh.com"),
  title: {
    default: TITLE,
    template: "%s — Boobesh AG",
  },
  description: DESCRIPTION,
  keywords: [
    "Boobesh",
    "Boobesh AG",
    "Boo",
    "Gari Tech",
    "GariTech",
    "founder of Gari Tech",
    "young entrepreneur in Chennai",
    "best entrepreneur in Chennai",
    "entrepreneurs in Chennai",
    "founders in Chennai",
    "student entrepreneur Chennai",
    "content marketing agency Chennai",
    "best content marketing agency",
    "content marketer Chennai",
    "Tribe Fortis",
    "Your College Senior",
    "YCS",
  ],
  authors: [{ name: "Boobesh AG", url: "https://boobesh.com" }],
  creator: "Boobesh AG",
  publisher: "Gari Tech",
  category: "Marketing",
  alternates: { canonical: "https://boobesh.com" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://boobesh.com",
    siteName: "Boobesh AG",
    locale: "en_IN",
    type: "profile",
    images: [{ url: "/shots/hero-bg.jpg", width: 1920, height: 1080 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@buildwithboo",
    images: ["/shots/hero-bg.jpg"],
  },
};

/*
  One connected graph rather than a lone Person node: the person, the agency
  he founded, the site itself, and the questions people actually type. Answer
  engines lift straight from this.
*/
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://boobesh.com/#person",
      name: "Boobesh AG",
      alternateName: ["Boo", "Boobesh", "Boobesh Ganesan"],
      url: "https://boobesh.com",
      jobTitle: "Content Marketer and Founder",
      description: DESCRIPTION,
      nationality: "Indian",
      homeLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Chennai",
          addressRegion: "Tamil Nadu",
          addressCountry: "IN",
        },
      },
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "Panimalar Engineering College",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Chennai",
            addressCountry: "IN",
          },
        },
        {
          "@type": "HighSchool",
          name: "Santhome Higher Secondary School",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Mylapore, Chennai",
            addressCountry: "IN",
          },
        },
      ],
      worksFor: [
        { "@type": "Organization", name: "Tribe Fortis" },
        { "@type": "Organization", name: "Your College Senior" },
        { "@id": "https://boobesh.com/#garitech" },
      ],
      founder: { "@id": "https://boobesh.com/#garitech" },
      knowsAbout: [
        "Content marketing",
        "Content strategy",
        "Brand positioning",
        "Social media marketing",
        "Script writing",
        "Entrepreneurship",
      ],
      sameAs: SOCIALS,
    },
    {
      "@type": "Organization",
      "@id": "https://boobesh.com/#garitech",
      name: "Gari Tech",
      alternateName: "GariTech",
      description:
        "Gari Tech is a content marketing agency founded in Chennai by Boobesh AG, working on content marketing, personal branding and social media growth for startups and businesses.",
      foundingDate: "2024-02",
      url: "https://boobesh.com",
      founder: { "@id": "https://boobesh.com/#person" },
      areaServed: "IN",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
      knowsAbout: ["Content marketing", "Branding", "Web development"],
    },
    {
      "@type": "WebSite",
      "@id": "https://boobesh.com/#website",
      url: "https://boobesh.com",
      name: "Boobesh AG",
      description: DESCRIPTION,
      inLanguage: "en-IN",
      publisher: { "@id": "https://boobesh.com/#person" },
    },
    {
      "@type": "FAQPage",
      "@id": "https://boobesh.com/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Who is Boobesh AG?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Boobesh AG, also called Boo, is a content marketer and young entrepreneur based in Chennai. He is the founder of Gari Tech, Marketing Lead at Tribe Fortis and Marketing Manager at Your College Senior. He started earning in 10th grade by reselling products on Sharechat and made his first one lakh before turning 21.",
          },
        },
        {
          "@type": "Question",
          name: "What is Gari Tech?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Gari Tech is a content marketing agency founded by Boobesh AG in Chennai in February 2024. It began as a design shop and grew into content marketing, personal branding, social media growth and web development for startups and businesses.",
          },
        },
        {
          "@type": "Question",
          name: "Who founded Gari Tech?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Gari Tech was founded by Boobesh AG in his first year of college in Chennai, in February 2024.",
          },
        },
        {
          "@type": "Question",
          name: "What does Boobesh AG do?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "He leads marketing at Tribe Fortis, runs content marketing at Your College Senior across LinkedIn, YouTube and newsletter, and builds Gari Tech. His work covers content strategy, Instagram Reels scripts, content repurposing, brand positioning and social media growth.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${caveat.variable} ${manrope.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-cream text-ink font-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <CustomCursor />
          {children}
          <PersonalDoor />
          <ContactDialog />
        </ThemeProvider>
      </body>
    </html>
  );
}
