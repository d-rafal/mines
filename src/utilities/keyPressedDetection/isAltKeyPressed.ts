const isAltKeyPressed = <T>(
  e: React.KeyboardEvent<T>,
  callbackIfTrue?: () => void
): boolean => {
  if (e.key === "Alt") {
    callbackIfTrue && callbackIfTrue();
    return true;
  }

  return false;
};

export { isAltKeyPressed };
