import { getDefaultTranslation } from "@/app/api/keys/getDefaultTranslation";
import { formatKeys } from "@/utils/formatKeys";

import Tree from "./Tree";

type Props = {
  projectId: string;
};

const KeyTreeView = async ({ projectId }: Props) => {
  const defaultTranslation = await getDefaultTranslation(projectId);

  return <Tree {...formatKeys(defaultTranslation)} />;
};

export default KeyTreeView;
