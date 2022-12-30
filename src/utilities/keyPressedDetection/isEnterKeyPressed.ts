const isEnterKeyPressed = <T>(
  e: React.KeyboardEvent<T>,
  callbackIfTrue?: () => void
): boolean => {
  if (e.key === "Enter") {
    callbackIfTrue && callbackIfTrue();
    return true;
  }

  return false;
};

export { isEnterKeyPressed };
