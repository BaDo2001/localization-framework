"use client";

import Dialog from "@/components/Dialog";
import { useDialog } from "@/hooks/useDialog";

import CreateProjectForm from "./CreateProjectForm";

const modalId = "create-project-modal";

const CreateProjectButton = () => {
  const { onOpen, onClose } = useDialog(modalId);

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={onOpen}>
        Create project
      </button>

      <Dialog id={modalId}>
        <h3 className="font-bold text-lg mb-4">Create new project</h3>

        <CreateProjectForm onClose={onClose} />
      </Dialog>
    </>
  );
};

export default CreateProjectButton;
