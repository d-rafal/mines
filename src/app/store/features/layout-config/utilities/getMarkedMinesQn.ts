import { LayoutConfig } from "../../../../../models/layoutConfigModel";

export const getMarkedMinesQn = (layoutConfig: LayoutConfig) => {
  let markedMinesQn = 0;

  layoutConfig.forEach((tab) => {
    tab.forEach((cell) => {
      if (cell.status === "marked") {
        markedMinesQn++;
      }
    });
  });

  return markedMinesQn;
};
