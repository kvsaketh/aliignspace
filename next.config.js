/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: ".",
  },
  images: {
    // Only the hosts actually used by site content; a wildcard turns the
    // image optimizer into an open proxy for arbitrary URLs.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "http", hostname: "localhost" },
    ],
  },
  async redirects() {
    // The header nav used to link to these slugs before it was fixed to match
    // the real Service records — redirect in case they're bookmarked/indexed.
    return [
      { source: "/services/turnkey", destination: "/services/full-home-interiors", permanent: true },
      { source: "/services/renovation", destination: "/services/full-home-interiors", permanent: true },
      { source: "/services/modular", destination: "/services/modular-kitchen", permanent: true },
      { source: "/services/commercial", destination: "/services/office-commercial-interiors", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // Enforce HTTPS for a year once served over TLS (ignored on plain http).
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
        ],
      },
      {
        // Admin UI is same-origin; public GET endpoints stay readable cross-origin
        // without credentials. Never combine a wildcard origin with credentials.
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET" },
          { key: "Access-Control-Allow-Headers", value: "Accept, Content-Type" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
