import type { TranslationEntryPair } from "@/app/api/types/translation";

import TranslationEntryPairEditor from "./TranslationEntryPairEditor";

type Props = {
  pairs: TranslationEntryPair[];
};

const TranslationEditor = ({ pairs }: Props) =>
  pairs.length > 0 ? (
    <div className="flex flex-col gap-y-10">
      {pairs.map((pair) => (
        <TranslationEntryPairEditor
          key={pair.sourceEntry.id}
          pair={pair}
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
