# ALIIGNSPACE CMS

A production-ready Headless CMS with Visual Page Builder built with Next.js, TypeScript, Prisma, and PostgreSQL.

## Features

### Core CMS Features
- **Visual Page Builder** - Drag-and-drop interface for building pages
- **Component Registry** - Modular, reusable components (Hero, About, Features, Services, Portfolio, Testimonials, Team, FAQ, Contact, CTA, Content)
- **Dynamic Page Rendering** - JSON-based content storage with dynamic component mapping
- **SEO Management** - Meta titles, descriptions, OG images, canonical URLs, schema markup
- **Page Versioning** - Automatic snapshots on each update for rollback capability
- **Role-Based Access Control** - Admin, Editor, and SEO roles

### Admin Panel
- **Dashboard** - Overview of pages, posts, media, and users
- **Page Management** - Create, edit, delete, and publish pages
- **Page Builder UI** - Drag-and-drop section reordering with dnd-kit
- **Schema-Driven Forms** - Auto-generated forms from component schemas
- **Media Library** - Upload and manage images (S3 integration ready)
- **User Management** - Manage admin users and roles

### Frontend
- **Dynamic Routing** - Catch-all slug routing for pages
- **Responsive Design** - Mobile-first with Tailwind CSS
- **Brand Design** - ALIIGNSPACE interior design theme with terracotta/cream colors
- **Server Components** - Optimized performance with Next.js App Router

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI + Tailwind)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Auth**: NextAuth.js (Credentials + JWT)
- **State Management**: Zustand
- **Forms**: React Hook Form
- **Drag & Drop**: dnd-kit
- **Storage**: AWS S3 (configurable)

## Project Structure

```
aliignspace-cms/
├── prisma/
│   └── schema.prisma       # Database schema
├── src/
│   ├── app/
│   │   ├── [...slug]/       # Dynamic page renderer
│   │   ├── admin/           # Admin panel
│   │   ├── api/             # API routes
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Homepage
│   │   └── globals.css      # Global styles
│   ├── components/
│   │   ├── blocks/          # Frontend block components
│   │   ├── builder/         # Page builder components
│   │   ├── layout/          # Header, Footer
│   │   ├── ui/              # shadcn/ui components
│   │   └── page-renderer.tsx
│   ├── hooks/               # Custom hooks
│   ├── lib/
│   │   ├── auth.ts          # NextAuth config
│   │   ├── component-registry.ts
│   │   ├── prisma.ts        # Prisma client
│   │   └── utils.ts         # Utility functions
│   └── types/               # TypeScript types
├── .env.example
├── next.config.js
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- (Optional) AWS S3 bucket for media storage

### Installation

1. Clone the repository:
```bash
cd aliignspace-cms
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/aliignspace_cms?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_REGION="us-east-1"
AWS_S3_BUCKET_NAME="aliignspace-media"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Create an admin user:
```bash
# You'll need to create a user directly in the database or via API
# The password should be hashed with bcrypt
```

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) for the frontend
8. Open [http://localhost:3000/admin](http://localhost:3000/admin) for the admin panel

## Usage

### Creating Pages

1. Log in to the admin panel at `/admin`
2. Navigate to "Pages" in the sidebar
3. Click "Create Page"
4. Enter page details (title, slug, status)
5. Use the Page Builder to add sections
6. Configure SEO settings
7. Save and publish

### Available Components

- **Hero** - Full-width hero with heading, subheading, CTA button, and background image
- **About** - Two-column layout with image and text, optional quote
- **Features** - Grid of feature cards with icons
- **Services** - Service cards with images and descriptions
- **Portfolio** - Image gallery with hover effects
- **Testimonials** - Client testimonials with quotes
- **Team** - Team member profiles
- **FAQ** - Accordion-style FAQ section
- **Contact** - Contact form with info
- **CTA** - Call-to-action banner
- **Content** - Rich text content block

### Customizing Components

Components are defined in `src/lib/component-registry.ts`. Each component has:
- `type` - Unique identifier
- `label` - Display name
- `description` - Help text
- `fields` - Array of field schemas

Field types: `text`, `textarea`, `richtext`, `number`, `boolean`, `select`, `media`, `color`, `url`, `array`, `object`

## Database Schema

### Models
- **User** - Admin users with roles
- **Page** - Website pages
- **Section** - Page sections with JSON props
- **SEO** - SEO metadata
- **Media** - Uploaded files
- **PageVersion** - Page history/snapshots
- **Post** - Blog posts
- **Category** - Blog categories
- **Tag** - Blog tags
- **Menu** - Navigation menus
- **GlobalBlock** - Header/Footer content

## API Endpoints

### Pages
- `GET /api/pages` - List all pages
- `POST /api/pages` - Create a new page
- `GET /api/pages/[id]` - Get a page
- `PUT /api/pages/[id]` - Update a page
- `DELETE /api/pages/[id]` - Delete a page

### Authentication
- `GET/POST /api/auth/[...nextauth]` - NextAuth.js endpoints

## Deployment

### Build for production:
```bash
npm run build
```

### Start production server:
```bash
npm start
```

### Environment Variables for Production

Make sure to set these in your production environment:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_URL` - Your production URL
- `NEXTAUTH_SECRET` - Strong random secret
- AWS credentials for S3 (if using media uploads)

## Customization

### Brand Colors
Edit `tailwind.config.ts` to customize the color palette:
```typescript
colors: {
  terracotta: { ... },
  cream: { ... },
}
```

### Adding New Components

1. Create the component in `src/components/blocks/`
2. Add to `src/lib/component-registry.ts`
3. Export from `src/components/blocks/index.ts`

## License

MIT License

## Support

For issues and feature requests, please open an issue on GitHub.
