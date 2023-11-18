"use client";

import { FiFlag } from "react-icons/fi";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { getLocaleInfo } from "@/lib/locales";

import type { ProjectWithTranslations } from "./ProjectsMenu";

type Props = {
  project: ProjectWithTranslations;
};

const TranslationsMenuItem = ({ project }: Props) => {
  const pathname = usePathname();

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
          {notDefaultTranslations.map((t) => {
            const translationLink = `/projects/${project.id}/translations/${project.defaultLanguage}-${t.language}`;

            return (
              <li key={t.id}>
                <Link
                  href={translationLink}
                  className={clsx(pathname === translationLink && "active")}
                >
                  {getLocaleInfo(t.language)?.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </details>
    </li>
  );
};

export default TranslationsMenuItem;
