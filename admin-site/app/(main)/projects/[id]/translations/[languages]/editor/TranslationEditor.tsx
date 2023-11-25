import { getTranslationEntryPairs } from "@/app/api/keys/getTranslationEntryPairs";

import TranslationEntryPairEditor from "./TranslationEntryPairEditor";

type Props = {
  projectId: string;
  sourceLanguage: string;
  targetLanguage: string;
};

const TranslationEditor = async ({
  projectId,
  sourceLanguage,
  targetLanguage,
}: Props) => {
  const pairs = await getTranslationEntryPairs({
    projectId,
    sourceLanguage,
    targetLanguage,
  });

  return pairs.length > 0 ? (
    <div className="flex flex-col gap-y-10">
      {pairs.map((pair) => (
        <TranslationEntryPairEditor
          key={pair.sourceEntry.id}
          pair={pair}
          readonly={sourceLanguage === targetLanguage}
        />
      ))}
    </div>
  ) : (
    <p className="text-center">No keys have been added to this project yet</p>
  );
};

export default TranslationEditor;
