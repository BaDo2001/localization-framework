import type { Translation, TranslationEntry } from "@prisma/client";
import _ from "lodash";

import { createNestedObject } from "./createNestedObject";

type TranslationWithEntries = Translation & {
  translationEntries: TranslationEntry[];
};

export const formatTranslations = (translation: TranslationWithEntries) => ({
  translations: translation.translationEntries.reduce(
    (acc, entry) => {
      if (!entry.key.includes(".")) {
        return {
          ...acc,
          [entry.key]: entry.value,
        };
      }

      const keyElements = entry.key.split(".");
      const nestedObject = createNestedObject({}, keyElements, entry.value);

      return _.merge(acc, nestedObject);
    },
    {} as Record<string, unknown>,
  ),
});
