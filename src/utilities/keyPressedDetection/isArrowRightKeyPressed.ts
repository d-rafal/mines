const isArrowRightKeyPressed = <T>(
  e: React.KeyboardEvent<T>,
  callbackIfTrue?: () => void
): boolean => {
  if (e.key === "ArrowRight") {
    callbackIfTrue && callbackIfTrue();
    return true;
  }

  return false;
};

export { isArrowRightKeyPressed };
