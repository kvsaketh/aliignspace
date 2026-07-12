/**
 * Standalone seeder for the ALIIGNSPACE service catalogue.
 *
 * Run:  node --experimental-strip-types prisma/seed-services/seed.ts
 *
 * Upserts every service by slug, so it is safe to re-run.
 */
import { PrismaClient } from "@prisma/client";
import { services as groupA } from "./group-a.ts";
import { services as groupB } from "./group-b.ts";

const prisma = new PrismaClient();

const allServices = [...groupA, ...groupB];

async function main() {
  for (const s of allServices) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {
        title: s.title,
        shortDesc: s.shortDesc,
        description: s.description,
        image: s.image,
        heroImage: s.heroImage,
        sortOrder: s.sortOrder,
        isActive: true,
        features: s.features,
        processSteps: s.processSteps,
        stats: s.stats,
        gallery: s.gallery,
        content: s.content,
      },
      create: {
        title: s.title,
        slug: s.slug,
        shortDesc: s.shortDesc,
        description: s.description,
        image: s.image,
        heroImage: s.heroImage,
        sortOrder: s.sortOrder,
        isActive: true,
        features: s.features,
        processSteps: s.processSteps,
        stats: s.stats,
        gallery: s.gallery,
        content: s.content,
      },
    });
    console.log(`  ✓ ${s.slug}`);
  }
  console.log(`✅ Services seeded: ${allServices.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
