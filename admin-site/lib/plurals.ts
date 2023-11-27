import type { TranslationEntryPair } from "@/app/api/types/translation";

export const plurals = [
  "_zero",
  "_one",
  "_two",
  "_few",
  "_many",
  "_other",
] as const;

export type Plural = (typeof plurals)[number];

export const getPluralName = (plural: Plural) => plural.slice(1);

export const getPluralsExcluding = (pluralsToExclude: string[]) =>
  plurals.filter((plural) => !pluralsToExclude.includes(plural));

export const getPluralVersions = (
  key: string,
  pairs: TranslationEntryPair[],
) => {
  const keys = pairs.map((pair) => pair.sourceEntry.key);

  return plurals.filter((plural) => keys.includes(key + plural));
};

export const isPluralKey = (key: string) =>
  plurals.some((plural) => key.endsWith(plural));
