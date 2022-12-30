export const blockTabEvent = (e: React.KeyboardEvent<HTMLElement>) => {
  if (e.key === "Tab") {
    e.preventDefault();
  }
};
