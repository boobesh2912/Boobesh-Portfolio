import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const BASE_URL = "https://boobesh.com";

/*
  Fixed dates, bumped by hand when a page really changes. A lastModified of
  "now" on every build tells crawlers nothing and teaches them to ignore it.
*/
const UPDATED = new Date("2026-09-30");

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  return [
    { url: BASE_URL, lastModified: UPDATED, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/gari-tech`, lastModified: UPDATED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: UPDATED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: UPDATED, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/personal`, lastModified: UPDATED, changeFrequency: "monthly", priority: 0.7 },
    ...posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
