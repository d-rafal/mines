const isShiftKeyPressed = <T>(
  e: React.KeyboardEvent<T>,
  callbackIfTrue?: () => void
): boolean => {
  if (e.key === "Shift") {
    callbackIfTrue && callbackIfTrue();
    return true;
  }

  return false;
};

export { isShiftKeyPressed };
