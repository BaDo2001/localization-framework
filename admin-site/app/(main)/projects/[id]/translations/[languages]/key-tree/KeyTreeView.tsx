import { getDefaultTranslation } from "@/app/api/keys/getDefaultTranslation";
import { formatKeys } from "@/utils/formatKeys";

import Tree from "./Tree";

type Props = {
  projectId: string;
};

const KeyTreeView = async ({ projectId }: Props) => {
  const defaultTranslation = await getDefaultTranslation(projectId);

  return (
    <div>
      <h2 className="font-semibold mb-4">Keys added to the project</h2>
      <Tree {...formatKeys(defaultTranslation)} />
    </div>
  );
};

export default KeyTreeView;
