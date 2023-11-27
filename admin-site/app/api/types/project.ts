import type { Member, Project, Translation } from "@prisma/client";

export type ProjectWithTranslations = ProjectIncludes<false, true>;

export type ProjectIncludes<
  Members extends boolean,
  Translations extends boolean,
> = Project & {
  members: Members extends true ? Member[] : undefined;
  translations: Translations extends true ? Translation[] : undefined;
};
