import { auth } from "@clerk/nextjs";
import { Clerk } from "@clerk/nextjs/server";

import { requireProjectMember } from "@/api/utils/requireProjectMember";

import AddProjectMember from "./AddProjectMember";
import MemberCard from "./MemberCard";
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

  const project = await requireProjectMember(id, true);

  const users = await Clerk({
    secretKey: process.env.CLERK_SECRET_KEY,
  }).users.getUserList({
    userId: project.members.map((member) => member.userId),
  });

  const user = auth();

  return (
    <div>
      <div className="flex flex-col gap-4 items-start">
        <h2 className="font-bold text-lg">General</h2>

        <ProjectName project={project} userId={user.userId!} />
      </div>

      <div className="divider" />

      <div className="flex flex-col gap-4 items-start">
        <h2 className="font-bold text-lg">Languages</h2>
      </div>

      <div className="divider" />

      <div className="flex flex-col gap-4 items-start">
        <h2 className="font-bold text-lg">Members</h2>

        <div>
          <div className="mb-6">
            <AddProjectMember project={project} userId={user.userId!} />
          </div>

          {project?.members.length === 0 ? (
            <div>No members</div>
          ) : (
            <div className="flex flex-col gap-2">
              {project?.members.map((member, i) => (
                <MemberCard
                  key={member.id}
                  memberId={member.id}
                  email={users[i].emailAddresses[0].emailAddress}
                  projectId={project.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="divider" />

      <div className="flex flex-col gap-4 items-start">
        <h2 className="font-bold text-lg">Keys</h2>

        <ProjectApiKey project={project} userId={user.userId!} />
      </div>

      <div className="divider" />

      <div className="flex flex-col gap-4 items-start">
        <h2 className="font-bold text-lg text-error">Danger zone</h2>

        <ProjectDangerButton project={project} userId={user.userId!} />
      </div>
    </div>
  );
};

export default ProjectSettingsPage;
