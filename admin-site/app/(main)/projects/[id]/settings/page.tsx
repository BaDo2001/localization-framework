import { requireProjectMember } from "@/app/api/utils/requireProjectMember";

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
      <h1>Project settings Page</h1>

      {project?.name}
    </div>
  );
};

export default ProjectSettingsPage;
