import { ADMIN_COOKIE, verifySessionToken } from "@/lib/adminAuth";

/** True when the request carries a valid admin session cookie. */
export async function isAdmin(request: Request) {
  const token = request.headers
    .get("cookie")
    ?.split("; ")
    .find((c) => c.startsWith(`${ADMIN_COOKIE}=`))
    ?.split("=")[1];
  return verifySessionToken(token);
}
