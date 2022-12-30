export const isHTMLElementFocusable = (
  element: HTMLElement & {
    disabled?: boolean;
    href?: string;
    rel?: string;
    type?: string;
  }
) => {
  if (element.tabIndex < 0) {
    return false;
  }

  if (element.disabled) {
    return false;
  }

  switch (element.nodeName) {
    case "A":
      return !!element.href && element.rel !== "ignore";
    case "INPUT":
      return element.type !== "hidden";
    case "BUTTON":
    case "SELECT":
    case "TEXTAREA":
      return true;
    default:
      return false;
  }
};
