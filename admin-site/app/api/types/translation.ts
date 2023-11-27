import type {
  Translation as PrismaTranslation,
  TranslationEntry,
} from "@prisma/client";

type TranslationEntryIncludes<Translation extends boolean> =
  TranslationEntry & {
    translation: Translation extends true ? PrismaTranslation : undefined;
  };

type TranslationEntryWithTranslation = TranslationEntryIncludes<true>;

export type TranslationEntryPair = {
  sourceEntry: TranslationEntryWithTranslation;
  targetEntry: TranslationEntryWithTranslation;
};
