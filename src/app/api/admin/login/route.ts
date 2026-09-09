import { NextResponse } from "next/server";
import { ADMIN_COOKIE, checkCredentials, makeSessionToken } from "@/lib/adminAuth";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (!checkCredentials(username, password)) {
    return NextResponse.json({ error: "invalid credentials" }, { status: 401 });
  }

  const token = await makeSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return res;
}
