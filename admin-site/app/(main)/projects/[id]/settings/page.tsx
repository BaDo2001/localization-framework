import { requireProjectMember } from "@/api/utils/requireProjectMember";

import ProjectApiKey from "./ProjectApiKey";
import ProjectDangerButton from "./ProjectDangerButton";
import ProjectName from "./ProjectName";

type Props = {
  params: {
    id: string;
  };
};

const ProjectSettingsPage = async ({ params }: Props) => {
  const { id } = params;

  const project = await requireProjectMember(parseInt(id));

  return (
    <div>
      <div className="flex flex-col gap-4 items-start">
        <h2 className="font-bold text-lg">General</h2>

        <ProjectName project={project} />
      </div>

      <div className="divider" />

      <div className="flex flex-col gap-4 items-start">
        <h2 className="font-bold text-lg">Languages</h2>
      </div>

      <div className="divider" />

      <div className="flex flex-col gap-4 items-start">
        <h2 className="font-bold text-lg">Members</h2>
      </div>

      <div className="divider" />

      <div className="flex flex-col gap-4 items-start">
        <h2 className="font-bold text-lg">Keys</h2>

        <ProjectApiKey project={project} />
      </div>

      <div className="divider" />

      <div className="flex flex-col gap-4 items-start">
        <h2 className="font-bold text-lg text-error">Danger zone</h2>

        <ProjectDangerButton project={project} />
      </div>
    </div>
  );
};

export default ProjectSettingsPage;
