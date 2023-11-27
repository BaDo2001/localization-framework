// Returns the variables in {{<variable name>}} format
export const getVariables = (value: string | null) =>
  value?.match(/{{[^{}]*}}/g);

export const getUnusedVariables = (
  value: string | null,
  variables: string[] | null | undefined,
) => variables?.filter((v) => !value?.includes(v));

export const getUnusedVariableNames = (unusedVariables: string[] | undefined) =>
  unusedVariables?.map((v) => v.slice(2, -2));
