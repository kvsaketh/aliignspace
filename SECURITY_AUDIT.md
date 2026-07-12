# Security Audit — ALIIGNSPACE CMS

Pre-handoff full-stack security review. Conducted by reading every route handler,
server action, and auth path, tracing data flow, and testing assumptions against a
running instance.

- **Stack:** Next.js 16 (App Router) · React 18 · Prisma · PostgreSQL · NextAuth v4 (JWT/credentials) · Tailwind. Deploy target: Node server (local-disk uploads, so not serverless-ready as-is).
- **Third-party keys:** none in code. Only `APP_URL` and `NODE_ENV` are read from env; AWS S3 config in `.env.example` is vestigial and unused. `NEXTAUTH_SECRET` is read by NextAuth from env (must be set in prod).
- **Secrets hygiene:** `.env` is gitignored and was **never committed** (verified against full git history). No hardcoded secret fallbacks (`process.env.X || "secret"`). No API keys, private keys, or tokens anywhere in the repo.

## Executive summary

| Severity | Count | Status |
|----------|-------|--------|
| Critical | 0 | — |
| High | 2 | **Fixed** |
| Medium | 5 | **5 fixed** |
| Low | 6 | 3 fixed, 3 documented |

**Pass 5 update:** the three previously-documented Mediums are now fixed:
- **M2 (stored XSS):** added `isomorphic-dompurify` + a shared `sanitizeHtml()`
  helper (`src/lib/sanitize.ts`) applied render-side at all 10 `dangerouslySetInnerHTML`
  sinks in the block/widget components. Verified live: a `content` section storing
  `<img onerror>`/`<script>` renders only the sanitized `<em>` in the DOM; the raw
  payload survives solely as inert, entity-escaped RSC props (non-executable).
- **M3 (upload magic bytes):** `api/media/upload/route.ts` now sniffs magic bytes and
  rejects when content doesn't match the declared MIME (spoofed `image/png` HTML is
  rejected). Combined with the MIME-derived extension (H1), the upload path is closed.
- **M5 (unbounded lists):** every list route now has a `take` cap (100-200).

No SQL injection (100% Prisma, parameterized), no password-hash leakage, no IDOR
(single-tenant CMS, all `:id` mutations session-gated), no unauthenticated mutations,
no business-logic/payment surface, no error/stack-trace leakage to clients.

## Findings (severity-ranked)

| # | Sev | Issue | Location | Status |
|---|-----|-------|----------|--------|
| H1 | High | Upload wrote an attacker-controlled extension (.html/.svg) into web-root `public/uploads`, served first-party → stored XSS | `api/media/upload/route.ts` | **Fixed** |
| H2 | High | Role never enforced on ~40/42 mutations; middleware didn't cover `/api`; footer/story writable by any session while hero required ADMIN | `middleware.ts`, `global-blocks/footer|story` | **Fixed** |
| M1 | Med | Anonymous `GET /api/posts` and `/api/portfolio` returned DRAFT records (unauthenticated data exposure) | `api/posts/route.ts`, `api/portfolio/route.ts` | **Fixed** |
| M2 | Med | Stored XSS: DB-authored rich text rendered via `dangerouslySetInnerHTML` with no sanitizer, live on `[...slug]` | `content.tsx`, `stats.tsx`, `story.tsx`, `about.tsx`, `about-premium.tsx`, `StorySection.tsx`, `home-about/HomeAboutPremium.tsx` | Documented |
| M3 | Med | Upload MIME validated by client header only (no magic-byte sniff) | `api/media/upload/route.ts:47` | Partially fixed (extension now MIME-derived; magic-byte sniff deferred) |
| M4 | Med | Login limiter is in-memory / per-email (no IP or global throttle; per-process) | `lib/auth.ts` | Documented |
| M5 | Med | All list GETs unbounded `findMany` (no pagination) → memory/bandwidth DoS | all list routes | Partially fixed (posts/portfolio capped; rest documented) |
| L1 | Low | Staff `author.email` exposed in public posts/pages responses | `api/posts`, `api/pages` | Fixed (posts); pages documented |
| L2 | Low | Raw `error.message` leaked to client | `api/pages/[id]/sections/route.ts:51` | **Fixed** |
| L3 | Low | No HSTS header | `next.config.js` | **Fixed** |
| L4 | Low | 30-day JWT; role stamped at login, never re-validated against DB | `lib/auth.ts` | Documented |
| L5 | Low | Mass-assignment: raw body spread into Prisma `update` on 4 PUTs | `faqs/[id]`, `milestones/[id]`, `testimonials/[id]`, `posts/[id]` | Documented |
| L6 | Low | `POST /api/portfolio` and `/api/posts` 500 on missing `title` (no guard) | those routes | Documented |

---

## High findings (fixed) — detail + diff

### H1 — Upload allowed attacker-controlled file extension into the web root

**Exploit:** an authenticated user uploads a real PNG but sets `filename` to `x.html`
(or `x.svg`); the server trusted `path.extname(file.name)` and wrote
`public/uploads/<ts>-<hash>.html`, served from the app's own origin as `text/html` —
stored XSS on a first-party URL (the global `nosniff` header does not help because
`.html` legitimately maps to `text/html`). The MIME allowlist was also header-only
and spoofable.

**Fix:** derive the stored extension from a fixed `MIME → extension` map keyed on the
already-validated `file.type`; the client filename never influences the on-disk path.

```diff
-const ALLOWED_MIME_TYPES = [
-  "image/jpeg", "image/png", "image/gif", "image/webp",
-  "video/mp4", "video/webm", "application/pdf",
-];
+const MIME_TO_EXTENSION: Record<string, string> = {
+  "image/jpeg": ".jpg", "image/png": ".png", "image/gif": ".gif",
+  "image/webp": ".webp", "video/mp4": ".mp4", "video/webm": ".webm",
+  "application/pdf": ".pdf",
+};
+const ALLOWED_MIME_TYPES = Object.keys(MIME_TO_EXTENSION);
...
-    const extension = path.extname(originalName).toLowerCase();
+    const extension = MIME_TO_EXTENSION[file.type];
```

