import type { FC } from "react";

import type { Project } from "@prisma/client";

type Props = {
  project: Project;
};

const ProjectCard: FC<Props> = ({ project }) => (
  <div className="flex justify-center items-center p-16 aspect-square bg-base-100 rounded-xl shadow-md">
    {project.name}
  </div>
);

export default ProjectCard;
