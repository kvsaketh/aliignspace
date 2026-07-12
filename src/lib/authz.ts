import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

type Role = "ADMIN" | "EDITOR" | "SEO";

/**
 * Returns the current session's user (with role) or null.
 */
export async function getSessionUser() {
  const session = await getServerSession(authOptions);
  return (session?.user as { id?: string; role?: Role } | undefined) ?? null;
}

/**
 * Guard for route handlers. Returns null when allowed, or a NextResponse-ready
 * { error, status } object to short-circuit on. Usage:
 *   const denied = await requireRole(["ADMIN"]);
 *   if (denied) return NextResponse.json({ error: denied.error }, { status: denied.status });
 */
export async function requireRole(allowed: Role[]) {
  const user = await getSessionUser();
  if (!user) return { error: "Unauthorized", status: 401 as const };
  if (!user.role || !allowed.includes(user.role)) {
    return { error: "Forbidden", status: 403 as const };
  }
  return null;
}
