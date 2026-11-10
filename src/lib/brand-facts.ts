// Single source of truth for what ALIIGNSPACE can honestly claim, and the real project photos
// to show for each service. Every page should take its numbers and imagery from here rather than
// from seeded CMS copy. Change a number here and it changes everywhere.

export const COMPANY_STATS = [
  { value: "50+", label: "Homes delivered" },
  { value: "75–90", label: "Days, design to keys" },
  { value: "4.9★", label: "Google rating" },
  { value: "2021", label: "Designing since" },
];

export const CITIES = "Hyderabad, Nellore & Vizag";

const lp = (name: string) => `/lp/${name}.webp`;
const range = (prefix: string, ids: number[]) => ids.map((i) => lp(`${prefix}-${i}`));

const KITCHEN = range("project-kitchen", [5, 1, 3, 6, 2, 4]);
const LIVING = range("project-living-room", [3, 4, 6, 5, 7, 2, 8, 9, 1]);
const BEDROOM = range("project-bedroom", [9, 2, 10, 8, 3, 5, 7, 1, 4, 6]);
const WARDROBE = range("project-bedroom", [10, 3, 7, 5, 6, 4]);
const FURNITURE = [lp("project-living-room-6"), lp("project-living-room-7"), lp("project-living-room-9"), lp("project-bedroom-2"), lp("project-bedroom-9"), lp("project-living-room-8")];
const RENOVATION = [lp("before-after-6"), lp("before-after-8"), lp("before-after-2"), lp("before-after-4"), lp("project-living-room-5"), lp("project-kitchen-5")];
const OFFICE = [lp("before-after-2"), lp("before-after-4")];
const FULL_HOME = [lp("project-living-room-5"), lp("project-kitchen-5"), lp("project-bedroom-9"), lp("project-living-room-6"), lp("project-kitchen-1"), lp("project-bedroom-10")];

// Keyed by service slug (CMS slugs and the short slugs used in the header menu).
const PHOTOS: Record<string, string[]> = {
  turnkey: FULL_HOME,
  "full-home-interiors": FULL_HOME,
  renovation: RENOVATION,
  "home-renovation": RENOVATION,
  modular: KITCHEN,
  "modular-kitchen": KITCHEN,
  "living-room-interiors": LIVING,
  "bedroom-interiors": BEDROOM,
  "wardrobe-design": WARDROBE,
  "luxury-furniture": FURNITURE,
  commercial: OFFICE,
  "office-commercial-interiors": OFFICE,
};

/** Real ALIIGNSPACE project photos for a service (first one is the hero). */
export function servicePhotos(slug: string): string[] {
  return PHOTOS[slug] ?? FULL_HOME;
}
