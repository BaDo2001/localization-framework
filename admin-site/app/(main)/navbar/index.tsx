import { getAllProjects } from "@/api/projects/getAllProjects";

import ProjectsMenu from "./menu/ProjectsMenu";
import BackToHomeButton from "./BackToHomeButton";
import SignOutButton from "./SignOutButton";

const Navbar = async () => {
  const projects = await getAllProjects(true);

  return (
    <nav className="flex flex-col items-center h-full gap-y-8 bg-base-100 py-8 px-4 w-80">
      <div className="w-2/3 flex flex-col">
        <SignOutButton />
      </div>

      <div className="flex-1 self-stretch overflow-y-auto">
        <ProjectsMenu projects={projects} />
      </div>

      <BackToHomeButton />
    </nav>
  );
};

export default Navbar;
