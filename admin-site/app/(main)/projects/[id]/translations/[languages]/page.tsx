import { notFound } from "next/navigation";

import { requireProjectMember as getProject } from "@/app/api/utils/requireProjectMember";
import { parseLanguageParams } from "@/lib/params";

import AddKeyButton from "./add-key/AddKeyButton";
import TranslationEditor from "./editor/TranslationEditor";
import LanguagePairSelector from "./LanguagePairSelector";

type Props = {
  params: {
    id: string;
    // The languages in <source key>-<target key> format like hu-en
    languages: string;
  };
};

const TranslationPage = async ({ params }: Props) => {
  const { id: projectId, languages } = params;

  const parsedLanguageParams = parseLanguageParams(languages);

  if (!parsedLanguageParams) {
    return notFound();
  }

  const { source, target } = parsedLanguageParams;

  const project = await getProject({
    projectId,
    includeMembers: false,
    includeTranslations: true,
  });

  const projectLanguages = project.translations.map((t) => t.language);

  if (
    !projectLanguages.includes(source) ||
    !projectLanguages.includes(target)
  ) {
    return notFound();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-16">
        <h1 className="text-xl">{project.name}</h1>

        <AddKeyButton projectId={projectId} />
      </div>

      <div className="flex flex-col gap-y-10 w-2/3 mx-auto">
        <LanguagePairSelector
          project={project}
          defaultSourceLanguage={source}
          defaultTargetLanguage={target}
        />

        <TranslationEditor
          projectId={projectId}
          sourceLanguage={source}
          targetLanguage={target}
        />
      </div>
    </div>
  );
};

export default TranslationPage;
