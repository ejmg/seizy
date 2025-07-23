import { redirect } from "react-router";
import signature from "cookie-signature";

const COOKIE_SECRET =
  process.env.COOKIE_SECRET ||
  "this-should-be-a-very-secure-cookie-for-production-deployment";

export function createAuthCookie(userId: number): string {
  const value = signature.sign(userId.toString(), COOKIE_SECRET);
  return `auth=${value}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Strict; Secure=${process.env.NODE_ENV === "production"}`;
}

export function getAuthUserId(request: Request): number | null {
  const cookie = request.headers.get("Cookie");
  if (!cookie) return null;

  // const match = cookie.match(/auth=(\d+)/);
  const match = cookie.match(/auth=([^;]+)/);

  if (!match) return null;
  try {
    const unsigned = signature.unsign(match[1], COOKIE_SECRET);
    return unsigned ? parseInt(unsigned) : null;
  } catch {
    return null;
  }
}

export function requireAuth(request: Request): number {
  const userId = getAuthUserId(request);
  if (!userId) throw redirect("/login");

  return userId;
}

export function clearAuthCookie(): string {
  return `auth=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; Secure=${process.env.NODE_ENV === "production"}`;
}
