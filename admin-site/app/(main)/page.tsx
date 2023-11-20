import { getAllProjects } from "@/api/projects/getAllProjects";

import CreateProjectButton from "./CreateProjectButton";
import ProjectCard from "./ProjectCard";

const Projects = async () => {
  const projects = await getAllProjects(false);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl">My projects</h1>

        <CreateProjectButton />
      </div>
      <ul className="mt-16 flex flex-wrap gap-10">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}

        {projects.length === 0 && (
          <p className="text-center w-full">
            You don&apos;t have any projects yet.
          </p>
        )}
      </ul>
    </div>
  );
};

export default Projects;
