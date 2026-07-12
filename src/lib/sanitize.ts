import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitize CMS-authored HTML before it is passed to dangerouslySetInnerHTML.
 * Neutralizes stored-XSS payloads (script, event handlers, javascript: URLs)
 * while keeping the formatting tags editors actually use. Applied render-side
 * so existing stored payloads are also cleaned.
 */
export function sanitizeHtml(dirty: string | null | undefined): string {
  if (!dirty) return "";
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      "p", "br", "strong", "b", "em", "i", "u", "s", "span", "mark", "small",
      "h1", "h2", "h3", "h4", "h5", "h6",
      "ul", "ol", "li", "blockquote", "a", "sup", "sub",
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "class", "style"],
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.-]+(?:[^a-z+.:-]|$))/i,
  });
}

// ponytail: runnable check — `node --experimental-strip-types src/lib/sanitize.ts`
if (import.meta.url === `file://${process.argv[1]}`) {
  const cases: [string, (o: string) => boolean][] = [
    ["<img src=x onerror=alert(1)>", (o) => !o.includes("onerror")],
    ['<a href="javascript:alert(1)">x</a>', (o) => !o.toLowerCase().includes("javascript:")],
    ["<script>alert(1)</script>hi", (o) => !o.includes("<script")],
    ["<strong>bold</strong>", (o) => o.includes("<strong>bold</strong>")],
    ["<em>trust</em> matters", (o) => o.includes("<em>trust</em>")],
  ];
  for (const [input, ok] of cases) {
    const out = sanitizeHtml(input);
    if (!ok(out)) throw new Error(`sanitize failed: ${input} -> ${out}`);
  }
  console.log("sanitizeHtml self-check passed");
}
