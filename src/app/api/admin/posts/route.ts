import { NextResponse } from "next/server";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/adminAuth";

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function POST(request: Request) {
  const token = request.headers
    .get("cookie")
    ?.split("; ")
    .find((c) => c.startsWith(`${ADMIN_COOKIE}=`))
    ?.split("=")[1];

  if (!(await verifySessionToken(token))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { title, excerpt, tags, body } = await request.json();
  if (!title || !body) {
    return NextResponse.json({ error: "title and body are required" }, { status: 400 });
  }

  const githubToken = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || "boobesh2912";
  const repo = process.env.GITHUB_REPO || "Boobesh-Portfolio";

  if (!githubToken) {
    return NextResponse.json(
      {
        error:
          "GITHUB_TOKEN is not configured on the server, publishing is disabled until it is set",
      },
      { status: 501 }
    );
  }

  const slug = slugify(title);
  const date = new Date().toISOString().slice(0, 10);
  const tagList = (tags || "")
    .split(",")
    .map((t: string) => t.trim())
    .filter(Boolean);

  const frontmatter = [
    "---",
    `title: "${title.replace(/"/g, '\\"')}"`,
    `excerpt: "${(excerpt || "").replace(/"/g, '\\"')}"`,
    `date: "${date}"`,
    `tags: [${tagList.map((t: string) => `"${t}"`).join(", ")}]`,
    "---",
    "",
    body,
  ].join("\n");

  const path = `content/blog/${slug}.md`;
  const content = Buffer.from(frontmatter, "utf-8").toString("base64");

  const ghRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github+json",
      },
      body: JSON.stringify({
        message: `Add blog post: ${title}`,
        content,
      }),
    }
  );

  if (!ghRes.ok) {
    const errText = await ghRes.text();
    return NextResponse.json({ error: `GitHub API error: ${errText}` }, { status: 502 });
  }

  return NextResponse.json({ ok: true, slug });
}
