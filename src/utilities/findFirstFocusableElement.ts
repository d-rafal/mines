import { isHTMLElement } from "./isHTMLElement";
import { isHTMLElementFocusable } from "./isHTMLElementFocusable";

export const findFirstFocusableElement = (
  rootElement: Element
): HTMLElement | null => {
  let element = rootElement.firstElementChild;
  let internalFocusableElement: HTMLElement | null = null;

  while (element) {
    if (isHTMLElement(element) && isHTMLElementFocusable(element)) {
      return element;
    }

    internalFocusableElement = findFirstFocusableElement(element);

    if (internalFocusableElement) {
      return internalFocusableElement;
    }

    element = element.nextElementSibling;
  }

  return null;
};
