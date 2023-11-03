"use client";

import { useTransition } from "react";
import { LuX } from "react-icons/lu";

import type { Translation } from "@prisma/client";
import Image from "next/image";

import { removeLanguage } from "@/app/api/projects/removeLanguage";
import Dialog from "@/components/Dialog";
import { useDialog } from "@/hooks/useDialog";
import { isLocaleKey, locales } from "@/lib/locales";

type Props = {
  projectId: string;
  defaultLanguage: string;
  translation: Translation;
  readonly: boolean;
};

const LanguageCard: React.FC<Props> = ({
  projectId,
  defaultLanguage,
  translation,
  readonly,
}) => {
  const modalId = `remove-language-modal-${translation.id}`;

  const [isPending, startTransition] = useTransition();

  const languageKey = translation.language;

  const { onOpen, onClose } = useDialog(modalId);

  if (!isLocaleKey(languageKey)) {
    return null;
  }

  const onRemove = () => {
    startTransition(async () => {
      try {
        await removeLanguage(projectId, translation.id);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const localeInfo = locales[languageKey];

  return (
    <>
      <div className="flex items-center w-60 px-4 py-2 bg-base-100 rounded-xl">
        <Image
          src={localeInfo.flag}
          alt={localeInfo.name}
          className="border border-zinc-300 mr-2"
          width={32}
          height={32}
          style={{
            width: "auto",
            height: 20,
          }}
        />

        <p className="flex-1">{localeInfo.name}</p>

        {languageKey === defaultLanguage ? (
          <span className="badge badge-accent h-8">Default</span>
        ) : (
          <>
            {!readonly && (
              <button type="button" onClick={onOpen}>
                <LuX className="w-8 h-8 p-1 bg-error text-error-content rounded-full" />
              </button>
            )}
          </>
        )}
      </div>

      <Dialog
        id={modalId}
        onClose={onClose}
        onAction={onRemove}
        isPending={isPending}
      >
        <h3 className="font-bold text-lg mb-4">
          Are you sure you want to remove this language?
        </h3>

        <p>
          This will remove the <strong>{localeInfo.name}</strong> language from
          this project.
        </p>
      </Dialog>
    </>
  );
};

export default LanguageCard;
