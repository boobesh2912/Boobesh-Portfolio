import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminGuard";
import { commitFile, slugify, yamlString } from "@/lib/github";

export async function POST(request: Request) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { title, excerpt, tags, body, thumbnail, thumbnailAlt } =
    await request.json();

  if (!title || !body) {
    return NextResponse.json(
      { error: "title and body are required" },
      { status: 400 }
    );
  }
  if (thumbnail && !thumbnailAlt) {
    return NextResponse.json(
      { error: "a thumbnail needs alt text, it is what screen readers read out" },
      { status: 400 }
    );
  }

  const slug = slugify(title);
  const date = new Date().toISOString().slice(0, 10);
  const tagList = String(tags || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const file = [
    "---",
    `title: ${yamlString(title)}`,
    `excerpt: ${yamlString(excerpt || "")}`,
    `date: ${yamlString(date)}`,
    `tags: [${tagList.map(yamlString).join(", ")}]`,
    `thumbnail: ${yamlString(thumbnail || "")}`,
    `thumbnailAlt: ${yamlString(thumbnailAlt || "")}`,
    "---",
    "",
    body,
  ].join("\n");

  const result = await commitFile(
    `content/blog/${slug}.md`,
    Buffer.from(file, "utf-8").toString("base64"),
    `Add blog post: ${title}`
  );

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json({ ok: true, slug });
}
