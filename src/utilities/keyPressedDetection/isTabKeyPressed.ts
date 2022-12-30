const isTabKeyPressed = <T>(
  e: React.KeyboardEvent<T>,
  callbackIfTrue?: () => void
): boolean => {
  if (e.key === "Tab") {
    callbackIfTrue && callbackIfTrue();
    return true;
  }

  return false;
};

export { isTabKeyPressed };
