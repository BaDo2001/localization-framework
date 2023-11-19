import type { Project, Translation } from "@prisma/client";

import SettingsMenuItem from "./SettingsMenuItem";
import TranslationsMenuItem from "./TranslationsMenuItem";

export type ProjectWithTranslations = Project & { translations: Translation[] };

type Props = {
  projects: ProjectWithTranslations[];
};

const ProjectsMenu = ({ projects }: Props) => (
  <ul className="menu p-0 pr-2">
    {projects.map((p) => (
      <li key={p.id}>
        <details open>
          <summary className="font-semibold text-base">{p.name}</summary>

          <ul>
            <TranslationsMenuItem project={p} />
            <SettingsMenuItem projectId={p.id} />
          </ul>
        </details>
      </li>
    ))}
  </ul>
);

export default ProjectsMenu;
