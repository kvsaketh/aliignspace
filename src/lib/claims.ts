// Guards service-page copy that was seeded into the CMS without being checked: any sentence making a
// specific, checkable promise (named material brands, warranty terms, prices, factory/in-house claims,
// fixed day counts) is dropped until the owner confirms it. Descriptive design language is kept.
// Hettich, Hafele & Blum are deliberately allowed — ALIIGNSPACE states those fittings in its own copy.
const CLAIM =
  /\b(BWP|BWR|boiling[- ]?water\w*|water\s?proof\w*|termite|borer|German|Century|Merino|Greenlam|Asian Paints|Saint[- ]Gobain|Jaquar|Ebco|factory|in-house|our own|warrant\w*|penalt\w*|EMI|financ\w*|guarantee\w*|certified|lakh\w*|ISO|E[01])\b|₹|\d+\s?[-–]?\s?\d*\s?(day|week|month|year|yr)s?\b|\d+\+|\d+\s?%/i;

export function isClaim(text: string): boolean {
  return CLAIM.test(text);
}

/** Removes sentences that contain an unconfirmed claim; returns "" if nothing is left. */
export function stripClaims(text: string): string {
  return (text.match(/[^.!?]+[.!?]*\s*/g) ?? [])
    .filter((sentence) => !isClaim(sentence))
    .join("")
    .trim();
}
