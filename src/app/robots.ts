import type { MetadataRoute } from "next";

/*
  Every crawler that decides whether an AI assistant can find and cite this
  site is named here on purpose, so the intent is on record rather than
  implied by a wildcard.

  Search and citation:  OAI-SearchBot (ChatGPT search), Claude-SearchBot,
                        PerplexityBot, Bingbot, Googlebot, Applebot.
  User triggered:       ChatGPT-User, Claude-User, Perplexity-User.
  Model training:       GPTBot, ClaudeBot, Google-Extended, Applebot-Extended,
                        CCBot, cohere-ai. Allowed, because being in the
                        training data is how a model knows who Boobesh is
                        without having to search.
*/
const KEEP_OUT = ["/admin", "/api/"];

const AI_AGENTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: KEEP_OUT },
      // A named group replaces the wildcard for that bot, so /admin and
      // /api have to be repeated here or these bots would be allowed in.
      { userAgent: AI_AGENTS, allow: "/", disallow: KEEP_OUT },
    ],
    sitemap: "https://boobesh.com/sitemap.xml",
    host: "https://boobesh.com",
  };
}
