import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

// ponytail: in-memory login limiter; per-process only. Move to a shared store
// (Redis/DB) if this ever runs on more than one instance.
const loginFailures = new Map<string, { count: number; lockedUntil: number }>();
const MAX_FAILURES = 5;
const LOCKOUT_MS = 15 * 60 * 1000;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const key = credentials.email.toLowerCase();
        const entry = loginFailures.get(key);
        if (entry && entry.lockedUntil > Date.now()) {
          return null; // locked out after repeated failures
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        const isPasswordValid = user
          ? await bcrypt.compare(credentials.password, user.password)
          : false;

        if (!user || !isPasswordValid) {
          const count = (entry?.count ?? 0) + 1;
          loginFailures.set(key, {
            count,
            lockedUntil: count >= MAX_FAILURES ? Date.now() + LOCKOUT_MS : 0,
          });
          return null;
        }

        loginFailures.delete(key);

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
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
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
