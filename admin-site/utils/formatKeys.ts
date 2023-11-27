import _ from "lodash";

import type { TranslationWithEntries } from "@/app/api/types/translation";

import { createNestedKeys } from "./createNestedKeys";

export type KeyEntry = {
  absolutePath: string;
  children?: Record<string, KeyEntry>;
};

export const formatKeys = (translation: TranslationWithEntries) =>
  translation.translationEntries.reduce(
    (acc, entry) => {
      if (!entry.key.includes(".")) {
        return {
          ...acc,
          [entry.key]: {
            absolutePath: entry.key,
          },
        };
      }

      const keyElements = entry.key.split(".");
      const nestedObject = createNestedKeys({}, keyElements, []);

      return _.merge(acc, nestedObject);
    },
    {} as Record<string, KeyEntry>,
  );
