import type { FC, PropsWithChildren } from "react";

import clsx from "clsx";

import {
  type Alignment,
  type Appearance,
  getAlignmentClass,
  getAppearanceClass,
} from "./utils";

type Props = PropsWithChildren & {
  message: string;
  alignment?: Alignment;
  appearance?: Appearance;
};

const Tooltip: FC<Props> = ({ children, message, alignment, appearance }) => (
  <div
    className={clsx(
      alignment && getAlignmentClass(alignment),
      appearance && getAppearanceClass(appearance),
      "tooltip",
    )}
    data-tip={message}
  >
    {children}
  </div>
);

export default Tooltip;
