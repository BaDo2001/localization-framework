"use client";

import { FiFlag } from "react-icons/fi";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { ProjectWithTranslations } from "@/app/api/types/project";
import { getLocaleInfo } from "@/lib/locales";

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
        <summary className="font-semibold">
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
