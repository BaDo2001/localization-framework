import { auth } from "@clerk/nextjs";

import prisma from "@/lib/prisma";

import CreateProjectButton from "./CreateProjectButton";
import ProjectCard from "./ProjectCard";

const Projects = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  // TODO: Include projects where user is a member

  const projects = await prisma.project.findMany({
    where: {
      ownerId: userId,
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl">My projects</h1>

        <CreateProjectButton />
      </div>
      <ul className="mt-16 flex flex-wrap gap-10 justify-center">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ul>
    </div>
  );
};

export default Projects;
