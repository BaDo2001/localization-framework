import type { FC, PropsWithChildren } from "react";

import clsx from "clsx";

type Alignment = "top" | "bottom" | "left" | "right";
type Appearance =
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

type Props = PropsWithChildren & {
  message: string;
  alignment?: Alignment;
  appearance?: Appearance;
};

const Tooltip: FC<Props> = ({ children, message, alignment, appearance }) => {
  const alignmentClass = `tooltip-${alignment}`;
  const appearanceClass = `tooltip-${appearance}`;

  return (
    <div
      className={clsx(
        alignment && alignmentClass,
        appearance && appearanceClass,
        "tooltip",
      )}
      data-tip={message}
    >
      {children}
    </div>
  );
};

export default Tooltip;
