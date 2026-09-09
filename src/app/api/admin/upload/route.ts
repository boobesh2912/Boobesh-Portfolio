import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminGuard";
import { commitFile, slugify } from "@/lib/github";

/* Big enough for a photo, small enough that the repo stays sane. */
const MAX_BYTES = 3 * 1024 * 1024;
const ALLOWED: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function POST(request: Request) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  const name = String(form.get("name") || "upload");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "no file received" }, { status: 400 });
  }

  const ext = ALLOWED[file.type];
  if (!ext) {
    return NextResponse.json(
      { error: "only jpg, png and webp images are accepted" },
      { status: 415 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "that image is over 3MB, compress it first" },
      { status: 413 }
    );
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  // A timestamp suffix keeps two photos with the same name from colliding.
  const filename = `${slugify(name)}-${Date.now()}.${ext}`;
  const filePath = `public/uploads/${filename}`;

  const result = await commitFile(
    filePath,
    bytes.toString("base64"),
    `Upload image: ${filename}`
  );

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json({ ok: true, path: `/uploads/${filename}` });
}
