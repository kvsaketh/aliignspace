import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Defense in depth on two surfaces:
//  1. Every /admin route (except the login page) requires a session at the edge.
//  2. Every state-changing /api request (non-GET) requires a session token, so a
//     handler that ever forgets its own getServerSession check still cannot be
//     hit unauthenticated. Public GETs and NextAuth's own /api/auth are exempt.
export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    pages: { signIn: "/admin/login" },
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl;
        const method = req.method;

        if (pathname.startsWith("/api")) {
          // NextAuth's own endpoints manage their own auth.
          if (pathname.startsWith("/api/auth")) return true;
          // Public reads stay open; individual routes still gate drafts.
          if (method === "GET" || method === "HEAD" || method === "OPTIONS") {
            return true;
          }
          // Mutations require a write-capable staff role. SEO is read-only, and a
          // roleless/unknown token cannot write (least-privilege policy). Per-route
          // requireRole still narrows destructive/config ops to ADMIN.
          const role = (token as { role?: string } | null)?.role;
          return role === "ADMIN" || role === "EDITOR";
        }

        // /admin/* (matched below): require a token.
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/admin", "/admin/((?!login).*)", "/api/:path*"],
};
