import { withAuth } from "next-auth/middleware";

// Defense in depth: every /admin route (except the login page) requires a
// valid session token at the edge, in addition to the per-page and per-action
// checks. Unauthenticated requests are redirected to the sign-in page.
export default withAuth({
  pages: { signIn: "/admin/login" },
});

export const config = {
  matcher: ["/admin", "/admin/((?!login).*)"],
};
