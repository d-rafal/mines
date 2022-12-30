export const isHTMLElement = (node: Node): node is HTMLElement => {
  return node instanceof HTMLElement;
};