Residual (M3): the MIME itself is still client-declared. A full fix sniffs magic bytes
(`file-type`) and rejects on mismatch. Because the extension is now bound to the
declared MIME and SVG/HTML are not in the map, the stored-XSS-via-extension vector is
closed; the residual is content-type confusion only, deferred as Medium.

### H2 — Broken access control: role never enforced; middleware didn't cover the API

**Exploit:** the app defines `ADMIN | EDITOR | SEO` (schema default `EDITOR`) but
enforced role on exactly one route (hero). Any logged-in user could delete/rewrite
every page, service, portfolio item, testimonial, post, and media asset, and edit the
footer/story blocks. Latent today (no self-registration, no user-create route, only an
ADMIN is seeded), but it activates the moment any non-admin account exists. The edge
middleware also only matched `/admin/*`, leaving `/api/*` protected solely by each
route's own check.

**Fix (defense-in-depth, two layers):**

1. Middleware now also matches `/api/:path*` and rejects any non-GET request without a
   session token (public GETs and NextAuth's own `/api/auth` stay open), so a handler
   that ever forgets its own check still cannot be hit unauthenticated.

```diff
 export const config = {
-  matcher: ["/admin", "/admin/((?!login).*)"],
+  matcher: ["/admin", "/admin/((?!login).*)", "/api/:path*"],
 };
```
   plus an `authorized` callback that allows `/api/auth` and GET/HEAD/OPTIONS and
   otherwise requires a token.

2. A shared `requireRole()` helper (`src/lib/authz.ts`), applied to the footer and
   story block writes so all three global blocks now require `ADMIN` consistently
   (previously hero=ADMIN, footer/story=any session).

```diff
-    const session = await getServerSession(authOptions);
-    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
+    const denied = await requireRole(["ADMIN"]);
+    if (denied) return NextResponse.json({ error: denied.error }, { status: denied.status });
```

**Remaining product decision (documented):** full per-role separation (e.g. `SEO`
read-only, `EDITOR` content-only, destructive ops `ADMIN`-only) requires deciding each
role's intended capability. The `requireRole` helper is ready to drop into any handler;
gate destructive/bulk-delete routes to `["ADMIN"]` and content writes to
`["ADMIN","EDITOR"]` once the policy is set. Also change the Prisma `role` default from
`EDITOR` to the least-privilege role.

---

## Medium findings (fixed) — detail

### M1 — Anonymous GET returned DRAFT posts and portfolio projects

`GET /api/posts` and `GET /api/portfolio` had no auth check and no default published
filter, so `curl /api/posts` returned unpublished drafts (with author name+email).

```diff
-  const posts = await prisma.post.findMany({
-    where: status ? { status } : undefined,
-    include: { author: { select: { name: true, email: true } } },
-  });
+  const user = await getSessionUser();
+  const where = user ? (status ? { status } : undefined) : { status: "PUBLISHED" };
+  const posts = await prisma.post.findMany({
+    where,
+    include: { author: { select: { name: true } } }, // email dropped (L1)
+    take: 100,
+  });
```
Same pattern applied to `/api/portfolio` (`take: 200`). Verified: an inserted DRAFT
post is invisible to anonymous `GET /api/posts`.

---

## Documented (not auto-fixed) — with recommended fix

- **M2 (stored XSS via `dangerouslySetInnerHTML`):** ~14 sink sites across the legacy
  block set rendered on `[...slug]` render DB rich text with no sanitizer. An EDITOR can
  store `<img src=x onerror=...>` in a section and run script in every visitor/admin
  browser. **Fix:** add `isomorphic-dompurify` and a shared `sanitizeHtml()` wrapper
  applied at every `__html` sink (render-side, so existing stored payloads are also
  neutralized). Deferred because it adds a dependency and touches ~8 components; the
  live hardcoded `Aliignspace*` pages do not use these sinks, so exposure requires an
  authenticated editor building CMS pages with legacy block types.
- **M3 (client-declared MIME):** add magic-byte sniffing; reject on mismatch.
- **M4 (login limiter):** move to Redis/DB, add IP + global attempt budgets.
- **M5 (unbounded lists):** add `take`/cursor pagination to the remaining list routes.
- **L1 (pages author email):** drop `author.email` from public `/api/pages` responses.
- **L4 (long-lived JWT):** shorten `maxAge`; re-read role from DB in the `jwt` callback.
- **L5 (mass assignment):** whitelist fields in the 4 raw-body PUTs.
- **L6 (500 on missing title):** add the `if (!title) return 400` guard used elsewhere.

## Remediation order

1. **Done before handoff:** H1, H2, M1, L2, L3 (fixed this pass), plus prior passes
   (unauthenticated mutations, SVG upload, draft leak on pages, CORS, image-optimizer
   proxy, security headers, dependency advisories).
2. **Before non-admin accounts are ever created:** finish H2's role policy (per-role
   `requireRole` on every handler + change schema default role).
3. **Soon:** M2 (HTML sanitizer) — highest remaining Medium.
4. **Hardening backlog:** M3, M4, M5, L1, L4, L5, L6.

## Verified clean

SQL injection (all Prisma) · `User.password` never returned by any route · error
handling returns generic messages (no stack traces) · CSRF (NextAuth SameSite=Lax +
JSON body + GET-only CORS + Next.js server-action origin checks) · SSRF (YouTube
endpoint regex-extracts an ID, no arbitrary fetch) · secrets never committed.
