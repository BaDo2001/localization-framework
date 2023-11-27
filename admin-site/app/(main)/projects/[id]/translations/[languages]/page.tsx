import { notFound } from "next/navigation";

import { getTranslationEntryPairs } from "@/app/api/keys/getTranslationEntryPairs";
import { requireProjectMember as getProject } from "@/app/api/utils/requireProjectMember";
import { parseBooleanQueryParam, parseLanguageParams } from "@/lib/params";

import AddKeyButton from "./add-key/AddKeyButton";
import TranslationEditor from "./editor/TranslationEditor";
import KeyTreeView from "./key-tree/KeyTreeView";
import Filter from "./Filter";
import LanguagePairSelector from "./LanguagePairSelector";

type Props = {
  params: {
    id: string;
    // The languages in <source key>-<target key> format like hu-en
    languages: string;
  };
  searchParams: {
    query?: string;
    emptyOnly?: string;
    group?: string;
  };
};

const TranslationPage = async ({ params, searchParams }: Props) => {
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

  const pairs = await getTranslationEntryPairs({
    projectId,
    sourceLanguage: source,
    targetLanguage: target,
    filter: {
      ...searchParams,
      emptyOnly: parseBooleanQueryParam(searchParams.emptyOnly),
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-16">
        <h1 className="text-xl font-bold">{project.name}</h1>

        <AddKeyButton project={project} />
      </div>

      <div className="flex">
        <KeyTreeView projectId={projectId} />

        <div className="flex flex-col w-2/3 mx-auto">
          <LanguagePairSelector
            project={project}
            defaultSourceLanguage={source}
            defaultTargetLanguage={target}
          />

          <div className="mt-10">
            <Filter
              initialValues={{
                ...searchParams,
                emptyOnly: parseBooleanQueryParam(searchParams.emptyOnly),
              }}
            />
          </div>

          <TranslationEditor pairs={pairs} />
        </div>
      </div>
    </div>
  );
};

export default TranslationPage;
