import { findFirstFocusableElement } from "../../../utilities/findFirstFocusableElement";

export const setFocusTrap = (
  rootElement: React.RefObject<HTMLElement>,
  findFocusableElement: typeof findFirstFocusableElement
) => {
  let focusableElement: HTMLElement | null = null;

  if (rootElement.current) {
    focusableElement = findFocusableElement(rootElement.current);

    if (focusableElement) {
      focusableElement.focus();
    }
  }
};
