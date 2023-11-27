import type { KeyEntry } from "./formatKeys";

export const createNestedKeys = (
  base: Record<string, KeyEntry>,
  path: string[],
  absolutePath: string[],
): Record<string, KeyEntry> => {
  const [head, ...tail] = path;

  if (tail.length === 0) {
    return {
      ...base,
      [head]: {
        absolutePath: [...absolutePath, head].join("."),
      },
    };
  }

  return {
    ...base,
    [head]: {
      absolutePath: [...absolutePath, head].join("."),
      children: createNestedKeys(
        (base[head]?.children as Record<string, KeyEntry> | undefined) ?? {},
        tail,
        [...absolutePath, head],
      ),
    },
  };
};
