import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminGuard";
import { commitFile, slugify, yamlString } from "@/lib/github";
import { SITE_BLURB_LIMIT } from "@/lib/collections";

export async function POST(request: Request) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { title, url, image, alt, blurb, stack, year } = await request.json();

  if (!title || !url) {
    return NextResponse.json(
      { error: "the site name and its link are both required" },
      { status: 400 }
    );
  }
  if (image && !alt) {
    return NextResponse.json({ error: "a screenshot needs alt text" }, { status: 400 });
  }
  if (String(blurb || "").length > SITE_BLURB_LIMIT) {
    return NextResponse.json(
      { error: `keep the blurb under ${SITE_BLURB_LIMIT} characters` },
      { status: 400 }
    );
  }

  const slug = slugify(title);
  const stackList = String(stack || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const file = [
    "---",
    `title: ${yamlString(title)}`,
    `url: ${yamlString(url)}`,
    `image: ${yamlString(image || "")}`,
    `alt: ${yamlString(alt || "")}`,
    `blurb: ${yamlString(blurb || "")}`,
    `stack: [${stackList.map(yamlString).join(", ")}]`,
    `year: ${yamlString(year || String(new Date().getFullYear()))}`,
    "---",
    "",
  ].join("\n");

  const result = await commitFile(
    `content/sites/${slug}.md`,
    Buffer.from(file, "utf-8").toString("base64"),
    `Add site: ${title}`
  );

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json({ ok: true, slug });
}
