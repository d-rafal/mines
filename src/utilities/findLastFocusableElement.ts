import { isHTMLElement } from "./isHTMLElement";
import { isHTMLElementFocusable } from "./isHTMLElementFocusable";

export const findLastFocusableElement = (
  rootElement: Element
): HTMLElement | null => {
  let element = rootElement.lastElementChild;
  let internalFocusableElement: HTMLElement | null = null;

  while (element) {
    if (isHTMLElement(element) && isHTMLElementFocusable(element)) {
      return element;
    }

    internalFocusableElement = findLastFocusableElement(element);

    if (internalFocusableElement) {
      return internalFocusableElement;
    }

    element = element.previousElementSibling;
  }

  return null;
};
