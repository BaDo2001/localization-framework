"use client";

import { useForm } from "react-hook-form";

import Dialog from "@/components/Dialog";
import { useDialog } from "@/hooks/useDialog";

import type { Form } from "./CreateProjectForm";
import CreateProjectForm from "./CreateProjectForm";

const modalId = "create-project-modal";

const CreateProjectButton = () => {
  const { onOpen, onClose } = useDialog(modalId);

  const form = useForm<Form>();

  const handleClose = () => {
    form.reset();
  };

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={onOpen}>
        Create project
      </button>

      <Dialog id={modalId} onClose={handleClose}>
        <h3 className="font-bold text-lg mb-4">Create new project</h3>

        <CreateProjectForm onClose={onClose} form={form} />
      </Dialog>
    </>
  );
};

export default CreateProjectButton;
