import type { Metadata } from "next";
import { Fraunces, Caveat, Manrope } from "next/font/google";
import "./globals.css";
import CursorSparkles from "@/components/CursorSparkles";
import PersonalDoor from "@/components/PersonalDoor";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://boobesh.com"),
  title: "Boobesh AG — content marketer",
  description:
    "Boobesh AG is a content marketer, Marketing Lead at Tribe Fortis, Marketing Manager at Your College Senior and founder of Gari Tech.",
  keywords: [
    "Boobesh AG",
    "Boobesh",
    "Gari Tech",
    "content marketer",
    "Tribe Fortis",
    "Your College Senior",
    "YCS",
  ],
  authors: [{ name: "Boobesh AG" }],
  alternates: { canonical: "https://boobesh.com" },
  openGraph: {
    title: "Boobesh AG — content marketer",
    description:
      "Marketing Lead at Tribe Fortis, Marketing Manager at Your College Senior, founder of Gari Tech.",
    url: "https://boobesh.com",
    siteName: "boobesh.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boobesh AG — content marketer",
    description:
      "Marketing Lead at Tribe Fortis, Marketing Manager at Your College Senior, founder of Gari Tech.",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Boobesh AG",
  alternateName: "Boo",
  url: "https://boobesh.com",
  jobTitle: "Content Marketer",
  worksFor: [
    { "@type": "Organization", name: "Tribe Fortis" },
    { "@type": "Organization", name: "Your College Senior" },
    { "@type": "Organization", name: "Gari Tech" },
  ],
  sameAs: [
    "https://www.linkedin.com/in/boobesh2912",
    "https://www.x.com/buildwithboo",
    "https://www.instagram.com/boobeshganesan",
    "https://www.youtube.com/@dreamsofboo",
  ],
  description:
    "Boobesh AG is a content marketer. Marketing Lead at Tribe Fortis, Marketing Manager at Your College Senior, and founder of Gari Tech.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${caveat.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <CursorSparkles />
        {children}
        <PersonalDoor />
      </body>
    </html>
  );
}
