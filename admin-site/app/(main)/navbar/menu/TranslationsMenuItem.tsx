import { FiFlag } from "react-icons/fi";

import { getLocaleInfo } from "@/lib/locales";

import type { ProjectWithTranslations } from "./ProjectsMenu";

type Props = {
  project: ProjectWithTranslations;
};

const TranslationsMenuItem = ({ project }: Props) => {
  const notDefaultTranslations = project.translations.filter(
    (t) => t.language !== project.defaultLanguage,
  );

  const hasOnlyDefaultTransition = notDefaultTranslations.length === 0;

  return hasOnlyDefaultTransition ? null : (
    <li>
      <details open>
        <summary>
          <FiFlag />
          Translations
        </summary>

        <ul>
          {notDefaultTranslations.map((t) => (
            <li key={t.id}>
              <a>{getLocaleInfo(t.language)?.name}</a>
            </li>
          ))}
        </ul>
      </details>
    </li>
  );
};

export default TranslationsMenuItem;
