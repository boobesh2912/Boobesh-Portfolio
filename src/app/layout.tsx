import type { Metadata } from "next";
import { Fredoka, Caveat, Manrope } from "next/font/google";
import "./globals.css";

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
    "Boobesh's corner of the internet. Marketer first, always. Notes on campaigns, content and the work in between.",
  openGraph: {
    title: "Boobesh — content marketer",
    description:
      "Marketer first, always. Campaigns, content and dispatches from my corner of the internet.",
    url: "https://boobesh.com",
    siteName: "boobesh.com",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${caveat.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-body">
        {children}
      </body>
    </html>
  );
}
