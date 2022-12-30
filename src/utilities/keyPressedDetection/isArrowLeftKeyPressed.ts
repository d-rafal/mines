const isArrowLeftKeyPressed = <T>(
  e: React.KeyboardEvent<T>,
  callbackIfTrue?: () => void
): boolean => {
  if (e.key === "ArrowLeft") {
    callbackIfTrue && callbackIfTrue();
    return true;
  }

  return false;
};

export { isArrowLeftKeyPressed };
