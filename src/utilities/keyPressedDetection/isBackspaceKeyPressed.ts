const isBackspaceKeyPressed = <T>(
  e: React.KeyboardEvent<T>,
  callbackIfTrue?: () => void
): boolean => {
  if (e.key === "Backspace") {
    callbackIfTrue && callbackIfTrue();
    return true;
  }

  return false;
};

export { isBackspaceKeyPressed };
