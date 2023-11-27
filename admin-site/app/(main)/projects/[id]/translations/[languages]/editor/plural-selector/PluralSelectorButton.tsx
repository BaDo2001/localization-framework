import { useForm } from "react-hook-form";
import { MdAddCircle } from "react-icons/md";

import type { Project } from "@prisma/client";

import Dialog from "@/components/Dialog";
import { useDialog } from "@/hooks/useDialog";
import type { Plural } from "@/lib/plurals";

import type { Form } from "./PluralSelectorForm";
import PluralSelectorForm from "./PluralSelectorForm";

type Props = {
  project: Project;
  translationKey: string;
  pluralVersions: Plural[];
};

const PluralSelectorButton = ({
  project,
  translationKey,
  pluralVersions,
}: Props) => {
  const modalId = `pluralize-$${translationKey}-modal`;

  const { onOpen, onClose } = useDialog(modalId);
  const form = useForm<Form>();

  const handleClose = () => form.reset();

  return (
    <>
      <button type="button" onClick={onOpen}>
        <MdAddCircle />
      </button>

      <Dialog id={modalId} onClose={handleClose}>
        <h3 className="font-bold text-lg mb-4">Pluralize translation key</h3>

        <PluralSelectorForm
          project={project}
          translationKey={translationKey}
          pluralVersions={pluralVersions}
          form={form}
          onClose={onClose}
        />
      </Dialog>
    </>
  );
};

export default PluralSelectorButton;
