// Stub — NocturneScene is not used by KageLandingPage.
export type NocturneVariant = "midnight";
export const NOCTURNE_VARIANTS: readonly NocturneVariant[] = ["midnight"] as const;
export const NOCTURNE_TITLES: Record<NocturneVariant, string> = {
  midnight: "Nocturne — midnight",
};
export function buildNocturneDocument(_variant: NocturneVariant): string {
  return "";
}
