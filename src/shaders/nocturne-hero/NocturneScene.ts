// Catalog stub: Kage build does not use Nocturne variants.
// Preserved to satisfy the exact LandingPages.tsx import seam.
export const NOCTURNE_VARIANTS = ["midnight"] as const;
export type NocturneVariant = (typeof NOCTURNE_VARIANTS)[number];
export const NOCTURNE_TITLES: Record<NocturneVariant, string> = {
  midnight: "Nocturne — midnight",
};
export function buildNocturneDocument(_variant?: string): string | undefined {
  return undefined;
}
