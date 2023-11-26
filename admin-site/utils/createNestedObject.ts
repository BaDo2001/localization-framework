export const createNestedObject = (
  base: Record<string, unknown>,
  path: string[],
  value: unknown,
): Record<string, unknown> => {
  const [head, ...tail] = path;

  if (tail.length === 0) {
    return {
      ...base,
      [head]: value,
    };
  }

  return {
    ...base,
    [head]: createNestedObject(
      (base[head] as Record<string, unknown> | undefined) ?? {},
      tail,
      value,
    ),
  };
};
