import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminGuard";
import { commitFile, slugify, yamlString } from "@/lib/github";
import { EVENT_DESCRIPTION_LIMIT } from "@/lib/collections";

export async function POST(request: Request) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { title, organizer, date, image, alt, description } =
    await request.json();

  if (!title || !organizer) {
    return NextResponse.json(
      { error: "the event name and who organised it are both required" },
      { status: 400 }
    );
  }
  if (image && !alt) {
    return NextResponse.json(
      { error: "a photo needs alt text" },
      { status: 400 }
    );
  }
  if (String(description || "").length > EVENT_DESCRIPTION_LIMIT) {
    return NextResponse.json(
      {
        error: `the description has to stay under ${EVENT_DESCRIPTION_LIMIT} characters so the cards stay the same size`,
      },
      { status: 400 }
    );
  }

  const slug = slugify(title);
  const file = [
    "---",
    `title: ${yamlString(title)}`,
    `organizer: ${yamlString(organizer)}`,
    `date: ${yamlString(date || new Date().toISOString().slice(0, 10))}`,
    `image: ${yamlString(image || "")}`,
    `alt: ${yamlString(alt || "")}`,
    `description: ${yamlString(description || "")}`,
    "---",
    "",
  ].join("\n");

  const result = await commitFile(
    `content/events/${slug}.md`,
    Buffer.from(file, "utf-8").toString("base64"),
    `Add event: ${title}`
  );

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json({ ok: true, slug });
}
