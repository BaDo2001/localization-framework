import { isLocaleKey } from "./locales";

type LanguagePair = {
  source: string;
  target: string;
};

export const parseLanguageParams = (languages: string): LanguagePair | null => {
  // The languages are supposed to be in <source key>-<target key> format like hu-en
  if (!languages.match(/^[a-z]{2}-[a-z]{2}$/)) {
    return null;
  }

  const [source, target] = languages.split("-");

  if (!isLocaleKey(source) || !isLocaleKey(target)) {
    return null;
  }

  return {
    source,
    target,
  };
};
