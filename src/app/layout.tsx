import type { Metadata } from "next";
import { Fredoka, Caveat, Manrope } from "next/font/google";
import "./globals.css";
import PersonalCorner from "@/components/PersonalCorner";
import CursorSparkles from "@/components/CursorSparkles";

const fredoka = Fredoka({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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

export const metadata: Metadata = {
  metadataBase: new URL("https://boobesh.com"),
  title: "Boobesh — content marketer, corner of the internet",
  description:
    "Boobesh AG is a content marketer and founder of GariTech. Marketer first, always. Notes on campaigns, content and the work in between.",
  keywords: [
    "Boobesh AG",
    "Boobesh",
    "GariTech",
    "content marketer",
    "YCS Your College Senior",
    "Tribe Fortis marketing",
  ],
  authors: [{ name: "Boobesh AG" }],
  alternates: { canonical: "https://boobesh.com" },
  openGraph: {
    title: "Boobesh — content marketer",
    description:
      "Marketer first, always. Campaigns, content and dispatches from my corner of the internet.",
    url: "https://boobesh.com",
    siteName: "boobesh.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boobesh — content marketer",
    description:
      "Marketer first, always. Campaigns, content and dispatches from my corner of the internet.",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Boobesh AG",
  alternateName: "Boo",
  url: "https://boobesh.com",
  jobTitle: "Content Marketer",
  worksFor: {
    "@type": "Organization",
    name: "GariTech",
  },
  sameAs: [
    "https://www.linkedin.com/in/boobesh2912",
    "https://www.x.com/buildwithboo",
    "https://www.instagram.com/boobeshganesan",
    "https://www.youtube.com/@dreamsofboo",
  ],
  description:
    "Boobesh AG is a content marketer and founder of GariTech, currently interning as a backend developer (Python, FastAPI).",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${caveat.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <CursorSparkles />
        {children}
        <PersonalCorner />
      </body>
    </html>
  );
}
