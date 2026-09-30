import type { Metadata } from "next";
import { Fraunces, Caveat, Manrope } from "next/font/google";
import "./globals.css";
import ContactDialog from "@/components/ContactDialog";
import PersonalDoor from "@/components/PersonalDoor";
import Script from "next/script";
import { SOCIALS } from "@/content/entity";
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
  "Boobesh AG | Content Marketer in Chennai, Founder of Gari Tech";
const DESCRIPTION =
  "Boobesh AG (Boo) is a content marketer and young entrepreneur from Chennai, and the founder of Gari Tech, a content marketing agency. Marketing Lead at Tribe Fortis, Marketing Manager at Your College Senior. LinkedIn: linkedin.com/in/boobesh2912.";


export const metadata: Metadata = {
  metadataBase: new URL("https://boobesh.com"),
  title: {
    default: TITLE,
    template: "%s | Boobesh AG",
  },
  description: DESCRIPTION,
  keywords: [
    "Boobesh AG",
    "Boobesh",
    "Boo",
    "buildwithboo",
    "Boobesh LinkedIn",
    "content marketer Boobesh",
    "Gari Tech",
    "founder of Gari Tech",
    "content marketing agency in Chennai",
    "best marketing agency in Chennai",
    "content marketer in Chennai",
    "young entrepreneur in Chennai",
    "founders in Chennai",
    "Panimalar Engineering College",
    "Tribe Fortis",
    "Your College Senior",
  ],
  authors: [{ name: "Boobesh AG", url: "https://boobesh.com" }],
  creator: "Boobesh AG",
  publisher: "Gari Tech",
  category: "Marketing",
  alternates: { canonical: "https://boobesh.com" },
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } }
      : {}),
  },
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
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@buildwithboo",
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
      alternateName: ["Boo", "Boobesh", "Boobesh AG", "Boobesh Ganesan", "buildwithboo"],
      mainEntityOfPage: "https://boobesh.com/about",
      url: "https://boobesh.com",
      jobTitle: "Content Marketer and Founder of Gari Tech",
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
        { "@type": "Organization", name: "Proof", url: "https://proof.zeromaintenanceengineer.in" },
        { "@type": "Organization", name: "StoryIt", url: "https://storyit.in" },
        { "@id": "https://boobesh.com/#garitech" },
      ],
      founder: { "@id": "https://boobesh.com/#garitech" },
      knowsAbout: [
        "Content marketing",
        "Content strategy",
        "Brand positioning",
        "Social media marketing",
        "Instagram Reels scripts",
        "LinkedIn content",
        "WordPress",
        "Entrepreneurship",
      ],
      sameAs: SOCIALS,
    },
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://boobesh.com/#garitech",
      name: "Gari Tech",
      alternateName: "GariTech",
      description:
        "Gari Tech is a content marketing agency founded in Chennai by Boobesh AG, working on content marketing, personal branding and social media growth for startups and businesses.",
      foundingDate: "2024-02",
      url: "https://boobesh.com/gari-tech",
      email: "dreamsofboo@gmail.com",
      founder: { "@id": "https://boobesh.com/#person" },
      areaServed: [
        { "@type": "City", name: "Chennai" },
        { "@type": "Country", name: "India" },
      ],
      makesOffer: [
        "Content marketing",
        "Social media management",
        "Instagram Reels scripts and editing",
        "Meta Ads support",
        "Branding and design",
        "WordPress website development",
      ].map((n) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: n, areaServed: "Chennai" },
      })),
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
      knowsAbout: ["Content marketing", "Branding", "Web development", "Social media marketing"],
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
        {/* Google tag. next/script loads it once per page, after hydration. */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BSLJFKDL4D"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-BSLJFKDL4D');`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          {children}
          <PersonalDoor />
          <ContactDialog />
        </ThemeProvider>
      </body>
    </html>
  );
}
