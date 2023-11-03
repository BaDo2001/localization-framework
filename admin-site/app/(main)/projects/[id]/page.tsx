import { requireProjectMember } from "@/api/utils/requireProjectMember";

type Props = {
  params: {
    id: string;
  };
};

const ProjectPage = async ({ params }: Props) => {
  const { id } = params;

  const project = await requireProjectMember(id);

  return (
    <div>
      <h1>Project Page</h1>

      {project?.name}
    </div>
  );
};

export default ProjectPage;
