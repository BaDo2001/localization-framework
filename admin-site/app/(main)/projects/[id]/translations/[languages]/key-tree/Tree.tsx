import type { KeyEntry } from "@/utils/formatKeys";

import Summary from "./Summary";

const Tree = (entries: Record<string, KeyEntry>) => (
  <ul className="menu p-0">
    {Object.keys(entries).map((key) => {
      const { absolutePath, children } = entries[key];

      return (
        <li key={key}>
          <Summary pathSegment={key} absolutePath={absolutePath} />
          {children && <Tree {...children} />}
        </li>
      );
    })}
  </ul>
);

export default Tree;
