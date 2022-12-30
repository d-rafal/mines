const isEscapeKeyPressed = <T>(
  e: React.KeyboardEvent<T>,
  callbackIfTrue?: () => void
): boolean => {
  if (e.key === "Escape") {
    callbackIfTrue && callbackIfTrue();
    return true;
  }

  return false;
};

export { isEscapeKeyPressed };
