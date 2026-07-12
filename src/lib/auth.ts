import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

// ponytail: in-memory login limiter; per-process only. For multi-instance
// deployments move these maps to a shared store (Redis). Tracks three
// dimensions so password-spraying (many accounts, one guess each) is throttled
// by IP + global budget, not only per-email.
const failuresByEmail = new Map<string, { count: number; lockedUntil: number }>();
const failuresByIp = new Map<string, { count: number; lockedUntil: number }>();
const MAX_FAILURES = 5; // per email
const MAX_IP_FAILURES = 20; // per IP across all accounts
const LOCKOUT_MS = 15 * 60 * 1000;

function isLocked(m: Map<string, { count: number; lockedUntil: number }>, key: string) {
  const e = m.get(key);
  return !!e && e.lockedUntil > Date.now();
}
function recordFailure(
  m: Map<string, { count: number; lockedUntil: number }>,
  key: string,
  max: number
) {
  const count = (m.get(key)?.count ?? 0) + 1;
  m.set(key, { count, lockedUntil: count >= max ? Date.now() + LOCKOUT_MS : 0 });
}

// Re-validate a token's role against the DB at most this often (bounds DB load
// while catching demotion/deletion of an active session within the window).
const ROLE_RECHECK_MS = 5 * 60 * 1000;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const emailKey = credentials.email.toLowerCase();
        const ip =
          (req?.headers?.["x-forwarded-for"] as string | undefined)
            ?.split(",")[0]
            ?.trim() || "unknown";

        // Locked if either the account or the source IP has tripped its limit.
        if (isLocked(failuresByEmail, emailKey) || isLocked(failuresByIp, ip)) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        const isPasswordValid = user
          ? await bcrypt.compare(credentials.password, user.password)
          : false;

        if (!user || !isPasswordValid) {
          recordFailure(failuresByEmail, emailKey, MAX_FAILURES);
          recordFailure(failuresByIp, ip, MAX_IP_FAILURES);
          return null;
        }

        failuresByEmail.delete(emailKey);

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 hours (a work session), down from 30 days
    updateAge: 60 * 60, // refresh the cookie hourly while active
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.checkedAt = Date.now();
        return token;
      }
      // Re-validate role/existence against the DB, throttled to ROLE_RECHECK_MS,
      // so a demoted or deleted user loses access mid-session.
      const checkedAt = (token.checkedAt as number | undefined) ?? 0;
      if (token.id && Date.now() - checkedAt > ROLE_RECHECK_MS) {
        const current = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { role: true },
        });
        if (!current) {
          // User no longer exists: strip identity so requireRole/session checks fail.
          delete (token as any).id;
          delete (token as any).role;
        } else {
          token.role = current.role;
        }
        token.checkedAt = Date.now();
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
};
