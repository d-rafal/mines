import { LayoutConfig } from "../../../../../models/layoutConfigModel";

export const isError = (layoutConfig: LayoutConfig) => {
  let isError = false;

  for (const tab of layoutConfig) {
    for (const cell of tab) {
      if (cell.status === "fault" || cell.status === "wrongMark") {
        isError = true;
        break;
      }
    }
    if (isError) {
      break;
    }
  }

  return isError;
};
