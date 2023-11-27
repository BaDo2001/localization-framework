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

export const parseBooleanQueryParam = (param: string | null | undefined) =>
  param === "true";

export type KeyFilter = {
  query?: string | null;
  emptyOnly?: boolean | null;
  group?: string | null;
};

export const getQueryString = ({ query, emptyOnly, group }: KeyFilter) => {
  const params = new URLSearchParams();

  if (query) {
    params.append("query", query);
  }

  if (emptyOnly) {
    params.append("emptyOnly", String(emptyOnly));
  }

  if (group) {
    params.append("group", group);
  }

  return params.toString();
};
