# CMS-Synced Home Page

This document describes the CMS-synced home page implementation.

## Overview

The home page is now fully integrated with the CMS. Content is fetched from the database and sections are rendered dynamically based on the CMS configuration.

## File Structure

```
src/
├── app/
│   ├── page.tsx                 # Main CMS-synced home page
│   ├── page-static.tsx          # Static fallback when CMS is unavailable
│   ├── (cms)/
│   │   └── page.tsx             # Re-export of main page (for organization)
│   └── api/pages/home/
│       └── route.ts             # API endpoint for home page management
├── components/cms/
│   ├── SectionRenderer.tsx      # Renders individual sections dynamically
│   ├── DynamicPage.tsx          # Wrapper for rendering page with sections
│   └── index.ts                 # Exports for CMS components
├── lib/
│   ├── section-mapper.ts        # Maps section types to components & default props
│   └── cms-page.ts              # Helper functions for page management
└── types/
    └── cms.ts                   # CMS TypeScript types
```

## Supported Section Types

The home page supports the following section types:

| Section Type | Component | Description |
|--------------|-----------|-------------|
| `hero-premium` | HeroPremium | Full-screen hero with parallax, animated text |
| `stats-floating` | StatsFloating | Floating stats bar with animated counters |
| `why-choose-us-premium` | WhyChooseUsPremium | 6 feature cards with 3D tilt effect |
| `about-premium` | AboutPremium | Split layout with image gallery |
| `services-premium` | ServicesPremium | Horizontal scroll service cards |
| `portfolio-premium` | PortfolioPremium | Masonry grid with category filters |
| `testimonials-premium` | TestimonialsPremium | Carousel with Google reviews |
| `consultation` | ConsultationBlock | Lead capture form |

## How It Works

### 1. Page Load Flow

1. `page.tsx` calls `getHomePage()` to fetch the home page from database
2. If no home page exists, it creates one with default sections
3. Sections are sorted by `order` field
4. Each section is rendered using `SectionRenderer` component

### 2. Data Flow

```
Database (Page + Sections)
    ↓
Prisma Query (getHomePage)
    ↓
SectionRenderer (maps type to component)
    ↓
React Component (with merged props)
    ↓
Rendered HTML
```

### 3. Props Merging

Default props are defined in `section-mapper.ts`. When rendering:
1. Get default props for section type
2. Deep merge with CMS props (CMS values override defaults)
3. Pass merged props to component

## API Endpoints

### GET /api/pages/home

Fetches or creates the home page with all sections.

**Response:**
```json
{
  "id": "...",
  "title": "Home",
  "slug": "home",
  "status": "PUBLISHED",
  "sections": [...],
  "seo": {...}
}
```

### PUT /api/pages/home

Updates the home page sections (requires authentication).

**Request Body:**
```json
{
  "sections": [
    {
      "type": "hero-premium",
      "props": {...}
    }
  ]
}
```

## Admin Panel Integration

To edit the home page through the admin panel:

1. Navigate to `/admin/pages`
2. Find the page with slug "home"
3. Edit sections through the visual builder
4. Changes are saved to the database
5. Home page automatically reflects changes (revalidated every hour)

## Fallback Behavior

If the CMS is unavailable or returns an error:
1. The static fallback (`page-static.tsx`) is rendered
2. All content is hardcoded with the same default values
3. Users still see a fully functional home page

## Caching & Revalidation

- The home page is statically generated at build time
- Content is revalidated every hour (`revalidate = 3600`)
- To force immediate update, use on-demand revalidation via API

## Adding New Sections

To add a new section type:

1. Create the component in `src/components/blocks/`
2. Add section type to `SectionType` in `section-mapper.ts`
3. Add default props to `defaultSectionProps`
4. Add component to `sectionComponentMap`
5. Add human-readable label to `sectionTypeLabels`

## Environment Variables

Ensure these environment variables are set:

```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
```

## Testing

Test the home page:

```bash
# Development
cd aliignspace-cms && npm run dev

# Build
npm run build

# Type check
npx tsc --noEmit
```

## Troubleshooting

### Home page shows static content only
- Check database connection
- Verify `DATABASE_URL` is correct
- Check Prisma migration status

### Sections not updating
- Clear Next.js cache: `rm -rf .next`
- Rebuild the application
- Check section order in database

### API errors
- Verify user is authenticated for PUT requests
- Check server logs for detailed error messages
