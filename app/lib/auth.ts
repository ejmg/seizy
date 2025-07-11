import { redirect } from "react-router";

// TODO: this cookie is not encrypted. this application isn't very serious but I would like to due this correctly in prod.
export function createAuthCookie(userId: number): string {
  return `auth=${userId}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}`;
}

export function getAuthUserId(request: Request): number | null {
  const cookie = request.headers.get("Cookie");
  if (!cookie) return null;

  const match = cookie.match(/auth=(\d+)/);
  return match ? parseInt(match[1]) : null;
}

export function requireAuth(request: Request): number {
  const userId = getAuthUserId(request);
  if (!userId) throw redirect("/login");

  return userId;
}

export function clearAuthCookie(): string {
  return `auth=; HttpOnly; Path=/; Max-Age=0`;
}
