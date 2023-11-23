"use client";

import { FaArrowsAltH } from "react-icons/fa";

import { useRouter } from "next/navigation";

import LanguageSelector from "@/components/LanguageSelector";
import { getLocaleKeysExcluding } from "@/lib/locales";

type Props = {
  projectId: string;
  projectLanguages: string[];
  defaultSourceLanguage: string;
  defaultTargetLanguage: string;
};

const LanguagePairSelector = ({
  projectId,
  projectLanguages,
  defaultSourceLanguage,
  defaultTargetLanguage,
}: Props) => {
  const router = useRouter();

  const notProjectLanguages = getLocaleKeysExcluding(projectLanguages);

  const handleSourceChange = (value: string | string[] | null) => {
    router.push(
      `/projects/${projectId}/translations/${value}-${defaultTargetLanguage}`,
    );
  };

  const handleTargetChange = (value: string | string[] | null) => {
    router.push(
      `/projects/${projectId}/translations/${defaultSourceLanguage}-${value}`,
    );
  };

  return (
    <div className="flex justify-center items-center gap-x-6">
      <LanguageSelector
        value={defaultSourceLanguage}
        onChange={handleSourceChange}
        keysToExclude={notProjectLanguages}
        classNames={{ container: () => "w-80" }}
      />

      <FaArrowsAltH />

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
