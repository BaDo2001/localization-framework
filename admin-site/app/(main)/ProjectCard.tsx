"use client";

import type { FC } from "react";
import { FiSettings } from "react-icons/fi";

import type { Project } from "@prisma/client";
import { useRouter } from "next/navigation";

type Props = {
  project: Project;
};

const ProjectCard: FC<Props> = ({ project }) => {
  const router = useRouter();

  const onClick = () => {
    router.push(
      `/projects/${project.id}/translations/${project.defaultLanguage}-${project.defaultLanguage}`,
    );
  };

  const onSettingsClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    router.push(`/projects/${project.id}/settings`);
  };

  return (
    <div
      className="flex justify-center items-center p-16 aspect-square bg-base-100 rounded-xl shadow-md cursor-pointer relative hover:scale-105 transition-transform"
      onClick={onClick}
    >
      {project.name}

      <button
        className="btn btn-square absolute right-3 top-3 w-8 h-8 min-h-0"
        type="button"
        onClick={onSettingsClick}
      >
        <FiSettings />
      </button>
    </div>
  );
};

export default ProjectCard;
