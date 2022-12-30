export const getAbsoluteRoute = (...paths: string[]) =>
  paths.reduce(
    (prev, current) =>
      current[0] === "/" ? prev + current : prev + "/" + current,
    ""
  );
