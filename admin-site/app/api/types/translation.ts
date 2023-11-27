import type {
  Project as PrismaProject,
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

type TranslationIncludes<
  Project extends boolean,
  TranslationEntries extends boolean,
> = PrismaTranslation & {
  project: Project extends true ? PrismaProject : undefined;
  translationEntries: TranslationEntries extends true
    ? TranslationEntry[]
    : undefined;
};

export type TranslationWithEntries = TranslationIncludes<false, true>;
