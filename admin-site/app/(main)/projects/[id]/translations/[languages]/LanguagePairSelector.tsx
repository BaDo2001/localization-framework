"use client";

import { FaArrowsAltH } from "react-icons/fa";

import { useRouter } from "next/navigation";

import type { ProjectWithTranslations } from "@/app/api/types/project";
import LanguageSelector from "@/components/LanguageSelector";
import { getLocaleKeysExcluding } from "@/lib/locales";

type Props = {
  project: ProjectWithTranslations;
  defaultSourceLanguage: string;
  defaultTargetLanguage: string;
};

const LanguagePairSelector = ({
  project,
  defaultSourceLanguage,
  defaultTargetLanguage,
}: Props) => {
  const router = useRouter();

  const projectLanguages = project.translations.map((t) => t.language);
  const notProjectLanguages = getLocaleKeysExcluding(projectLanguages);

  const handleSourceChange = (value: string | string[] | null) => {
    router.push(
      `/projects/${project.id}/translations/${value}-${defaultTargetLanguage}`,
    );
  };

  const handleTargetChange = (value: string | string[] | null) => {
    router.push(
      `/projects/${project.id}/translations/${defaultSourceLanguage}-${value}`,
    );
  };

  const swapOrder = () => {
    router.push(
      `/projects/${project.id}/translations/${defaultTargetLanguage}-${defaultSourceLanguage}`,
    );
  };

  return (
    <div className="flex justify-center items-center gap-x-4">
      <LanguageSelector
        value={defaultSourceLanguage}
        onChange={handleSourceChange}
        keysToExclude={notProjectLanguages}
        classNames={{ container: () => "w-80" }}
      />

      <button type="button" className="p-2" onClick={swapOrder}>
        <FaArrowsAltH />
      </button>

      <LanguageSelector
        value={defaultTargetLanguage}
        onChange={handleTargetChange}
        keysToExclude={notProjectLanguages}
        classNames={{ container: () => "w-80" }}
      />
    </div>
  );
};

export default LanguagePairSelector;
