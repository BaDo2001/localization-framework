import type { Project } from "@prisma/client";

import type { TranslationEntryPair } from "@/app/api/types/translation";
import { getPluralVersions } from "@/lib/plurals";

import TranslationEntryPairEditor from "./TranslationEntryPairEditor";

type Props = {
  project: Project;
  pairs: TranslationEntryPair[];
};

const TranslationEditor = ({ project, pairs }: Props) =>
  pairs.length > 0 ? (
    <div className="flex flex-col gap-y-10">
      {pairs.map((pair) => (
        <TranslationEntryPairEditor
          key={pair.sourceEntry.id}
          project={project}
          pair={pair}
          pluralVersions={getPluralVersions(pair.sourceEntry.key, pairs)}
          readonly={
            pair.sourceEntry.translation.language ===
            pair.targetEntry.translation.language
          }
        />
      ))}
    </div>
  ) : (
    <p className="text-center">No keys were found</p>
  );

export default TranslationEditor;
