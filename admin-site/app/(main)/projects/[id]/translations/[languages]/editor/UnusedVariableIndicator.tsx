import { MdWarning } from "react-icons/md";

import Tooltip from "@/components/Tooltip";
import {
  getUnusedVariableNames,
  getUnusedVariables,
  getVariables,
} from "@/utils/translationVariables";

type Props = {
  sourceValue: string | null;
  targetValue: string | null;
};

const UnusedVariableIndicator = ({ sourceValue, targetValue }: Props) => {
  const variables = getVariables(sourceValue);
  const unusedVariables = getUnusedVariables(targetValue, variables);
  const unusedVariableNames = getUnusedVariableNames(unusedVariables);

  return targetValue && unusedVariables?.length ? (
    <Tooltip
      message={`Unused variable(s): ${unusedVariableNames?.join(", ")}`}
      alignment="right"
      appearance="warning"
    >
      <MdWarning className="w-6 h-6 text-warning" />
    </Tooltip>
  ) : null;
};

export default UnusedVariableIndicator;
