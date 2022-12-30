const isControlKeyPressed = <T>(
  e: React.KeyboardEvent<T>,
  callbackIfTrue?: () => void
): boolean => {
  if (e.key === "Control") {
    callbackIfTrue && callbackIfTrue();
    return true;
  }

  return false;
};

export { isControlKeyPressed };
