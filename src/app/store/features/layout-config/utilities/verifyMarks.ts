import type { LayoutConfig } from "../../../../../models/layoutConfigModel";

export const verifyMarks = (layoutConfig: LayoutConfig) => {
  const newLayoutConfig = layoutConfig.map((tab) =>
    tab.map((cellData) =>
      cellData.status !== "marked"
        ? cellData
        : cellData.hasMine
        ? { ...cellData, status: "correctMark" as const }
        : { ...cellData, status: "wrongMark" as const }
    )
  );

  return newLayoutConfig;
};
