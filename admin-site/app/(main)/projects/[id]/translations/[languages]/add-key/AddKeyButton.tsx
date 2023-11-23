"use client";

import { useForm } from "react-hook-form";

import Dialog from "@/components/Dialog";
import { useDialog } from "@/hooks/useDialog";

import type { Form } from "./AddKeyForm";
import AddKeyForm from "./AddKeyForm";

type Props = {
  projectId: string;
};

const modalId = "add-translation-key-modal";

const AddKeyButton = ({ projectId }: Props) => {
  const { onOpen, onClose } = useDialog(modalId);
  const form = useForm<Form>();

  const handleClose = () => form.reset();

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={onOpen}>
        Add key
      </button>

      <Dialog id={modalId} onClose={handleClose}>
        <h3 className="font-bold text-lg mb-4">Add new translation key</h3>

        <AddKeyForm projectId={projectId} onClose={onClose} form={form} />
      </Dialog>
    </>
  );
};

export default AddKeyButton;
