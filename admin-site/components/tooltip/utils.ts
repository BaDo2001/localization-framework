export type Alignment = "top" | "bottom" | "left" | "right";

export type Appearance =
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

// eslint-disable-next-line consistent-return
export const getAlignmentClass = (alignment: Alignment) => {
  switch (alignment) {
    case "top":
      return "tooltip-top";
    case "bottom":
      return "tooltip-bottom";
    case "left":
      return "tooltip-left";
    case "right":
      return "tooltip-right";
  }
};

// eslint-disable-next-line consistent-return
export const getAppearanceClass = (appearance: Appearance) => {
  switch (appearance) {
    case "primary":
      return "tooltip-primary";
    case "secondary":
      return "tooltip-secondary";
    case "accent":
      return "tooltip-accent";
    case "info":
      return "tooltip-info";
    case "success":
      return "tooltip-success";
    case "warning":
      return "tooltip-warning";
    case "error":
      return "tooltip-error";
  }
};
