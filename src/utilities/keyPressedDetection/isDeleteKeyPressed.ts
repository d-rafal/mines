const isDeleteKeyPressed = <T>(
  e: React.KeyboardEvent<T>,
  callbackIfTrue?: () => void
): boolean => {
  if (e.key === "Delete") {
    callbackIfTrue && callbackIfTrue();
    return true;
  }

  return false;
};

export { isDeleteKeyPressed };
