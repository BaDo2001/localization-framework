import { auth } from "@clerk/nextjs";
import { Clerk } from "@clerk/nextjs/server";

import { requireProjectMember } from "@/api/utils/requireProjectMember";

import AddProjectLanguage from "./AddProjectLanguage";
import AddProjectMember from "./AddProjectMember";
import LanguageCard from "./LanguageCard";
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

  const project = await requireProjectMember({
    projectId: id,
    includeMembers: true,
    includeTranslations: true,
  });

  const users = await Clerk({
    secretKey: process.env.CLERK_SECRET_KEY,
  }).users.getUserList({
    userId: project.members.map((member) => member.userId),
  });

  const user = auth();

  const readonly = project.ownerId !== user.userId!;

  return (
    <>
      <div className="flex flex-col gap-4 items-start">
        <h2 className="font-bold text-lg">General</h2>

        <ProjectName project={project} readonly={readonly} />
      </div>

      <div className="divider" />

      <div className="flex flex-col gap-4 items-start">
        <h2 className="font-bold text-lg">Languages</h2>

        <div className="flex flex-col gap-2">
          {!readonly && (
            <div className="mb-6">
              <AddProjectLanguage
                project={{
                  ...project,
                  members: undefined,
                }}
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            {project?.translations.map((t) => (
              <LanguageCard
                key={t.id}
                projectId={project.id}
                defaultLanguage={project.defaultLanguage}
                translation={t}
                readonly={readonly}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="divider" />

      <div className="flex flex-col gap-4 items-start">
        <h2 className="font-bold text-lg">Members</h2>

        <div>
          {!readonly && (
            <div className="mb-6">
              <AddProjectMember project={project} />
            </div>
          )}

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
                  readonly={readonly}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="divider" />

      <div className="flex flex-col gap-4 items-start">
        <h2 className="font-bold text-lg">Keys</h2>

        <ProjectApiKey project={project} readonly={readonly} />
      </div>

      <div className="divider" />

      <div className="flex flex-col gap-4 items-start">
        <h2 className="font-bold text-lg text-error">Danger zone</h2>

        <ProjectDangerButton project={project} readonly={readonly} />
      </div>
    </>
  );
};

export default ProjectSettingsPage;
